import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMrid = createAsyncThunk('mrid/getMrid', 
	async (payload,{getState}) => {
		let {users,division} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/mrid?${payload.mrid}&startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}`)
		.then(res => {
            console.log('respd')
            console.log(res)
			return {data:res.data}
		})
		
		
	}
)

export const mridSlice = createSlice({
	name: 'mrid',
	initialState: {
        data:[],
        loading:true,
        error:false
    },
	extraReducers: {
		[getMrid.pending]: (state) => {
			state.loading = true,
			state.error = false
		},
		[getMrid.fulfilled]: (state, action) => {
			state.loading = false
			state.error = false
			state.data = action.payload.data
		},
		[getMrid.rejected]: (state) => {
            state.loading = false,
			state.error = true
		},
	}
	
});

export default mridSlice.reducer;