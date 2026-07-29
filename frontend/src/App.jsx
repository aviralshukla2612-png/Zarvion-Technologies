import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import RoleDetails from './pages/RoleDetails/RoleDetails';
import NotFound from './pages/NotFound/NotFound';
import About from './components/About/About';
import DemandedRoles from './components/DemandedRoles/DemandedRoles';
import Services from './components/Services/Services';
import ServiceDetails from './pages/ServiceDetails/ServiceDetails';
import GetStarted from './pages/GetStarted/GetStarted';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="roles/:slug" element={<RoleDetails />} />
          <Route path="about" element={<About />} />
          <Route path="demand" element={<DemandedRoles />} />
          <Route path="service" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetails />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;