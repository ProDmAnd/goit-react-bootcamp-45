import { Button } from '@mui/material';
import { fetchNewsByQuery } from 'app/news/operations';
import { useAppSelector } from 'app/reduxHooks';
import NewsList from 'components/News/NewsList';
import useIsMount from 'hooks/useIsMount';
import { useToggle } from 'hooks/useToggle';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const News = () => {
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const searchRef = useRef();
  /** @type {React.RefObject<HTMLButtonElement>} */
  const incrementButtonRef = useRef();

  const isLoading = useAppSelector(state => state.news.isLoading);
  const error = useAppSelector(state => state.news.error);
  const list = useAppSelector(state => state.news.list);

  const [searchParams, setSearchParams] = useSearchParams({
    hitsPerPage: 10,
    page: 1,
    query: 'react',
  });

  const changeQuery = ({ target: { value } }) => {
    searchParams.set('query', value);
    setSearchParams(searchParams);
  };

  const changeHitsPerPage = ({ target: { value } }) => {
    searchParams.set('hitsPerPage', value);
    setSearchParams(searchParams);
  };

  const params = useMemo(() => {
    return Object.fromEntries([...searchParams]);
  }, [searchParams]);

  const getNews = useCallback(
    params => {
      dispatch(fetchNewsByQuery(params));
    },
    [dispatch]
  );

  useEffect(() => {
    getNews(params);
  }, [searchParams, params, getNews]);

  const registrationModal = useToggle(false);

  /** @type {import('./NewsList').NewsItem[]} */
  const memoizedList = useMemo(() => {
    const filteredNews = list.filter(({ title }) => title);
    filteredNews.sort((a, b) => a.title > b.title);
    return filteredNews;
  }, [list]);

  return (
    <div
      style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      <div style={{ display: 'flex', gap: 20 }}>
        <input
          ref={searchRef}
          value={params.query}
          onChange={changeQuery}
          onKeyDown={e => (e.code === 'Enter' ? getNews(params) : null)}
        />
        <select value={params.hitsPerPage} onChange={changeHitsPerPage}>
          {[10, 25, 50, 100].map(count => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
        <Button type="button" onClick={() => getNews(params)}>
          Search
        </Button>
      </div>

      <Button onClick={registrationModal.open}>Register</Button>
      <div>
        <p>News</p>
        {error?.message && <p>{error.message}</p>}
        <NewsList
          isLoading={isLoading}
          list={memoizedList}
          hitsPerPage={Number(params.hitsPerPage) || 10}
        />
      </div>
      <div>
        <Button
          ref={incrementButtonRef}
          onClick={() => {
            setSearchParams({
              ...params,
              page: Number(params.page) - 1,
            });
          }}
        >
          -
        </Button>
        Page: {params.page}
        <Button
          ref={incrementButtonRef}
          onClick={() => {
            searchParams.set('page', Number(params.page) + 1);
            setSearchParams(searchParams);
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default memo(News);
