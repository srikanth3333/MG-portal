import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getConsumerCounts = createAsyncThunk('getConsumer/getConsumerCounts', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`http://localhost:5000/dashboard/consumerWiseCounts?startDate=${users.startDate}&endDate=${users.endDate}&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            console.log(res)
            try{
                return {data:res.data,count:res.data.length}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const consumerSlice = createSlice({
	name: 'consumerSlice',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
    },
	extraReducers: {
		[getConsumerCounts.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getConsumerCounts.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getConsumerCounts.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default consumerSlice.reducer;