const mongoose = require('mongoose');
const Joi = require('joi');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})
const Task = mongoose.model('Task', taskSchema);

const validateTask = (task) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        completed: Joi.boolean().required(),
        createdAt: Joi.date().required()
    });
    return schema.validate(task);
}
exports.Task = Task;
exports.validate = validateTask;