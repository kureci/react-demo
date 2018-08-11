import React, { Component } from 'react';
import NotesListItem from './NotesListItem';
import FloatingButton from './FloatingButton';

class Home extends Component {
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
                linkTo={"/notes/" + note.id}
            />
        });
    }

    render() {
        const content = this.state.notes.length ? 
            this.notesList() : 
            <div className="center">
                <h3>You have no notes</h3>
                <p>Start typing your dreams..</p>
            </div>;

        return (
            <div>
                {content}
                <FloatingButton content="+" linkTo="/notes/new" />
            </div>
        )
    }

}

export default Home;