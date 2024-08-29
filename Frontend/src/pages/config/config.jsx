let BASE_URL = null
const production = false
if (production) {
    BASE_URL = "http://16.171.24.157:4000"
} else {
    BASE_URL = "http://localhost:4000"
}
module.exports = {
    BASE_URL
}