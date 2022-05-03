import React from 'react'
import './style.scss'
const SearchComponent = (props) => {
  return (
    <div className='search-form'>
        <input placeholder={props.placeholder}/>
        <button> Search</button>
    </div>
  )
}

export default SearchComponent