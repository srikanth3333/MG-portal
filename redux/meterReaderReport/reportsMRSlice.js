import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReports = createAsyncThunk('reports/getReportsMR', 
	async (payload, {getState}) => {
		let {users} = getState();		
		return await axios.get(`https://mr.bharatsmr.com/dashboard/mrAnalysisExport?startDate=${users.startDate}&endDate=${users.endDate}&mrid=${payload.mrid}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                return {data:res.data,startDate: payload.startDate, endDate: payload.endDate}
            }catch(e){ 
                return {data:[],startDate:'',endDate:''}
            }
        })
	}
)

export const reportsMRSlice = createSlice({
	name: 'reportsMR',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
		startDate: '',
		endDate:''
    },
	extraReducers: {
		[getReports.pending]: () => {
			return {loading:true,error:false}
		},
		[getReports.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
            state.startDate = action.payload.startDate
            state.endDate = action.payload.endDate
		},
		[getReports.rejected]: (action) => {
			return {loading:false,error:'Something went wrong'}
		},
	}
	
});

export default reportsMRSlice.reducer;