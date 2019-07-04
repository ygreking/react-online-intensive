// Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, number, array } from 'prop-types';

// Components
import { withProfile } from 'components/HOC/withProfile';
import Like from 'components/Like';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Post extends Component {
    static propTypes = {
        _likePost:   func.isRequired,
        _removePost: func.isRequired,
        comment:     string.isRequired,
        created:     number.isRequired,
        id:          string.isRequired,
        likes:       array.isRequired,
    };

    _removePost = () => {
        const { _removePost, id } = this.props;
        _removePost(id);
    };

    _getCross = () => {
        const { firstName, lastName, currentUserFirstName, currentUserLastName } = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}` ? (
            <span
                className = { Styles.cross }
                onClick = { this._removePost }
            />
        ) : null;
    };

    render() {
        const { avatar, firstName, lastName, comment, created, _likePost, id, likes } = this.props;

        const cross = this._getCross();

        return (
            <section className = { Styles.post }>
                {cross}
                <img src = { avatar } />
                <a>
                    {firstName} {lastName}
                </a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>
        );
    }
}
