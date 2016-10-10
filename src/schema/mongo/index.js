'use strict';

var mongoose = require('mongoose');

var Project = new mongoose.Schema({
    name: String,
    desc: String,
    beginPath: String,
    proxy: String,
    isPublic: {
        type: Number,
        default: 1
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    modifyTime: {
        type: Date,
        default: Date.now
    }
});

var MockSet = new mongoose.Schema({
    url: String,
    desc: String,
    result: String,
    dataHandler: {
        type: String,
        default: "over"
    }, //over覆盖,overlying叠加
    type: {
        type: String,
        default: "GET"
    },
    isreg: {
        type: Boolean,
        default: false
    },
    param: String,
    respParam: String,
    menuId: String,
    projectId: String,
    active: {
        type: Boolean,
        default: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    modifyTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = {
    project: Project,
    mockset: MockSet
};
