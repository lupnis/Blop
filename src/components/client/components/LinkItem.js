"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function LinkItem() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{backgroundImage: "url('')"}}>
        <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
          Link Sample
        </Typography>
        <Typography variant="body2">
          descriptions
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">jump to link</Button>
      </CardActions>
    </Card>
  );
}
