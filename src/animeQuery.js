const query = `
    query ($userName: String) {
        Page(perPage: 50) {
            mediaList(userName: $userName, type: ANIME, status: CURRENT, sort: UPDATED_TIME_DESC) {
            media {
                title {
                romaji
                },
                endDate {
                year
                month
                day
                },
                episodes,
                nextAiringEpisode {
                timeUntilAiring
                },
                coverImage {
                medium
                },
                siteUrl
            },
            progress
            }
        }
    }
`

export { query }