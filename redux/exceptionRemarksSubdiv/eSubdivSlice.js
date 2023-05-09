import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getESubdiv = createAsyncThunk('exp/getESubdivs', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/exceptions/subdiv?div=${payload.div}&filter=${!payload.filter ?  users.agency : payload.filter}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                console.log('agy')
                console.log(res)
                return {data: res.data}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const eSubdivSlice = createSlice({
	name: 'exceptions',
	initialState: {
        loading: true,
        error: false,
        startDate: '',
        endDate: '',
        data: [],
    },
	extraReducers: {
		[getESubdiv.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getESubdiv.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getESubdiv.rejected]: (state,action) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default eSubdivSlice.reducer;