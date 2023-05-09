import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {errorMail} from "../../utils/errorMail"

export const getAgencyCounts = createAsyncThunk('agency/getAgencyCounts', 
	async (payload, {getState}) => {
		let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/agency?startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
			console.log('respo',res)
                if(users.mainRole == 'SAD') {
					console.log('yes')
					let totalWD = 0;
					let totalWOD = 0;
					let totalconsumerCount = 0;
					let totalOK = 0;
					let totalMD = 0;
					let totalLK = 0;
					let totalMridCount = 0;
					let totalFI = 0;
					res.data.map((item) => {
						totalWD += parseInt(item.WD)
						totalWOD += parseInt(item.WOD)
						totalconsumerCount += parseInt(item.consumerCount)
						totalOK += parseInt(item.OK)
						totalMD += parseInt(item.MD)
						totalLK += parseInt(item.LK)
						totalMridCount += parseInt(item.mridCount)
						totalFI += parseInt(item.FI)
						
					})
                    return {data:res.data,countsData:{
							totalWD,totalWOD,totalconsumerCount,
							totalOK,totalMD,totalLK,totalMridCount,totalFI
					}}
                }else {
					console.log('respo','no')
                    let filteredData = users.logData?.agencyArray
                    let finalData = !filteredData ? res.data : res.data.filter((item) => filteredData.includes(item.id))
					let totalWD = 0;
					let totalWOD = 0;
					let totalconsumerCount = 0;
					let totalOK = 0;
					let totalMD = 0;
					let totalLK = 0;
					let totalMridCount = 0;
					let totalFI = 0;
					finalData.map((item) => {
						totalWD += parseInt(item.WD)
						totalWOD += parseInt(item.WOD)
						totalconsumerCount += parseInt(item.consumerCount)
						totalOK += parseInt(item.OK)
						totalMD += parseInt(item.MD)
						totalLK += parseInt(item.LK)
						totalMridCount += parseInt(item.mridCount)
						totalFI += parseInt(item.FI)
					})
                    return {data: finalData,countsData:{
							totalWD,totalWOD,totalconsumerCount,
							totalOK,totalMD,totalLK,totalMridCount,totalFI
					}}
                }

        })
		.catch((err) => {
			errorMail(JSON.stringify(err))
			return {data:[],count:0,total:0}
		})
	}
)

export const getAgency = createAsyncThunk('data/getAgencyss', 
	async (payload, {getState}) => {
		let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/agency?startDate=${users.startDate}&endDate=${users.endDate}&filter=&boardCode=${users.boardCode}`)
        .then(res => {
			console.log('rep.....',res)
			console.log(res)
            return{
				data:res.data
			}
        })
	}
)

export const agencySlice = createSlice({
	name: 'agency',
	initialState: {
		data: [],
		loading: true,
		error:false,
		countsData:null,
		dropdownData:[],
	},
	extraReducers: {
		[getAgencyCounts.pending]: (state) => {
			state.loading = true
            state.error = false
		},
		[getAgencyCounts.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
            state.countsData = action.payload.countsData
		},
		[getAgency.fulfilled]: (state, action) => {
            state.dropdownData = action.payload.data
		},
		[getAgencyCounts.rejected]: (state) => {
            state.loading = false
            state.error = "Unable to fetch data please try again later"
		},
	}
	
});

export default agencySlice.reducer;