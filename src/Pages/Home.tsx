import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Project_Details from './Project_Details';
import SkillComponent from '../Components/SkillComponent';
import Contact from './Contact';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 transition-colors duration-300">

      <div className="max-w-4xl w-full flex flex-col items-center text-center gap-8">
          <Link to="/about" className='font-medium text-transparent bg-clip-text bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 bg-300% animate-gradient text-[40px]'><h1>Portfolio</h1></Link>
        <h1 className="text-4xl sm:text-7xl font-light tracking-tight leading-none">
          {t('home.greeting', 'Engineering Modern')}{' '}
          <span className="font-medium text-transparent bg-clip-text bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 bg-300% animate-gradient">
            Web Experiences
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-light leading-relaxed">
          {t(
            'home.description',
            'Fokuslangan va yuqori samaradorlikka ega interfeyslar arxitekturasi. Redux, React Query va Tailwind CSS texnologiyalari ekotizimida murakkab loyihalarni sodda va mukammal yechimlar holatiga keltirishga ixtisoslashganman.'
          )}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto mt-2">
          <Link
            to="/projects"
            className="bg-linear-to-r dark:bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 text-white dark:text-slate-950 font-medium px-8 py-3.5 rounded-lg hover:bg-slate-800 dark:hover:bg-yellow-500 transition-all duration-200 shadow-sm text-sm active:scale-[0.98] hover:cursor-pointer"
          >
            {t('home.viewProjects', "Portfolioni ko'rish")}
          </Link>

          <Link
            to="/contact"
            className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-medium px-8 py-3.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 text-sm active:scale-[0.98] hover:cursor-pointer"
          >
            {t('home.contactMe', "Bog'lanish")}
          </Link>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-6 sm:gap-16 mt-20 max-w-3xl w-full border-t border-slate-200 dark:border-slate-900 pt-10">

        <div className="flex flex-col items-center sm:items-start">
          <span className="text-2xl sm:text-4xl font-mono font-medium text-slate-900 dark:text-slate-100">
            +02
          </span>
          <span className="text-xs tracking-wider uppercase text-slate-400 dark:text-slate-500 mt-1 font-light">
            {t('home.experience', 'Yillik amaliyot')}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-4xl font-mono font-medium text-slate-900 dark:text-slate-100">
            20+
          </span>
          <span className="text-xs tracking-wider uppercase text-slate-400 dark:text-slate-500 mt-1 font-light">
            {t('home.completedProjects', 'Yakunlangan loyihalar')}
          </span>
        </div>

        <div className="flex flex-col items-center sm:items-end">
          <span className="text-2xl sm:text-4xl font-mono font-medium text-slate-900 dark:text-slate-100">
            99%
          </span>
          <span className="text-xs tracking-wider uppercase text-slate-400 dark:text-slate-500 mt-1 font-light">
            {t('home.skillsCount', 'Kod sifati')}
          </span>
        </div>

      </div>
          <div className='mt-20 '>
            <Project_Details />
            <SkillComponent />
            <Contact />
          </div>
    </div>
  );
};

export default Home;