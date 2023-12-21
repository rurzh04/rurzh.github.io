import React from 'react';
import { Link, NavLink } from 'react-router-dom';
type Props = {};

import './appHeader.scss';

const AppHeader = (props: Props) => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>User</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink end to="/dashboard">
                            вариант первый
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink end to="/user">
                            Легкое решение
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
