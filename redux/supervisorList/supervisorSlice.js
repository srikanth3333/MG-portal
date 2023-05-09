import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSupervisorList = createAsyncThunk('supervisor/getSupervisorList', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/usersList?role=SUP`)
        .then(res => {
            try{
                return {data:res.data,count:res.data.length}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const supervisorListSlice = createSlice({
	name: 'SupervisorList',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
    },
	extraReducers: {
		[getSupervisorList.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getSupervisorList.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getSupervisorList.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default supervisorListSlice.reducer;