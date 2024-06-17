"use client";

export const LinksPage = {
    title: "友链",
    backgroundImage: "https://picsum.photos/1024/768",
    showHeaderContent: true,
    content: (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "#fff", fontSize: "32pt" }}>
                友链
            </h1>
        </div>
    ),
    searchInputPlaceHolder: "友链搜索...",
    paginationSiblings: 1,
    paginationBoundary: 2,
    resultsPrefix: "共 ",
    resultsSuffix: " 个结果",
    noResultsPlaceHolder: "暂时还没有友链👉🥺👈",
    listItem: {
        descriptionsHeight: "80px",
        avatarSize: "15rem",
        jumpText: "跳转 >",
        placeHolder: {
            title: "<无名称>",
            owner: "<无所有者信息>",
            date: "<无日期信息>",
            descriptions: "<无描述信息>",
            avatar: "https://www.svgrepo.com/show/429915/not-found-error-alert.svg"
        }
    }
};
