import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMrAnalysisReadings = createAsyncThunk('mrAnalysis/getMrAnalysisReadings', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/mrAnalysisSummaryReadings?skipReason=${payload.reason}&subDiv=${payload.subDiv}&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}&limitRecords=${payload.limitRecords}`)
        .then(res => {
            try{
                console.log('res')
                console.log(res)
                return {data:res.data,count:res.data.length}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const mrAnalysisReadingsSlice = createSlice({
	name: 'getMrAnalysisReadings',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
    },
	extraReducers: {
		[getMrAnalysisReadings.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getMrAnalysisReadings.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getMrAnalysisReadings.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default mrAnalysisReadingsSlice.reducer;