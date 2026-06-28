import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-10 ">
      <div className="max-w-6xl mx-auto px-4 flex flex-row md:flex-row justify-between items-start gap-10">
        <div className="flex flex-col text-center md:text-left gap-2">
          <Link
            to="/"
            className="font-medium text-transparent bg-clip-text bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 text-3xl"
          >
            Portfolio
          </Link>

          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
            {t(
              "footer.description",
              "Dasturchi va muhandisning shaxsiy portfoliom loyihasi. Mening barcha ko'nikmalarim va ishlarim shu yerda jamlangan.",
            )}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col text-center gap-2 ">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
            {t("footer.linksTitle", "Navigatsiya")}
          </h3>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-yellow-400 transition">
              {t("navbar.home", "Home")}
            </Link>

            <Link to="/about" className="hover:text-yellow-400 transition">
              {t("navbar.about", "About")}
            </Link>

            <Link to="/skills" className="hover:text-yellow-400 transition">
              {t("navbar.skills", "Skills")}
            </Link>

            <Link to="/projects" className="hover:text-yellow-400 transition">
              {t("navbar.projects", "Projects")}
            </Link>

            <Link to="/contact" className="hover:text-yellow-400 transition">
              {t("navbar.contact", "Contact")}
            </Link>
          </div>
        </div>

        {/* Social links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
            {t("footer.socialTitle", "Ijtimoiy tarmoqlar")}
          </h3>

          <div className="flex justify-center md:justify-start gap-4  text-xl">
            <a
              href="https://github.com/bakhodirov10"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-yellow-400 transition"
            >
              <FaGithub className="w-6 h-6" />
            </a>

            <a
              href="https://telegram/@bakhod1rov10"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-yellow-400 transition"
            >
              <FaTelegram className="w-6 h-6" />
            </a>

            <a
              href="https://instagram.com/boxodirov10_"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-yellow-400 transition"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
