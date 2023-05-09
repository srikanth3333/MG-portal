import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getArea = createAsyncThunk('user/getArea', 
	async (payload,{getState}) => {
		let {users,division} = getState();
		console.log(payload.query)
		let resp = await axios.get(`https://mr.bharatsmr.com/dashboard/area?subDiv=${payload.subDiv}&sectionCode=${payload.sectionCode}&startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}`)
		let area = resp.data
		console.log('abhi')
		console.log(resp.data)
		return {area}
	}
)

export const areaSlice = createSlice({
	name: 'area',
	initialState: [],
	extraReducers: {
		[getArea.pending]: () => {
			return {loading:true,error:false}
		},
		[getArea.fulfilled]: (state, action) => {
			return {data: [...action.payload.area],loading:false,error:false}
		},
		[getArea.rejected]: () => {
			return {loading:false,error:'Unable to fetch data please try again later'}
		},
	}
	
});

export default areaSlice.reducer;