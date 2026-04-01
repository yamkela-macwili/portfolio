import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import LoginPage from './pages/admin/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectEditor from './pages/admin/ProjectEditor';
import PostEditor from './pages/admin/PostEditor';
import EducationEditor from './pages/admin/EducationEditor';
import CertificationEditor from './pages/admin/CertificationEditor';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-white/20 selection:text-white">
          <ScrollProgress />
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/projects/new" element={<ProjectEditor />} />
              <Route path="/admin/projects/:slug" element={<ProjectEditor />} />
              <Route path="/admin/posts/new" element={<PostEditor />} />
              <Route path="/admin/posts/:slug" element={<PostEditor />} />
              <Route path="/admin/education/new" element={<EducationEditor />} />
              <Route path="/admin/education/:id" element={<EducationEditor />} />
              <Route path="/admin/certifications/new" element={<CertificationEditor />} />
              <Route path="/admin/certifications/:id" element={<CertificationEditor />} />
            </Route>
          </Routes>
          <Footer />
          <Chatbot />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
