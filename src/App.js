import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Note from './components/Note';

const NotFound = () => {
    return (
        <div className="center">
            <h4>Page not found</h4>
            <p>You sure you've got the correct URL?</p>
            <Link to="/">Go home</Link>
        </div>
    );
}

class App extends Component {
    render() {
        return (
            <div className="container full-height">
                <Router>
                    <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/notes/:id(new|[0-9]+)" render={(props) => 
                                <Note id={props.match.params.id} isNew={props.match.params.id === 'new'} {...props}/> 
                            }/>
                            <Route component={NotFound}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;