import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMaps = createAsyncThunk('maps/getMaps', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/meterReaderMap?mobileNo=${payload.mobileNo}&startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                console.log(res)
                return {data:res.data,defaultMarker:res && res.data.length > 0 ? [res.data[0].lat,res.data[0].lon] : null}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const mrReportSlice = createSlice({
	name: 'getMaps',
	initialState: {
        loading: true,
        error: false,
        defaultMarker: null,
        data: [],
        count: 0,
    },
	extraReducers: {
		[getMaps.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getMaps.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.defaultMarker = action.payload.defaultMarker
		},
		[getMaps.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default mrReportSlice.reducer;