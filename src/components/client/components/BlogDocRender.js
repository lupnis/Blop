/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

/** installed modules import  */
import * as React from "react";
import { useEffect, useState } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

/** components import */
import { getFileContent } from "@/components/server/functions/githubFetching";
import { parseBlogElements } from "@/components/client/functions/blogs";
import MarkdownRenderer from "@/components/client/components/MarkdownRenderer";

/** configs import */
import { Fetching } from "@/configs/fetching";
import { BlogsPage } from "@/configs/pages/blogs";

/** installed styles import */
//

/** local styles import */
//

export default function BlogDocRender({ path }) {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [doc, setDoc] = useState({});

    useEffect(() => {
        setLoading(true);
        setDoc({});
        getFileContent(
            Fetching.common.githubRootUrl,
            Fetching.common.accountName,
            Fetching.common.repositoryName,
            Fetching.pinsList.branch,
            path
        ).then((resp) => {
            console.log(resp);
            const elements = parseBlogElements(resp, true);
            console.log(elements);
            if (elements.tags) {
                elements.tags = elements.tags.slice(0, BlogsPage.docItem.maxTagsShown);
            }
            setDoc(elements);
            setLoading(false);
        });
    }, [path]);

    return (
        <>
            {
                loading ?
                    <Backdrop
                        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
                        open
                    >
                        <Stack direction="column" spacing={1}>
                            <span className="text-center"><CircularProgress color="inherit" /></span>
                            <h2>{BlogsPage.docItem.loadingContent}</h2>
                        </Stack>
                    </Backdrop>
                    : (
                        <>
                            <title>{doc.title}</title>
                            <img src={doc.banner || BlogsPage.tabBackgroundImage} className="banner-image"></img>
                            <div className="doc-banner-content">
                                <div className="banner-element">
                                    <div className="text-center">
                                        <h1 style={{ color: "#fff", fontSize: "32pt", marginTop: "5.5rem", marginBottom: "1rem" }}>
                                            {doc.title || BlogsPage.listItem.placeHolder.title}
                                        </h1>
                                        <Stack direction="column" spacing={1}>
                                            <Stack direction="row" spacing={1} className="justify-center">
                                                <a href={doc.profile}>
                                                    <Chip
                                                        label={`${BlogsPage.docItem.prefixes.author}${doc.author || BlogsPage.listItem.placeHolder.author}`}
                                                        icon={BlogsPage.docItem.prefixes.authorIcon}
                                                        sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.2), color: theme.palette.primary.contrastText }}
                                                    />
                                                </a>
                                                <Chip
                                                    label={`${BlogsPage.docItem.prefixes.date}${doc.date || BlogsPage.listItem.placeHolder.date}`}
                                                    icon={BlogsPage.docItem.prefixes.dateIcon}
                                                    sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.2), color: theme.palette.primary.contrastText }}
                                                />
                                            </Stack>
                                            <Stack direction="row" spacing={1} className="justify-center" sx={{ height: "32px" }}>
                                                {(doc.tags && doc.tags.length > 0) && doc.tags.map((item, index) => {
                                                    return (
                                                        <Chip
                                                            key={index}
                                                            label={item}
                                                            sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.2), color: theme.palette.primary.contrastText }}
                                                        />
                                                    );
                                                })}
                                            </Stack>
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-list-container">
                                <div className="blog-list-list">
                                    <MarkdownRenderer document={doc._body} />
                                </div>
                            </div>
                        </>
                    )}
        </>
    );
}