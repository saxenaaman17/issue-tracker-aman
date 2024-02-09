"use client";
import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Skeleton } from "./components/index";

const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  useEffect(() => setIsComponentMounted(true), []);

  if (!isComponentMounted) {
    return <Skeleton width="2rem" />;
  }

  return (
    <>
      {resolvedTheme === "dark" && (
        <FiSun
          onClick={() => setTheme("light")}
          className="hover:cursor-pointer"
        />
      )}
      {resolvedTheme === "light" && (
        <FiMoon
          onClick={() => setTheme("dark")}
          className="hover:cursor-pointer"
        />
      )}
    </>
  );
};

export default ThemeSwitch;
