import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const sidabar = [
  {title: 'Create', path: '/create'},
  {title: 'Class', path: '/class'},
  {title: 'Student', path: '/'}
]
const SidebarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(!props.isOpen)
  const [pathName, setPathName] = useState('/')
  useEffect(() => {
    setIsOpen(!props.isOpen)
  }, [props.isOpen])
  
  const openSidebar = () => {
    setIsOpen(!isOpen)
    props.openSidebar1(isOpen)
  }
  const handleActive = (pathName) => {
    console.log("pathName", pathName);
    const path = sidabar.find(side => side.path === pathName)
    console.log("path", path);
    if(path) {
      setPathName(path.path)
    }
  }

  const handleClassActive = (path) => {
    // eslint-disable-next-line no-self-compare
    console.log("path", path);
    if(pathName === path) {
      console.log("active", path);
      return 'link-item active'
    }
    return 'link-item'
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
        <div className='sidebar-link'>
          <ul className='wapper'>
            {sidabar.map(side => (
              <Link key={side.title} to={side.path} className={handleClassActive(side.path)} onClick={() => handleActive(side.path)}>
                <li>
                    {side.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SidebarComponent