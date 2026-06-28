
import i18n from "i18next";

import { initReactI18next } from "react-i18next";
import en from "./locals/en/translation.json"
import uz from "./locals/uz/translation.json";
import ru from "./locals/ru/translation.json";


i18n.use(initReactI18next).init({

  resources: {
    en: { translation: en },
    uz: { translation: uz },
    ru: { translation: ru }
  },

  lng: localStorage.getItem("language") || "ru",
  fallbackLng: "ru",
});


export default i18n;
