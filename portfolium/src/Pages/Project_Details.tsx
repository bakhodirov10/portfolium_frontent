import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";

const API_URL = "http://localhost:3344/project";

interface ProjectDetails {
  _id: string;
  title: string;
  description: string;
  techStack: string | string[];
  duration: string;
  difficultyLevel: "Beginner" | "Intermediate" | "Advanced";
  createdAt: string;
  updatedAt: string;
}

const Project_Details: React.FC = () => {
  const { t } = useTranslation();

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery<ProjectDetails[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get<ProjectDetails[]>(API_URL);
      return res.data;
    },
  });

  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("uz-UZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderTechStack = (stack: string | string[]): React.ReactNode => {
    const items = Array.isArray(stack)
      ? stack
      : stack.split(",").map((s) => s.trim());

    return items.map((tech) => (
      <span
        key={tech}
        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50"
      >
        {tech}
      </span>
    ));
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-slate-500 font-mono">
        Loading assets...
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
          {t("projects.headline", "Loyihalar Arxivi va Tafsilotlari")}
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {projects.map((project: ProjectDetails) => {
            const isUpdated = project.createdAt !== project.updatedAt;

            return (
              <div
                key={project._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between gap-5 hover:shadow-md transition duration-200"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xl font-medium tracking-tight text-slate-900 dark:text-slate-50">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
                      {project.difficultyLevel}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed line-clamp-4">
                    {project.description}
                  </p>

                  {project.techStack && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {renderTechStack(project.techStack)}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1 border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-auto text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  <div className="flex justify-between">
                    <span>Davomiyligi:</span>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{project.duration || "N/A"}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Yaratildi:</span>
                    <span>{formatDate(project.createdAt)}</span>
                  </div>
                  {isUpdated && (
                    <div className="flex justify-between text-amber-600 dark:text-amber-400/80">
                      <span>O'zgartirildi:</span>
                      <span>{formatDate(project.updatedAt)}</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-light text-sm">
            Hozircha hech qanday tizimli loyiha yaratilmagan.
          </div>
        )}
      </div>
    </div>
  );
};

export default Project_Details;