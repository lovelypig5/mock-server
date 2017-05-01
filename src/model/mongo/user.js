const User = {
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    locked: {
        type: Boolean,
        required: true,
        default: false
    }
}

module.exports = [{
    name: 'user',
    model: User
}];
