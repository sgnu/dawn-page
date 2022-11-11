const query = `
    query ($userName: String) {
        Page(perPage: 50) {
            mediaList(userName: $userName, type: ANIME, status: CURRENT, sort: UPDATED_TIME_DESC) {
            media {
                title {
                romaji
                },
                episodes,
                nextAiringEpisode {
                timeUntilAiring
                },
                coverImage {
                large
                },
                siteUrl,
                season,
                seasonYear
            },
            progress
            }
        }
    }
`

export { query }