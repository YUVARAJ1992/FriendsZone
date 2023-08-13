import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom"

import HomePage from './pages/home';
import PageNotFoundPage from './pages/page-not-found';

import "./css/style.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage></HomePage>} ></Route>
        <Route path="*" element={<PageNotFoundPage></PageNotFoundPage>} ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;