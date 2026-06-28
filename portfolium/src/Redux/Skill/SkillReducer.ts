interface SkillState {
  name: string;
  icon: string;
  category: string;
  level: string;
  editingId: string | null;
}

interface ChangeSkillInputAction {
  type: "CHANGE_SKILL_INPUT";
  payload: {
    name: keyof SkillState;
    value: string;
  };
}

interface SetEditingSkillAction {
  type: "SET_EDITING_SKILL";
  payload: {
    _id: string;
    name: string;
    icon?: string;
    category?: string;
    level?: string;
  };
}

interface ClearSkillFormAction {
  type: "CLEAR_SKILL_FORM";
}

type SkillAction =
  | ChangeSkillInputAction
  | SetEditingSkillAction
  | ClearSkillFormAction;

const initialState: SkillState = {
  name: "",
  icon: "",
  category: "Frontend",
  level: "",
  editingId: null,
};

export const skillReducer = (
  state: SkillState = initialState,
  action: SkillAction
): SkillState => {
  switch (action.type) {
    case "CHANGE_SKILL_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "SET_EDITING_SKILL":
      return {
        name: action.payload.name,
        icon: action.payload.icon || "",
        category: action.payload.category || "Frontend",
        level: action.payload.level || "",
        editingId: action.payload._id,
      };

    case "CLEAR_SKILL_FORM":
      return initialState;

    default:
      return state;
  }
};