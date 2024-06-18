"use client";

import { useState } from "react";
import { ThemeProvider } from "@emotion/react";

import FlexDrawer from "@/components/client/components/FlexDrawer";
import Footer from "@/components/client/components/FlexFooter";

import { Theming } from "@/configs/theming";

import "@/assets/css/global.css";

export default function RootLayout({ children }) {
    const [themeItem, setThemeItem] = useState(Theming.themes[Theming.defaultThemeIndex]);
    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width" initial-scale="1.00" maximum-scale="1.0" />
            </head>
            <body>
                <ThemeProvider theme={themeItem}>
                    <FlexDrawer>
                        {children}
                    </FlexDrawer>
                </ThemeProvider>
                <footer>
                    <ThemeProvider theme={themeItem}>
                        <Footer />
                    </ThemeProvider>
                </footer>
            </body>
        </html>
    );
}
