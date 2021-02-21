export default function parseCallback(link) {
    // Hard-coded 60 assuming the token is long
    if (typeof link == "string" && link.length > 60) {
        // Chop off text before/after the access_token
        let accessToken = link.split('#', 2)[1].split('=')[1].split('&')[0]

        return accessToken
    }
}