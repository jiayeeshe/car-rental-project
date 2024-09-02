const mongoose = require('mongoose');


const AdminSchema = new mongoose.Schema({
    adminID: {
        type: String,
        required: true,
    },
    adminName :{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
});


const AdminModel = mongoose.model('admins', AdminSchema);

module.exports = AdminModel;