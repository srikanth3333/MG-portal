import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios';


export const addUser = createAsyncThunk('user/addUser', 
	async (payload, {dispatch}) => {
		const data = 
        {
            "mobileNo" : payload.mobileNo,
            "chatMobileNo": payload.chatNo,
            "name": payload.name,
            "subDiv" : payload.subDiv,
            "role" : payload.role,
            "agencyName" : payload.agencyName,
            "boardName" : payload.boardName,
        }
		axios.post(`https://mr.bharatsmr.com/dashboard/addUser?mobileNo=${mobileNo}`, data)
		.then(res => {
			if(res.data.message == "true") {
                return {success: true}
            }else {
                return {success: false}
            }
		})
		
	}
)

export const getUser = createAsyncThunk('user/getUser', 
	async (payload, {dispatch}) => {
		return await axios.get(`https://mr.bharatsmr.com/dashboard/usersList?mobileNo=${payload.mobileNo}`)
		.then(res => {
			let [user] = res.data
			if(!user) {
				alert("Not a registered User")
				return {data:null}
			}
			dispatch(sendOtp({mobileNo: payload.mobileNo}))
			return {data:user}
		})
		
	}
)


export const sendOtp = createAsyncThunk('user/sendOtp', 
	async (payload) => {
		return await axios.get(`https://mr.bharatsmr.com/sendOtp?mobileNo=${payload.mobileNo}`)
		.then(res => {
			
		})
		
	}
)

export const logout = createAsyncThunk('user/logout', 
	async () => {
		Cookies.remove('loggedIn')
		return {logStatus: false}
	}
)

export const getHierarchy = createAsyncThunk('Hierarchy/getHierarchy',
	async (payload,{getState}) => {
		let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/getHierarchy?boardCode=${users.boardCode}&subDiv=${payload.subDiv}&section=${payload.sectionCode}&area=${payload.areaCode}&agency=${payload.agencyId}&mrid=${payload.mrid}`)
		.then(res => {
            console.log('hier', res)
            console.log(res)
			return {hierarchyData:res.data}
		})
        .catch(err => {
            console.log(JSON.stringify(err))
        })
	}
)


export const tokenLogin = createAsyncThunk('user/new', 
	async (payload,{dispatch}) => {
		dispatch(getDivisionNames())
		dispatch(getSubDivisionNames())
		dispatch(getSectionNames())
		dispatch(getHierarchy({
			subDiv:'',
			section:'',
			area:'',
			agency:'',
			mrid:''
		  }))
		let mobileNo = localStorage.getItem("mobile")
		let token = localStorage.getItem("token")
		return await axios.get(`https://mr.bharatsmr.com/dashboard/usersList?mobileNo=${mobileNo}`)
		.then(res => {
			let [user] = res.data
			if(!user || !token || !mobileNo) {
				return {logStatus: false};
			}
			
			return {logData:user,logStatus:true,boardCode:user.boardCode,agencyAll:user.agency,agency:user.agencyName,role:user.role,mainRole:user.role,boardData: user && user.boardData ? user.boardData : null}
		})	
	}
)


export const updateData = createAsyncThunk('user/updateData', 
	async (payload) => {
		return {boardCode: payload.boardCode,agency: payload.agency,role: payload.role}
	}
)

export const getDivisionNames = createAsyncThunk('data/divisionNames', 
	async () => {
		return await axios.get(`/api/divNames`)
		.then(res => {
			return {divisionNames:res.data}
		})
		.catch(err => {
			console.error(JSON.stringify(err))
			return {divisionNames:[]}
		})
	}
)

export const getSubDivisionNames = createAsyncThunk('data/subDivisionNames', 
	async () => {
		return await axios.get(`/api/subdivNames`)
		.then(res => {
			return {subDivisionNames:res.data}
		})
	}
)

export const getSectionNames = createAsyncThunk('data/sectioNames', 
	async () => {
		return await axios.get(`/api/sectionNames`)
		.then(res => {
			return {sectionNames:res.data}
		})
	}
)



