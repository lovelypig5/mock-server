const MockSet = {
    url: {
        type: String,
        required: true
    },
    desc: String,
    result: {
        type: String,
        required: true
    },
    dataHandler: { //over覆盖,overlying叠加
        type: String,
        default: "over",
        required: true
    },
    type: {
        type: String,
        default: "GET",
        required: true
    },
    isreg: {
        type: Boolean,
        default: false,
        required: true
    },
    param: {
        type: String,
        required: true
    },
    menuId: {
        type: String,
        default: ""
    },
    projectId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    createTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    modifyTime: {
        type: Date,
        default: Date.now,
        required: true
    }
}

module.exports = [{
    name: 'mockset',
    model: MockSet
}];
