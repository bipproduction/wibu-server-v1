const express = require('express')
const login = require('./auth/login')
const user = require('./auth/user')
const logout = require('./auth/logout')

/**
 * 
 * @param {express.Application} app 
 */
module.exports = async function (app) {
    app.post('/api/auth/login', login)
    app.get('/api/auth/user', user)
    app.get('/api/auth/logout', logout)
}