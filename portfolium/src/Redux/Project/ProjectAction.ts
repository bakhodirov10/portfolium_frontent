interface Project {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  github?: string;
  demo?: string;
  technologies?: string;
}

export const changeProjectInput = (
  name: string,
  value: string
) => ({
  type: "CHANGE_PROJECT_INPUT" as const,
  payload: { name, value },
});

export const setEditingProject = (
  project: Project
) => ({
  type: "SET_EDITING_PROJECT" as const,
  payload: project,
});

export const clearProjectForm = () => ({
  type: "CLEAR_PROJECT_FORM" as const,
});