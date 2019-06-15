// Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, object, array } from 'prop-types';

// Components
import { withProfile } from 'components/HOC/withProfile';
import Like from 'components/Like';
import { Consumer } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Post extends Component {
    static propTypes = {
        _likePost:   func.isRequired,
        _removePost: func.isRequired,
        comment:     string.isRequired,
        created:     object.isRequired,
        id:          string.isRequired,
        likes:       array.isRequired,
    };

    _removePost = () => {
        const { _removePost, id } = this.props;
        _removePost(id);
    };

    render() {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
            comment,
            created,
            _likePost,
            id,
            likes,
        } = this.props;

        return (
            <section className = { Styles.post }>
                <span
                    className = { Styles.cross }
                    onClick = { this._removePost }
                />
                <img src = { avatar } />
                <a>
                    {currentUserFirstName} {currentUserLastName}
                </a>
                <time>{moment(created).format('MMMM D h:mm:ss a')}</time>
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
