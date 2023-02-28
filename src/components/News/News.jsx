import Button from 'components/Button';
import React, { Component } from 'react';
import { toast } from 'react-hot-toast';
import { toast as toastify } from 'react-toastify';
import { getNews } from 'services/api/newsApi';
import NewsContentLoader from './NewsContentLoader';

export default class News extends Component {
  state = {
    list: [],
    isLoading: false,
    error: '',
    query: '',
    inputBlur: true,
    hitsPerPage: 10,
  };

  async componentDidMount() {
    this.fetchNewsByQuery();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.query !== this.state.query && this.state.query) {
    //   this.fetchNewsByQuery();
    // }
  }

  fetchNewsByQuery = async ({ query = '', hitsPerPage } = {}) => {
    this.setState({ isLoading: true });
    try {
      const response = await toast.promise(
        getNews({
          query: query || this.state.query,
          hitsPerPage: hitsPerPage || this.state.hitsPerPage,
        }),
        {
          success: response =>
            response.hits.length ? 'News loaded' : 'Nothings found',
          error: 'Nothings found',
          loading: 'Fetching news',
        }
      );

      // const response = await toastify.promise(
      //   getNews({ query: query || this.state.query }),
      //   {
      //     success: {
      //       render({ data }) {
      //         return data.hits.length ? 'News loaded' : 'Nothings found';
      //       },
      //     },
      //     error: 'Nothings found',
      //     pending: 'Fetching news',
      //   }
      // );
      this.setState({ list: response.hits });
    } catch (error) {
      this.setState({ error: error?.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changeQuery = ({ target: { value } }) => this.setState({ query: value });

  inputFocused = () => this.setState({ inputBlur: false });

  inputBlurred = () => this.setState({ inputBlur: true });

  inputKeyPressed = e => {
    if (e.code === 'Enter') {
      this.fetchNewsByQuery();
    }
  };

  changeHitsPerPage = ({ target: { value } }) =>
    this.setState({ hitsPerPage: Number(value) });

  render() {
    const { isLoading, list, error, query } = this.state;
    return (
      <div>
        <div style={{ display: 'flex', gap: 20 }}>
          <input
            value={query}
            onChange={this.changeQuery}
            onFocus={this.inputFocused}
            onBlur={this.inputBlurred}
            onKeyDown={this.inputKeyPressed}
          />
          <select
            value={this.state.hitsPerPage}
            onChange={this.changeHitsPerPage}
          >
            {[10, 25, 50, 100].map(count => (
              <option value={count}>{count}</option>
            ))}
          </select>
          <Button
            type="button"
            title="Search"
            onClick={this.fetchNewsByQuery}
          />
        </div>

        <p>News</p>
        {error && <p>{error}</p>}
        {isLoading ? (
          <NewsContentLoader hitsPerPage={this.state.hitsPerPage} />
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
      </div>
    );
  }
}
