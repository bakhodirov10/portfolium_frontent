import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:3344/skill";

interface Skill {
  _id: string;
  name: string;
  icon: string;
  category: string;
  level: number;
  createdAt: string;
  updatedAt: string;
}

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Skills: React.FC = () => {
  const { t } = useTranslation();

  const {
    data: skills = [],
    isLoading,
    error,
  } = useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await axios.get<Skill[]>(API_URL);
      return res.data;
    },
  });

  const renderIcon = (iconName: string): React.ReactNode => {
    if (!iconName) return <span className="text-lg">💻</span>;

    if (iconName.startsWith("Si")) {
      const IconComponent = (
        SiIcons as Record<string, React.ComponentType<{ className?: string }>>
      )[iconName];
      if (IconComponent)
        return <IconComponent className="text-xl text-slate-800 dark:text-slate-200" />;
    }

    if (iconName.startsWith("Fa")) {
      const IconComponent = (
        FaIcons as Record<string, React.ComponentType<{ className?: string }>>
      )[iconName];
      if (IconComponent)
        return <IconComponent className="text-xl text-slate-800 dark:text-slate-200" />;
    }

    return <span className="text-lg">{iconName}</span>;
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-slate-500 font-mono">
        Loading telemetry...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-mono">
        Error: {(error as Error).message}
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 flex flex-col items-center gap-12 transition-colors duration-300">
      <div className="max-w-6xl w-full flex flex-col gap-6 mt-6">

        <h1 className="text-3xl font-light tracking-tight text-center sm:text-left border-b border-slate-200 dark:border-slate-900 pb-4">
          {t("skills.headline", "Texnologik stack ko'rsatkichlari")}
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {skills.map((skill: Skill) => {
            const isUpdated = skill.updatedAt !== skill.createdAt;

            return (
              <div
                key={skill._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between gap-5 hover:shadow-sm transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center">
                    {renderIcon(skill.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-slate-900 dark:text-slate-50">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span>{t("skills.proficiency", "Tajriba drayvi")}:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className=" bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 border-t border-slate-100 dark:border-slate-800/80 pt-3 text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  <div className="flex justify-between">
                    <span>Yaratildi:</span>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                      {formatDate(skill.createdAt)}
                    </span>
                  </div>
                  {isUpdated && (
                    <div className="flex justify-between  text-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 dark:text-amber-400/80">
                      <span>O'zgartirildi:</span>
                      <span>{formatDate(skill.updatedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-light text-sm">
            Hech qanday ko'nikma ma'lumotlar bazasiga kiritilmagan.
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;