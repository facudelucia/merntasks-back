const Project = require("../models/Project")
const {validationResult} = require("express-validator")

createProject = async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.mapped()
        })
    }
    try {
        const project = new Project(req.body)
        project.creator = req.user.id
        project.save()
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(500).send("There was a mistake")
    }
}
getProjects = async(req, res)=>{
    try {
        let projects = await Project.find({creator: req.user.id}).sort({
            create: -1
        }) 
        res.json({projects})
    } catch (error) {
        console.log(error)
        res.status(500).send("There was a mistake")
    }
}
updateProjects = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.mapped()
        })
    }
    const {name} = req.body
    const newProject = {}
    if(name) newProject.name = name
    try {
        let project = await Project.findById(req.params.id)
        if(!project){
            return res.status(404).json({msg:"not found"})
        }
        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg:"Not authorized"})
        }
        project = await Project.findByIdAndUpdate(req.params.id, newProject, {new: true})
        res.json({project})
    } catch (error) {
        console.log(error)
        res.status(500).send("There was a mistake")
    }
}
deleteProject = async(req,res)=>{
    
    try {
        let project = await Project.findById(req.params.id)
        if(!project){
            return res.status(404).json({
                msg:"not found"
            })
        }
        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg:"Not authorized"})
        }
        await Project.findOneAndRemove(req.params.id)
        res.json({msg: "project deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).send("There was a mistake")
    }
}
module.exports={createProject, getProjects, updateProjects, deleteProject}