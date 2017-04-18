'use strict';

var config = require('../config'),
    mockDao = require(`../dao/${config.DB.dialect}/mockDao`),
    projectDao = require(`../dao/${config.DB.dialect}/projectDao`);

class Mock {

    constructor() {
        this.projects = {};
        this.apilist = {};
    }

    async fetchProjects(userId, force) {
        if (!this.projects[userId] || force) {
            this.projects[userId] = {};
            var {
                status,
                ret
            } = await projectDao.listProject(null, userId);

            ret.forEach((item) => {
                // use id and beginPath as the unique key
                this.projects[userId][item.beginPath] = item;
                this.projects[userId][item._id] = item;
            });
        }

        return this.projects[userId];
    }

    async fetchMockApis(userId, force) {
        if (!this.apilist[userId] || force) {
            this.apilist[userId] = {
                normal: {},
                reg: {}
            };

            var {
                status,
                ret
            } = await mockDao.getMockApis(null, userId);
            ret.forEach((item) => {
                if (!item.active) {
                    return;
                }
                // use id and url as the unique key
                this.apilist[userId].normal[item.projectId] = this.apilist[userId].normal[item.projectId] || {};
                this.apilist[userId].reg[item.projectId] = this.apilist[userId].reg[item.projectId] || [];
                if (item.isreg) {
                    let _item = Object.assign({}, item.toJSON());
                    _item.regexp = "^" + item.url.replace(/:\w+/g, "\\w+") + "$";
                    _item.fromUrl = item.url.match(/^(\/\w+)+/)[0];
                    this.apilist[userId].reg[item.projectId].push(_item);
                } else {
                    this.apilist[userId].normal[item.projectId][item._id] = item;
                    this.apilist[userId].normal[item.projectId][item.url] = item;
                }
            });
        }
        return this.apilist[userId];
    }

    async getProjects(prefix, userId) {
        var project = this.projects[userId];
        if (!project) {
            project = await this.fetchProjects(userId);
        }

        return project[prefix];
    }

    async getNormalApis(prefix, userId) {
        if (!this.apilist[userId]) {
            await this.fetchMockApis(userId);
        }

        return prefix ? this.apilist[userId].normal[prefix] : this.apilist[userId].normal;
    }

    async getRegApis(prefix, userId) {
        if (!this.apilist[userId]) {
            await this.fetchMockApis(userId);
        }

        return prefix ? this.apilist[userId].reg[prefix] : this.apilist[userId].reg;
    }
}

module.exports = new Mock();
