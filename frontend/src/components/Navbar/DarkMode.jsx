import React from "react";
import LightButton from "../../assets/website/light-mode-button.png";
import DarkButton from "../../assets/website/dark-mode-button.png";

const DarkMode = () => {
    const [theme, setTheme] = React.useState(
        localStorage.getItem("theme") || "light"
    );

    // Access the HTML root element
    const element = document.documentElement;

    // Set theme in local storage and update the root element classes
    React.useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            element.classList.add("dark");
            element.classList.remove("light");
        } else {
            element.classList.remove("dark");
            element.classList.add("light");
        }
    }, [theme]); // Dependency added to re-run when `theme` changes

    // Toggle theme between light and dark
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
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
            />
            <img
                onClick={toggleTheme}
                src={DarkButton}
                alt="Dark Mode"
                className={`w-12 cursor-pointer ${
                    theme === "dark" ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
            />
        </div>
    );
};

export default DarkMode;
