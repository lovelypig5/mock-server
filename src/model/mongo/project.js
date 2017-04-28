const Project = {
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
    },
    userId: String
};

module.exports = [
    {
        name: 'project',
        model: Project
    }
];
