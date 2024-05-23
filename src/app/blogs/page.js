"use client";

import * as React from "react";

import ScrollTop from "@/components/client/components/ScrollTop";
import BlogListRender from "@/components/client/components/BlogListRender";
import BlogDocRender from "@/components/client/components/BlogDocRender";

import { BlogsPage } from "@/configs/pages/blogs";
import { Navigate } from "@/configs/navigate";

import "@/assets/css/blogs.css"

export default function BlogPageRender(props) {
    const blogPath = props.searchParams[Navigate.blogs.blogPageParamKey];
    if (!blogPath) {
        return (
            <main className="max-w-full">
                <ScrollTop sticked="drawer-box" />
                <title>{BlogsPage.tabTitle}</title>
                <BlogListRender />
            </main>
        );
    }
    return (
        <main className="max-w-full">
            <ScrollTop sticked="drawer-box" />
            <title>{BlogsPage.specificTitle}</title>
            <BlogDocRender path={blogPath} />
        </main>
    );
}
