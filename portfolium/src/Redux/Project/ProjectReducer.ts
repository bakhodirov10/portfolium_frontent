interface ProjectState {
  title: string;
  description: string;
  techStack: string;
  duration: string;
  difficultyLevel: string;
  editingId: string | null;
}

interface ChangeProjectInputAction {
  type: "CHANGE_PROJECT_INPUT";
  payload: {
    name: keyof ProjectState;
    value: string;
  };
}

interface SetEditingProjectAction {
  type: "SET_EDITING_PROJECT";
  payload: {
    _id: string;
    title: string;
    description: string;
    techStack: string;
    duration?: string;
    difficultyLevel?: string;
  };
}

interface ClearProjectFormAction {
  type: "CLEAR_PROJECT_FORM";
}

type ProjectAction =
  | ChangeProjectInputAction
  | SetEditingProjectAction
  | ClearProjectFormAction;

const initialState: ProjectState = {
  title: "",
  description: "",
  techStack: "",
  duration: "",
  difficultyLevel: "Intermediate",
  editingId: null,
};

export const projectReducer = (
  state: ProjectState = initialState,
  action: ProjectAction
): ProjectState => {
  switch (action.type) {
    case "CHANGE_PROJECT_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "SET_EDITING_PROJECT":
      return {
        title: action.payload.title,
        description: action.payload.description,
        techStack: action.payload.techStack,
        duration: action.payload.duration || "",
        difficultyLevel:
          action.payload.difficultyLevel || "Intermediate",
        editingId: action.payload._id,
      };

    case "CLEAR_PROJECT_FORM":
      return initialState;

    default:
      return state;
  }
};