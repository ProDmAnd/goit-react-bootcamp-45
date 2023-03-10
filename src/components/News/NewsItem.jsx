import React from 'react';

const NewsItem = ({ url, title }) => {
  return (
    <li>
      <a href={url} target="_blank" rel="noreferrer">
        {title}
      </a>
    </li>
  );
};

export default NewsItem;
