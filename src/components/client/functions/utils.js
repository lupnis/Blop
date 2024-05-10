"use client";

export const shuffle = (array = []) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const filterSpecificSuffix = (fileList = [], suffix = '') => {
    return fileList.filter(fileName => { return fileName.endsWith(suffix); });
};

export const filterSpecificPrefix = (fileList = [], suffix = '') => {
    return fileList.filter(fileName => { return fileName.startsWith(suffix); });
};
