"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";

import { LinksPage } from "@/configs/pages/links";

export default function LinkItem({ title, owner, date, descriptions, link, avatar }) {
    const theme = useTheme();
    return (
        <Card className="bg-transparent" sx={{ display: "flex", marginBottom: "0.5em", position: "relative" }}>
            <div className="link-card-img bg-transparent" style={{ backgroundImage: `url(${avatar})`, backgroundColor: theme.palette.text }}></div>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography className="h-9 text-ellipsis overflow-hidden w-full" component="div" variant="h5">
                        {title}
                    </Typography>
                    <Typography className="h-7 text-ellipsis overflow-hidden" variant="subtitle1" color="text.secondary" component="div">
                        {owner}
                    </Typography>
                    <Typography className="h-7 text-ellipsis overflow-hidden" variant="subtitle1" color="text.secondary" component="div">
                        {date}
                    </Typography>
                    <Typography className="text-ellipsis overflow-hidden" variant="body2" color="text.secondary" component="div" sx={{ height: LinksPage.listItem.descriptionsHeight }}>
                        {descriptions}
                    </Typography>
                </CardContent>
                <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                    <CardActions>
                        <Button size="medium" href={link} className="pr-5">
                            {LinksPage.listItem.jumpText}
                        </Button>
                    </CardActions>
                </Box>
            </Box>
        </Card>
    );
}
