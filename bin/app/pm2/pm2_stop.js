const pm2 = require('pm2')

module.exports = async function (req, res) {
    const id = req.query.id
    if (!id) {
        return res.json({
            success: false,
            message: "id is required"
        })
    }

    const stop = await new Promise((resolve, reject) => {
        pm2.stop(id, (err) => {
            if (err) {
                reject(false)
            } else {
                resolve(true)
            }
        })
    })

    return res.json({
        success: stop,
        message: stop ? "success" : "fail"
    })
}