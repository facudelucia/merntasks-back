const express = require("express")
const router = express.Router()
const {createTask, getTasks, updateTasks, deleteTask} = require("../controllers/taskController")
const {check} = require("express-validator")
const validateJWT = require("../middlewares/validate-token")
///api/tasks
router.post("/",
    [
        check("name", "name is required").not().isEmpty(),
        check("project", "project is required").not().isEmpty()
    ],validateJWT, createTask)

router.get("/", validateJWT, getTasks)
router.put("/:id",validateJWT, updateTasks)
router.delete("/:id",validateJWT, deleteTask)

module.exports = router