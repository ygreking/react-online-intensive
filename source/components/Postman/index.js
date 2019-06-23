// Core
import React from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';

const Postman = (props) => {
    const _animatePostmanEnter = (postman) => {
        fromTo(postman, 1, { right: -400 }, { right: 30 });
    };

    const _animatePostmanExit = (postman) => {
        fromTo(postman, 1, { right: 30 }, { right: -400 });
    };

    return (
        <Transition
            appear
            in = { props.in }
            timeout = { 4000 }
            onEnter = { _animatePostmanEnter }
            onEntered = { props._hidePostman }
            onExit = { _animatePostmanExit }>
            <section className = { Styles.postman }>
                <img src = { props.avatar } />
                <span>Welcome online, {props.currentUserFirstName}</span>
            </section>
        </Transition>
    );
};
export default withProfile(Postman);
