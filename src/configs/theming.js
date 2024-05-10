"use client";

import { createTheme } from "@mui/material/styles";

export const Theming = {
    themes: [
        createTheme({
            palette: {
                mode: "light",
                primary: {
                    main: "#003C75"
                }
            }
        }),
        createTheme({
            palette: {
                mode: "dark",
                primary: {
                    main: "#1976d2"
                }
            }
        })
    ],
    defaultThemeIndex: 0
};
