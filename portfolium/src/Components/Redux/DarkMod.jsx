import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../Redux/DarkMod/darkAction"
import { Sun, Moon } from "lucide-react";

const DarkMod = () => {
  const dispatch = useDispatch();
 const { isDarkMode } = useSelector((state) => state.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 font-medium bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 text-slate-200 active:scale-95 shadow-md shadow-black/10"
      title={isDarkMode ? "Light Mode" : "Dark Mode"}
    >
      {isDarkMode ? (
        <>
          <Sun size={20} className="text-amber-400 animate-spin-slow" />
          <span className="text-sm md:hidden lg:inline">Light</span>
        </>
      ) : (
        <>
          <Moon size={20} className="text-indigo-400" />
          <span className="text-sm md:hidden lg:inline">Dark</span>
        </>
      )}

      
    </button>

    
  );
};

export default DarkMod;