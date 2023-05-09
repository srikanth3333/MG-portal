import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEArea = createAsyncThunk('exp/getEArea', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/exceptions/area?sectionCode=${payload.sectionCode}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                console.log(res)
                return {data: res.data}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const eAreaSlice = createSlice({
	name: 'exp',
	initialState: {
        loading: true,
        error: false,
        data: [],
    },
	extraReducers: {
		[getEArea.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getEArea.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getEArea.rejected]: (state,action) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default eAreaSlice.reducer;