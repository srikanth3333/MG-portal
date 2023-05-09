import React from 'react';
// import Header from "./Header";
import { useDispatch, useSelector } from 'react-redux';
import {tokenLogin} from '../redux/auth/userSlice';
import Login from "./Login";
// import Lottie from 'react-lottie';
import animationData from './lotie/loading.json'
import {Layout as MainLayout} from 'antd';
import { Button} from 'antd';
import { RxDashboard } from "react-icons/rx";
import { MdGroups2 } from "react-icons/Md";
import { GoPerson } from "react-icons/Go";
import { AiFillSave } from "react-icons/Ai";
import { FaBook } from "react-icons/Fa";
import { BsList } from "react-icons/Bs";
import { MdDashboard,MdNotificationsActive } from "react-icons/Md";


const { Header, Sider, Content } = MainLayout;

function Layout({children}) {

    const [collapsed, setCollapsed] = React.useState(true);
    const [targetReached, setTargetReached] = React.useState(false)
    const [activeSidebar, setActiveSidebar] = React.useState(true)
    const [activeItem, setActiveItem] = React.useState(0)
    const [loading, setLoading] = React.useState(true)
    const user = useSelector((state) => state.users) 
    let dispatch = useDispatch()

    const updateTarget = React.useCallback((e) => {
      if (e.matches) {
        setTargetReached(true)
      }else {
        setActiveSidebar(true)
        setTargetReached(false)
      }
    }, [])

    React.useEffect(() => {
      dispatch(tokenLogin())
      .then(res => {
        setLoading(false)
      })
    },[])

    React.useEffect(() => {
      const media = window.matchMedia(`(max-width: ${"1476"}px)`)
      media.addEventListener('change', updateTarget)
      if (media.matches) setTargetReached(true)
      return () => media.removeEventListener('change', updateTarget)
    }, [])



    if(user.loggedIn == false) {
      return <Login />
    }

  
    let navItems = [
      {
        label:'nav 1',
        icon: <MdGroups2 className='nav-icon' />
      },
      {
        label:'nav 2',
        icon: <GoPerson className='nav-icon' />
      },
      {
        label:'nav 3',
        icon: <AiFillSave className='nav-icon' />
      },
      {
        label:'nav 4',
        icon: <FaBook className='nav-icon' />
      }
    ]
    

  return (
    <>
    <MainLayout>
      <Sider trigger={null} collapsible collapsed={collapsed}
        className='sidebar-antd'
        style={{
          background: "#fff",
        }}
      >
        <Button
            type="text"
            icon={collapsed ? <RxDashboard style={{fontSize:'25px',color:'#6c757d'}} /> : <MdDashboard style={{fontSize:'25px',color:'#6c757d'}} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: '100%',
              height: 64,
            }}
          />
        <div className="d-flex flex-column align-items-center">
            <ul className='nav-ul text-center'>
              {
                navItems.map((item,index) => (
                  <li key={index} className={activeItem === index ? `nav-ul-item active` : `nav-ul-item`} onClick={() => setActiveItem(index)}>
                    {item.icon}
                  </li>
                ))
              }
            </ul>
        </div>
      </Sider>
      <MainLayout>
        
        <Header
        className='header-antd'
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="shadow-fix"></div>
          <h2><b className='custom-h2 ms-3'>EDO</b> Customer Profiling Portal</h2>
          <div className='d-flex align-items-center'>
            <p className='text-muted'>Test User</p>
            <MdNotificationsActive className='header-icon' />
            <BsList className='header-icon' />
          </div>
        </Header>
        <Content
          style={{
            margin: '5px 0px',
            // padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </MainLayout>
    </MainLayout>
    </>
  )
}




export default Layout;