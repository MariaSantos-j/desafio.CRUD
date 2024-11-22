const mongoose = require('mongoose')

const filmeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    capa: {
        type: String,
        required: true
    },
    producao: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('filme', filmeSchema)