import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Button,Input,Checkbox } from 'antd'
import { RxDashboard } from 'react-icons/rx';
import { BsFilterSquareFill } from 'react-icons/Bs';
import { AiFillSave } from 'react-icons/Ai';
import { AiOutlineShareAlt } from 'react-icons/Ai';
import { MdPersonSearch } from 'react-icons/Md';

function MainCard({children}) {


    const [activeItem, setActiveItem] = React.useState(0);

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
      

  return (
    <>
        <h5>AUDIENCES</h5>
        <div className="bg-white main-card p-3">
            <div className="card">
                <div className="card-header">
                    <div className="d-flex w-100 justify-content-between align-items-center flex-wrap">
                        <h4 className="card-header-text">Default</h4>
                        <div className="d-flex align-items-center flex-wrap">
                            <p className="text-white border-end pe-2">Last Profile Date: 27th, may 2020</p>
                            <Button
                                    type="text"
                                    icon={<AiFillSave />}
                                    // onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        color: '#fff',
                                    }}
                            >
                                <span className='px-1'>Save</span>
                            </Button>
                            <Button
                                    type="text"
                                    icon={<AiOutlineShareAlt />}
                                    // onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        color: '#fff',
                                    }}
                                    disabled
                            >
                                <span className='px-1'>Share</span>
                            </Button>
                            <Button
                                    type="text"
                                    icon={<MdPersonSearch />}
                                    // onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        color: '#fff',
                                    }}
                                    disabled
                            >
                                <span className='px-1'>Audience Discovery</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="inner-header border">
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="d-flex border-end px-3 py-3 border-2 border-muted">
                                <BsFilterSquareFill style={{fontSize:'30px',color:'#5668A1'}} />
                                <Button
                                            type="primary"
                                            className='ms-2'
                                    >
                                    Edit Filter
                                </Button>
                            </div>
                            <div className="d-flex align-items-center justify-content-between w-100 px-4">
                                <p className=''>{`{{Total_Reload_Amount Less Than 100}}`}</p>
                                <Input size="large" className='bg-muted' style={{width:'200px'}} placeholder="Search" prefix={<SearchOutlined />} />
                            </div>
                        </div>
                    </div>  
                    <div className="main-content p-4">
                        <div className="border-muted border border-2">
                            <div className="main-content-header d-flex">
                                <div onClick={() => setActiveItem(0)} className={activeItem == 0 ? `main-content-header-text active d-flex px-3 py-3 mx-3` : `main-content-header-text d-flex px-3 py-3 mx-3`}>
                                    <RxDashboard style={{fontSize:'20px'}} />
                                    <h3  className="ms-2 content-text">Insights</h3>
                                </div>
                                <div onClick={() => setActiveItem(1)} className={activeItem == 1 ? `main-content-header-text active d-flex px-3 py-3 mx-3` : `main-content-header-text d-flex px-3 py-3 mx-3`}>
                                    <RxDashboard style={{fontSize:'20px'}} />
                                    <h3  className="ms-2 content-text">Preview and Export</h3>
                                </div>
                            </div>
                        </div>
                        <div className="sub-view p-3">
                            <span className="text-black me-2"><b>Select View:</b></span>
                            <Checkbox onChange={onChange}>Subscriber</Checkbox>
                            <Checkbox onChange={onChange}>Customer</Checkbox>
                        </div>
                        <div className="filter-view p-3 border-end border-top border-start border-2 border-muted">
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <RxDashboard style={{fontSize:'20px'}} />
                                    <p className='mp-h1 ms-1'>Audience Size: <span className='color-orange'>62,345</span></p>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <Button className='me-2' type="outlined" icon={<RxDashboard />}
                                        style={{
                                            color: '#FF6D00',
                                            borderColor: '#FF6D00',
                                            borderRadius: '5px'
                                          }}
                                    >
                                        <span className='text-black ms-1'>Add Insights</span>
                                    </Button>
                                    <Button type="primary" icon={<RxDashboard />} />
                                    <Button type="text" icon={<RxDashboard />} />
                                </div>
                            </div>
                        </div>
                        <div className='children-content border-end border-bottom border-start border-2 border-muted p-4'>
                            {children}
                        </div>
                    </div>  
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default MainCard