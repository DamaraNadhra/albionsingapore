const database = require('mongoose');

module.exports = async () => {
   await database.connect('mongodb+srv://damaradewa:damaradewa@cluster0.knsns.mongodb.net/database4?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
}).then(() => {
    console.log('Connected to the database')
})
return database
}