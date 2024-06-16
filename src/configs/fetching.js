"use client";

export const Fetching = {
    common: {
        githubRootUrl: "https://github.com",
        accountName: "lupnis",
        repositoryName: "mes_blogs"
    },
    pinsList: {
        branch: "master",
        maxShown: 5,
        shufflePins: false,
        usePinsListFile: true,
        pinListFileRelativePath: 'blogs/pins.json',
        traversingFetch: {
            relativePath: '',
            recurseDirs: false
        }
    },
    docsList: {
        branch: "master",
        maxShownPerPage: 5,
        sortTransform: ((a, b) => 0),
        useDocListFile: true,
        docListFileRelativePath: 'blogs/list.json',
        traversingFetch: {
            relativePath: '',
            recurseDirs: false
        }
    },
    docFile: {
        branch: "master",
        rootPath: '',
        matchers: {
            title: {
                match: (content) => content.startsWith("# title:"),
                transform: (content) => content.split("# title:")[1]
            },
            author: {
                match: (content) => content.startsWith("> author:"),
                transform: (content) => content.split("> author:")[1]
            },
            profile: {
                match: (content) => content.startsWith("> profile:"),
                transform: (content) => content.split("> profile:")[1]
            },
            date: {
                match: (content) => content.startsWith("> date:"),
                transform: (content) => content.split("> date:")[1]
            },
            banner: {
                match: (content) => content.startsWith("> banner:"),
                transform: (content) => content.split("> banner:")[1]
            },
            thumb: {
                match: (content) => content.startsWith("> thumb:"),
                transform: (content) => content.split("> thumb:")[1]
            },
            tags: {
                match: (content) => content.startsWith("> tags:"),
                transform: (content) => content.split("> tags:")[1].split(",")
            },
            abstract: {
                match: (content) => content.startsWith("> abstract:"),
                transform: (content) => content.split("> abstract:")[1]
            }
        }
    },
    linksList: {
        branch: "master",
        maxShownPerPage: 5,
        sortTransform: ((a, b) => 0),
        useLinksListFile: true,
        linksListFile: 'links/links.json',
        traversingFetch: {
            relativePath: '',
            recurseDirs: false
        }
    },
    linkFile: {
        matchers: {
            title: {
                match: (content) => content.startsWith("# title:"),
                transform: (content) => content.split("# title:")[1]
            },
            owner: {
                match: (content) => content.startsWith("> owner:"),
                transform: (content) => content.split("> owner:")[1]
            },
            link: {
                match: (content) => content.startsWith("> link:"),
                transform: (content) => content.split("> link:")[1]
            },
            date: {
                match: (content) => content.startsWith("> date:"),
                transform: (content) => content.split("> date:")[1]
            },
            banner: {
                match: (content) => content.startsWith("> banner:"),
                transform: (content) => content.split("> banner:")[1]
            },
            avatar: {
                match: (content) => content.startsWith("> avatar:"),
                transform: (content) => content.split("> avatar:")[1]
            }
        }
    }
};
