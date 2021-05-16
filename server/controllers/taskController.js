const {Task, validate} = require('../models/Task');

const findTasks = async(req, res, next) => {
    await Task.find().sort('name')
    .then((tasks) => {
        if(tasks) {
            res.send(tasks);
        }
    })
    .catch((err) => {
        if(err) { throw err; }
    })
}
const findTaskById = async(req, res, next) => {
    await Task.findById(req.params.id)
    .then((task) => {
        if(!task) {
            return res.status(401).send("Task not found")
        }
        res.send(task);
    })
    .catch((err) => {
        if(err) { throw err; }
    })
}

const saveTask = async(req, res, next) => {
    let date = new Date();
    let currentDateOnly = date.getMonth()+'-'+ date.getDate()+'-'+date.getFullYear();

    const {error} = validate({name: req.body.name, completed: req.body.completed, createdAt: currentDateOnly});
    if(error) {
        return res.status(422).send(error.details[0].message);
    }
    
    let task = new Task({
        name: req.body.name,
        completed: req.body.completed,
        createdAt: currentDateOnly
    });

    task = await task.save()
    .then(() => {
        res.send("Task is creared!");
    })
    .catch((err) => {
        if(err) { throw err; }
    })
    //res.send(task);
}

const updateTask = async(req, res, next) => {
    let date = new Date();
    let currentDateOnly = date.getMonth()+'-'+ date.getDate()+'-'+date.getFullYear();
    const {error} = validate({name: req.body.name, completed: req.body.completed, createdAt: currentDateOnly});
    if(error) {
        return res.status(422).send(error.details[0].message);
    }
    let task = await Task.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        completed: req.body.completed,
        createdAt: currentDateOnly
    }, {new: true});
    if(!task) {
        return res.status(404).send("Not Found. Task was not found.");
    }
    res.send(task);
}

const removeTask = async(req, res, next) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    if(!task) {
        return res.status(401).send("Not Found. Task was not found.");
    }
    res.send(task);
}

const dashboard = async(req, res, next) => {
    const totalTasks = await Task.count();
    const tasksCompleted = await Task.find({completed: true}).count();
    const latestTasks= await Task.find({$query: {}, $orderby: {$natural : -1}}).limit(3);

    res.send({
        totalTasks,
        tasksCompleted,
        latestTasks
    })
}

module.exports = { 
    saveTask,
    findTasks,
    findTaskById,
    updateTask,
    removeTask,
    dashboard
}