import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    lighRed: {
      main: '#F83758',
      contrastText: '#FFFFFF',
    },
    darkerBlue: {
      main: '#243A46',
      contrastText: '#FFFFFF',
    },
    yellowBlue: {
      main: '#FFD542',
      contrastText: '#2623D2',
    },
    greyBlack: {
      main: '#E6E8E7',
      contrastText: '#000',
    },
    whiteGrey: {
      main: '#FFF',
      contrastText: '#9A9A9A',
    },
  },
  typography: {
    fontFamily: [
      'Poppins', // Replace with your desired font
      'sans-serif'
    ].join(','),
  },
  
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  // </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
