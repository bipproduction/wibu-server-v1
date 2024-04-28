const pm2 = require('pm2')

module.exports = async function (req, res) {
    const pm_id = req.query.id
    if (!pm_id) {
        return res.json({
            success: false,
            message: "id is required"
        })
    }
    const restart = await new Promise((resolve, reject) => {
        pm2.restart(pm_id, (err) => {
            if (err) {
                reject(false)
            } else {
                resolve(true)
            }
        })
    })

    console.log(pm_id, restart)

    return res.json({
        success: restart,
        message: restart ? "success" : "fail"
    })
}