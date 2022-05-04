import React from 'react'
import { useState } from 'react'
import './style.scss'
const SearchComponent = (props) => {
  const [search, setSearch] = useState('')
  const handleSearchForm = () => {
    props.handleSearchForm(search)
  }
  return (
    <div className='search-form'>
        <input placeholder={props.placeholder} value={search} onChange={(e) => setSearch(e.target.value)}/>
        <span className='close' onClick={() => setSearch('')}>x</span>
        <button className='btn-search' onClick={handleSearchForm}> Search</button>
    </div>
  )
}

export default SearchComponent