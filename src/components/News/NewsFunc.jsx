import Button from 'components/Button';
import ControlledForm from 'components/ControlledForm/ControlledForm';
import Modal from 'components/Modal';
import useIsMount from 'hooks/useIsMount';
import { useToggle } from 'hooks/useToggle';
import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { getNews } from 'services/api/newsApi';
import NewsList from './NewsList';

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
  };

  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0);
  const fetchNewsByQuery = useCallback(
    async (params = { query: '', hitsPerPage: 10 }) => {
      setIsLoading(true);
      try {
        const response = await toast.promise(
          getNews({
            query: params.query,
            hitsPerPage: params.hitsPerPage,
          }),
          {
            success: response =>
              response.hits.length ? 'News loaded' : 'Nothings found',
            error: 'Nothings found',
            loading: 'Fetching news',
          }
        );
        setPage(0);
        setList(response.hits);
      } catch (error) {
        setError(error?.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // useEffect(() => {
  //   fetchNewsByQuery({ hitsPerPage });
  // }, [hitsPerPage, query, fetchNewsByQuery]);

  useEffect(() => {
    console.log('component did mount');
    const intervalId = setInterval(() => {
      setPage(Math.random());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!isMount) return;
    console.log('component did update');
    if (!isLoading) {
      incrementButtonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading, list, isMount]);

  const registrationModal = useToggle(false);

  const memoizedList = useMemo(() => list.filter(({ title }) => title), [list]);

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
            e.code === 'Enter' ? fetchNewsByQuery({ query, hitsPerPage }) : null
          }
        />
        <select value={hitsPerPage} onChange={changeHitsPerPage}>
          {[10, 25, 50, 100].map(count => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
        <Button
          type="button"
          onClick={() => fetchNewsByQuery({ query, hitsPerPage })}
        >
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
          list={memoizedList}
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

export default NewsFunc;
