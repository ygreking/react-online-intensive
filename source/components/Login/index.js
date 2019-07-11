// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Login extends Component {
    render() {
        return (
            <section className = { Styles.login }>
                <h1>Please Login</h1>
                <button onClick = { this.props.doLogin }>Login</button>
            </section>
        );
    }
}
