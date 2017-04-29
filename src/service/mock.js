'use strict';

var _ = require('lodash'),
    logger = require('../logger'),
    config = require('../config'),
    mockDao = require(`../dao/${config.DB.dialect}/mockDao`),
    projectDao = require(`../dao/${config.DB.dialect}/projectDao`);

class Mock {

    constructor() {
        this.projects = {};
        this.apilist = {};
    }

    async init() {
        var projects = await projectDao.listAllProjects();
        projects.forEach((project) => {
            let _project = project.toJSON();
            let userId = _project.userId;
            if (!userId) {
                logger.error('error project with no userId');
                logger.error(_project);
                return;
            }
            if (!this.projects[userId]) {
                this.projects[userId] = {};
            }
            this.projects[userId][_project.beginPath] = project;
            this.projects[userId][_project._id] = project;
        });
        var apis = await mockDao.getAllMockApis();
        apis.forEach((api) => {
            let _api = api.toJSON();
            var userId = _api.userId;
            var projectId = _api.projectId;
            if (!userId || !projectId) {
                logger.error('error api with no userId or no projectId');
                logger.error(_api);
                return;
            }
            if (!this.apilist[userId]) {
                this.apilist[userId] = {
                    normal: {},
                    reg: {}
                };
            }

            if (!_api.active) {
                return;
            }
            // use id and url as the unique key
            this.apilist[userId].normal[projectId] = this.apilist[userId].normal[projectId] || {};
            this.apilist[userId].reg[projectId] = this.apilist[userId].reg[projectId] || [];
            if (_api.isreg) {
                _api.regexp = "^" + _api.url.replace(/:\w+/g, "\\w+") + "$";
                _api.fromUrl = _api.url.match(/^(\/\w+)+/)[0];
                this.apilist[userId].reg[projectId].push(_api);
            } else {
                this.apilist[userId].normal[projectId][_api._id] = _api;
                this.apilist[userId].normal[projectId][_api.url] = _api;
            }
        })
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
        let _project = _.pick(project, ['_id', 'userId', 'beginPath', 'proxy']);
        if (this.projects[userId]) {
            // use id and beginPath as the unique key
            this.projects[userId][_project.beginPath] = _project;
            this.projects[userId][_project._id] = _project;
        }
    }

    deleteProject(userId, projectId) {
        if (this.projects[userId]) {
            // use id and beginPath as the unique key
            var project = this.projects[userId][projectId];
            delete this.projects[userId][project.beginPath];
            delete this.projects[userId][project._id];
        }
    }

    deleteMockApi(mockapi) {
        let userId = mockapi.userId;
        let projectId = mockapi.projectId;
        if (this.apilist[userId]) {
            if (mockapi.isreg) {
                var index = -1;
                this.apilist[userId].reg[projectId].forEach((api, _index) => {
                    if (api._id === mockapi.id) {
                        index = _index;
                        return;
                    }
                })
                this.apilist[userId].reg[projectId].splice(index, 1);
            } else {
                delete this.apilist[userId].normal[projectId][mockapi._id];
                delete this.apilist[userId].normal[projectId][mockapi.url];
            }
        }
    }

    async fetchProjects(userId, force) {
        if (!this.projects[userId] || force) {
            this.projects[userId] = {};
            var ret = await projectDao.listProject(null, userId);
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

            var ret = await mockDao.getMockApis(null, userId);
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

        return prefix
            ? this.apilist[userId].normal[prefix]
            : this.apilist[userId].normal;
    }

    async getRegApis(prefix, userId) {
        if (!this.apilist[userId]) {
            await this.fetchMockApis(userId);
        }

        return prefix
            ? this.apilist[userId].reg[prefix]
            : this.apilist[userId].reg;
    }

}

module.exports = new Mock();
