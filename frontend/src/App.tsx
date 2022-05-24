import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Track from './pages/Track';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="track/:id" element={<Track />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
