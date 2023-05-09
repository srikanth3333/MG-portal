import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSummary = createAsyncThunk('user/getSummary', 
	async (payload, {getState}) => {
		let {users,division} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/${payload.urlPath}?${payload.rdSummary}&startDate=${users.startDate}&endDate=${users.endDate}&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
				if(payload.urlPath != "mrAnalysisSummaryReadings") {
					return {data:res.data.mSummaryData,count:res.data.mSummaryData.length}	
				}
                return {data:res.data,count:res.data.length}
            }catch(e){ 
                return {data:[],count:0,total:0}
            }
        })
	}
)

export const summarySlice = createSlice({
	name: 'summary',
	initialState: {
		data: [],
		loading: true,
		error:false,
		count:0,
		mapData:[]
	},
	extraReducers: {
		[getSummary.pending]: (state) => {
			state.loading = true,
			state.error = false
		},
		[getSummary.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getSummary.rejected]: (state) => {
			state.loading = false,
			state.error = 'Unable to fetch data please try again later'
		},
	}
	
});

export default summarySlice.reducer;