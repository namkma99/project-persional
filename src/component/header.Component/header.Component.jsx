import React, { useEffect, useState } from 'react'
import './style.scss'
const HeaderComponent = (props) => {
  const [isOpen, setIsOpen] = useState(props.isOpen)
  useEffect(() => {
    setIsOpen(!props.isOpen)
  }, [props.isOpen])

  const openSidebar = () => {
    setIsOpen(!isOpen)
    props.openSidebar(isOpen)
  }
  return (
    <div className="header">
      <div onClick={openSidebar} className="header-arrowIcon">
      <i className="fa-solid fa-bars icon-bar"></i>
        </div>
      <h2>{props.title}</h2>
    </div>
  )
}

export default HeaderComponent