const path = require('path');

const noteController = require('./controllers/notes.scontroller');

module.exports = (app) => {

    app.get('/api/notes', noteController.getAllNotes);

    app.get('/api/notes/:id',  noteController.getIndividualNote);

    app.post('/api/notes', noteController.createNewNote);

    app.patch('/api/notes', noteController.updateNote);

    app.delete('/api/notes/:id', noteController.deleteNote);

    //catch anything else and send it to react to deal with
    app.get('/**', function(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

};