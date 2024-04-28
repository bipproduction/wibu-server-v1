const express = require('express')
const list_pm2 = require('../app/pm2')
const list_project = require('../app/project')
const list_server = require('../app/server')
const pm2_restart = require('../app/pm2/pm2_restart')
const pm2_stop = require('../app/pm2/pm2_stop')
const pm2_log = require('../app/pm2/pm2_log')

/**
 * 
 * @param {express.Application} app 
 */
module.exports = async function (app) {
    // get list pm2
    app.get('/bin/list-pm2', list_pm2)
    // restart pm2
    app.get('/bin/pm2-restart', pm2_restart)
    // stop pm2
    app.get('/bin/pm2-stop', pm2_stop)
    // log pm2
    app.get('/bin/pm2-log', pm2_log)


    // get list project
    app.get('/bin/list-project', list_project)

    // get list server
    app.get('/bin/list-server', list_server)
}