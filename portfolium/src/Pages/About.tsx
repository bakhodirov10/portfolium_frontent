import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Abdulloh from "../assets/Abdulloh.png";

const About: React.FC = () => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 flex items-center justify-center transition-colors duration-300">
      <div className="max-w-5xl w-full flex justify-around gap-29 items-center ">
        
        <div className="md:col-span-5 flex flex-col gap-6 items-center md:items-stretch">
          
          <div
            className="w-full max-w-[320px]  mx-auto overflow-hidden rounded-[50%] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-sm"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              className="w-full h-auto object-contain rounded-[50%]"
              src={Abdulloh}
              alt="Bakhodirov Abdulloh"
              style={{
                display: 'block',
                transition: 'transform 0.5s ease',
                transform: hovered ? 'scale(1.03)' : 'scale(1)',
              }}
            />
          </div>
          
          <div className="w-full max-w-[320px] mx-auto md:max-w-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h1 className="text-2xl font-light tracking-tight mb-2 text-center md:text-left">
              {t("navbar.about", "Men haqimda")}
            </h1>
            <div className="w-12 h-1 bg-yellow-500 dark:bg-yellow-400 rounded mx-auto md:mx-0"></div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-4 text-center md:text-left">
              Bakhodirov Abdulloh / Frontend Developer
            </p>
          </div>
        </div>

        <div className="md:col-span-7 w-[60%] h-full">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm h-full flex flex-col justify-between gap-6">
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-base text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                {t("about.description", "Ismim Abdulloh Baxodirov. Yoshim 15 da, 168-maktabning 9-sinfini tamomladim. Najot Ta'lim markazida 6 oylik 'Web-Praktikum' kursida tahsil olganman. Hozirda Redux, React Query va Tailwind CSS texnologiyalaridan foydalangan holda veb-ilovalar va portfolioda ko'rsatilgan loyihalarni yaratish bilan shug'ullanaman.")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/60">
              <div className="flex flex-col p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-800/40">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Ta'lim markazi</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">Najot Ta'lim (6 oy)</span>
              </div>

              <div className="flex flex-col p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-800/40">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Maktab / Sinf</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">168-maktab, 9-sinf</span>
              </div>

              <div className="flex flex-col p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-800/40">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Yosh</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">15 yosh</span>
              </div>

              <div className="flex flex-col p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-800/40">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Asosiy Stack</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">React, Redux, Tailwind, MongoDB, React Query, Typescript, Javascript, </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;