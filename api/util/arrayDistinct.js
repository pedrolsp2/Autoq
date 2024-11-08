module.exports = {
    getDistinctItem: (array, field) => [
        ...new Set(array.map((item) => item[field])),
    ],
}
