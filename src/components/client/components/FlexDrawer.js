"use client";

import * as React from "react";
import { useState, useEffect } from "react"
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import InputBase from "@mui/material/InputBase";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

import { Navigate } from "@/configs/navigate";

const openedMixin = (theme) => ({
    width: Navigate.drawer.width,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden",
});

const hiddenMixin = (theme) => ({
    width: `calc(${theme.spacing(7)} + 1px)`,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",

    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    },
    backgroundColor: alpha(theme.palette.background.default, 0.5)
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflow: "hidden",
    width: 0,
    opacity: 0
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== "showState" })(({ theme, showState }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(showState === 2 && {
        marginLeft: Navigate.drawer.width,
        width: `calc(100% - ${Navigate.drawer.width}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "showState" })(({ theme, showState }) => ({
    width: Navigate.drawer.width,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(showState === 2 && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme)
    }),
    ...(showState === 1 && {
        ...hiddenMixin(theme),
        "& .MuiDrawer-paper": hiddenMixin(theme)
    }),
    ...(showState === 0 && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme)
    })
})
);

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: theme.spacing(2),
    width: "100%",
    maxWidth: `calc(100vw - ${theme.spacing(10)})`,
    [theme.breakpoints.up("sm")]: {
        width: "auto"
    }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 0, 0, 1),
    height: "100%",
    position: "absolute",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    }
}));

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function FlexDrawer({ children }) {
    const theme = useTheme();

    const [showState, setShowState] = React.useState(Navigate.drawer.initShowState);
    const handlerDrawerIconClick = () => {
        if (showState === 2) { setShowState(0); } else { setShowState(2); }
    };
    const handlerDrawerMinimize = () => {
        setShowState(1);
    };

    const [drawerTitle, setDrawerTitle] = useState(Navigate.appBar.pendingTitle);
    useEffect(() => {
        if (typeof document === "object") {
            setDrawerTitle(`${Navigate.appBar.titlePrefix}${(Navigate.appBar.displayWebTitle ? document.title : '')}${Navigate.appBar.titleSuffix}`);
        } else {
            setDrawerTitle(Navigate.appBar.pendingTitle);
        }
    }, []);

    const [searchValue, setSearchValue] = useState('');
    const handleSearchRedirect = () => {
        if (
            Navigate.appBar.enableSearchBox &&
            Navigate.appBar.searchBox.searchRedirectUrl &&
            Navigate.appBar.searchBox.searchUrlParamKey !== "null" &&
            searchValue.length) {
            let encodedSearchValue = encodeURI(searchValue);
            let redirectUrl = `${Navigate.appBar.searchBox.searchRedirectUrl}?${Navigate.appBar.searchBox.searchUrlParamKey}=${encodedSearchValue}`;
            window.open(redirectUrl);
        }
    };
    const handleSearchBoxKeyDown = (e) => {
        if (e.key === "Enter" && searchValue.length) { handleSearchRedirect(); }
    };

    return (
        <Box sx={{ display: "flex" }} id="drawer-box">
            <CssBaseline />
            <HideOnScroll>
                <AppBar showState={showState}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="open drawer" onClick={handlerDrawerIconClick} edge="start">
                            {showState === 2 ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                textAlign: "center",
                                display: { xs: "none", sm: "block" }
                            }}
                        >
                            {drawerTitle}
                        </Typography>
                        {(Navigate.appBar.enableSearchBox) ? <Search>
                            <SearchIconWrapper onClick={handleSearchRedirect}><SearchIcon /></SearchIconWrapper>
                            <StyledInputBase
                                placeholder={Navigate.appBar.searchBox.placeHolder}
                                inputProps={{ "aria-label": "search" }}
                                onKeyDown={handleSearchBoxKeyDown}
                                onChange={(e) => { setSearchValue(e.target.value) }}
                            />
                        </Search> : ''}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Drawer variant="permanent" showState={showState}>
                <DrawerHeader sx={{ opacity: showState === 2 ? 1 : 0 }}>
                    <IconButton onClick={handlerDrawerMinimize}>
                        {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{ opacity: showState === 2 ? 1 : 0 }} />
                <List>
                    {Navigate.drawer.navigateList.map((content, index) => (
                        <ListItem key={content.route} disablePadding>
                            <ListItemButton
                                href={content.route}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: showState == 2 ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: showState === 2 ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {content.icon}
                                </ListItemIcon>
                                <ListItemText primary={content.text} sx={{ opacity: showState === 2 ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1 }} onClick={(e) => { if (showState === 2) { setShowState(0) } }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
