import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import RoleDetails from './pages/RoleDetails/RoleDetails';
import NotFound from './pages/NotFound/NotFound';
import About from './components/About/About';
import DemandedRoles from './components/DemandedRoles/DemandedRoles';
import Services from './components/Services/Services';
import ServiceDetails from './pages/ServiceDetails/ServiceDetails';
import Contact from './components/Contact/Contact';
import ITRoles from './pages/ITRoles/ITRoles';
import NonITRoles from './pages/NonITRoles/NonITRoles';
import Blog from './pages/Blog/Blog';
import Loader from './components/Loader/Loader';

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  return (
    <>
      {isAppLoading && (
        <Loader onComplete={() => setIsAppLoading(false)} duration={4800} />
      )}
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="roles/:slug" element={<RoleDetails />} />
            <Route path="about" element={<div className="page-spacer"><About /></div>} />
            <Route path="demand" element={<div className="page-spacer"><DemandedRoles /></div>} />
            <Route path="service" element={<div className="page-spacer"><Services /></div>} />
            <Route path="services/:slug" element={<ServiceDetails />} />
            <Route path="contact" element={<div className="page-spacer"><Contact /></div>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/it-roles" element={<div className="page-spacer"><ITRoles /></div>} />
            <Route path="/non-it-roles" element={<div className="page-spacer"><NonITRoles /></div>} /> 
            <Route path="/blog" element={<div className="page-spacer"><Blog /></div>} /> 
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;