"use client";

import { Fetching } from "@/configs/fetching";
import { filterSpecificSuffix } from "@/components/client/functions/utils";
import { getFileContent, getGitHubPathFilesRecurselyOrNot } from "@/components/server/functions/githubFetching";
import { LinksPage } from "@/configs/pages/links";

export const parseLinkElements = (linkContent = '') => {
    const listContent = linkContent.split('\n');
    let listTransformed = [];
    let retContent = {}
    const totalElementsLength = Object.keys(Fetching.linkFile.matchers).length;
    let elementCount = 0;
    Object.keys(Fetching.linkFile.matchers).forEach((item, index) => {
        retContent[item] = null
    });
    for (let i = 0; i < listContent.length; ++i) {
        let matched = false;
        for (const [key, value] of Object.entries(Fetching.linkFile.matchers)) {
            matched = false;
            if (retContent[key] === null && value.match(listContent[i])) {
                let transform = value.transform || ((x) => x);
                retContent[key] = transform(listContent[i]);
                matched = true;
                break;
            }
        }
        if (!matched) {
            listTransformed.push(listContent[i]);
        }
        if (elementCount >= totalElementsLength) {
            break;
        }
    }
    return retContent;
};

export const fetchLinksByListFile = async (callback) => {
    let ret = await getFileContent(
        Fetching.common.githubRootUrl,
        Fetching.common.accountName,
        Fetching.common.repositoryName,
        Fetching.linksList.branch,
        Fetching.linksList.linksListFileRelativePath
    );
    try {
        let listLinks = JSON.parse(ret);
        if (callback) {
            for (let i = 0; i < listLinks.length; ++i) {
                callback(listLinks[i]);
            }
        }
        return listLinks;
    } catch (err) {
        return [];
    }
};

export const fetchLinksByTraversing = async (callback) => {
    let ret = await getGitHubPathFilesRecurselyOrNot(
        Fetching.common.githubRootUrl,
        Fetching.common.accountName,
        Fetching.common.repositoryName,
        Fetching.docsList.branch,
        [Fetching.linksList.traversingFetch.relativePath],
        Fetching.linksList.traversingFetch.recurseDirs
    );
    try {
        let validFiles = filterSpecificSuffix(ret, ".md");
        let retList = [];
        for (let i = 0; i < validFiles.length; ++i) {
            let docContent = await getFileContent(
                Fetching.common.githubRootUrl,
                Fetching.common.accountName,
                Fetching.common.repositoryName,
                Fetching.linksList.branch,
                validFiles[i]
            );
            let elements = parseLinkElements(docContent);
            if (callback) {
                callback(elements);
            }
            retList.push(elements);
        }
        return retList;
    } catch (err) {
        return [];
    }
};

export const fetchLinksAutoSelect = async (callback) => {
    if (Fetching.linksList.useLinksListFile &&
        Fetching.linksList.linksListFileRelativePath
    ) {
        return await fetchLinksByListFile(callback);
    } else {
        return await fetchLinksByTraversing(callback);
    }
};

export const transformLinksList = (linksList) => {
    return linksList.map((doc) => {
        const title = doc.title || LinksPage.listItem.placeHolder.title;
        const descriptions = doc.descriptions || LinksPage.listItem.placeHolder.descriptions;
        const owner = doc.owner || LinksPage.listItem.placeHolder.owner;
        const date = doc.date || LinksPage.listItem.placeHolder.date;
        return `${title} ${descriptions} ${owner} ${date}`;
    })
}

export const tokenizer = (doc) => {
    let tokens = [];
    for (const sentence of doc.split(/\s+/)) {
        if (/[\u4e00-\u9fa5]/.test(sentence)) {
            tokens.push(...sentence.split(''));
        } else {
            tokens.push(...sentence.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().split(''));
        }
    }
    return tokens;
};

export const buildInvertedIndex = (docs = []) => {
    let iIndexes = {};
    docs.forEach((doc, docIndex) => {
        const tokens = tokenizer(doc);
        tokens.forEach((token, tokenIndex) => {
            if (!iIndexes[token]) {
                iIndexes[token] = [];
            }
            iIndexes[token].push({ index: docIndex, position: tokenIndex });
        });
    });
    return iIndexes;
};

export const searchLinks = (keywords = '', iIndexes = {}) => {
    let tokens = tokenizer(keywords);
    let retrieved = {};
    for (const token of tokens) {
        if (iIndexes[token]) {
            for (const entry of iIndexes[token]) {
                const { index } = entry;
                if (!retrieved[index]) {
                    retrieved[index] = 0;
                }
                retrieved[index]++;
            }
        }
    }
    return Object.entries(retrieved)
        .sort((a, b) => b[1] - a[1])
        .map(([docId, score]) => ({ id: docId, score: score }));
};
