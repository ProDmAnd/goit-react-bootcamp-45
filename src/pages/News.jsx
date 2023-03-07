import Button from 'components/Button/Button';
import NewsList from 'components/News/NewsList';
import useIsMount from 'hooks/useIsMount';
import { useToggle } from 'hooks/useToggle';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { getNews } from 'services/api/newsApi';

const News = () => {
  const isMount = useIsMount();
  const searchRef = useRef();
  /** @type {React.RefObject<HTMLButtonElement>} */
  const incrementButtonRef = useRef();

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

  const [{ value: list = [], error, loading: isLoading }, fetchNews] =
    useAsyncFn(async ({ query = '', hitsPerPage, page } = {}) => {
      const response = await toast.promise(
        getNews({
          query,
          hitsPerPage,
          page,
        }),
        {
          success: response =>
            response.hits.length ? 'News loaded' : 'Nothings found',
          error: 'Nothings found',
          loading: 'Fetching news',
        }
      );
      return response.hits;
    });

  const params = useMemo(() => {
    return Object.fromEntries([...searchParams]);
  }, [searchParams]);

  useEffect(() => {
    console.debug(params);
    fetchNews(params);
  }, [searchParams, params, fetchNews]);

  useEffect(() => {
    if (!isMount) return;
    if (!isLoading && list.length) {
      incrementButtonRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'end',
      });
    }
  }, [isLoading, list, isMount]);

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
          onKeyDown={e => (e.code === 'Enter' ? fetchNews(params) : null)}
        />
        <select value={params.hitsPerPage} onChange={changeHitsPerPage}>
          {[10, 25, 50, 100].map(count => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
        <Button type="button" onClick={() => fetchNews(params)}>
          Search
        </Button>
      </div>

      <Button onClick={registrationModal.open}>Register</Button>
      <div>
        <p>News</p>
        {error?.message && <p>{error.message}</p>}
        <NewsList
          isLoading={isLoading}
          list={list}
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
