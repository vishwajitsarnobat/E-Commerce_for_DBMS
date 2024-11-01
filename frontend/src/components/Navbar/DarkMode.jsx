import React from "react";
import LightButton from "../../assets/website/light-mode-button.png";
import DarkButton from "../../assets/website/dark-mode-button.png";

const DarkMode = () => {
    const [theme, setTheme] = React.useState(
        localStorage.getItem("theme") || "light"
    );

    // Function to update the theme in local storage and on the root element
    const updateTheme = (newTheme) => {
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        document.documentElement.classList.toggle("light", newTheme === "light");
    };

    // Update theme on component mount and when it changes
    React.useEffect(() => {
        updateTheme(theme);
    }, [theme]);

    // Toggle theme between light and dark
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <div className="relative">
            <img
                onClick={toggleTheme}
                src={LightButton}
                alt="Light Mode"
                className={`w-12 cursor-pointer absolute right-0 z-10 ${
                    theme === "dark" ? "opacity-0" : "opacity-100"
                } transition-opacity duration-300`}
                aria-pressed={theme === "light"}
            />
            <img
                onClick={toggleTheme}
                src={DarkButton}
                alt="Dark Mode"
                className={`w-12 cursor-pointer ${
                    theme === "dark" ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
                aria-pressed={theme === "dark"}
            />
        </div>
    );
};

export default DarkMode;
