/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

import CardItem from "@/components/client/components/CardItem";
import {
    fetchDocsAutoSelect,
    transformDocList,
    buildInvertedIndex,
    searchDocs
} from "@/components/client/functions/blogs";

import { BlogsPage } from "@/configs/pages/blogs";
import { Fetching } from "@/configs/fetching";
import { Navigate } from "@/configs/navigate";

export default function BlogListRender(props) {
    const theme = useTheme();

    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState({
        totalPages: 1,
        currentPage: 1,
        totalItems: 0,
        pages: [],
        docs: [],
        invertedIndex: {}
    });

    const [searchContent, setSearchContent] = useState('');

    const handleSearchBoxKeyDown = (e) => {
        if (e.key === "Enter") { handleSearchAction(); }
    };

    const handleSearchAction = (e) => {
        setLoading(true);
        setStatistics((prev) => ({
            ...prev,
            totalPages: 1,
            currentPage: 1,
            totalItems: 0,
            pages: []
        }));

        let pages = [];
        let total = 0;
        if (searchContent.length) {
            const ret = searchDocs(searchContent, statistics.invertedIndex);
            ret.forEach((doc) => {
                if (total % Fetching.docsList.maxShownPerPage == 0) {
                    pages.push([]);
                }
                pages[pages.length - 1].push(statistics.docs[doc.id]);
                total++;
            });

        } else {
            for (let i = 0; i < statistics.docs.length; ++i) {
                if (i % Fetching.docsList.maxShownPerPage == 0) {
                    pages.push([]);
                }
                pages[pages.length - 1].push(statistics.docs[i]);
            }
            total = statistics.docs.length;
        }
        setStatistics((prev) => ({
            ...prev,
            totalPages: pages.length,
            currentPage: 1,
            totalItems: total,
            pages: pages
        }));
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        setStatistics({
            totalPages: 1,
            currentPage: 1,
            totalItems: 0,
            pages: [],
            docs: [],
            invertedIndex: {}
        });

        fetchDocsAutoSelect((v) => {
            setStatistics((prev) => {
                let pagesData = prev.pages;
                if (prev.totalItems % Fetching.docsList.maxShownPerPage == 0) {
                    pagesData.push([]);
                }
                pagesData[pagesData.length - 1].push(v);
                return {
                    ...prev,
                    totalItems: prev.totalItems + 1,
                    docs: [...prev.docs, v],
                    pages: pagesData,
                    totalPages: pagesData.length
                };
            });
        }).then((l) => {
            const docs = transformDocList(l);
            const iIndexes = buildInvertedIndex(docs);
            setStatistics((prev) => {
                return {
                    ...prev,
                    invertedIndex: iIndexes
                };
            });
            setLoading(false);
        })
    }, []);

    return (
        <>
            <img src={BlogsPage.tabBackgroundImage} className="banner-image"></img>
            <div className="banner-content">
                <div className="banner-element">
                    {BlogsPage.showContent && BlogsPage.content}
                </div>
            </div>
            <div className="blog-list-container">
                <div className="blog-list-list">
                    <Card className="py-1">
                        <CardActions className="flex">
                            <TextField
                                disabled={loading}
                                placeholder={BlogsPage.searchInputPlaceHolder}
                                variant="outlined"
                                className="grow"
                                onChange={(e) => { setSearchContent(e.target.value); }}
                                onKeyDown={(e) => { handleSearchBoxKeyDown(e); }}
                            />
                            <Box className="flex items-center">
                                <Box sx={{ position: "relative" }}>
                                    <Button
                                        className="py-4"
                                        disabled={loading}
                                        sx={{ color: theme.palette.text.secondary }}
                                        onClick={handleSearchAction}
                                    >
                                        <SearchIcon />
                                    </Button>
                                    {loading && (
                                        <CircularProgress size="2rem"
                                            sx={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                marginTop: "-1rem",
                                                marginLeft: "-1rem",
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </CardActions>
                    </Card>
                    <div className="mt-5">
                        {
                            (!loading && !statistics.totalItems) &&
                            <h1 className="w-full text-center">
                                {BlogsPage.noResultsPlaceHolder}
                            </h1>
                        }
                        {
                            (statistics.pages.length > 0) && (statistics.pages[statistics.currentPage - 1].map((content, id) => {
                                return (
                                    <CardItem
                                        key={id}
                                        title={content.title || BlogsPage.listItem.placeHolder.title}
                                        author={content.author || BlogsPage.listItem.placeHolder.author}
                                        date={content.date || BlogsPage.listItem.placeHolder.date}
                                        abstract={content.abstract || BlogsPage.listItem.placeHolder.abstract}
                                        link={content.link || Navigate.error.errorNavigateRoute}
                                        thumbImage={content.thumb || BlogsPage.listItem.placeHolder.thumb}
                                    />
                                );
                            }))
                        }
                        {
                            loading &&
                            <Grid container wrap="nowrap" sx={{ padding: "1rem 1rem 1rem 0" }}>
                                <Grid item xs="9" sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                    <CardContent sx={{ flex: "1 0 auto" }}>
                                        <Typography className="h-8 text-ellipsis overflow-hidden" component="div" variant="h5">
                                            <Skeleton />
                                        </Typography>
                                        <Typography className="h-6 text-ellipsis overflow-hidden" variant="subtitle1" color="text.secondary" component="div">
                                            <Skeleton sx={{ width: "16rem" }} />
                                        </Typography>
                                        <Typography className="h-6 text-ellipsis overflow-hidden" variant="subtitle1" color="text.secondary" component="div">
                                            <Skeleton sx={{ width: "8rem" }} />
                                        </Typography>
                                        <Typography className="text-ellipsis overflow-hidden" variant="body2" color="text.secondary" component="div" sx={{ height: BlogsPage.listItem.abstractHeight }}>
                                            <Skeleton sx={{ height: "100%" }} />
                                        </Typography>
                                    </CardContent>
                                </Grid>
                                <Grid item xs="3">
                                    <Skeleton sx={{ height: "93%" }} animation="wave" variant="rectangular" />
                                </Grid>
                            </Grid>
                        }

                        <Stack direction="row" className="flex w-full-center justify-end items-center mt-5">
                            {BlogsPage.resultsPrefix}{statistics.totalItems}{BlogsPage.resultsSuffix}
                            <Pagination
                                size="large"
                                siblingCount={BlogsPage.paginationSiblings}
                                boundaryCount={BlogsPage.paginationBoundary}
                                shape="rounded"
                                count={statistics.totalPages}
                                page={statistics.currentPage}
                                showFirstButton
                                showLastButton
                                disabled={loading || !statistics.totalItems}
                                onChange={(e, v) => { setStatistics({ ...statistics, currentPage: v }) }}
                            />
                        </Stack>
                    </div>
                </div>
            </div>
        </>
    );
}
