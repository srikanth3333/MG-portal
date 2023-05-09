import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChartReportDetail = createAsyncThunk('chart/ChartReportDetail', 
	async (payload, {getState}) => {
		let {chartReport} = getState();
		let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/mrAnalysis?analysisRemark=${payload.remark}&subDiv=${chartReport.subDiv}&sectionCode=${chartReport.section}&startDate=${!payload.startDate ? chartReport.startDate : payload.startDate}&endDate=${!payload.endDate ? chartReport.endDate : payload.endDate}&areaCode=${chartReport.areaCode}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            console.log('res')
            console.log(res)
            return {data:res.data.remarkCounts,count:res.data.remarkCounts.length,remark:payload.remark}
        })
        .catch(err => {
            console.log(JSON.stringify(err))
            return {data:[],count:0,remark:payload.remark}
        })
	}
)

export const chartReportDetailSlice = createSlice({
	name: 'chartReportDetail',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
        remark:'',
    },
	extraReducers: {
		[getChartReportDetail.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getChartReportDetail.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
            state.remark = action.payload.remark
		},
		[getChartReportDetail.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default chartReportDetailSlice.reducer;