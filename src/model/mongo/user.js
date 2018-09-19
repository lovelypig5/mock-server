const User = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    locked: {
        type: Boolean,
        required: true,
        default: false
    },
    salt: {
        type: Number,
        required: true,
        default: Math.floor( Math.random() * 1000000 )
    }
}

module.exports = [ {
    name: "user",
    model: User
} ];
