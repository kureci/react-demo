const Sequelize = require('sequelize');

const storage = 'server/database/database.db';
// creates database if it does not exist
const db = new Sequelize('note-app', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage,
    operatorsAliases: false
});

// creates Note model
const Note = db.define('note', {
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    }
});
// creates table if it does not exist
Note.sync();

// exports the model for use in app
module.exports = {
    Note
};
