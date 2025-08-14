import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import Layout from './components/Layout';
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ServicesManager from './components/admin/ServicesManager';
import TeamManager from './components/admin/TestimonialsManager';
import TestimonialsManager from './components/admin/TestimonialsManagerNew';
import FAQManager from './components/admin/FAQManager';
import Vision2030Manager from './components/admin/Vision2030Manager';
import ContentManager from './components/admin/ContentManager';
import ProjectManager from './components/admin/ProjectManager';
import ClientsManager from './components/admin/ClientsManager';
import PackagesManager from './components/admin/PackagesManager';



// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

import Leadership from './pages/Leadership';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Vision2030 from './pages/Vision2030';
import CustomQuote from './pages/CustomQuote';
import ProjectRequestsManager from './components/admin/ProjectRequestsManager';

// Admin Route Guard
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAdmin();
  return isAuthenticated ? <>{children}</> : <AdminLogin />;
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AdminProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path="projects" element={<Projects />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                
                <Route path="leadership" element={<Leadership />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="vision2030" element={<Vision2030 />} />
                <Route path="quote" element={<CustomQuote />} />
              </Route>
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="content" element={<ContentManager />} />
                <Route path="projects" element={<ProjectManager />} />
                <Route path="services" element={<ServicesManager />} />
                <Route path="packages" element={<PackagesManager />} />
                <Route path="team" element={<TeamManager />} />
                <Route path="testimonials" element={<TestimonialsManager />} />
                <Route path="faq" element={<FAQManager />} />
                <Route path="vision2030" element={<Vision2030Manager />} />
                <Route path="clients" element={<ClientsManager />} />
                <Route path="settings" element={<div>Settings</div>} />
                <Route path="quote-requests" element={<ProjectRequestsManager />} />
              </Route>


            </Routes>
          </Router>
        </AdminProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;