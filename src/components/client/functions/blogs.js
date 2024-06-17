"use client";

import { Fetching } from "@/configs/fetching";
import { filterSpecificSuffix } from "@/components/client/functions/utils";
import { getFileContent, getGitHubPathFilesRecurselyOrNot } from "@/components/server/functions/githubFetching";

import { Navigate } from "@/configs/navigate";
import { BlogsPage } from "@/configs/pages/blogs";

export const parseBlogElements = (docContent = '', requireBody = false) => {
    const listContent = docContent.split('\n');
    let listTransformed = [];
    let retContent = {}
    const totalElementsLength = Object.keys(Fetching.docFile.matchers).length;
    let elementCount = 0;
    Object.keys(Fetching.docFile.matchers).forEach((item, index) => {
        retContent[item] = null
    });
    for (let i = 0; i < listContent.length; ++i) {
        let matched = false;
        for (const [key, value] of Object.entries(Fetching.docFile.matchers)) {
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
    if (requireBody) {
        retContent["_body"] = listTransformed.join('\n');
    }
    return retContent;
};

export const fetchDocsByListFile = async (callback) => {
    let ret = await getFileContent(
        Fetching.common.githubRootUrl,
        Fetching.common.accountName,
        Fetching.common.repositoryName,
        Fetching.docsList.branch,
        Fetching.docsList.docListFileRelativePath
    );
    try {
        let listDocs = JSON.parse(ret);
        if (callback) {
            for (let i = 0; i < listDocs.length; ++i) {
                callback(listDocs[i]);
            }
        }
        return listDocs;
    } catch (err) {
        return [];
    }
};

export const fetchDocsByTraversing = async (callback) => {
    let ret = await getGitHubPathFilesRecurselyOrNot(
        Fetching.common.githubRootUrl,
        Fetching.common.accountName,
        Fetching.common.repositoryName,
        Fetching.docsList.branch,
        [Fetching.docsList.traversingFetch.relativePath],
        Fetching.docsList.traversingFetch.recurseDirs
    );
    try {
        let validFiles = filterSpecificSuffix(ret, ".md");
        let retList = [];
        for (let i = 0; i < validFiles.length; ++i) {
            let docContent = await getFileContent(
                Fetching.common.githubRootUrl,
                Fetching.common.accountName,
                Fetching.common.repositoryName,
                Fetching.docsList.branch,
                validFiles[i]
            );
            let elements = parseBlogElements(docContent, false);
            elements['link'] = `${Navigate.blogs.blogNavigateRoute}?${Navigate.blogs.blogPageParamKey}=${validFiles[i]}`;
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

export const fetchDocsAutoSelect = async (callback) => {
    if (Fetching.docsList.useDocListFile &&
        Fetching.docsList.docListFileRelativePath
    ) {
        return await fetchDocsByListFile(callback);
    } else {
        return await fetchDocsByTraversing(callback);
    }
};

export const transformDocList = (docList) => {
    return docList.map((doc) => {
        const title = doc.title || BlogsPage.listItem.placeHolder.title;
        const abstract = doc.abstract || BlogsPage.listItem.placeHolder.abstract;
        const author = doc.author || BlogsPage.listItem.placeHolder.author;
        const date = doc.date || BlogsPage.listItem.placeHolder.date;
        const tags = doc.tags || [];
        return `${title} ${abstract} ${author} ${date} ${tags.join(' ')}`;
    })
}

export const tokenizer = (doc) => {
    let tokens = [];
    for (const sentence of doc.split(/\s+/)) {
        if (/[\u4e00-\u9fa5]/.test(sentence)) {
            tokens.push(...sentence.split(''));
        } else {
            tokens.push(...sentence.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().split(' '));
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

export const searchDocs = (keywords = '', iIndexes = {}) => {
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
