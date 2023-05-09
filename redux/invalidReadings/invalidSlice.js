import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInvalidReadings = createAsyncThunk('getInvalid/getInvalidReadings', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/invalidReadings?startDate=${users.startDate}&endDate=${users.endDate}&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                
                return {data:res.data,count:res.data.length}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const invalidSlice = createSlice({
	name: 'getInvalid',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
    },
	extraReducers: {
		[getInvalidReadings.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getInvalidReadings.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getInvalidReadings.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default invalidSlice.reducer;