"use client";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fab from "@mui/material/Fab";

export default function ScrollTop ({sticked, window}) {
    const theme = useTheme();
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            `#${sticked}`,
        );
        if (anchor) {
            anchor.scrollIntoView({
                block: "start",
                behavior: "smooth"
            });
        }

    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: "fixed", bottom: 16, right: 16, visibility: sticked ? "visible" : "hidden" }}
            >
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </Box>
        </Fade>
    );
}
