import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Rotas from './routes';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Rotas />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </BrowserRouter>
  </React.StrictMode>
);


