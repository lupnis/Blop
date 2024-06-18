"use client";

import { Link } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import ArchiveIcon from "@mui/icons-material/Archive";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ApiIcon from "@mui/icons-material/Api";

import TelegramIcon from "@mui/icons-material/Telegram";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import EmailIcon from "@mui/icons-material/Email";



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
        initShowState: 0,
        navigateList: [
            { icon: <HomeIcon />, text: "主页", route: "/" },
            { icon: <BookIcon />, text: "博客", route: "/blogs" },
            // { icon: <ArchiveIcon />, text: "归档", route: "/archive" },
            // { icon: <AccessTimeIcon />, text: "事件", route: "/events" },
            { icon: <PetsIcon />, text: "友链", route: "/links" },
            // { icon: <AccountCircleIcon />, text: "关于", route: "/about" },
            // { icon: <ApiIcon />, text: "服务", route: "/services" }
        ]
    },
    footer: {
        footerNavigateText: "快捷导航",
        navigateList: [
            { text: "主页", route: "/" },
            { text: "博客", route: "/blogs" },
            // { text: "归档", route: "/archive" },
            // { text: "事件", route: "/events" },
            { text: "友链", route: "/links" },
            // { text: "关于", route: "/about" },
            // { text: "服务", route: "/services" }
        ],
        footerSocialText: "社交账号",
        social: [
            { icon: <TelegramIcon />, href: '' },
            { icon: <XIcon />, href: '' },
            { icon: <GitHubIcon />, href: '' },
            { icon: <EmailIcon />, href: '' }
        ],
        footerToolsText: "小工具",
        tools: [

        ],
        lisenceContent: (
            <>
                本页面内容，除特别声明外，均采用
                <Link
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans"
                    color="inherit"
                    className="px-1"
                >
                    CC BY-NC-SA 4.0 Deed
                </Link>
                协议授权。
            </>
        ),
        copyrightContent: "© 2024 Lupnis. All rights reserved.",
    },
    blogs: {
        blogNavigateRoute: "/blogs",
        blogPageParamKey: "b"
    },
    error: {
        errorNavigateRoute: "/error"
    }
};
