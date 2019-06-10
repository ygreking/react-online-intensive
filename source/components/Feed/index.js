// Core
import React, { Component } from 'react';

// Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            { id: '123', comment: 'Hi there!', created: 1560184188 },
            { id: '456', comment: 'Здарова!', created: 1560184409 },
        ],
        busy: true,
    };

    render() {
        const { posts, busy } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { busy } />
                <StatusBar />
                <Composer />
                {postsJSX}
            </section>
        );
    }
}
