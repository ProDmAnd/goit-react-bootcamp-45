import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';

import News from './News/News';
import NewsFunc from './News/NewsFunc';

class App extends Component {
  render() {
    return (
      <>
        {/* <News /> */}
        {/* <Toaster /> */}
        <NewsFunc/>
        <ToastContainer/>
      </>
    );
  }
}

export default App;
