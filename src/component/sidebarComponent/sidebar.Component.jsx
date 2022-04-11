import React, { useEffect, useState } from 'react'
import './style.scss'
const SidebarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(!props.isOpen)
  useEffect(() => {
    setIsOpen(!props.isOpen)
  }, [props.isOpen])
  
  const openSidebar = () => {
    setIsOpen(!isOpen)
    props.openSidebar1(isOpen)
  }
  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-info">
            <div onClick={openSidebar} className="sidebar-arrowIcon">
              <i className="fa-solid fa-arrow-left-long"></i>
            </div>
            <div className="wapper">
              <div className="sidebar-logo">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="sidebar-user">
                <span>Nguyen Van A</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarComponent