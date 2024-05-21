"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import { HomePage } from "@/configs/pages/home";

export default function CardItem ({ title, author, date, abstract, link, thumbImage }) {
    return (
        <Card sx={{ display: "flex", marginBottom: "0.5em" }}>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography className="h-9 text-ellipsis overflow-hidden" component="div" variant="h5">
                        {title}
                    </Typography>
                    <Typography className="h-7 text-ellipsis overflow-hidden" variant="subtitle1" color="text.secondary" component="div">
                        <DriveFileRenameOutlineIcon className="text-sm" /> {author}
                    </Typography>
                    <Typography className="h-7 text-ellipsis overflow-hidden" variant="subtitle1" color="text.secondary" component="div">
                        <CalendarMonthIcon className="text-sm" /> {date}
                    </Typography>
                    <Typography className="text-ellipsis overflow-hidden" variant="body2" color="text.secondary" component="div" sx={{ height: HomePage.listArea.listItem.abstractHeight }}>
                        {abstract}
                    </Typography>
                </CardContent>
                <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                    <CardActions>
                        <Button size="medium" href={link} className="pr-5">
                            {HomePage.listArea.listItem.readMoreText}
                        </Button>
                    </CardActions>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ minWidth: HomePage.listArea.listItem.thumbSize, width: HomePage.listArea.listItem.thumbSize, objectFit: "cover", padding: "8px", borderRadius: "16px" }}
                image={thumbImage}
            />
        </Card>
    );
}
