import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import { changeSkillInput, setEditingSkill, clearSkillForm } from "../Redux/Skill/SkillAction";
import Skeleton from "@mui/material/Skeleton";
import ProjectSkeletonCard from "../Components/ProjectsSkeletonCards";

const API_URL = "https://portfolium-backend.onrender.com/skill";

interface Skill {
  _id: string;
  name: string;
  icon: string;
  category: string;
  level: number;
}

interface SkillFormState {
  name: string;
  icon: string;
  category: string;
  level: string | number;
  editingId: string | null;
}

interface RootState {
  skillForm: SkillFormState;
}

interface SkillPayload {
  name: string;
  icon: string;
  category: string;
  level: number;
}

const Skills: React.FC = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { name, icon, category, level, editingId } = useSelector(
    (state: RootState) => state.skillForm
  );

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

  const saveSkillMutation = useMutation<Skill, Error, SkillPayload>({
    mutationFn: async (skillData: SkillPayload) => {
      if (editingId) {
        return (await axios.put<Skill>(`${API_URL}/${editingId}`, skillData)).data;
      } else {
        return (await axios.post<Skill>(API_URL, skillData)).data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      dispatch(clearSkillForm());
    },
  });

  const deleteSkillMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    dispatch(changeSkillInput(name, value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!name || !level)
      return alert(t("skills.alert", "Nomi va darajasini kiriting!"));
    saveSkillMutation.mutate({
      name,
      icon: icon || "💻",
      category,
      level: Number(level),
    });
  };

  const renderIcon = (iconName: string): React.ReactNode => {
    if (!iconName) return <span className="text-lg">💻</span>;

    if (iconName.includes("fa-")) {
      return <i className={`${iconName} text-xl text-slate-800 dark:text-slate-200`} />;
    }

    if (iconName.startsWith("Si")) {
      const IconComponent = (SiIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
      if (IconComponent)
        return <IconComponent className="text-xl text-slate-800 dark:text-slate-200" />;
    }

    if (iconName.startsWith("Fa")) {
      const IconComponent = (FaIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
      if (IconComponent)
        return <IconComponent className="text-xl text-slate-800 dark:text-slate-200" />;
    }

    return <span className="text-lg">{iconName}</span>;
  };

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

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-mono">
        Error: {(error as Error).message}
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 flex flex-col items-center gap-12 transition-colors duration-300">
      <div className="max-w-xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm mt-6">
        <h2 className="text-2xl font-light tracking-tight mb-6 text-center text-slate-800 dark:text-slate-100">
          {editingId
            ? t("skills.editTitle", "Ko'nikmani yangilash")
            : t("skills.addTitle", "Yangi ko'nikma indeksi")}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              name="icon"
              placeholder="✨ Icon (FaReact / fa-brands fa-html5)"
              value={icon}
              onChange={handleInputChange}
              className="col-span-1 border border-slate-200 dark:border-slate-800 rounded-lg p-3 outline-none text-sm bg-transparent focus:border-yellow-500 dark:focus:border-yellow-400 text-center transition"
            />
            <input
              type="text"
              name="name"
              placeholder="Skill Name"
              value={name}
              onChange={handleInputChange}
              className="col-span-2 border border-slate-200 dark:border-slate-800 rounded-lg p-3 outline-none text-sm bg-transparent focus:border-yellow-500 dark:focus:border-yellow-400 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="category"
              value={category}
              onChange={handleInputChange}
              className="w-full border border-slate-200 dark:border-slate-800 rounded-lg p-3 outline-none text-sm bg-white dark:bg-slate-900 focus:border-yellow-500 dark:focus:border-yellow-400 transition text-slate-600 dark:text-slate-300"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Mobile">Mobile</option>
              <option value="Design">Design</option>
            </select>

            <input
              type="number"
              name="level"
              placeholder="Proficiency (0-100)"
              value={level}
              onChange={handleInputChange}
              className="w-full border border-slate-200 dark:border-slate-800 rounded-lg p-3 outline-none text-sm bg-transparent focus:border-yellow-500 dark:focus:border-yellow-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={saveSkillMutation.isPending}
            className="w-full mt-2 bg-slate-900 dark:bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 text-white dark:text-slate-950 p-3 rounded-lg font-medium text-sm hover:bg-slate-800 dark:hover:bg-yellow-500 transition shadow-sm active:scale-[0.99] hover:cursor-pointer"
          >
            {saveSkillMutation.isPending
              ? "..."
              : editingId
              ? t("skills.btnUpdate", "Ko'nikmani saqlash")
              : t("skills.btnSave", "Commit Skill")}
          </button>
        </form>
      </div>

      <div className="max-w-6xl w-full flex flex-col gap-6">
        <h1 className="text-3xl font-light tracking-tight text-center sm:text-left border-b border-slate-200 dark:border-slate-900 pb-4">
          {t("skills.headline", "Texnologik stack ko'rsatkichlari")}
        </h1>

        <div className="grid grid-cols-3 gap-3">
          {skills.map((skill: Skill) => (
            <div
              key={skill._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between gap-5 hover:shadow-sm transition duration-200"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
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
                      className="bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-3 mt-1">
                <button
                  onClick={() => dispatch(setEditingSkill(skill))}
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline hover:cursor-pointer"
                >
                  {t("skills.edit", "Edit")}
                </button>
                <span className="text-slate-200 dark:text-slate-800 text-xs">|</span>
                <button
                  onClick={() =>
                    window.confirm(t("skills.confirm", "O'chirilsinmi?")) &&
                    deleteSkillMutation.mutate(skill._id)
                  }
                  className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline hover:cursor-pointer"
                >
                  {t("skills.delete", "Delete")}
                </button>
              </div>
            </div>
          ))}
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