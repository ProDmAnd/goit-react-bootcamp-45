import { useThemeContext } from 'contexts/ThemeProvider';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Button from './Button';

import NewsFunc from './News/NewsFunc';
import ThemedButton from './TemedButton';
import Todos from './Todos/Todos';

const pages = {
  news: 'News',
  todos: 'Todos',
};

const PagesMap = {
  [pages.news]: NewsFunc,
  [pages.todos]: Todos,
};

const FallbackComponent = () => <h2>Page not found</h2>;

const App = () => {
  const { theme, toggle } = useThemeContext();
  const [currentPage, setCurrentPage] = useState(pages.news);
  const Page = PagesMap[currentPage] || FallbackComponent;
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
      <ToastContainer />
    </div>
  );
};

export default App;
