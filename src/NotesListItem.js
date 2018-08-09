import React, { Component }from 'react';
import './NotesListItem.scss';

class NotesListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show_overlay: false
        }
    }

    toggleOverlay(show) {
        console.log("Toggle overlay: ", show);
        this.setState({
            show_overlay: show
        });
    }

    render() {
        const actionsOverlay = this.state.show_overlay ? <div className="overlay">
            <span className="action" onClick={this.props.deleteHandler}>Delete</span>
            <span className="action" onClick={() => this.toggleOverlay(false)}>Cancel</span>
        </div> : '';

        return (
            <div className="list-item">
                {actionsOverlay}
                <div className="details">
                    {this.props.title}
                    <div className="body">{this.props.body}</div>
                    <div className="operations">
                        <span className="edit">Edit</span>
                        <span className="delete" onClick={() => this.toggleOverlay(true)}>Delete</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotesListItem;