import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import {getMeterReadingStatus} from "../meterReadingStatus/index";



export const getDivisionRemarks = createAsyncThunk('division/getDivisionRemarks', 
	async (payload, {getState}) => {
		let {users,division} = getState();
		let startDate =  !payload.startDate ? '' : moment(payload.startDate).format('YYYY-MM-DD')
		let endDate = !payload.endDate ? '' : moment(payload.endDate).format('YYYY-MM-DD')
		return await axios.get(`https://mr.bharatsmr.com/dashboard/subdiv?startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}`)
		.then((res) => {
			console.log('abhi...', res)
			let divNames = users.divisionNames.reduce((acc,val) => {
				return {...acc, [val.id]: {"name": val.area_name}}
			}, {})
			let result = users.subDivisionNames.reduce((acc,val) => {
				return {...acc, [val.id]: {"name": val.area_name}}
			}, {})
			let data = res.data.reduce((acc,d,index) => {
				return {...acc, [index]:{consumerCount:d.consumerCount,WD:d.WD,
					divisionName:divNames[d.id.slice(0,3)] && divNames[d.id.slice(0,3)].name ? divNames[d.id.slice(0,3)].name :'unknown',
					subDivName:result[d.id] && result[d.id].name ? result[d.id].name :'unknown',WOD:d.WOD,
				OK:d.OK,id:d.id,MD:d.MD,MDWD:d.MDWD,MDWOD:d.MDWOD,BLR:d.BLR,DLR:d.DLR,DM:d.DM,DB:d.DB,MAH:d.MAH,PNAM:d.PNAM,RAC:d.RAC,id:d.id,mridCount:d.mridCount,LK:d.LK}}
			},{}) 
		

			return {remarksData:Object.values(data)}
		})
	}
);



export const getDivision = createAsyncThunk('user/getDivision', 
	async (payload, {getState, dispatch}) => {
		let {users} = getState();

		let startDate =  !payload.startDate ? '' : moment(payload.startDate).format('YYYY-MM-DD')
		let endDate = !payload.endDate ? '' : moment(payload.endDate).format('YYYY-MM-DD')

		return await axios.get(`https://mr.bharatsmr.com/dashboard/subdiv?startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}`)
		.then((res) => {
			dispatch(getMeterReadingStatus({subDiv:'',sectionCode:'',areaCode:'',startDate:startDate,endDate:endDate}))
			dispatch(getDivisionRemarks({startDate:startDate,endDate:endDate}))
			const reduceData = res.data.reduce((acc,d) => {
                let returnVal = d.id.slice(0,3)
                return {...acc, [d.id]: {"id":returnVal,"divisionName":d.id,"mridCount":d.mridCount,
                        consumerCount:d.consumerCount,"OK":d.OK,"LK":d.LK,"MD":d.MD,"WD":d.WD,"WOD":d.WOD,"FI":d.FI}};
            }, {});

			let result = users.divisionNames.reduce((acc,val) => {
				return {...acc, [val.id]: {"name": val.area_name}}
			}, {})
            
            let data = Object.values(reduceData)
            var msgTotal = data.reduce(function(acc, val){
                var o = acc.filter(function(obj){
                    return obj.id == val.id;
                }).pop() || {id:val.id, divisionId:val.id.slice(0,3) ,divisionName:result[val.id.slice(0,3)] && result[val.id.slice(0,3)].name ? result[val.id.slice(0,3)].name :'unknown', 
				mridCount:0, consumerCount: 0, OK:0,LK:0,MD:0,WD:0,WOD:0,FI:0};
                o.mridCount += parseInt(val.mridCount);
                o.consumerCount += parseInt(val.consumerCount);
                o.OK += parseInt(val.OK);
                o.WD += parseInt(val.WD);
                o.WOD += parseInt(val.WOD);
                o.LK += parseInt(val.LK);
                o.MD += parseInt(val.MD);
                o.FI += parseInt(val.FI);
                acc.push(o);
                return acc;
            },[]);

			
            
            var finalresult = msgTotal.filter(function(itm, i, a) {
                return i == a.indexOf(itm);
            });

			let counts = res.data.reduce(function(previousValue, currentValue) {
				return {
				  	"consumerCount": previousValue.consumerCount + currentValue.consumerCount,
					"mridCount": previousValue.mridCount + currentValue.mridCount,
					"OK": previousValue.OK + currentValue.OK,
					"LK": previousValue.LK + currentValue.LK,
					"MD": previousValue.MD + currentValue.MD,
					"WD": previousValue.WD + currentValue.WD,
					"WOD": previousValue.WOD + currentValue.WOD,
					"FI": previousValue.FI + currentValue.FI,
			   }
			})
			
			return {division:finalresult, 
					startDate:startDate,
					endDate:endDate,
					countsData:counts}
		})
	}
)




export const getMeterReadingStatusAll = createAsyncThunk('meterReadingAll/getMeterReadingStatusAll', 
	async (payload,{getState}) => {
		let {users,division} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/meterReadingPerf?boardCode=${users.boardCode}&agencyId=&subDiv=&sectionCode=&areaCode=&groupByKey=&startDate=${users.startDate}&endDate=${users.endDate}`)
		.then(res => {
			if(users.mainRole == 'SAD') {
				return {meterReadingStatusData:res.data}
			}else {
				let filteredData = users.logData?.agencyArray
				let finalData = !filteredData ? res.data.filter((item) => users.logData?.agencyName.includes(item.agencyId)) : res.data.filter((item) => filteredData.includes(item.agencyId))
				return {meterReadingStatusData:finalData}
			}
		})
	}
)


export const divisionSlice = createSlice({
	name: 'division',
	initialState: {
		data: [],
		WDData:[],
		finalresultWD:null,
		loading: true,
		error:false,
		countsData:null,
		startDate:"",
		endDate:"",
		remarksData:[],
		meterReadingStatusData:[],
	},
	extraReducers: {
		[getDivision.pending]: (state) => {
			state.loading = true,
			state.error = false
		},
		[getDivision.fulfilled]: (state, action) => {
			state.loading = false,
			state.error = false,
			state.data = action.payload.division
			state.countsData = action.payload.countsData
			state.startDate = action.payload.startDate
			state.endDate = action.payload.endDate
		},
		[getDivisionRemarks.fulfilled]: (state, action) => {
			state.loading = false,
			state.error = false,
			state.remarksData = action.payload.remarksData
		},
		[getMeterReadingStatusAll.fulfilled]: (state, action) => {
			state.loading = false,
			state.error = false,
			state.meterReadingStatusData = action.payload.meterReadingStatusData
		},
		[getDivision.rejected]: (state) => {
			state.loading = false,
			state.error = 'Unable to fetch data please try again later'
		},
	}
});

export default divisionSlice.reducer;