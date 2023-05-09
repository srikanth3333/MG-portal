import React,{useState} from 'react';
import {Input, Button, InputNumber, Divider} from "antd";
import { UserOutlined,SecurityScanOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {getUser,verifyOtp} from '../redux/auth/userSlice';
import { useRouter } from 'next/router';

function Login() {

 const [passwordVisible, setPasswordVisible] = React.useState(false);
 const router = useRouter();
 const [mobile,setMobile] = useState("")
 const [otp,setOtp] = useState("")
 const user = useSelector((state) => state.users)

 const dispatch = useDispatch()

 const [handleState,setHandleState] = useState(false);


 const handleClick = () => () => {
   setHandleState(true);
 };

 const handleClose = () => {
   setHandleState(false);
 };
 
 const handleSubmit = (e) => {
   e.preventDefault();
   if(!mobile || otp.mobile < 10) {
       setHandleState(true)
       return;
   }
   dispatch(getUser({
     mobileNo: mobile
   }))
 }

 const handleOtp = (e) => {
   e.preventDefault();
   if(!otp || otp.length < 4) {
       setHandleState(true)
       return;
   }
   dispatch(verifyOtp({
     mobileNo: user.dataUser.mobileNo,
     otp: otp
   }))
 }


  return (
    <div className="login" style={{backgroundImage: `linear-gradient(101.21deg, rgba(247, 197, 20, 0.76) 29.59%, rgba(235, 128, 2, 0.76) 62.85%),url("./img/banner-bg.png")`}}>
        <div className="container">
            <div className="row text-center justify-content-center">
                <div className="col-lg-6">
                    <h5 className="text-login">Welcome to Bharat Smart Services Platform</h5>
                    <div className="mt-4 px-login">
                        <div className="card py-4" style={{backgroundColor:'#F8FAFC'}}>
                            <div className="card-body">
                                <h6 className="mb-3">Sign In</h6>
                                <Divider />
                                {
                                    user.otpView == true ?
                                    <>
                                        <p className=" text-center card-text-login my-4">Enter OTP</p>
                                        <form className="form" onSubmit={handleOtp}>
                                            <div className="form-group">
                                                <Input size="large" onChange={(e) => {
                                                    setOtp(e.target.value)
                                                }} value={otp} placeholder="Enter OTP" prefix={<SecurityScanOutlined />} />
                                            </div>
                                            <div className="form-group">
                                                <Button htmlType='submit' type="primary">Submit</Button>
                                            </div>
                                        </form>
                                    </>
                                    :
                                    <>
                                        <p className=" text-center card-text-login my-4">Enter Mobile Number</p>
                                        <form className="form" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <Input size="large" onChange={(e) => {
                                                    setMobile(e.target.value)
                                                }} value={mobile} placeholder="Mobile Number" prefix={<UserOutlined />} />
                                            </div>
                                            <div className="form-group">
                                                <Button htmlType='submit' type="primary">Submit</Button>
                                            </div>
                                        </form>
                                    </>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login