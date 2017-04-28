const MockSet = {
    url: String,
    desc: String,
    result: String,
    dataHandler: { //over覆盖,overlying叠加
        type: String,
        default: "over"
    },
    type: {
        type: String,
        default: "GET"
    },
    isreg: {
        type: Boolean,
        default: false
    },
    param: String,
    menuId: String,
    projectId: String,
    userId: String,
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
}

module.exports = [
    {
        name: 'mockset',
        model: MockSet
    }
];
