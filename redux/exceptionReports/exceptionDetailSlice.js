import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getExceptionsDetail = createAsyncThunk('exceptions/exceptionDetail', 
	async (payload, {getState}) => {
        let {exceptions} = getState();
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/analysisReadings?mrid=${payload.mrid}&analysisRemark=${payload.remark}&startDate=${exceptions.startDate}&endDate=${exceptions.endDate}&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                
                return {data:res.data.mSummaryData,count:res.data.mSummaryData.length}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const exceptionDetailSlice = createSlice({
	name: 'exceptionDetail',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
    },
	extraReducers: {
		[getExceptionsDetail.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getExceptionsDetail.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getExceptionsDetail.rejected]: (state,action) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default exceptionDetailSlice.reducer;