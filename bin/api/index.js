const express = require('express')
const list_pm2 = require('../app/list_pm2')
const list_project = require('../app/list_project')
const list_server = require('../app/list_server')

/**
 * 
 * @param {express.Application} app 
 */
module.exports = async function (app) {
    // get list pm2
    app.get('/bin/list-pm2', list_pm2)

    // get list project
    app.get('/bin/list-project', list_project)

    // get list server
    app.get('/bin/list-server', list_server)
}