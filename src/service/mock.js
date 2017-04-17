'use strict';

var config = require('../config'),
    mockDao = require(`../dao/${config.DB.dialect}/mockDao`),
    projectDao = require(`../dao/${config.DB.dialect}/projectDao`);

class Mock {

    constructor() {
        this.fetchProjects();
        this.fetchMockApis();
        this.projects = {};
        this.apilist = {
            normal: {},
            reg: {}
        };
    }

    fetchProjects() {
        this.projects = {};
        projectDao.listProject().then(({
            status,
            ret
        }) => {
            ret.forEach((item) => {
                // use id and beginPath as the unique key
                this.projects[item.beginPath] = item;
                this.projects[item._id] = item;
            });
        });
    }

    fetchMockApis() {
        this.apilist = {
            normal: {},
            reg: {}
        };
        mockDao.getMockApis().then(({
            status,
            ret
        }) => {
            ret.forEach((item) => {
                if (!item.active) {
                    return;
                }
                // use id and url as the unique key
                this.apilist.normal[item.projectId] = this.apilist.normal[item.projectId] || {};
                this.apilist.reg[item.projectId] = this.apilist.reg[item.projectId] || [];
                if (item.isreg) {
                    let _item = Object.assign({}, item.toJSON());
                    _item.regexp = "^" + item.url.replace(/:\w+/g, "\\w+") + "$";
                    _item.fromUrl = item.url.match(/^(\/\w+)+/)[0];
                    this.apilist.reg[item.projectId].push(_item);
                } else {
                    this.apilist.normal[item.projectId][item._id] = item;
                    this.apilist.normal[item.projectId][item.url] = item;
                }
            });
        });
    }

    getProjects(prefix) {
        return this.projects[prefix];
    }

    getNormalApis(prefix) {
        return prefix ? this.apilist.normal[prefix] : this.apilist.normal;
    }

    getRegApis(prefix) {
        return prefix ? this.apilist.reg[prefix] : this.apilist.reg;
    }
}

module.exports = new Mock();
