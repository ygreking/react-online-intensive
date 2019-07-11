// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import Login from 'components/Login';
import { Provider } from 'components/HOC/withProfile';

// Instruments
import avatar from 'theme/assets/lisa.png';
import { GROUP_ID } from 'config/api';
import { socket } from 'socket/init';

@hot(module)
export default class App extends Component {
    state = {
        avatar,
        currentUserFirstName: 'Игорь',
        currentUserLastName:  'Харабет',
        isLoggedIn:           localStorage.getItem('isLoggedIn') === 'true',
        online:               false,
    };

    componentDidMount = () => {
        socket.emit('join', GROUP_ID);
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });
        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    };

    componentWillUnmount = () => {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    };

    _doLogin = () => {
        this.setState({
            isLoggedIn: true,
        });
        localStorage.setItem('isLoggedIn', 'true');
    };

    _doLogout = () => {
        this.setState({
            isLoggedIn: false,
        });
        localStorage.setItem('isLoggedIn', 'false');
    };

    render() {
        return (
            <Catcher>
                <Provider value = { this.state }>
                    {this.state.isLoggedIn ? (
                        <>
                            <StatusBar doLogout = { this._doLogout } />
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
                        </>
                    ) : (
                        <>
                            <Switch>
                                <Route
                                    path = '/login'
                                    render = { () => <Login doLogin = { this._doLogin } /> }
                                />
                                <Redirect to = '/login' />
                            </Switch>
                        </>
                    )}
                </Provider>
            </Catcher>
        );
    }
}
