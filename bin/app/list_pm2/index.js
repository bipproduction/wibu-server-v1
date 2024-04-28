const express = require('express')
const pm2 = require('pm2')
const model_pm2 = require('./model_pm2')
const _ = require("lodash")

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
module.exports = async function (req, res) {
    /**
     * @type {model_pm2[]}
     */
    let list = await new Promise((resolve, reject) => {
        pm2.list((err, list) => {
            if (err) {
                reject(err)
            } else {
                resolve(list)
            }
        })
    })

    list = list.map(x => ({
        "id": x.name,
        "name": x.name.split("_")[0],
        "port": x.name.split("_")[1],
        "pid": x.pm_id,
        "status": x.pm2_env.status,
    }))

    list = _.orderBy(list, ["status"], ["asc"])
    res.json(list)
}