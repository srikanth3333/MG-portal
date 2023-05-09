import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSubDivision = createAsyncThunk('div/getSubDivision', 
	async (payload, {getState}) => {
		let {users,division} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/subdiv?div=${payload.subDiv ? payload.subDiv : ''}&startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}`)
		.then(async res => {
			return {subDivision:res.data}
		})
	}
)


export const getSubDivisionData = createAsyncThunk('div/getSubDivisionData', 
	async (payload, {getState}) => {
		let {users,division} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/subdiv?div=&startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}`)
		.then(async res => {
			return {subDivisionData:res.data}
		})
	}
)

export const subDivSlice = createSlice({
	name: 'subDivision',
	initialState: {
		data: [],
		loading: true,
		error:false,
		subDivisionData:[]
	},
	extraReducers: {
		[getSubDivision.pending]: (state) => {
			state.loading = true,
			state.error = false
		},
		[getSubDivision.fulfilled]: (state, action) => {
			state.loading = false,
			state.error = false,
			state.data = action.payload.subDivision
			state.subDivisionData = action.payload.subDivisionData
		},
		[getSubDivision.rejected]: (state) => {
			state.loading = false,
			state.error = 'Unable to fetch data please try again later'
		},
	}
});

export default subDivSlice.reducer;