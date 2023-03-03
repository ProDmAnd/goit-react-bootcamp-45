import { useThemeContext } from 'contexts/ThemeProvider';
import { useCallback } from 'react';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Button from './Button';

import NewsFunc from './News/NewsFunc';
import Select from './Select/Select';
import ThemedButton from './TemedButton';
import Todos from './Todos/Todos';

/** @type {Pages} */
export const pages = {
  news: 'News',
  todos: 'Todos',
};

/**
@typedef {{
news: 'News',
todos: 'Todos'
}} Pages
 */
const PagesMap = {
  [pages.news]: NewsFunc,
  [pages.todos]: Todos,
};

const FallbackComponent = () => <h2>Page not found</h2>;

const defaultVegetables = ['Помідори', 'Огірки', 'Капуста', 'Буряк', 'Редиска'];
const vegetablesWithExpired = [...defaultVegetables, 'Картопля', 'Морква'];
const defaultFruits = ['Апельсини', 'Мандарини', 'Яблука', 'Груші', 'Хурма'];
const fruitsWithExpired = [...defaultFruits, 'Авокадо', 'Виноград'];

const App = () => {
  const [vegetables, setVegetables] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewGoodsWithExpiredDate, setViewGoodsWithExpiredDate] =
    useState(false);

  const [selectedVegetables, setSelectedVegetables] = useState('');
  const [selectedFruit, setSelectedFruit] = useState('');

  useEffect(() => {
    if (viewGoodsWithExpiredDate) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFruits(fruitsWithExpired);
        setVegetables(vegetablesWithExpired);
      }, 2000);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFruits(defaultFruits);
      setVegetables(defaultVegetables);
    }, 2000);
  }, [viewGoodsWithExpiredDate]);

  const { theme, toggle } = useThemeContext();
  const [currentPage, setCurrentPage] = useState(pages.news);
  const Page = PagesMap[currentPage] || FallbackComponent;

  const selectFruit = fruit => setSelectedFruit(fruit);
  console.log('App rerender');
  return (
    <div style={{ padding: 30 }}>
      <div>theme: {theme}</div>
      <ThemedButton
        onClick={() =>
          setCurrentPage(prev =>
            prev === pages.news ? pages.todos : pages.news
          )
        }
      >
        Toggle Page
      </ThemedButton>
      <Button onClick={toggle}>Switch theme</Button>
      <Page />
      {loading && <div>Завантажуємо дані</div>}
      <Select
        title="овоч"
        options={vegetables}
        selected={selectedVegetables}
        onSelect={setSelectedVegetables}
      />
      <Select
        title="фрукт"
        options={fruits}
        selected={selectedFruit}
        onSelect={selectFruit}
      />
      <label>
        <input
          type="checkbox"
          value={viewGoodsWithExpiredDate}
          onChange={({ target: { checked } }) =>
            setViewGoodsWithExpiredDate(checked)
          }
        />
        Показати просрочені товари
      </label>
      <ToastContainer />
    </div>
  );
};

export default App;
