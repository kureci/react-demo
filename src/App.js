import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Note from './components/Note';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Route exact path="/" component={Home} />
                    <Route path="/notes/:id" render={(props) => 
                        <Note id={props.match.params.id} {...props}/> 
                    }/>
                </div>
            </Router>
        );
    }
}

export default App;