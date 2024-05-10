"use client";

import { shuffle, filterSpecificSuffix } from "@/components/client/functions/utils";
import { getFileContent, getGitHubPathFilesRecurselyOrNot } from "@/components/server/functions/githubFetching";
import { parseBlogElements } from "@/components/client/functions/blogs";

import { Fetching } from "@/configs/fetching";
import { Navigate } from "@/configs/navigate";

export const fetchPinByListFile = async (callback) => {
    let ret = await getFileContent(
        Fetching.common.githubRootUrl,
        Fetching.common.accountName,
        Fetching.common.repositoryName,
        Fetching.pinsList.branch,
        Fetching.pinsList.pinListFileRelativePath
    );
    try {
        let listPins = JSON.parse(ret);
        if (Fetching.pinsList.shufflePins) {
            listPins = shuffle(listPins);
        }
        if (listPins.length > Fetching.pinsList.maxShown) {
            listPins = listPins.slice(0, Fetching.pinsList.maxShown);
        }
        if (callback) {
            for (let i = 0; i < listPins.length; ++i) {
                callback(listPins[i]);
            }
        }
        return listPins;
    } catch (err) {
        return [];
    }
};

export const fetchPinByTraversing = async (callback) => {
    let ret = await getGitHubPathFilesRecurselyOrNot(
        Fetching.common.githubRootUrl,
        Fetching.common.accountName,
        Fetching.common.repositoryName,
        Fetching.pinsList.branch,
        [Fetching.pinsList.traversingFetch.relativePath],
        Fetching.pinsList.traversingFetch.recurseDirs
    );
    try {
        let validFiles = filterSpecificSuffix(ret, ".md");
        if (Fetching.pinsList.shufflePins) {
            validFiles = shuffle(validFiles);
        }
        if (validFiles.length > Fetching.pinsList.maxShown) {
            validFiles = validFiles.slice(0, Fetching.pinsList.maxShown);
        }
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

export const fetchPinAutoSelect = async (callback) => {
    if (Fetching.pinsList.usePinsListFile &&
        Fetching.pinsList.pinListFileRelativePath
    ) {
        return await fetchPinByListFile(callback);
    } else {
        return await fetchPinByTraversing(callback);
    }
};
