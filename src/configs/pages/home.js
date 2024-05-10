"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const HomePage = {
    tabTitle: "主页",
    showSplashArea: true,
    splashArea: {
        backgroundImage: "https://picsum.photos/1024/768",
        showContent: true,
        content: (
            <div style={{ textAlign: "center" }}>
                <h1 style={{ color: "#fff", fontSize: "32pt" }}>
                    Hello World!
                </h1>
                <h2 style={{ color: "#fff" }}>
                    This is the description of splash 🙂
                </h2>
            </div>
        ),
        showExpander: true,
        expander: <ExpandMoreIcon sx={{ fontSize: "32pt", color: "#fff" }} />
    },
    showListArea: true,
    listArea: {
        listTitle: "推荐博客",
        listItem: {
            abstractHeight: "80px",
            thumbSize: "256px",
            readMoreText: "阅读更多...",
            placeHolder: {
                title: "<无标题>",
                author: "<无作者信息>",
                date: "<无日期信息>",
                abstract: '',
                thumb: "https://www.svgrepo.com/show/429915/not-found-error-alert.svg"
            }
        },
        placeHolder: <h2 className="w-full text-center">没有推荐QAQ</h2>
    }
};