export const verifyOtp = createAsyncThunk('user/verifyOtp', 
	async (payload,{dispatch,getState}) => {
		let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/verifyOtp?mobileNo=${payload.mobileNo}&otp=${payload.otp}`)
		.then(res => {
			console.log(res)
			console.log(res.data.token)
			if(res.data.message == "Success") {
				localStorage.setItem("token", res.data.token)
				let mobileNo = localStorage.setItem("mobile", users.dataUser.mobileNo)
				Cookies.set('loggedIn', true)
				Cookies.set('role', users.dataUser.role)
				dispatch(getHierarchy({
					subDiv:'',
					section:'',
					area:'',
					agency:'',
					mrid:''
				  }))
				return {logStatus:true,mobileNo:mobileNo,otpView:false,loggedIn:true,boardCode:users.dataUser.boardCode,
						agency:users.dataUser.agencyName,
						role:users.dataUser.role,
						mainRole:users.dataUser.role,
						boardData: users.dataUser && users.dataUser.boardData ? users.dataUser.boardData : null,
						token:res.data.token
					}
			}else {
				alert("Wrong OTP")
				return {logStatus:false,token:token,mobileNo:mobileNo,otpView:true}
			}
		})
		
	}
)




export const userSlice = createSlice({
	name: 'users',
	initialState: {
		loading: true,
		error:'',
		dataUser: [],
		hierarchyData:[],
		loggedIn:false,
		token:'',
		otpView: false,
		token: null,
		mobileNo: '',
		logData: '',
		boardCode:'',
		agency:'',
		role:null,
		mainRole:null,
		boardData:null,
		divisionNames:[],
		subDivisionNames:[],
		sectionNames:[],
		agencyAll:'',
		startDate:'',
		endDate:'',
	},
	reducers: {
		addFilters: (state,action) => {
			state.filterObject = action.payload.data
		},
		dateFilters: (state,action) => {
			state.startDate = action.payload.startDate
			state.endDate = action.payload.endDate
		},
	},
	extraReducers: {
		[getUser.pending]: (state) => {
			state.loading = true
		},
		[getUser.fulfilled]: (state, action) => {
			state.loading = false
			state.dataUser = action.payload.data
		},
		[sendOtp.fulfilled]: (state, action) => {
			state.otpView = true
		},
		[tokenLogin.pending]: (state, action) => {
			state.loading = true
		},
		[getHierarchy.fulfilled]: (state, action) => {
			state.loading = false
			state.error = false
			state.hierarchyData = action.payload.hierarchyData
		},
		[tokenLogin.fulfilled]: (state, action) => {
			state.loading = false
			state.loggedIn = action.payload.logStatus
			state.logData = action.payload.logData
			state.boardCode = action.payload.boardCode
			state.agency = action.payload.agency
			state.agencyAll = action.payload.agencyAll
			state.role = action.payload.role 
			state.mainRole = action.payload.mainRole
			state.boardData = action.payload.boardData
 		},
		[verifyOtp.fulfilled]: (state, action) => {
			state.otpView = action.payload.otpView
			state.token = action.payload.token
			state.loggedIn = action.payload.logStatus
			state.mobileNo = action.payload.mobileNo
			state.boardCode = action.payload.boardCode
			state.agency = action.payload.agency
			state.role = action.payload.role
			state.mainRole = action.payload.mainRole
			state.boardData = action.payload.boardData
		},
		[getDivisionNames.fulfilled]: (state, action) => {
			state.divisionNames = action.payload.divisionNames
		},
		[getSubDivisionNames.fulfilled]: (state, action) => {
			state.subDivisionNames = action.payload.subDivisionNames
		},
		[getSectionNames.fulfilled]: (state, action) => {
			state.sectionNames = action.payload.sectionNames
		},
		[logout.fulfilled]: (state, action) => {
			state.loggedIn = action.payload.logStatus
		},
		[updateData.fulfilled]: (state, action) => {
			state.boardCode = action.payload.boardCode;
			state.agency = action.payload.agency;
			state.role = action.payload.role;
		},
		[getUser.rejected]: (state) => {
			state.loading = false
			state.error = 'Error'
		},
	}
	
});


export const { addFilters, dateFilters} = userSlice.actions;
export default userSlice.reducer;