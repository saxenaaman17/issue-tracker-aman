"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import React, { PropsWithChildren } from "react";

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="light">
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
