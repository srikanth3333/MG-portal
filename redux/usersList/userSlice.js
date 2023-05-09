import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsersList = createAsyncThunk('users/getUsersList', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/usersList?page=${payload.page}&mobileNo=${payload.userMobileNo}`)
        .then(res => {
            try{
                return {data:res.data,count:res.data.length}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const userSlice = createSlice({
	name: 'UsersList',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
    },
	extraReducers: {
		[getUsersList.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getUsersList.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getUsersList.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default userSlice.reducer;