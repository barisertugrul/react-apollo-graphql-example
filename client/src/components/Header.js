import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav>
        <ul>
            <li><Link to="/">Article List</Link></li>
            <li><Link to="/add">Add Article</Link></li>
        </ul>
    </nav>
  )
}
