const DEAFULT_PAGE_LIMIT = 0;
const DEAFULT_PAGE_PAGE = 1

function getPagination(query){
    const page = Math.abs(query.page) || DEAFULT_PAGE_PAGE;
    const limit = Math.abs(query.limit)|| DEAFULT_PAGE_LIMIT;
    const skip = (page -1 ) * limit;

    return {
        skip,
        limit
    };
}

module.exports = {
    getPagination
}