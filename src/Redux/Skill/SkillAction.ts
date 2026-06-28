interface Skill {
  _id: string;
  name: string;
  icon?: string;
  category?: string;
  level?: string;
}

export const changeSkillInput = (
  name: string,
  value: string
) => ({
  type: "CHANGE_SKILL_INPUT" as const,
  payload: { name, value },
});

export const setEditingSkill = (
  skill: Skill
) => ({
  type: "SET_EDITING_SKILL" as const,
  payload: skill,
});

export const clearSkillForm = () => ({
  type: "CLEAR_SKILL_FORM" as const,
});