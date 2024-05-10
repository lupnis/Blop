"use client";

/** installed modules import  */
import * as React from "react";
import { useState, useEffect } from "react"

/** components import */
import ScrollTop from "@/components/client/components/ScrollTop";
import BlogListRender from "@/components/client/components/BlogListRender";

/** configs import */
import { BlogsPage } from "@/configs/pages/blogs";
import { Navigate } from "@/configs/navigate";

/** installed styles import */
//

/** local styles import */
import "@/assets/css/blogs.css"

export default function BlogPageRender(props) {
    const blogPath = props.searchParams[Navigate.blogs.blogPageParamKey];
    if (!blogPath) {
        // todo: render list and search page
        // page title = default
        return (
            <main className="max-w-full">
                <ScrollTop sticked="drawer-box" />
                <title>{BlogsPage.tabTitle}</title>
                <BlogListRender />
            </main>
        );
    }
    // else todo: render blog article

    return (
        <main className="max-w-full">
            <ScrollTop sticked="drawer-box" />
            <title>%blog title%</title>
            specific blog
        </main>
    ); 
}