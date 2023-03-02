import Button from 'components/Button';
import React from 'react';
import NewsContentLoader from './NewsContentLoader';

const NewsList = ({
  isLoading = false,
  list = [],
  loadMore = () => {},
  hitsPerPage,
  theme,
}) => {
  return isLoading ? (
    <NewsContentLoader hitsPerPage={hitsPerPage} />
  ) : (
    <>
      <ul>
        {list.map(({ objectID, title, url }) => (
          <li key={objectID}>
            <a href={url} target="_blank" rel="noreferrer">
              {title}
            </a>
          </li>
        ))}
      </ul>
      <Button theme={theme} onClick={loadMore}>
        Load more
      </Button>
    </>
  );
};

export default NewsList;
