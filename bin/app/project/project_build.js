const { spawn } = require('child_process')
const path = require('path')
module.exports = async function (req, res) {
    /**
     * @type {string}
     */
    const name = req.query.name

    if (!name) {
        return res.json({
            success: false,
            message: "name is required"
        })
    }

    if (name.includes("wibu-server")) {
        const child = spawn('yarn', ['build'], {
            cwd: path.join(process.cwd(), "./")
        })

        return child.stdout.pipe(res)
    } else {
        const child = spawn('yarn', ['build'], {
            cwd: path.join(process.cwd(), "../", name)
        })

        return child.stdout.pipe(res)
    }
}