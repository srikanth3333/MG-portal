import React, { useEffect } from 'react';
import { Breadcrumb, Input } from 'antd';
import { SearchOutlined, UserOutlined,AlignLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Select } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {logout, updateData} from '../redux/auth/userSlice';
import {getAgency} from "../redux/agencyCounts/agencySlice";
import FilterCard from './FilterCard';
import {dateFilters} from "../redux/auth/userSlice";


function Header({activeSidebar,setActiveSidebar,targetReached}) {
 
    const user = useSelector((state) => state.users)  
    const [boardCode,setBoardCode] = React.useState(user.boardCode)
    const [agency,setAgency] = React.useState(user.agency)
    const [role,setRole] = React.useState(user.role)

    const agencyData = useSelector((state) => state.agencyCounts) 
    let dispatch = useDispatch()

    const updateBoard = (board,agy,role) => {
        dispatch(updateData({boardCode:board,agency:agy,role:role}))
    }

    useEffect(() => {
        dispatch(getAgency({startDate:"",endDate:""}))
    },[dispatch,user.agency,user.boardCode,user.startDate,user.endDate])

  let apiObject = {startDate:'', endDate:''};

  return (
    <>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
                {
                    targetReached == true ?
                        <AlignLeftOutlined className="icon" onClick={() => setActiveSidebar(!activeSidebar)} />
                    : null
                }
                <Breadcrumb className="text-white">
                    <Breadcrumb.Item>
                        <Link href="/" className="text-white">{'Home'}</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {/* <Link href="" className="text-white">{name}</Link> */}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="">
                <div className="d-flex flex-wrap align-items-center">
                    
                    {
                        user.role !== 'SAD' ?
                        <>
                            <h6 className="text-white me-3">BoardCode: {user.boardCode}</h6>
                            {
                                !user.logData.agencyArray && user.logData?.agencyArray?.length != 0
                                ?
                                    <h6 className="text-white me-3">Agency: {user.agency}</h6>
                                : 
                                <select className='form-select me-3' style={{width:220}} aria-label="Default select example"
                                        onChange={(e) => {
                                            setAgency(e.target.value)
                                            updateBoard(user.boardCode,e.target.value,user.role)
                                        }}
                                    >
                                        {
                                            user.logData?.agencyArray?.map((item,i) => (
                                                <option key={i} selected={user.agency.includes(item) ? true : false } value={item}>{item}</option>
                                            ))
                                        }

                                    </select>
                            }
                            <h6 className="text-white me-3">{user.mainRole}</h6>
                        </>

                        : <>
                            <select className='form-select' onChange={(e) => {
                                    setBoardCode(e.target.value)
                                    updateBoard(e.target.value,user.agency,user.role)
                                }}
                                style={{width:220,marginRight:'20px'}} aria-label="Default select example">
                                <option value="">Board Code</option>
                                <option selected={user.boardCode == "SBPDCL" ? true : false } value="SBPDCL">SBPDCL</option>
                                <option selected={user.boardCode == "NBPDCL" ? true : false } value="NBPDCL">NBPDCL</option>
                            </select>
                            <select className='form-select' style={{width:220,marginRight:'20px'}} aria-label="Default select example"
                                onChange={(e) => {
                                    setAgency(e.target.value)
                                    updateBoard(user.boardCode,e.target.value,user.role)
                                }}
                            >
                                <option value="">All Agencies Data</option>
                                {
                                    agencyData?.dropdownData?.map((item,i) => (
                                        <option key={i} selected={user.agency.includes(item.id) ? true : false } value={item.id}>{item.id}</option>
                                    ))
                                }

                            </select>
                            <select className='form-select me-3' style={{width:220}} aria-label="Default select example"
                                onChange={(e) => {
                                    setRole(e.target.value)
                                    updateBoard(user.boardCode,user.agency,e.target.value)
                                }}
                            >
                                <option value="">User Role</option>
                                <option selected={user.mainRole == "SAD" ? true : false } value="SAD">Super Admin</option>
                                <option selected={user.mainRole == "ADM" ? true : false } value="ADM">Admin</option>
                                <option selected={user.mainRole == "AGY" ? true : false } value="AGY">Agency</option>
                                <option selected={user.mainRole == "SUP" ? true : false } value="SUP">Supervisor</option>
                            </select>
                        </>
                    }
                    <button 
                        className='btn btn-danger'
                        onClick={() => {
                            dispatch(logout())
                            localStorage.clear()
                          }}
                        >Logout</button>
                </div>
            </div>
        </div>
        <div className="mt-5">
                    <FilterCard 
                        objectData={apiObject}
                        paginateApi={dateFilters}
                        download={null}
                        back={false}
                        label={false}
                        data={[
                            {label:"Start Date",type:"date", value:"startDate"},
                            {label:"End Date",type:"date", value:"endDate"},
                        ]} 
                        title=""
                    />
        </div>
    </>
  )
}

export default Header