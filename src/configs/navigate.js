"use client";

import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import ArchiveIcon from "@mui/icons-material/Archive";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ApiIcon from "@mui/icons-material/Api";

export const Navigate = {
    appBar: {
        displayWebTitle: true,
        titlePrefix: '',
        titleSuffix: " - BLOP",
        pendingTitle: "加载中...",
        enableSearchBox: false,
        searchBox: {
            placeHolder: "搜索博客...",
            searchRedirectUrl: null,
            searchUrlParamKey: null
        }
    },
    drawer: {
        width: 139,
        initShowState: 1,
        navigateList: [
            { icon: <HomeIcon />, text: "主页", route: "/" },
            { icon: <BookIcon />, text: "博客", route: "/blogs" },
            // { icon: <ArchiveIcon />, text: "归档", route: "/archive" },
            // { icon: <AccessTimeIcon />, text: "事件", route: "/events" },
            // { icon: <PetsIcon />, text: "友链", route: "/links" },
            // { icon: <AccountCircleIcon />, text: "关于", route: "/about" },
            // { icon: <ApiIcon />, text: "服务", route: "/services" }
        ]
    },
    blogs: {
        blogNavigateRoute: "/blogs",
        blogPageParamKey: "b"
    },
    error: {
        errorNavigateRoute: "/error"
    }
};
