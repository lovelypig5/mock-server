var config = {
    user: {
        name: 'ci_test',
        password: 'ci_test'
    },
    project: {
        name: 'ci project',
        desc: 'ci project for test use',
        beginPath: '/ci',
        proxy: 'http://www.baidu.com',
        isPublic: 1,
        createTime: Date.now(),
        modifyTime: Date.now()
    },
    mockapi: {
        url: '/ci/test',
        result: "{}",
        dataHandler: "over",
        type: "GET",
        isreg: false,
        param: "{}",
        active: true,
        createTime: Date.now(),
        modifyTime: Date.now()
    }
}

module.exports = config;
