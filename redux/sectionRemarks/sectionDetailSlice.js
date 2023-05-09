import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSectionDetail = createAsyncThunk('section/getSectionDetail', 
	async (payload, {getState}) => {
        let {users,sectionSummary} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/analysisReadingsExport?${payload.query}&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}&startDate=${sectionSummary.startDate}&endDate=${sectionSummary.endDate}`)
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

export const sectionDetailSlice = createSlice({
	name: 'sectionDetailSummary',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
    },
	extraReducers: {
		[getSectionDetail.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getSectionDetail.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getSectionDetail.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default sectionDetailSlice.reducer;