import React, { useState, useEffect } from "react";

const bgColors = [
  { label: "Black", value: "black" },
  { label: "Slate", value: "slate-800" },
  { label: "White", value: "white" },
  { label: "Gray", value: "gray-200" },
  { label: "Blue", value: "blue-900" },
];

const textColors = [
  { label: "White", value: "white" },
  { label: "Black", value: "black" },
  { label: "Slate", value: "slate-100" },
  { label: "Red", value: "red-500" },
  { label: "Emerald", value: "emerald-400" },
];

const ChangeTheme = () => {
  const [theme, setTheme] = useState("dark");
  const [bgColor, setBgColor] = useState("black");
  const [textColor, setTextColor] = useState("white");

  // Load theme and color preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const savedBg = localStorage.getItem("bgColor") || "black";
    const savedText = localStorage.getItem("textColor") || "white";
    setTheme(savedTheme);
    setBgColor(savedBg);
    setTextColor(savedText);
  }, []);

  // Update document class and localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    localStorage.setItem("bgColor", bgColor);
    localStorage.setItem("textColor", textColor);
  }, [theme, bgColor, textColor]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-${bgColor} text-${textColor} flex flex-col items-center justify-center px-4`}>
      <h1 className="text-3xl font-bold mb-8">Customize Theme</h1>

      <div className="space-y-8 w-full max-w-md">
        {/* Theme Toggle */}
        <div className="text-center">
          <p className="mb-3 font-medium">Current Mode: <span className="capitalize font-semibold">{theme}</span></p>
          <button
            onClick={toggleTheme}
            className="px-6 py-2 bg-white text-black dark:bg-black dark:text-white border border-current rounded hover:opacity-80 transition"
          >
            Toggle Light / Dark
          </button>
        </div>

        {/* Background Selector */}
        <div>
          <label className="block mb-2 font-semibold">Background Color:</label>
          <div className="grid grid-cols-2 gap-3">
            {bgColors.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setBgColor(value)}
                className={`p-2 rounded text-sm font-medium border transition ${
                  bgColor === value ? "border-white" : "border-gray-500"
                } bg-${value} text-${value === "white" ? "black" : "white"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Selector */}
        <div>
          <label className="block mb-2 font-semibold">Text Color:</label>
          <div className="grid grid-cols-2 gap-3">
            {textColors.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setTextColor(value)}
                className={`p-2 rounded text-sm font-medium border transition ${
                  textColor === value ? "border-white" : "border-gray-500"
                } bg-${value === "white" ? "black" : "white"} text-${value}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeTheme;
