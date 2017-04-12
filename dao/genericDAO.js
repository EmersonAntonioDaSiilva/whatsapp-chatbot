var db
exports.db = function() {
    if (db === null) {
        db = dblibrary.createClient()
    }
    return db
}