import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMDCases = createAsyncThunk('md/mrMDCases', 
	async (payload,{getState}) => {
		let {users,division} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/subdiv?div=&startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}`)
		.then(res => {
            console.log('resp...')
            console.log(res)
			return {data:res.data}
		})
	}
)

export const mrMDCasesSlice = createSlice({
	name: 'mrMDCases',
	initialState: {
        data:[],
        loading:true,
        error:false
    },
	extraReducers: {
		[getMDCases.pending]: (state) => {
			state.loading = true
            state.error = false
		},
		[getMDCases.fulfilled]: (state, action) => {
			state.data = action.payload.data
            state.loading = false
            state.error = false
		},
		[getMDCases.rejected]: (state) => {
			state.loading = false
            state.error = 'Unable to fetch data please try again later'
		},
	}
	
});

export default mrMDCasesSlice.reducer;