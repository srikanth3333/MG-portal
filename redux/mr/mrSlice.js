import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMr = createAsyncThunk('mr/getMr', 
	async (payload, {getState, dispatch}) => {
		let {users} = getState();
		return await axios.get(`http://localhost:5000/dashboard/mrPerformanceNotOk?page=${payload.page}&startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {    
			console.log('res')
			console.log(res)
            try{
                return {data:res.data,count:res.data.length}
            }catch(e){ 
                return {data:[],count:0}
            }
        })
	}
)
export const mrSlice = createSlice({
	name: 'getMr',
	initialState: {
		data: [],
		loading: true,
		error:false,
		countsData:null,
		startDate:"",
		endDate:"",
		getMrData:[],
		ids:null,
	},
	extraReducers: {
		[getMr.pending]: (state) => {
			state.loading = true,
			state.error = false
		},
		[getMr.fulfilled]: (state, action) => {
			state.loading = false,
			state.error = false,
			state.data = action.payload.data
			state.count = action.payload.count
		},
		[getMr.rejected]: (state) => {
			state.loading = false,
			state.error = 'Unable to fetch data please try again later'
		},
	}
});

export default mrSlice.reducer;