"use client";

/** installed modules import  */
import { useState } from "react";

/** components import */
import LinkItem from "@/components/client/components/LinkItem";

/** configs import */
import { LinksPage } from "@/configs/pages/links";

/** installed styles import */

/** local styles import */
//

export default function LinksPageRender(props) {
    const [loading, setLoading] = useState(true);
    const [linkList, setLinkList] = useState([]);
    return (
        <>
            <title>{LinksPage.title}</title>
            {[1,2,3].map((item, i)=>{return <LinkItem key=i />})}
        </>
    );
}
