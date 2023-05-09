import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSection = createAsyncThunk('user/getSection', 
	async (payload,{getState}) => {
		let {users,division} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/section?startDate=${users.startDate}&endDate=${users.endDate}&subDiv=${payload.subDiv}&filter=${users.agency}&boardCode=${users.boardCode}`)
		.then(res => {
			console.log('respp...')
			console.log(res)
			let result = users.sectionNames.reduce((acc,val) => {
				return {...acc, [val.id]: {"name": val.area_name}}
			}, {})
			let section = res.data.reduce((acc,d,index) => {
				return {...acc, [index]:{LK:d.LK,MD:d.MD,MDWD:d.MDWD,MDWOD:d.MDWOD,FI:d.FI,
					sectionName:result[d.id] && result[d.id].name ? result[d.id].name :'unknown',OK:d.OK,consumerCount:d.consumerCount,id:d.id,mridCount:d.mridCount,statusCodeMap:d.statusCodeMap}}
			},{}) 
			return {data:Object.values(section)}
		})
		
		
	}
)

export const sectionSlice = createSlice({
	name: 'section',
	initialState: [],
	extraReducers: {
		[getSection.pending]: () => {
			return {loading:true,error:false}
		},
		[getSection.fulfilled]: (state, action) => {
			state.loading = false,
			state.error = false
			state.data = action.payload.data
		},
		[getSection.rejected]: () => {
			return {loading:false,error:'Unable to fetch data please try again later'}
		},
	}
	
});

export default sectionSlice.reducer;