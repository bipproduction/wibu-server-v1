const fs = require("fs")
const _ = require("lodash")

module.exports = async function (req, res) {
    try {
        let list = await fs.promises.readdir("/etc/nginx/sites-enabled")
        list = list.filter(x => x !== "default").map(x => ({
            name: x.split("_")[0],
            port: Number(x.split("_")[1].split(".")[0]),
        }))

        list = _.orderBy(list, ["port"], ["asc"])
        return res.json(list)
    } catch (error) {
        return res.json([])
    }
}