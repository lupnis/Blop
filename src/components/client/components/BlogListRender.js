"use client";

/** installed modules import  */
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled, useTheme, alpha } from "@mui/material/styles";

/** components import */
//

/** configs import */
import { BlogsPage } from "@/configs/pages/blogs";

/** installed styles import */
//

/** local styles import */
//

export default function BlogListRender(props) {
    const theme = useTheme();

    const [loading, setLoading] = useState(true);


    return (
        <>
            <img src="https://picsum.photos/1024/768" className="banner-image"></img>
            <div className="banner-content">
                <div className="banner-element">
                    {BlogsPage.showContent ? BlogsPage.content : ''}
                </div>
            </div>
            <div className="blog-list-container">
                <div className="blog-list-list">
                    <Card className="py-1">
                        <CardActions className="flex">
                            <TextField disabled placeholder="搜索博客..." variant="outlined" className="grow" />
                            <Box className="flex items-center">
                                <Box sx={{ position: 'relative' }}>
                                    <Button className="py-4" disabled={loading} sx={{ color: theme.palette.text.secondary }}>
                                        <SearchIcon />
                                    </Button>
                                    {loading && (
                                        <CircularProgress size="2rem"
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-1rem',
                                                marginLeft: '-1rem',
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </CardActions>
                    </Card>
                    <div className="mt-5">
                        list contents
                        <h2 className="w-full text-center">0 results</h2>
                        {/* results */}
                        <Stack direction="row" className="flex w-full-center justify-end items-center">
                            xxx results
                            <Pagination size="large" siblingCount={1} boundaryCount={2} shape="rounded" count={20} showFirstButton showLastButton onChange={(e, v) => { console.log(v) }} />
                        </Stack>
                    </div>

                </div>
            </div>

        </>
    );

}