import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';

import News from './News/News';

class App extends Component {
  render() {
    return (
      <>
        <News />
        {/* <Toaster /> */}
        <ToastContainer/>
      </>
    );
  }
}

export default App;
