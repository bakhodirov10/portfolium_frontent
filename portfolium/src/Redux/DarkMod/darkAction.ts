export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE" as const;

export const toggleDarkMode = () => {
  return {
    type: TOGGLE_DARK_MODE,
  };
};

export type DarkAction = ReturnType<typeof toggleDarkMode>;