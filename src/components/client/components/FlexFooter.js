"use client";

import * as React from "react";
import { Box, Grid, Link, Typography, Container, IconButton } from "@mui/material";
import { useTheme } from "@mui/material";

import { Navigate } from "@/configs/navigate";

export default function FlexFooter() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background,
        py: 3,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" gutterBottom>
              {Navigate.footer.footerNavigateText}
            </Typography>
            {
              Navigate.footer.navigateList.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.route || Navigate.error.errorNavigateRoute}
                    color="inherit"
                    display="block"
                  >
                    {item.text}
                  </Link>
                );
              })}
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography sx={{ marginLeft: 1 }} variant="h6" gutterBottom>
              {Navigate.footer.footerToolsText}
            </Typography>
            {
              Navigate.footer.tools.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.href || Navigate.error.errorNavigateRoute}
                    color="inherit"
                    display="block"
                  >
                    {item.text}
                  </Link>
                );
              })
            }
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography sx={{ marginLeft: 1 }} variant="h6" gutterBottom>
              {Navigate.footer.footerSocialText}
            </Typography>
            {
              Navigate.footer.social.map((item, index) => {
                return (
                  <IconButton key={index} color="inherit" component="a" href={item.href}>
                    {item.icon}
                  </IconButton>
                );
              })
            }
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ pt: 4 }}>
          {Navigate.footer.lisenceContent}
        </Typography>
        <Typography variant="body2" align="center" sx={{ pt: 4 }}>
          {Navigate.footer.copyrightContent}
        </Typography>
      </Container>
    </Box>
  );
}