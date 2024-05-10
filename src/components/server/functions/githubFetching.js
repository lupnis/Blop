"use server";

export const getGitHubPathFiles = async (githubRootUrl, accountName, repositoryName, branchName = "master", relativePathList = []) => {
    if (!githubRootUrl || !accountName || !repositoryName) {
        return [];
    }
    let relativePath = relativePathList.join("/");
    if (relativePath.length) {
        relativePath = `/${relativePath}`;
    }
    const url = `${githubRootUrl}/${accountName}/${repositoryName}/tree/${branchName}${relativePath}?noancestors=1`;
    const fetchObj = {
        method: "GET",
        cache: "no-store",
        headers: { accept: "application/json" }
    }
    const respData = await fetch(url, fetchObj).then(resp => {
        try {
            return resp.json();
        } catch (error) {
            return null;
        }
    }).catch(() => { return null; });
    if (!respData) {
        return [];
    }
    try {
        return respData.payload.tree.items;
    } catch (err) {
        return [];
    }
};

export const getGitHubPathFilesRecurselyOrNot = async (githubRootUrl, accountName, repositoryName, branchName = "master", relativePathList = [], recursely = false, callback) => {
    let startPath = [relativePathList];
    let files = [];
    for (; ;) {
        if (!startPath.length) {
            break;
        }
        let cachePath = structuredClone(startPath);

        for (let i = 0; i < cachePath.length; ++i) {
            let fileList = await getGitHubPathFiles(githubRootUrl, accountName, repositoryName, branchName, cachePath[i]);
            for (let j = 0; j < fileList.length; ++j) {
                let singleFile = fileList[j];
                if (recursely && singleFile.contentType === "directory") {
                    cachePath.push([singleFile.path]);
                } else {
                    files.push(singleFile.path);
                    if(callback) {
                        callback(singleFile.path);
                    }
                }
            }
        }
        startPath.shift();
    }
    return files;
};

export const getFileContent = async (githubRootUrl, accountName, repositoryName, branchName = "master", fileRelativePath) => {
    if (!githubRootUrl || !accountName || !repositoryName || !fileRelativePath) {
        return '';
    }
    const url = `${githubRootUrl}/${accountName}/${repositoryName}/raw/${branchName}/${fileRelativePath}`;
    const fetchObj = {
        method: "GET",
        cache: "no-store"
    };

    const respData = await fetch(url, fetchObj).then(resp => {
        try {
            return resp.text();
        } catch (error) {
            return null;
        }
    }).catch(() => { return null; });

    if (!respData) {
        return '';
    }
    return respData;
};
