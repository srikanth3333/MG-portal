import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getExceptions = createAsyncThunk('exceptions/exceptionList', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/analysisExport?startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                return {data: Object.values(res.data), startDate: payload.startDate, endDate: payload.endDate}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const exceptionSlice = createSlice({
	name: 'exceptions',
	initialState: {
        loading: true,
        error: false,
        startDate: '',
        endDate: '',
        data: [],
    },
	extraReducers: {
		[getExceptions.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getExceptions.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.startDate = action.payload.startDate
            state.endDate = action.payload.endDate
		},
		[getExceptions.rejected]: (state,action) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default exceptionSlice.reducer;