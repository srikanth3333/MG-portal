import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMapSummary = createAsyncThunk('map/getMapSummary', 
	async (payload, {getState}) => {
		let {users,division} = getState();
		return await axios.get(`https://dataview.bharatsmr.com/${users.boardCode}/MeterReading?board=${users.boardCode}&detail=&isJson=true&page=${payload.page}&startDate=${users.startDate}&endDate=${users.endDate}&remarks=${payload.remarks}&search=${payload.search}`)
        .then(res => {
            console.log('res',res)
            return {data:res.data.meterData,count:res.data.meterData.length}
        })
	}
)

export const index = createSlice({
	name: 'map',
	initialState: {
		data: [],
		loading: true,
		error:false,
		count:0
	},
	extraReducers: {
		[getMapSummary.pending]: (state) => {
			state.loading = true
			state.error = false
		},
		[getMapSummary.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getMapSummary.rejected]: (state) => {
			state.loading = false,
			state.error = 'Unable to fetch data please try again later'
		},
	}
	
});

export default index.reducer;