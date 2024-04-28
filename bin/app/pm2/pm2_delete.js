const pm2 = require('pm2')

module.exports = async function (req, res) {
    const id = req.query.id
    if (!id) {
        return res.json({
            success: false,
            message: "id is required"
        })
    }
    const delete_id = await new Promise((resolve, reject) => {
        pm2.delete(id, (err) => {
            if (err) {
                reject(false)
            } else {
                resolve(true)
            }
        })
    })
    return res.json({
        success: delete_id,
        message: delete_id ? "success" : "fail"
    })
}