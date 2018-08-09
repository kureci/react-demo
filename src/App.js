import React, { Component } from 'react';
import NotesListItem from './NotesListItem';

const data = [
    {
        "id":1,
        "title":"A Title",
        "body":"A Body",
        "createdAt":"2018-02-07T08:54:41.311Z",
        "updatedAt":"2018-02-07T08:54:41.311Z"
    },
    {
        "id":2,
        "title":"Another Note",
        "body":"Another Body",
        "createdAt":"2018-02-07T08:55:27.347Z",
        "updatedAt":"2018-02-07T08:55:27.347Z"
    }
];

class Main extends Component {
    constructor() {
        super();

        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes() {
        fetch("/api/notes")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    notes: result
                });
            });
    }

    deleteNote(note) {
        fetch("/api/notes/" + note.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(res => {
            if(res.status == 200) {
                this.getNotes();
            }
        });
    }

    notesList() {
        if (!this.state.notes) return null;
        return this.state.notes.map((note) => {
            return <NotesListItem 
                key={note.id}
                title={note.title} 
                body={note.body.substr(0, 200)}
                deleteHandler={() => this.deleteNote(note)}
            />
        });
    }

    render() {
        return (
            <div className="container">
                {this.notesList()}
            </div>
        );
    }
}

export default Main;