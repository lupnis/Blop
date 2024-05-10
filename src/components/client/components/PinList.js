"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

import PinCardItem from "@/components/client/components/PinCardItem";
import { fetchPinAutoSelect } from "@/components/client/functions/pins";

import { Navigate } from "@/configs/navigate";
import { HomePage } from "@/configs/pages/home";

export default function PinList() {
    const [loading, setLoading] = useState(true);

    const [pinList, setPinList] = useState([])

    useEffect(() => {
        fetchPinAutoSelect((doc) => {
            setPinList((prev) => { return [...prev, doc] });
        }).then(() => {
            setLoading(false);
        })
    }, []);

    return (
        <>
            <h1 className="w-full text-center"> {HomePage.listArea.listTitle} </h1>
            {
                (!loading && !pinList.length) ?
                    HomePage.listArea.placeHolder
                    :
                    ''
            }
            {
                pinList.map((content, id) => {
                    return (
                        <PinCardItem
                            key={id}
                            title={content.title || HomePage.listArea.listItem.placeHolder.title}
                            author={content.author || HomePage.listArea.listItem.placeHolder.author}
                            date={content.date || HomePage.listArea.listItem.placeHolder.date}
                            abstract={content.abstract || HomePage.listArea.listItem.placeHolder.abstract}
                            link={content.link || Navigate.error.errorNavigateRoute}
                            thumbImage={content.thumb || HomePage.listArea.listItem.placeHolder.thumb}
                        />
                    );
                })
            }
            {
                loading ?
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
                                <Typography className="text-ellipsis overflow-hidden" variant="body2" color="text.secondary" component="div" sx={{ height: HomePage.listArea.listItem.abstractHeight }}>
                                    <Skeleton sx={{ height: "100%" }} />
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs="3">
                            <Skeleton sx={{ height: "93%" }} animation="wave" variant="rectangular" />
                        </Grid>
                    </Grid>
                    :
                    ''
            }
        </>);
}
