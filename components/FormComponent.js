import {useRef, useState} from 'react';
import { Input,Select, DatePicker, Spin, InputNumber, Divider, Space, Form } from 'antd';
import {useDispatch} from 'react-redux';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import Messages from "./Messages";
import axios from 'axios';
import PlusOutlined from '@ant-design/icons'

function FormComponent({title,objectData,postUrl,data,refreshApi,
    refreshApiObject,handleModal,selectLoading,staticData,colFix,edit}) {

  const [objArr, setObjArr] = useState(objectData)
  const [showMessage, setShowMessage] = useState(false);
  const [loading,setLoading] = useState(false);
  let dispatch = useDispatch();

  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  
  const onChangeHandler = (val,lop) => {
    console.log(val)
    setObjArr({...objArr, [lop]:val})
  }

  const handleSubmit = (values) => {
    // e.preventDefault();
    // return;
    setLoading(true)
    axios.post(`${postUrl}?mobileNo=${objArr.mobileNo}`, objArr)
    .then(res => {
        console.log(res)
        if(res.data.message == 'true') {
            // handleModal()
            alert("Added Successfully")
            setObjArr(objectData)
            dispatch(refreshApi(refreshApiObject))
            setLoading(false)
            form.resetFields();
        }
    })
    .catch(err => {
        console.log(JSON.stringify(err))
        alert("Something went wrong try again later")
        setLoading(false)
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    // handle form submission failure logic here
  };


  let itemData = data.map((item) => {
    let name = item.label;
    let value = !item.defaultValue ? '' : item.defaultValue;
    return {name,value}
  })

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  return (
    <>
        {showMessage && <Messages type='success' messageText="Reset was successful" />}
        <Form 
            form={form}
            name="basic"
            // initialValues={{ remember: true }}
            initialValues={{
                clientName:"test"
            }}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
            onFinish={handleSubmit} 
            className="row align-items-center" 
            fields={edit == true ? itemData : []} 
        >
            <div className="col-lg-12">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h3 className="filter-card-title">{title}</h3>
                </div>
            </div>
            {
                data && data.map((item, i) => {
                    if(item.type == "text") {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <Form.Item 
                                        name={item.label}
                                        rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                    >
                                        <Input placeholder={item.label} 
                                            allowClear
                                            //    required={true}
                                            name={item.label}
                                            value={objArr && objArr[item.value]}
                                            onChange={(val) => onChangeHandler(val.target.value,item.value)} 
                                            
                                        />
                                    </Form.Item>
                                </div>
                                
                            </>
                        )
                    }else if (item.type == "number") {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label> <br />
                                    <Form.Item name={item.label}
                                        rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                        >
                                        <InputNumber  
                                            prefix={!item.prefix ? "" : "₹"} width="400px" min={item.min} max={item.max} defaultValue={item.min} onChange={(val) => onChangeHandler(val,item.value)} 
                                            
                                        />
                                    </Form.Item>
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
                                        <Form.Item name={item.label}
                                        rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                        >
                                            <Select
                                            // required={true}
                                                allowClear
                                                placeholder={item.label}
                                                showSearch
                                                value={objArr && objArr[item.value]}
                                                style={{ width: '100%' }}
                                                onChange={(val) => onChangeHandler(val,item.value)}
                                                mode={!item.multiple ? false :"multiple"}
                                                >
                                                {
                                                    item.filterList?.map((val, index) => (
                                                        <Select.Option value={val} key={index}> 
                                                            {val}
                                                        </Select.Option>
                                                    ))
                                                }
                                                
                                            </Select>
                                        </Form.Item>
                                        :
                                        <Form.Item name={item.label}
                                        rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                        >
                                        <Select
                                            allowClear
                                            showSearch
                                            // required={true}
                                            loading={selectLoading}
                                            value={objArr && objArr[item.value]}
                                            style={{ width: '100%' }}
                                            notFoundContent={selectLoading ? <Spin size="small" /> : null}
                                            onChange={(val) => onChangeHandler(val,item.value)}
                                            mode={!item.multiple ? false :"multiple"}
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
                                        </Form.Item>
                                    }
                                    
                                </div>
                            </>
                        )
                    }else if(item.type === 'date') {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <Form.Item name={item.label}
                                    rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                    >
                                    <DatePicker  
                                        allowClear
                                        // required={true}
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
                                        </Form.Item>
                                </div>
                            </>
                        )
                    }
                })
            }
            <div className={'col-lg-12 text-center mt-3'}>
                <Button variant="primary" disabled={loading} className='py-1' type="submit">
                    Save Changes
                </Button>
            </div>
        </Form>
    </>
  )
}

export default FormComponent