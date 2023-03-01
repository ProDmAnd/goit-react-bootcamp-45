import Button from 'components/Button';
import Input from 'components/Input';
import Timer from 'components/Timer';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { getNews } from 'services/api/newsApi';
import NewsContentLoader from './NewsContentLoader';

const NewsFunc = props => {
  const [query, setQuery] = useState('');
  const changeQuery = ({ target: { value } }) => setQuery(value);

  const [hitsPerPage, setHitsPerPage] = useState(10);
  const changeHitsPerPage = ({ target: { value } }) => {
    setHitsPerPage(Number(value));
  };

  const [inputBlur, setInputBlur] = useState(true);
  const inputFocused = () => setInputBlur(false);

  const inputBlurred = () => setInputBlur(true);

  const inputKeyPressed = e => {
    if (e.code === 'Enter') {
      //   this.fetchNewsByQuery();
    }
  };

  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0);

  const pageString = page.toString();

  useEffect(() => {
    const fetchNewsByQuery = async (
      params = { query: '', hitsPerPage: 10 }
    ) => {
      setIsLoading(true);
      try {
        const response = await toast.promise(
          getNews({
            query: query || params.query,
            hitsPerPage: hitsPerPage || params.hitsPerPage,
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
    };
    fetchNewsByQuery({ hitsPerPage });
  }, [hitsPerPage, query]);

  useEffect(() => {
    console.log('counter in useEffect', pageString);
  }, [pageString]);
  console.log('page in render', page);

  const [timerRunned, setTimerRunned] = useState(false);

  return (
    <div style={{ padding: 30 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <input
          value={query}
          onChange={changeQuery}
          onFocus={inputFocused}
          onBlur={inputBlurred}
          onKeyDown={inputKeyPressed}
        />
        <select value={hitsPerPage} onChange={changeHitsPerPage}>
          {[10, 25, 50, 100].map(count => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
        <Button type="button" title="Search" />
      </div>
      <Timer runned={timerRunned} stopTimer={() => setTimerRunned(false)} />
      <button onClick={() => setTimerRunned(prev => !prev)}>
        Run/Stop timer
      </button>
      <p>News</p>
      {error && <p>{error}</p>}
      {isLoading ? (
        <NewsContentLoader hitsPerPage={hitsPerPage} />
      ) : (
        <ul>
          {list.map(({ objectID, title, url }) => (
            <li key={objectID}>
              <a href={url} target="_blank" rel="noreferrer">
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <div>
        Page: {page}
        <button onClick={() => setPage(prev => prev + 1)}>Increment</button>
      </div>
    </div>
  );
};

export default NewsFunc;
