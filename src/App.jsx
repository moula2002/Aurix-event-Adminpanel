import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import ContentGallery from './pages/ContentGallery';
import Settings from './pages/Settings';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/enquiries" element={<Layout><Enquiries /></Layout>} />
        <Route path="/content-gallery" element={<Layout><ContentGallery /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
