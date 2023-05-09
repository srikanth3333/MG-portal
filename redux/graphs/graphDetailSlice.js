import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getGraphDetail = createAsyncThunk('graph/getGraphDetail', 
	async (payload, {getState}) => {
		let {graph} = getState();
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/mrAnalysisSummaryReadings?mrid=${payload.mrid}&readingStatus=${graph.parameter}&subDiv=${graph.subDiv}&sectionCode=${graph.section}&startDate=${graph.startDate}&endDate=${graph.endDate}&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                return {data:res.data,count:res.data.length}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const reportsDetailSlice = createSlice({
	name: 'reportsDetail',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
    },
	extraReducers: {
		[getGraphDetail.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getGraphDetail.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getGraphDetail.rejected]: (state,action) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default reportsDetailSlice.reducer;