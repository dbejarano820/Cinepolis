import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store"


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider>
     <ColorModeScript initialColorMode="light"></ColorModeScript>
   <App />
   </ChakraProvider>
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


