let BASE_URL = null
const production = false
if (production) {
    BASE_URL = "http://3.107.90.239:7000"
} else {
    BASE_URL = "http://localhost:4000"
}
module.exports = {
    BASE_URL
}