const fs = require("fs")

module.exports = async function (req, res) {
    try {
        const list = await fs.promises.readdir("/etc/nginx/sites-enabled")
        return res.json(list)
    } catch (error) {
        return res.json([])
    }
}