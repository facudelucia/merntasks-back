const Task = require("../models/Task")
const Project = require("../models/Project")
const {validationResult} = require("express-validator")

createTask = async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.mapped()
        })
    }
    
    try {
        const {project} = req.body
        const projectValid = await Project.findById(project)
        if(!projectValid){
            return res.status(404).json({
                msg: "not found"
            })
        }
        if(projectValid.creator.toString() !== req.user.id){
            return res.status(401).json({
                msg: "not authorized"
            })
        }
        const task = new Task(req.body)
        await task.save()
        res.json({task})
    } catch (error) {
        console.log(error)
        res.status(500).send("There was a mistake")
    }
}
getTasks = async(req, res)=>{
    try {
        const {project} = req.query
        const projectValid = await Project.findById(project)
        if(!projectValid){
            return res.status(404).json({
                msg: "not found"
            })
        }
        if(projectValid.creator.toString() !== req.user.id){
            return res.status(401).json({
                msg: "not authorized"
            })
        }
        const tasks = await Task.find({project}).sort({create: -1})
        res.json({tasks})
    } catch (error) {
        console.log(error)
        res.status(500).send("There was a mistake")
    }
}
updateTasks = async(req,res)=>{
    
    try {
        const {project, name, status} = req.body

        const newTask = {}
        newTask.name = name
        newTask.status = status

        let task = await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({msg: "not found"})
        }
        
        const projectValid = await Project.findById(project)
        if(projectValid.creator.toString() !== req.user.id){
            return res.status(401).json({msg: "not authorized"})
        }
        
        task = await Task.findByIdAndUpdate(req.params.id, newTask, {new: true})
        res.json({task})

        
    } catch (error) {
        console.log(error)
        res.status(500).send("There was a mistake")
    }
}
deleteTask = async(req,res)=>{
    try {
        const {project} = req.query
        let task = await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({msg: "not found"})
        }

        const projectValid = await Project.findById(project)
        if(projectValid.creator.toString() !== req.user.id){
            return res.status(401).json({msg: "not authorized"})
        }
        
        await Task.findByIdAndRemove(req.params.id)
        res.json({msg:"project deleted"})

    } catch (error) {
        console.log(error)
        res.status(500).send("There was a mistake")
    }
}
module.exports={createTask, getTasks, updateTasks, deleteTask}