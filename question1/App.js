import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShortenerPage from './ShortenerPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ShortenerPage />} />
    </Routes>
  </Router>
);

export default App;
