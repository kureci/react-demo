const {Note} = require('../models/notes');

function getAllNotes(req,res) {
    Note.findAll().then((notes) => {
        res.send(notes);
    });
}

function getIndividualNote(req, res) {
    const id = req.params.id;
    Note.find({
        where: {
            id
        }
    }).then((note) => {
        if(!note) {
            return res.status(404).send({err:'no note found'});
        }
        res.send(note);
    }).catch((e) => {
        res.status(400).send(e);
    })
}

function createNewNote(req, res) {
    if (!req.body.title) {
        return res.status(400).send({err: 'A title is required'});
    }
    Note.create({
        title: req.body.title,
        body: req.body.body
    }).then((note) => {
        res.send(note);
    }).catch((err) => {
        res.status(400).send(err)
    });
}

function deleteNote(req, res) {
    if(!req.params.id) {
        return res.status(400).send({err:'no note specified'});
    }
    const id = req.params.id;
    Note.find({
        where: {
            id
        }
    }).then((note) => {
        if(!note) {
           throw('it does not appear that note exists')
        }
        Note.destroy({
            where: {
                id: note.id
            }
        });
        return note;
    }).then((note) => {
        res.send(note);
    }).catch((err) => {
        res.status(400).send({err});
    })
}

function updateNote(req, res) {
    if(!req.body.id || !req.body.title || !req.body.body) {
        return res.status(400).send({err:'missing information'});
    }
    Note.update({
        title:req.body.title,
        body:req.body.body
    },{
      where:{
          id:req.body.id
      }
    }).then((result) => {
       return Note.find({
            where: {
                id: req.body.id
            }
        })
    }).then((note) => {
        if (!note) {
            return res.status(404).send({err: 'No note found'});
        }
        res.send(note);
    }).catch((err) => {
        res.status(400).send(err)
    })
}


module.exports = {
    createNewNote,
    deleteNote,
    getAllNotes,
    updateNote,
    getIndividualNote
};