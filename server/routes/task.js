const express = require('express');
const auth = require('../middlewares/auth');
const {saveTask, findTasks, findTaskById, updateTask, removeTask, dashboard} = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', auth, findTasks);
router.get('/tasks/:id', auth, findTaskById);
router.post('/tasks', auth, saveTask);
router.put('/tasks/:id', auth, updateTask);
router.delete('/tasks/:id', auth, removeTask);
router.get('/dashboard', auth, dashboard);

module.exports = {router};
