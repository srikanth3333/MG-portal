import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReports = createAsyncThunk('reports/getReportsMRS', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/meterReaderStatusData?startDate=${users.startDate}&endDate=${users.endDate}&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                return {data:res.data.list,count:res.data.list.length}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const mrReportSlice = createSlice({
	name: 'mrReportSlice',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
    },
	extraReducers: {
		[getReports.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getReports.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getReports.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default mrReportSlice.reducer;