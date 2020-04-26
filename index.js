const app = require('./app')

const sequelize = require('./utils/database')

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}` ))
    } catch (e) {
        console.log(e);
    }
}
start()