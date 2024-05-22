/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import ScrollTop from "@/components/client/components/ScrollTop";
import PinList from "@/components/client/components/PinList";

import { HomePage } from "@/configs/pages/home";

import "@/assets/css/home.css"

export default function HomePageRender() {
    return (
        <main className="max-w-full">
            <ScrollTop sticked="drawer-box" />
            <title>{HomePage.tabTitle}</title>
            {
                HomePage.showSplashArea &&
                <img className="splash-image" src={HomePage.splashArea.backgroundImage}></img>
            }
            {(
                HomePage.showSplashArea &&
                HomePage.splashArea.showContent
            ) &&
                <div className="splash-content">
                    <div className="splash-element">
                        {HomePage.splashArea.content}
                    </div>
                    <div className="splash-expander">
                        {HomePage.splashArea.showExpander && HomePage.splashArea.expander}
                    </div>
                </div>
            }
            {
                HomePage.showListArea &&
                <div className="doc-list-container">
                    <div className="doc-list-list">
                        <PinList />
                    </div>
                </div>
            }
        </main>
    );
}
