import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Note.scss';

class Note extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: '',
            body: '',
            createdAt: null,
            updatedAt: null
        };

        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.bodyChangeHandler = this.bodyChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        fetch(`/api/notes/${this.props.id}`)
            .then(res => res.json())
            .then(result => {
                this.setState(result)
            });
    }

    titleChangeHandler(event) {
        this.setState({
            title: event.target.value
        });
    }

    bodyChangeHandler(event) {
        this.setState({
            body: event.target.value
        });
    }

    submitHandler(event) {
        fetch("/api/notes", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(res => console.log(res.json()));

        event.preventDefault();
    }

    render() {
        return (
            <div className="note-page">
                <Link to="/" className="back">⬅ Back to notes</Link>
                <div className="note">
                    <form onSubmit={this.submitHandler}>
                        <div class="row">
                            <input type="text" name="title" placeholder="Note title" className="title"
                                value={this.state.title}
                                onChange={this.titleChangeHandler}
                            />
                        </div>
                        <div class="row">
                            <textarea name="body" placeholder="Note body" 
                                value={this.state.body}
                                onChange={this.bodyChangeHandler}
                            />
                        </div>

                        <div className="row">
                            <div className="float-left">
                                <label for="autoSave">
                                    <input type="checkbox" id="autoSave" />
                                    Auto-save
                                </label>
                            </div>
                            <div className="float-right">
                                <input type="submit" value="Save"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Note;