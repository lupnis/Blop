"use client";

export const BlogsPage = {
    tabTitle: "博客",
    showContent: true,
    content: (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "#fff", fontSize: "32pt" }}>
                博客搜索
            </h1>
        </div>
    ),
    searchInputPlaceHolder: '搜索博客...',
    paginationSiblings: 1,
    paginationBoundary: 2,
    resultsPrefix: "共 ",
    resultsSuffix: " 个结果",
    noResultsPlaceHolder: "无检索结果",
    listItem: {
        abstractHeight: "80px",
        thumbSize: "256px",
        readMoreText: "阅读更多...",
        placeHolder: {
            title: "<无标题>",
            author: "<无作者信息>",
            date: "<无日期信息>",
            abstract: '<无摘要信息>',
            thumb: "https://www.svgrepo.com/show/429915/not-found-error-alert.svg"
        }
    }
};
