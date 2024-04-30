const express = require('express')
const list_pm2 = require('../app/pm2')
const list_project = require('../app/project')
const list_server = require('../app/server')
const pm2_restart = require('../app/pm2/pm2_restart')
const pm2_stop = require('../app/pm2/pm2_stop')
const pm2_log = require('../app/pm2/pm2_log')
const pm2_delete = require('../app/pm2/pm2_delete')
const project_build = require('../app/project/project_build')
const project_pull = require('../app/project/project_pull')
const project_ins = require('../app/project/project_ins')
const pm2_start = require('../app/pm2/pm2_start')

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
    // delete pm2
    app.get('/bin/pm2-delete', pm2_delete)
    // start pm2
    app.get('/bin/pm2-start', pm2_start)


    // get list project
    app.get('/bin/list-project', list_project)
    // project build
    app.get('/bin/project-build', project_build)
    // project pull
    app.get('/bin/project-pull', project_pull)
    // project install
    app.get('/bin/project-install', project_ins)

    // get list server
    app.get('/bin/list-server', list_server)
}