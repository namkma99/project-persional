import React, { useEffect, useState } from 'react'
import HeaderComponent from '../header.Component/header.Component'
import SidebarComponent from '../sidebarComponent/sidebar.Component'
import './style.scss'
function LayoutComponent(props){
  const [isOpen, setIsOpen] = useState(false)
  const openSidebar = (open) => {
    setIsOpen(open)
  }
  
  return (
    <div className='main'>
        {isOpen ? <div className={'main-sideBar'}>
          <SidebarComponent isOpen={isOpen} openSidebar1={openSidebar}/>
        </div> : ''}
        <div className='main-body'>
          <div className="main-header">
            <HeaderComponent isOpen={isOpen} openSidebar={openSidebar} title={props.title}/>
          </div>
          <div className="main-content">
            <div className="wapper">
              {props.children}
            </div>
          </div>
        </div>
        {isOpen ? <div className="modal" onClick={()=>setIsOpen(!isOpen)}>MODAL</div> : ''}
        
    </div>
  )
}

export default LayoutComponent