const Message = require('../models/message')
const User = require('../models/user')

exports.login_get = (req,res) => {
    res.send("Login GET")
}

exports.login_post = (req,res) => {
    res.send("Login POST")
}

exports.sign_up_get = (req,res) => {
    res.send("Sign-up GET")
}

exports.sign_up_post = (req,res) => {
    res.send("Sign-up POST")
}