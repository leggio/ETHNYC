import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Gallery from '../pages/Gallery';
import Detail from '../pages/Detail';

import Navigation from '../components/Navigation';
import NotFound from '../pages/NotFound';

export default () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/software/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
