import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getConsumer = createAsyncThunk('user/getConsumer', 
	async (payload,{getState}) => {
		let {users} = getState();
		let resp = await axios.get(`https://mr.bharatsmr.com/SBPDCL/MeterReadingSummary?search=${payload.consumer}&isJson=true&filter=${users.agency}&boardCode=${users.boardCode}&startDate=${users.startDate}&endDate=${users.endDate}&page=${payload.page}`)
		let consumer = resp.data.mSummaryData
        let consumerMeterData = resp.data.meterDataMap
		return {consumer, consumerMeterData}
	}
)

export const consumerSlice = createSlice({
	name: 'consumer',
	initialState: {
        loading: true,
        error: false,
        data: [],
        mapData: [],
        count: 0,
    },
	extraReducers: {
		[getConsumer.pending]: (state) => {
			state.loading = true
			state.error = false
		},
		[getConsumer.fulfilled]: (state, action) => {
			state.loading = false
			state.data = action.payload.consumer
			state.mapData = action.payload.consumerMeterData
		},
		[getConsumer.rejected]: () => {
			state.loading = false
			state.error = 'Unable to fetch data please try again later'
		},
	}
	
});

export default consumerSlice.reducer;