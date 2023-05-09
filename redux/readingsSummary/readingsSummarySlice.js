import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReadingsSummary = createAsyncThunk('readings/getReadingsSummary', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://dataview.bharatsmr.com/SBPDCL/MeterReadingSummary?isJson=true&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}&search=${payload.uid}`)
        .then(res => {
            try{
                return {data:res.data.mSummaryData,mapData:res.data.meterDataMap,count:res.data.mSummaryData.length}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const readingsSummarySlice = createSlice({
	name: 'readingsSummary',
	initialState: {
        loading: true,
        error: false,
        data: [],
        mapData:[],
        count: 0,
    },
	extraReducers: {
		[getReadingsSummary.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getReadingsSummary.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.mapData = action.payload.mapData
            state.count = action.payload.count
		},
		[getReadingsSummary.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default readingsSummarySlice.reducer;