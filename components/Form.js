import {useEffect, useState} from 'react';
import { Input,Select, DatePicker,Button, Spin, message } from 'antd';
import {useDispatch} from 'react-redux';
import {addFilters} from "../redux/auth/userSlice";
import moment from 'moment';
import Messages from "./Messages";
import { useRouter } from 'next/router';


function Form({setFieldsData,title,objectData,paginateApi,data,selectLoading,staticData,colFix}) {

  const [objArr, setObjArr] = useState(objectData)
  const [showMessage, setShowMessage] = useState(false);

  let dispatch = useDispatch();
  
  const onChangeHandler = (val,lop) => {
    setFieldsData({...objArr, [lop]:val})
    setObjArr({...objArr, [lop]:val})
  }

  return (
    <>
        {showMessage && <Messages type='success' messageText="Added Successfully" />}
        <div className="row align-items-center">
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
                                    <label htmlFor="">{item.label}</label>
                                    <DatePicker  
                                        allowClear
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
        </div>
    </>
  )
}

export default Form;