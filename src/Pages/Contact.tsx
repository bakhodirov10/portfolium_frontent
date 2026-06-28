import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";


const API_URL = "http://localhost:3344/message";

interface FormState {
  name: string;
  email: string;
  text: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  text?: string;
}

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState<FormState>({ name: "", email: "", text: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = t("contact.need");
    if (!form.email.trim()) {
      newErrors.email = t("contact.need");
    }
    if (!form.text.trim()) newErrors.text = t("contact.need");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await axios.post(API_URL, form);
      setSuccessMsg(t("conact.success"));
      setForm({ name: "", email: "", text: "" });
    } catch (err) {
      setErrorMsg(t("contact.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="max-w-xl w-full flex flex-col gap-8">

        <div className="text-center flex flex-col gap-2">
          <h1 className="text-4xl font-light tracking-tight">
            {t("contact.title")}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
            {t("contact.subtitle", "Xabaringizni qoldiring, tez orada javob beraman.")}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
                {t("contact.name")}
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Abdulloh Boxodirov"
                className={`w-full border rounded-lg p-3 outline-none text-sm bg-transparent transition
                  ${errors.name
                    ? "border-red-400 dark:border-red-500 focus:border-red-400"
                    : "border-slate-200 dark:border-slate-800 focus:border-yellow-500 dark:focus:border-yellow-400"
                  }`}
              />
              {errors.name && (
                <span className="text-xs text-red-500 font-mono">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
                {t("contact.email")}
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className={`w-full border rounded-lg p-3 outline-none text-sm bg-transparent transition
                  ${errors.email
                    ? "border-red-400 dark:border-red-500 focus:border-red-400"
                    : "border-slate-200 dark:border-slate-800 focus:border-yellow-500 dark:focus:border-yellow-400"
                  }`}
              />
              {errors.email && (
                <span className="text-xs text-red-500 font-mono">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
                {t("contact.message")}
              </label>
              <textarea
                name="text"
                value={form.text}
                onChange={handleChange}
                placeholder="Xabaringizni yozing..."
                rows={5}
                className={`w-full border rounded-lg p-3 outline-none text-sm bg-transparent transition resize-none
                  ${errors.text
                    ? "border-red-400 dark:border-red-500 focus:border-red-400"
                    : "border-slate-200 dark:border-slate-800 focus:border-yellow-500 dark:focus:border-yellow-400"
                  }`}
              />
              {errors.text && (
                <span className="text-xs text-red-500 font-mono">{errors.text}</span>
              )}
            </div>

            {successMsg && (
              <div className="text-sm text-green-600 dark:text-green-400 font-mono bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3">
                ✓ {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="text-sm text-red-600 dark:text-red-400 font-mono bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
                ✕ {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-1 bg-linear-to-r dark:bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 text-white dark:text-slate-950 p-3 rounded-lg font-medium text-sm hover:bg-slate-800 dark:hover:bg-yellow-500 transition shadow-sm active:scale-[0.99] hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading
                ? t("contact.sending")
                : t("contact.send")}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;