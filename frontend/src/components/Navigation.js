import React from 'react'
import {Link} from 'react-router-dom'

function Navigation(props) {
    return (
        <div className="Navigation">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/message">Message</Link></li>
                <li><Link to="/general">General</Link></li>
                <><Link to="/books">Books</Link></>
                <li><Link to="/tv">Tv</Link></li>
                <li><Link to="/gaming">Gaming</Link></li>


            </ul>

        </div>
    )
}

export default Navigation 