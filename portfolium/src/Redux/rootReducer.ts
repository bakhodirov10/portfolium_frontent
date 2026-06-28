import { combineReducers } from "redux";
import { darkReducer } from "./DarkMod/darkReducer";
import { skillReducer } from "./Skill/SkillReducer";
import { projectReducer } from "./Project/ProjectReducer";

export const rootReducer = combineReducers({
  darkMode: darkReducer,
  skillForm: skillReducer,
  projectForm: projectReducer,
});

export type RootState = ReturnType<typeof rootReducer>;