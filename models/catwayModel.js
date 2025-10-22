const mongoose = require('mongoose');

const catwaySchema = mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: true,
        unique: true,      
    },
    type: {
        type: String,
        required: true,
        enum: ['short', 'long']
    },
    catwayState: {
        type: String,
        required: true,
        default: 'bon état'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Catway', catwaySchema);