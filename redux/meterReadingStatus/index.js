import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMeterReadingStatus = createAsyncThunk('meterReading/getMeterReadingStatus', 
	async (payload,{getState}) => {
		let {users,division} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/meterReadingPerf?boardCode=${users.boardCode}&agencyId=${users.agency}&subDiv=${payload.subDiv}&sectionCode=${payload.sectionCode}&areaCode=${payload.areaCode}&groupByKey=&startDate=${!division.startDate ? payload.startDate : division.startDate}&endDate=${!division.endDate ? payload.endDate : division.endDate}`)
		.then(res => {
            console.log('resp...',res)
			return {data:res.data}
		})
		.catch(err => {
			return {data:[]}
		})
	}
)

export const index = createSlice({
	name: 'MeterReadingStatus',
	initialState: {
        data:[],
        loading:true,
        error:false
    },
	extraReducers: {
		[getMeterReadingStatus.pending]: (state) => {
			state.loading = true
            state.error = false
		},
		[getMeterReadingStatus.fulfilled]: (state, action) => {
			state.data = action.payload.data
            state.loading = false
            state.error = false
		},
		[getMeterReadingStatus.rejected]: (state) => {
			state.loading = false
            state.error = 'Unable to fetch data please try again later'
		},
	}
	
});

export default index.reducer;