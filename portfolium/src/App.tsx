import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Skills from './Pages/Skills';
import Projects from './Pages/Projects';
import Project_Details from './Pages/Project_Details.tsx'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import ScrollToTop from './Components/ScrollToTop.tsx';

interface DarkModeState {
  isDarkMode: boolean;
}

type RootState = {
  darkMode: DarkModeState | boolean;
};

const App: React.FC = () => {
  const darkModeState = useSelector((state: RootState) => state.darkMode);

  const isDarkMode: boolean =
    darkModeState && typeof darkModeState === 'object'
      ? (darkModeState as DarkModeState).isDarkMode
      : (darkModeState as boolean);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/proDetails" element={<Project_Details />} />
      </Routes>
      
      <Footer />
    </div>
  );
};

export default App;