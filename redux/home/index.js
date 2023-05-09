import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCounts = createAsyncThunk('counts/getCounts', 
	async (payload,{getState}) => {
		let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/meterreading/trends?startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}&subDiv${payload.subDiv}&category=${payload.category}&agencyId=${payload.agencyId}&sectionCode=${payload.sectionCode}&areaCode=${payload.areaCode}&mrid=${payload.mrid}`)
		.then(res => {
            console.log('respd', res)
            console.log(res)
			return {data:res.data}
		})
	}
)

export const getCountsMR = createAsyncThunk('countsData/getCountsMR',
	async (payload,{getState}) => {
		let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/meterreading/exception/trends?startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}&subDiv=${payload.subDiv}&category=${payload.category}&agencyId=${payload.agencyId}&sectionCode=${payload.sectionCode}&areaCode=${payload.areaCode}&mrid=${payload.mrid}`)
		.then(res => {
            console.log('respp', res)
            console.log(res)
			return {mrData:res.data}
		})
        .catch(err => {
            console.log(JSON.stringify(err))
        })
	}
)


export const getCountsReads = createAsyncThunk('reads/getCountsReads',
	async (payload,{getState}) => {
		let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/meterreader/reads?startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}&subDiv=${payload.subDiv}&category=${payload.category}&agencyId=${payload.agencyId}&sectionCode=${payload.sectionCode}&areaCode=${payload.areaCode}&mrid=${payload.mrid}`)
		.then(res => {
            console.log('respp', res)
            console.log(res)
			return {readsData:res.data}
		})
        .catch(err => {
            console.log(JSON.stringify(err))
        })
	}
)

export const getAbnormalities = createAsyncThunk('abnormalities/getAbnormalities',
	async (payload,{getState}) => {
		let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/abnormalities/status?startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}&subDiv=${payload.subDiv}&category=${payload.category}&agencyId=${payload.agencyId}&sectionCode=${payload.sectionCode}&areaCode=${payload.areaCode}&mrid=${payload.mrid}&limitRecords=20`)
		.then(res => {
            console.log('respp', res)
            console.log(res)
			return {abnormalitiesData:res.data}
		})
        .catch(err => {
            console.log(JSON.stringify(err))
        })
	}
)




export const index = createSlice({
	name: 'dataP',
	initialState: {
        data:[],
        mrData:[],
        readsData:[],
		abnormalitiesData:[],
        loading:true,
        error:false
    },
	extraReducers: {
		[getCounts.pending]: (state) => {
			state.loading = true,
			state.error = false
		},
		[getCounts.fulfilled]: (state, action) => {
			state.loading = false
			state.error = false
			state.data = action.payload.data
		},
        [getCountsMR.fulfilled]: (state, action) => {
			state.loading = false
			state.error = false
			state.mrData = action.payload.mrData
		},
        [getCountsReads.fulfilled]: (state, action) => {
			state.loading = false
			state.error = false
			state.readsData = action.payload.readsData
		},
		[getAbnormalities.fulfilled]: (state, action) => {
			state.loading = false
			state.error = false
			state.abnormalitiesData = action.payload.abnormalitiesData
		},
		[getCounts.rejected]: (state) => {
            state.loading = false,
			state.error = true
		},
	}
	
});

export default index.reducer;