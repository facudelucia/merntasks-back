const mongoose = require("mongoose")

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify: false
        });
        console.log("db conectada");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
} 

module.exports = conectarDB