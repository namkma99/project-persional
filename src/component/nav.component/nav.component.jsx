import React, { useEffect, useState } from 'react'
import './style.scss'

const NavComponent = React.memo((props) => {
    // const data = ["all","toan", "van", 'anh']
    const [subjects, setSubjects] = useState([])
    useEffect(() => {
        setSubjects(props.subjects)
    }, [props.subjects])
    console.log(subjects)
    return (
        <div className='navbar'>
            <ul className='nav'>
                {subjects && subjects.map((nav, index) => {
                    return(
                        <li className='item' key={index}>
                            {nav.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
})

export default NavComponent