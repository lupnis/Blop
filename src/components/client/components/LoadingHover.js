"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingHover ({loading}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(loading);
  }, [loading])

  return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  );
}
