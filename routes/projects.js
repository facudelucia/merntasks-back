const express = require("express")
const router = express.Router()
const {check} = require("express-validator")
const {createProject, getProjects, updateProjects, deleteProject} = require("../controllers/projectController")
const validateJWT = require("../middlewares/validate-token")
///api/projects
router.post("/",
    [
        check("name", "name is required").not().isEmpty()
    ],validateJWT, createProject)

router.get("/", validateJWT, getProjects)
router.put("/:id",
    [
        check("name", "name is required").not().isEmpty()
    ],validateJWT, updateProjects)
router.delete("/:id",validateJWT, deleteProject)

module.exports = router