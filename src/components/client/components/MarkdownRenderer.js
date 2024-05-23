"use client";

/** installed modules import  */
import Markdown from "react-markdown";
import { ErrorBoundary } from "react-error-boundary";
import { BlogsPage } from "@/configs/pages/blogs";

/** components import */


/** configs import */

/** installed styles import */

/** local styles import */
//


export default function MarkdownRenderer({ document }) {

    return (
        <ErrorBoundary fallback={BlogsPage.docItem.errorLoadingContent}>
            <Markdown
                components={BlogsPage.docItem.componentsRenderConfig}
                rehypePlugins={BlogsPage.docItem.markdownRehypePlugins}
                remarkPlugins={BlogsPage.docItem.markdownRemarkPlugins}
            >
                {document}
            </Markdown>
        </ErrorBoundary>
    );
}
