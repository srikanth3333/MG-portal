import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getESection = createAsyncThunk('exp/getESection', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/exceptions/section?subDiv=${payload.section}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                return {data: res.data,}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const eSectionSlice = createSlice({
	name: 'exp',
	initialState: {
        loading: true,
        error: false,
        startDate: '',
        endDate: '',
        data: [],
    },
	extraReducers: {
		[getESection.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getESection.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getESection.rejected]: (state,action) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default eSectionSlice.reducer;