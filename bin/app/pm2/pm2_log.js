const pm2 = require('pm2')
const { spawn } = require('child_process')

module.exports = async function (req, res) {

    const id = req.query.id

    if (!id) {
        return res.json({
            status: "error",
            message: "id is required"
        })
    }


    const child = spawn('pm2', ['log', id])
    setTimeout(() => {
        child.kill()
    }, 3000)

    child.stdout.pipe(res)
    child.stderr.pipe(res)

}