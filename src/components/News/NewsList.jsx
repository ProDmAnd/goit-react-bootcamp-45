import { Button, Link, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import NewsContentLoader from './NewsContentLoader';

/**
@param {{
  isLoading: boolean,
  list: NewsItem[],
  loadMore: () => {},
  hitsPerPage: number,
  theme: string,
}} param0 
 */
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
      <List dense>
        {list.map(({ objectID, title, url, author }) => (
          <ListItem key={objectID}>
            <ListItemText
              primary={
                <Link href={url} underline="hover">
                  {title}
                </Link>
              }
              secondary={author}
            />
          </ListItem>
        ))}
      </List>

      <Button variant="contained" onClick={loadMore}>
        Load more
      </Button>
    </>
  );
};

export default NewsList;

/**
@typedef {{
  created_at: '2018-03-14T03:50:30.000Z',
  title: string,
  url: string,
  author: 'Cogito',
  points: 6015,
  story_text: null,
  comment_text: null,
  num_comments: 436,
  story_id: null,
  story_title: null,
  story_url: null,
  parent_id: null,
  created_at_i: 1520999430,
  relevancy_score: 8012,
  _tags: ['story', 'author_Cogito', 'story_16582136'],
  objectID: string,
  _highlightResult: {
    title: {
      value: 'Stephen Hawking has died',
      matchLevel: 'none',
      matchedWords: [],
    },
    url: {
      value: 'http://www.bbc.com/news/uk-43396008',
      matchLevel: 'none',
      matchedWords: [],
    },
    author: {
      value: 'Cogito',
      matchLevel: 'none',
      matchedWords: [],
    },
  },
}} NewsItem
 */
