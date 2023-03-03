import Button from 'components/Button';
import ControlledForm from 'components/ControlledForm/ControlledForm';
import Modal from 'components/Modal';
import useIsMount from 'hooks/useIsMount';
import { useToggle } from 'hooks/useToggle';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAsyncFn } from 'react-use';
import { getNews } from 'services/api/newsApi';
import NewsList from './NewsList';

let reactMachineMemory = {
  0: { result: null, dependencyArray: [5] },
};

const useMemoCustom = (callback, dependencyArray = [6]) => {
  const different = dependencyArray.some(
    (elem, i) => reactMachineMemory[0].dependencyArray[i] !== elem
  );
  reactMachineMemory[0].dependencyArray = dependencyArray;
  if (different) {
    return callback();
  }
  return reactMachineMemory[0].result;
};

const NewsFunc = () => {
  const isMount = useIsMount();
  const searchRef = useRef();
  /** @type {React.RefObject<HTMLButtonElement>} */
  const incrementButtonRef = useRef();
  const [query, setQuery] = useState('');
  const changeQuery = ({ target: { value } }) => setQuery(value);

  const [hitsPerPage, setHitsPerPage] = useState(150);
  const changeHitsPerPage = ({ target: { value } }) => {
    setHitsPerPage(Number(value));
    // setIsLoading(true);
  };

  const [{ value: list = [], error, loading: isLoading }, fetchNews] =
    useAsyncFn(async ({ query = '', hitsPerPage }) => {
      const response = await toast.promise(
        getNews({
          query,
          hitsPerPage,
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

  // const [list, setList] = useState([]);
  // const [error, setError] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0);
  // const fetchNewsByQuery = useCallback(
  //   async (params = { query: '', hitsPerPage: 10 }) => {
  //     setIsLoading(true);
  //     try {
  //       const response = await toast.promise(
  //         getNews({
  //           query: params.query,
  //           hitsPerPage: params.hitsPerPage,
  //         }),
  //         {
  //           success: response =>
  //             response.hits.length ? 'News loaded' : 'Nothings found',
  //           error: 'Nothings found',
  //           loading: 'Fetching news',
  //         }
  //       );
  //       setPage(0);
  //       setList(response.hits);
  //     } catch (error) {
  //       setError(error?.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   []
  // );

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    debugger;
    if (hitsPerPage > 50) return;
    fetchNews({ hitsPerPage });
  }, [hitsPerPage, fetchNews]);

  useEffect(() => {
    if (!isMount) return;
    console.log('News component did update');
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

  const loadMore = () => {
    setHitsPerPage(prev => prev + 10);
  };

  return (
    <div
      style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      <div style={{ display: 'flex', gap: 20 }}>
        <input
          ref={searchRef}
          value={query}
          onChange={changeQuery}
          onKeyDown={e =>
            e.code === 'Enter' ? fetchNews({ query, hitsPerPage }) : null
          }
        />
        <select value={hitsPerPage} onChange={changeHitsPerPage}>
          {[10, 25, 50, 100].map(count => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
        <Button type="button" onClick={() => fetchNews({ query, hitsPerPage })}>
          Search
        </Button>
      </div>

      <Button onClick={registrationModal.open}>Register</Button>
      {registrationModal.isOpen && (
        <Modal onClose={registrationModal.close}>
          <ControlledForm list={memoizedList} />
        </Modal>
      )}
      <div>
        <p>News</p>
        {error && <p>{error}</p>}
        <NewsList
          isLoading={isLoading}
          list={[{ objectID: 'asdasd', title: 'My News', url: '123' }]}
          loadMore={loadMore}
          hitsPerPage={hitsPerPage}
        />
      </div>
      <div>
        Page: {page}
        <Button
          ref={incrementButtonRef}
          onClick={() => setPage(prev => prev + 1)}
        >
          Increment
        </Button>
      </div>
    </div>
  );
};

export default memo(NewsFunc);
