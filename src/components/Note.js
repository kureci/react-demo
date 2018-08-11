import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Note.scss';

class Note extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: '',
            body: '',
            createdAt: null,
            updatedAt: null,
            hasError: false,
            message: null,
            redirectToHome: null
        };

        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.bodyChangeHandler = this.bodyChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        if (!this.props.isNew) {
            fetch(`/api/notes/${this.props.id}`)
                .then(res => res.json())
                .then(result => {
                    this.setState(result)
                });
        }
    }

    updateMessage(message, error=false) {
        this.setState({
            hasError: error,
            message: message
        });
    }

    addNew() {
        this.updateMessage(null);
        fetch("/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(result => {
            if (result.id) {
                this.setState({
                    redirectToHome: true
                })
            }
            else if (result.err) {
                this.updateMessage(result.err, true);
            }
        })
        .catch((err) => {});
    }

    update() {
        this.updateMessage(null);
        fetch("/api/notes", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json());
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
        if (this.props.isNew) {
            this.addNew();
        } else {
            this.update();
        }
        event.preventDefault();
    }

    render() {
        const { redirectToHome } = this.state;
        if (redirectToHome) return <Redirect to='/' push/>;
        
        const messageDiv = <div className={this.state.hasError ? 'error':''}>{this.state.message}</div>;
        return (
            <div className="note-page">
                <Link to="/" className="back"><span className="back-icon"></span> Back to notes</Link>
                <div className="note">
                    <form onSubmit={this.submitHandler}>
                        <div class="row">
                            <input type="text" name="title" placeholder="Note title" className="title no-outline" autoFocus="true" autoComplete="off"
                                value={this.state.title}
                                onChange={this.titleChangeHandler}
                            />
                        </div>
                        <div class="row take-up-height">
                            <textarea name="body" placeholder="Note body" className="no-outline"
                                value={this.state.body}
                                onChange={this.bodyChangeHandler}
                            />
                        </div>

                        <div className="row">
                        <div className="float-left">{messageDiv}</div>
                            <div className="float-right">
                                <input type="submit" value="Save" className="no-outline"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Note;