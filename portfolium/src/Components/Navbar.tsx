import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { isDarkMode } = useSelector((state) => state.darkMode);

  const navLinks = [
    { name: t('navbar.home', 'Home'), path: '/' },
    { name: t('navbar.about', 'About'), path: '/about' },
    { name: t('navbar.skills', 'Skills'), path: '/skills' },
    { name: t('navbar.projects', 'Projects'), path: '/projects' },
    { name: t('navbar.projects_details', 'Projects Details'), path: '/proDetails' },
    { name: t('navbar.contact', 'Contact'), path: '/contact' },
  ];

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-gray-100 dark:bg-slate-800 text-black dark:text-white border-b border-gray-200 dark:border-slate-700 transition-colors duration-300 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        
        <Link to="/" className="font-medium text-transparent bg-clip-text bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 bg-300% animate-gradient text-3xl">
          Portfolio
        </Link>

        <div className="flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium text-sm transition-colors duration-200 ${
                  isActive 
                    ? 'text-yellow-400 font-semibold' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-yellow-400 dark:hover:text-yellow-400'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          
          <div className="flex bg-gray-200 dark:bg-slate-700 rounded-lg p-0.5 text-xs font-semibold">
            <button
              onClick={() => changeLanguage('ru')}
              className={`px-2 py-1 rounded-md transition hover:cursor-pointer ${
                i18n.language === 'ru' ? 'bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 text-black' : 'text-gray-500 dark:text-gray-300'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-2 py-1 rounded-md transition hover:cursor-pointer ${
                i18n.language === 'en' ? 'bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 text-black' : 'text-gray-500 dark:text-gray-300'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('uz')}
              className={`px-2 py-1 rounded-md transition hover:cursor-pointer ${
                i18n.language === 'uz' ? 'bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 text-black' : 'text-gray-500 dark:text-gray-300'
              }`}
            >
              UZ
            </button>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-lg hover:cursor-pointer transition-transform active:scale-95"
            title="Theme Toggle"
          >
            {isDarkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;