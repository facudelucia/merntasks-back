const express = require("express");
//para las variables de entorno
require("dotenv").config();
const conectarDB = require("./config/db")
const cors = require("cors")
//crear servidor express
const app = express()
//conectar base de datos
conectarDB()
//cors
app.use(cors())
//parseo del body
app.use(express.json())

//rutas
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"))
app.use("/api/tasks", require("./routes/tasks"))


//escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})