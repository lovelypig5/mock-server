'use strict';

var config = require('../config'),
    mockDao = require(`../dao/${config.DB.dialect}/mockDao`),
    projectDao = require(`../dao/${config.DB.dialect}/projectDao`);

class Mock {

    constructor() {
        this.projects = {};
        this.apilist = {};
    }

    updateMockApi(userId, api) {
        if (this.apilist[userId]) {
            if (api.isreg) {
                let _api = Object.assign({}, api.toJSON());
                _api.regexp = "^" + api.url.replace(/:\w+/g, "\\w+") + "$";
                _api.fromUrl = api.url.match(/^(\/\w+)+/)[0];
                this.apilist[userId].reg[api.projectId].push(_api);
            } else {
                this.apilist[userId].normal[api.projectId][api._id] = api;
                this.apilist[userId].normal[api.projectId][api.url] = api;
            }
        }
    }

    updateProject(userId, project) {
        if (this.projects[userId]) {
            // use id and beginPath as the unique key
            this.projects[userId][project.beginPath] = project;
            this.projects[userId][project._id] = project;
        }
    }

    deleteProject(userId, projectId) {
        if (this.projects[userId]) {
            // use id and beginPath as the unique key
            delete this.projects[userId][project.beginPath];
            delete this.projects[userId][project._id];
        }
    }

    deleteMockApi(userId, projectId, api) {
        if (this.apilist[userId]) {
            if (api.isreg) {
                var index = -1;
                this.apilist[userId].reg[api.projectId].forEach((_api, _index) => {
                    if (_api._id === api.id) {
                        index = _index;
                        return;
                    }
                })
                this.apilist[userId].reg[api.projectId].splice(index, 1);
            } else {
                delete this.apilist[userId].normal[api.projectId][api._id];
                delete this.apilist[userId].normal[api.projectId][api.url];
            }
        }
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
