import url from 'url'

export const getQuery = (search) => {
    return url.parse(search, true).query
}