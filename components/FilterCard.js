import {useEffect, useState} from 'react';
import { Input,Select, DatePicker,Button, Spin, message } from 'antd';
import {useDispatch} from 'react-redux';
import {addFilters} from "../redux/auth/userSlice";
import Download from "./Download";
import moment from 'moment';
import Messages from "./Messages";
import { useRouter } from 'next/router';
import  {ArrowLeftOutlined} from '@ant-design/icons';


function FilterCard({title,objectData,paginateApi,data,finalCount,
                    download,db,selectLoading,staticData,dataDownload,
                    colFix,back,label,autoChange,multipleApis}) {

  const [objArr, setObjArr] = useState(objectData)
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter()

  let dispatch = useDispatch();
  
  const onChangeHandler = (val,lop) => {
    setObjArr({...objArr, [lop]:val})
    if(autoChange == true) {
        dispatch(paginateApi({...objArr, [lop]:val}))
        dispatch(addFilters({"data":{...objArr, [lop]:val}}))
    }
  }


  const handleReset = () => {
    
    if(multipleApis && multipleApis.length > 0) { 
        multipleApis.map((api) => {
            setObjArr(objectData)
            dispatch(api(objectData))
        })
    }else {
        setObjArr(objectData)
        dispatch(paginateApi(objectData))
    }
    setShowMessage(true)
    setTimeout(() => {
        setShowMessage(false)
    }, 2000)
  }

  const handleSubmit = () => {
    if(multipleApis && multipleApis.length > 0) { 
        // console.log(objArr)
        // return;
        multipleApis.map((api) => {
            dispatch(api(objArr))
            dispatch(addFilters({"data":objArr}))
        })
    }else {
        dispatch(paginateApi(objArr))
        dispatch(addFilters({"data":objArr}))
    }
  }

  return (
    <>
        {showMessage && <Messages type='success' messageText="Reset was successful" />}
        <div className="row align-items-end">
            <div className="col-lg-12">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    {
                        back == false ? null :
                        <div className="d-flex align-items-center">
                            <ArrowLeftOutlined  className="mb-2 me-2" style={{fontSize:'1.2em'}} onClick={() => router.back()} />
                            <h3 className="filter-card-title">{title}</h3>
                        </div>
                    }
                    {
                     download == null ? null : download == false
                     ? <Download dataDownload={dataDownload} download={download} 
                        apiObject={objArr} finalCount={finalCount} /> :
                        download == true ?
                       <Download dataDownload={dataDownload} download={download} 
                                apiObject={objArr} finalCount={finalCount} /> : null
                    }
                </div>
            </div>
            {
                data && data.map((item, i) => {
                    if(item.type == "text") {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <Input placeholder={item.label} 
                                           allowClear
                                           value={objArr && objArr[item.value]}
                                           onChange={(val) => onChangeHandler(val.target.value,item.value)} 
                                    />
                                </div>
                            </>
                        )
                    }else if(item.type == "select") {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                <label htmlFor="">{item.label}</label>
                                    {
                                        staticData == true
                                        ?
                                            <Select
                                                allowClear
                                                placeholder={item.label}
                                                showSearch
                                                value={objArr && objArr[item.value]}
                                                style={{ width: '100%' }}
                                                onChange={(val) => onChangeHandler(val,item.value)}
                                                >
                                                {
                                                    item.filterList?.map((val, index) => (
                                                        <Select.Option value={val} key={index}> 
                                                            {val}
                                                        </Select.Option>
                                                    ))
                                                }
                                                
                                            </Select>
                                        :
                                        <Select
                                            allowClear
                                            showSearch
                                            loading={selectLoading}
                                            value={objArr && objArr[item.value]}
                                            style={{ width: '100%' }}
                                            notFoundContent={selectLoading ? <Spin size="small" /> : null}
                                            onChange={(val) => onChangeHandler(val,item.value)}
                                            >
                                            {
                                                selectLoading ?
                                                    <Select.Option style={{textAlign: 'center'}}> 
                                                        <Spin size="small" />
                                                    </Select.Option>
                                                : item.filterList?.map((val, index) => (
                                                    <Select.Option value={val} key={index}> 
                                                        {val}
                                                    </Select.Option>
                                                ))
                                            }
                                            
                                        </Select>
                                    }
                                    
                                </div>
                            </>
                        )
                    }else if(item.type === 'date') {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    {label == false ? null : <label htmlFor="">{item.label}</label>}
                                    <DatePicker  
                                        allowClear
                                        placeholder={item.label}
                                        value={objArr && objArr[item.value] != "" && objArr[item.value] != "Invalid date" ? moment(objArr && objArr[item.value]) : ""}
                                        format="DD-MM-YYYY" 
                                        style={{width:'100%'}} 
                                        onChange={(date,dateString) => {
                                            let finalDate = moment(date).format('YYYY-MM-DD')
                                            if(finalDate == "Invalid date") {
                                                return onChangeHandler('',item.value)
                                            }else {
                                                return onChangeHandler(finalDate,item.value)
                                            }
                                        }} />
                                </div>
                            </>
                        )
                    }
                })
            }
            <div className={!colFix ? 'col-lg-3' : colFix}>
                {/* <label htmlFor="">&nbsp;</label> <br /> */}
                {data.length > 0  ? <Button type="primary" className='me-3'  onClick={handleSubmit}>
                    Submit
                </Button> : null}
                {data.length > 0  ? <Button type="danger"  onClick={handleReset}>
                    Reset Filters
                </Button> : null}
            </div>
        </div>
    </>
  )
}

export default FilterCard