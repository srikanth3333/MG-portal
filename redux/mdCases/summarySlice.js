import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSummary = createAsyncThunk('user/getSummary', 
	async (payload, {getState}) => {
		let {users} = getState();
        return await axios.get(`http://localhost:5000/dashboard/mdCases?readingStatus=${payload.rdSummary}&startDate=${users.startDate}&endDate=${users.endDate}&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}&abnormalityStatus=${payload.status}&consumerId=${payload.consumerId}`)
        .then(res => {
            try{
                console.log(res)
				// status:res.data.abnormalityStatusValues
                return {data:res.data.mSummaryData,count:res.data.mSummaryData.length,}
            }catch(e){ 
                return {data:[],count:0,total:0}
            }
        })
	}
)

export const summarySlice = createSlice({
	name: 'summary',
	initialState: {
        loading: true,
        error: false,
        data: [],
        graphData:[],
        total:0,
        count: 0,
		status:[],
		startDate:'',
		endDate:''
    },
	reducers: {
		getDates: (state, action) => {
			state.startDate = action.payload.startDate
			state.endDate = action.payload.endDate
		},
	},
	extraReducers: {
		[getSummary.pending]: (state) => {
			state.loading = true
            state.error = false
		},
		[getSummary.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
			// state.status = action.payload.status
		},
		[getSummary.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export const { getDates } = summarySlice.actions;


export default summarySlice.reducer;