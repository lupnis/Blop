"use client";

import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import LinkItem from "@/components/client/components/LinkItem";
import ScrollTop from "@/components/client/components/ScrollTop";
import {
    fetchLinksAutoSelect,
    transformLinksList,
    buildInvertedIndex,
    searchLinks
} from "@/components/client/functions/links";

import { LinksPage } from "@/configs/pages/links";
import { Fetching } from "@/configs/fetching";
import { Navigate } from "@/configs/navigate";

import "@/assets/css/links.css";

export default function LinksPageRender(props) {
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
            const ret = searchLinks(searchContent, statistics.invertedIndex);
            ret.forEach((doc) => {
                if (total % Fetching.linksList.maxShownPerPage == 0) {
                    pages.push([]);
                }
                pages[pages.length - 1].push(statistics.docs[doc.id]);
                total++;
            });

        } else {
            for (let i = 0; i < statistics.docs.length; ++i) {
                if (i % Fetching.linksList.maxShownPerPage == 0) {
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
        fetchLinksAutoSelect((v => {
            setStatistics((prev) => {
                let pagesData = prev.pages;
                if (prev.totalItems % Fetching.linksList.maxShownPerPage == 0) {
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
        })).then((l) => {
            const docs = transformLinksList(l);
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
        <main className="max-w-full">
            <title>{LinksPage.title}</title>
            <ScrollTop sticked="drawer-box" />
            <img src={LinksPage.backgroundImage} className="banner-image"></img>
            <div className="banner-content">
                <div className="banner-element">
                    {LinksPage.showHeaderContent && LinksPage.content}
                </div>
            </div>
            <div className="link-list-container">
                <div className="link-list-list">
                    <Card className="py-1">
                        <CardActions className="flex">
                            <TextField
                                disabled={loading}
                                placeholder={LinksPage.searchInputPlaceHolder}
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
                    <div className="mt-5 flex" style={{ flexDirection: "column", width: "100%" }}>
                        {
                            (!loading && !statistics.totalItems) &&
                            <h1 className="w-full text-center">
                                {LinksPage.noResultsPlaceHolder}
                            </h1>
                        }
                        <Grid container xs="12" className="flex justify-center" sx={{ padding: "1rem 1rem 1rem 0" }}>
                            {
                                (statistics.pages.length > 0) && (statistics.pages[statistics.currentPage - 1].map((content, id) => {
                                    return (
                                        <Grid item xs="6" className="link-card-item" key={id}>
                                            <LinkItem
                                                title={content.title || LinksPage.listItem.placeHolder.title}
                                                owner={content.owner || LinksPage.listItem.placeHolder.owner}
                                                date={content.date || LinksPage.listItem.placeHolder.date}
                                                descriptions={content.descriptions || LinksPage.listItem.placeHolder.descriptions}
                                                link={content.link || Navigate.error.errorNavigateRoute}
                                                avatar={content.avatar || LinksPage.listItem.placeHolder.avatar}
                                            />
                                        </Grid>
                                    );
                                }))
                            }
                        </Grid>
                        <Stack direction="row" className="flex w-full-center justify-end items-center mt-5">
                            {LinksPage.resultsPrefix}{statistics.totalItems}{LinksPage.resultsSuffix}
                            <Pagination
                                size="large"
                                siblingCount={LinksPage.paginationSiblings}
                                boundaryCount={LinksPage.paginationBoundary}
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
        </main>
    );
}
