import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux'
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../src/redux/slices/userSlice"
import 'typeface-rubik';

const store = configureStore({
  reducer: {
    user: userSlice
  }
})

const theme = createTheme({
  typography: {
    fontFamily: 'Rubik, Arial, sans-serif', 
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>

  //</React.StrictMode>
);


