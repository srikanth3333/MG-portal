import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const getMrDIndi = createAsyncThunk('mr/getMrData', 
	async (payload, {getState}) => {
		let {users} = getState();
		return await axios.get(`http://localhost:5000/dashboard/mrPerformanceIndividual?startDate=${users.startDate}&endDate=${users.endDate}&page=${payload.page}`)
		.then(res => {
            console.log(res)
			return {data:res.data,count:res.data.length}
		})
	}
)

export const individualMrSlice = createSlice({
	name: 'getMr',
	initialState: {
		data: [],
		loading: true,
		error:false,
		count:0,
		startDate:"",
		endDate:"",
		getMrData:[],
		ids:null,
	},
	extraReducers: {
		[getMrDIndi.pending]: (state) => {
			state.loading = true,
			state.error = false
		},
		[getMrDIndi.fulfilled]: (state, action) => {
			state.loading = false,
			state.error = false,
			state.data = action.payload.data
			state.count = action.payload.count
		},
		[getMrDIndi.rejected]: (state) => {
			state.loading = false,
			state.error = 'Unable to fetch data please try again later'
		},
	}
});

export default individualMrSlice.reducer;