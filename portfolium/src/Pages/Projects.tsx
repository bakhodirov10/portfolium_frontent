import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ProjectSkeletonCard from "../Components/ProjectsSkeletonCards";
import {
  changeProjectInput,
  setEditingProject,
  clearProjectForm,
} from "../Redux/Project/ProjectAction";
import Skeleton from "@mui/material/Skeleton";

const API_URL = "https://portfolium-backend.onrender.com/project";

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string | string[];
  duration: string;
  difficultyLevel: "Beginner" | "Intermediate" | "Advanced";
}

interface ProjectFormState {
  title: string;
  description: string;
  techStack: string;
  duration: string;
  difficultyLevel: "Beginner" | "Intermediate" | "Advanced";
  editingId: string | null;
}

interface RootState {
  projectForm: ProjectFormState;
}

interface ProjectPayload {
  title: string;
  description: string;
  techStack: string;
  duration: string;
  difficultyLevel: string;
}

const Projects: React.FC = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { title, description, techStack, duration, difficultyLevel, editingId } =
    useSelector((state: RootState) => state.projectForm);

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get<Project[]>(API_URL);
      return res.data;
    },
  });

  const saveProjectMutation = useMutation<Project, Error, ProjectPayload>({
    mutationFn: async (projectData: ProjectPayload) => {
      if (editingId) {
        return (await axios.put<Project>(`${API_URL}/${editingId}`, projectData)).data;
      } else {
        return (await axios.post<Project>(API_URL, projectData)).data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      dispatch(clearProjectForm());
    },
  });

  const deleteProjectMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    dispatch(changeProjectInput(name, value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!title || !description) return alert(t("skills.alert", "Sarlavha va tavsifni kiriting!"));

    saveProjectMutation.mutate({
      title,
      description,
      techStack,
      duration,
      difficultyLevel,
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

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-mono">
        {t("skillsCom.error", "Xatolik")}: {(error as Error).message}
      </div>
    );

  if (isLoading)
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center">
        <div className="max-w-6xl w-full flex flex-col gap-6 mt-6">
          <Skeleton variant="text" width={200} sx={{ fontSize: "1.8rem" }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectSkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 flex flex-col items-center gap-12 transition-colors duration-300">
      {/* Form qismi */}
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm mt-6">
        <h2 className="text-2xl font-light tracking-tight mb-6 text-center">
          {editingId
            ? t("projects.editTitle", "Loyihani tahrirlash")
            : t("projects.addTitle", "Yangi loyiha qo'shish")}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder={t("contact.name", "Project Title")}
            value={title}
            onChange={handleInputChange}
            className="w-full border border-slate-200 dark:border-slate-800 rounded-lg p-3 outline-none text-sm bg-transparent focus:border-yellow-500 dark:focus:border-yellow-400 transition"
          />

          <textarea
            name="description"
            placeholder={t("contact.message", "Project Description")}
            value={description}
            onChange={handleInputChange}
            rows={3}
            className="w-full border border-slate-200 dark:border-slate-800 rounded-lg p-3 outline-none text-sm bg-transparent focus:border-yellow-500 dark:focus:border-yellow-400 transition resize-none"
          />

          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack (e.g., React, Node.js, MongoDB)"
            value={techStack}
            onChange={handleInputChange}
            className="w-full border border-slate-200 dark:border-slate-800 rounded-lg p-3 outline-none text-sm bg-transparent focus:border-yellow-500 dark:focus:border-yellow-400 transition"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g., 2 weeks)"
              value={duration}
              onChange={handleInputChange}
              className="w-full border border-slate-200 dark:border-slate-800 rounded-lg p-3 outline-none text-sm bg-transparent focus:border-yellow-500 dark:focus:border-yellow-400 transition"
            />

            <select
              name="difficultyLevel"
              value={difficultyLevel}
              onChange={handleInputChange}
              className="w-full border border-slate-200 dark:border-slate-800 rounded-lg p-3 outline-none text-sm bg-white dark:bg-slate-900 focus:border-yellow-500 dark:focus:border-yellow-400 transition"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={saveProjectMutation.isPending}
            className="w-full mt-2 bg-slate-900 bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 text-white dark:text-slate-950 p-3 rounded-lg font-medium text-sm hover:bg-slate-800 dark:hover:bg-yellow-500 transition shadow-sm active:scale-[0.99] hover:cursor-pointer"
          >
            {saveProjectMutation.isPending
              ? t("contact.sending", "Processing...")
              : editingId
                ? t("skills.btnUpdate", "Update Project")
                : t("skills.btnSave", "Deploy Project")}
          </button>
        </form>
      </div>

      {/* Loyihalar ro'yxati qismi */}
      <div className="max-w-6xl w-full flex flex-col gap-6">
        <h1 className="text-3xl font-light tracking-tight text-center sm:text-left border-b border-slate-200 dark:border-slate-900 pb-4">
          {t("projects.headline", "Loyihalar")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: Project) => (
            <div
              key={project._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between gap-5 hover:shadow-md transition duration-200"
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-xl font-medium tracking-tight text-slate-900 dark:text-slate-50">
                    {t(`projectsData.${project._id}.title`, { defaultValue: project.title })}
                  </h3>
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
                    {project.difficultyLevel}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed line-clamp-3">
                  {t(`projectsData.${project._id}.description`, { defaultValue: project.description })}
                </p>

                {project.techStack && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {renderTechStack(project.techStack)}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-auto">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  {t(`projectsData.${project._id}.duration`, { defaultValue: project.duration || "N/A" })}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch(setEditingProject(project))}
                    className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline hover:cursor-pointer"
                  >
                    {t("skills.edit", "Edit")}
                  </button>
                  <span className="text-slate-300 dark:text-slate-800">|</span>
                  <button
                    onClick={() =>
                      window.confirm(t("skills.confirm", "O'chirilsinmi?")) &&
                      deleteProjectMutation.mutate(project._id)
                    }
                    className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline hover:cursor-pointer"
                  >
                    {t("skills.delete", "Delete")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-light text-sm">
            {t("skillsCom.empty", "Hech qanday ko'nikma ma'lumotlar bazasiga kiritilmagan.")}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;