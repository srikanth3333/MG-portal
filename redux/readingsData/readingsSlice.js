import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReadings = createAsyncThunk('readings/getReadings', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/SBPDCL/MeterReading?isJson=true&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            
            try{
                return {data:res.data.meterData,count:res.data.meterData.length}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const readingsSlice = createSlice({
	name: 'readings',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
    },
	extraReducers: {
		[getReadings.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getReadings.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getReadings.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default readingsSlice.reducer;