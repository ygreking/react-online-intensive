// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import { Provider } from 'components/HOC/withProfile';

// Instruments
import avatar from 'theme/assets/lisa.png';

const options = {
    avatar,
    currentUserFirstName: 'Игорь',
    currentUserLastName:  'Харабет',
};

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar />
                    <Switch>
                        <Route
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            component = { Profile }
                            path = '/profile'
                        />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
