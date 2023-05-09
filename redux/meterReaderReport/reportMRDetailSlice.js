import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReportsDetail = createAsyncThunk('reports/getReportsDetail', 
	async (payload, {getState}) => {
		let {users,reports} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/mrAnalysisSummaryReadings?${payload.query}&startDate=${reports.startDate}&endDate=${reports.endDate}&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                return {data:res.data,count: res.data.length}
            }catch(e){ 
                return {data:[],count:0}
            }
        })
	}
)

export const reportMRDetailSlice = createSlice({
	name: 'reportsDetailSlice',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0
    },
	extraReducers: {
		[getReportsDetail.pending]: (state) => {
			state.loading = true
			state.error = false
		},
		[getReportsDetail.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getReportsDetail.rejected]: (state) => {
			state.loading = false
			state.error = 'Unable to fetch data please try again later'
		},
	}
	
});

export default reportMRDetailSlice.reducer;