import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Routing from './routes';
import GlobalStyle from './styles/global';
import { CartContextProvider } from './context/cart';

function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Header />
        <Routing />
      </BrowserRouter>
      <GlobalStyle />
    </CartContextProvider>
  );
}

export default App;
