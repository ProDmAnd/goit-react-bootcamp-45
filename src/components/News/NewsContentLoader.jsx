import React from 'react';
import ContentLoader from 'react-content-loader';

const NewsContentLoader = ({ hitsPerPage = 10, ...restProps } = {}) => {
  const svgHeight = 5 + hitsPerPage * (16 + 6);
  const fakeNewsList = Array.apply(null, Array(hitsPerPage));

  return (
    <ContentLoader
      speed={2}
      width={400}
      viewBox={`0 0 400 ${svgHeight}`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...restProps}
    >
      {fakeNewsList.map((_, i) => (
        <rect
          key={i}
          x="0"
          y={5 + i * 16}
          rx="3"
          ry="3"
          width={250 + Math.random() * 10}
          height="6"
        />
      ))}
    </ContentLoader>
  );
};

export default NewsContentLoader;
