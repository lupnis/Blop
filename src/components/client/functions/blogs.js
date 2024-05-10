"use client";

import { Fetching } from "@/configs/fetching";
import { shuffle, filterSpecificSuffix } from "@/components/client/functions/utils";
import { getFileContent, getGitHubPathFilesRecurselyOrNot } from "@/components/server/functions/githubFetching";

import { Navigate } from "@/configs/navigate";

export const parseBlogElements = (docContent = '', requireBody = true) => {
    const listContent = docContent.split('\n');
    let listTransformed = [...listContent];
    let retContent = {}
    const totalElementsLength = Object.keys(Fetching.docFile.matchers).length;
    let elementCount = 0;
    Object.keys(Fetching.docFile.matchers).forEach((item, index) => {
        retContent[item] = null
    });
    for (let i = 0; i < listContent.length; ++i) {
        for (const [key, value] of Object.entries(Fetching.docFile.matchers)) {
            if (retContent[key] === null && value.match(listContent[i])) {
                let transform = value.transform || ((x) => x);
                retContent[key] = transform(listContent[i]);
                listTransformed.splice(i, 1);
            }
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

export const fetchDocsByListFile = async () => {
    let ret = await getFileContent(
        Fetching.common.githubRootUrl,
        Fetching.common.accountName,
        Fetching.common.repositoryName,
        Fetching.docsList.branch,
        Fetching.docsList.docListFileRelativePath
    );
    try {
        let listPins = JSON.parse(ret);
        return listPins;
    } catch (err) {
        return [];
    }
};

export const fetchDocsByTraversing = async () => { 
    // todo: optimize by fetching background, 
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
                Fetching.pinsList.branch,
                validFiles[i]
            );
            let elements = parseBlogElements(docContent, false);
            elements['link'] = `${Navigate.blogs.blogNavigateRoute}?${Navigate.blogs.blogPageParamKey}=${validFiles[i]}`;
            retList.push(elements);
        }
        return retList;
    } catch (err) {
        return [];
    }
};

export const fetchPinAutoSelect = async () => {
    if (Fetching.pinsList.usePinsListFile &&
        Fetching.pinsList.pinListFileRelativePath
    ) {
        return await fetchPinByListFile();
    } else {
        return await fetchPinByTraversing();
    }
};

export const applyPinList = (pins = []) => {
    try {
        if (Fetching.pinsList.shufflePins) {
            pins = shuffle(pins);
        }
        if (pins.length > Fetching.pinsList.maxShown) {
            pins = pins.slice(0, Fetching.pinsList.maxShown);
        }
        return pins;
    } catch (err) {
        return [];
    }
};
