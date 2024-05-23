"use client";

import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkExtendedTable from "remark-extended-table";

import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css"

export const BlogsPage = {
    tabTitle: "博客",
    tabBackgroundImage: "https://picsum.photos/1024/768",
    specificTitle: "博客详情",
    showContent: true,
    content: (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "#fff", fontSize: "32pt" }}>
                博客搜索
            </h1>
        </div>
    ),
    searchInputPlaceHolder: "搜索博客...",
    paginationSiblings: 1,
    paginationBoundary: 2,
    resultsPrefix: "共 ",
    resultsSuffix: " 个结果",
    noResultsPlaceHolder: "无检索结果",
    listItem: {
        abstractHeight: "80px",
        thumbSize: "256px",
        readMoreText: "阅读更多...",
        placeHolder: {
            title: "<无标题>",
            author: "<无作者信息>",
            date: "<无日期信息>",
            abstract: "<无摘要信息>",
            thumb: "https://www.svgrepo.com/show/429915/not-found-error-alert.svg"
        }
    },
    docItem: {
        prefixes: {
            author: '',
            authorIcon: <EditIcon sx={{ fontSize: "1rem" }} color="inherit" />,
            date: '',
            dateIcon: <CalendarMonthIcon sx={{ fontSize: "1rem" }} color="inherit" />,
        },
        loadingContent: "加载中...",
        maxTagsShown: 5,
        errorLoadingContent: (
            <Alert severity="error">
                <AlertTitle>错误</AlertTitle>
                在渲染Markdown时发生错误，请确认文件可访问并检查格式！
            </Alert>
        ),
        componentsRenderConfig: {
            code: (props) => <Paper variant="outlined" sx={{ padding: "0.5rem 1rem" }} className="blog-code-area">{props.children}</Paper>,
            table: (props) => {
                return (<TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    Array.isArray(props.children) ?
                                        props.children[0].props.children.props.children.map((item, index) => {
                                            return (<TableCell key={index}>{item.props.children}</TableCell>);
                                        })
                                        :
                                        props.children?.props.children.props.children.map((item, index) => {
                                            return (<TableCell key={index}>{item.props.children}</TableCell>);
                                        })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.children.length > 1 && (props.children[1]?.props.children.map((row, indexRow) => {
                                    return (<TableRow
                                        key={indexRow}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        {
                                            row.props.children.map((col, indexCol) => {
                                                return (
                                                    <TableCell key={indexCol}>{col.props.children}</TableCell>
                                                );
                                            })
                                        }
                                    </TableRow>);
                                }))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>);
            }
        },
        markdownRehypePlugins: [
            rehypeRaw, rehypeHighlight,
            rehypeKatex, rehypeStringify
        ],
        markdownRemarkPlugins: [
            remarkGfm, remarkMath,
            remarkParse, remarkRehype,
            remarkExtendedTable
        ]
    }
};
