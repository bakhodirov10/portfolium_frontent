interface DarkState {
  isDarkMode: boolean;
}

export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE" as const;

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});

export type DarkAction = ReturnType<typeof toggleDarkMode>;

const getSavedDarkMode = (): boolean => {
  try {
    const saved = localStorage.getItem("isDarkMode");
    return saved !== null ? JSON.parse(saved) : false;
  } catch {
    return false;
  }
};

const initialState: DarkState = {
  isDarkMode: getSavedDarkMode(),
};

export const darkReducer = (
  state: DarkState = initialState,
  action: DarkAction
): DarkState => {
  switch (action.type) {
    case TOGGLE_DARK_MODE: {
      const newValue = !state.isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(newValue));
      return {
        ...state,
        isDarkMode: newValue,
      };
    }
    default:
      return state;
  }
};