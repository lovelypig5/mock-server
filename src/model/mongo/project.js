const Project = {
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    beginPath: {
        type: String,
        required: true
    },
    proxy: {
        type: String,
        required: true
    },
    isPublic: {
        type: Number,
        default: 1,
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
    },
    userId: {
        type: String,
        required: true
    }
};

module.exports = [{
    name: 'project',
    model: Project
}];
