const User = {
    name: String,
    password: String,
    locked: {
        type: Boolean,
        default: false
    }
}

module.exports = [
    {
        name: 'user',
        model: User
    }
];
