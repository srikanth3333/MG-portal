import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChartReportSummary = createAsyncThunk('chart/chartReportSummary', 
	async (payload, {getState}) => {
		let {chartReport} = getState();
        let{chartReportDetail} = getState();
        let {users} = getState();
        let item;
        if (chartReportDetail.remark == 'IP' ) {
            item = "Incorrect Parameter"
        } 
        if (chartReportDetail.remark == 'IR' ) {
        
            item = "Incorrect Reading"
        } if (chartReportDetail.remark == 'II' ) {
        
            item = "Invalid Image"
        } if (chartReportDetail.remark == 'MM' ) {
        
            item = "Meter Mismatch"
        } if (chartReportDetail.remark == 'PU' ) {
        
            item = "Parameter is unclear"
        } if (chartReportDetail.remark == 'SP' ) {
        
            item = "Spoof"
        } if (chartReportDetail.remark == 'UI' ) {
        
            item = "Unclear Image"
        }
        if (chartReportDetail.remark == "OK") {
            item = "OK"
        }
        return await axios.get(`https://mr.bharatsmr.com/dashboard/analysisReadings?analysisRemark=${"SP"}&mrid=${payload.mrid}&subDiv=${chartReport.subDiv}&sectionCode=${chartReport.section}&startDate=${chartReport.startDate}&endDate=${chartReport.endDate}&areaCode=${chartReport.areaCode}&page=${payload.page}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            console.log('res')
            console.log(res)
            return {data:res.data.mSummaryData,count:res.data.mSummaryData.length,analysisRemark:chartReportDetail.remark}
        })
	}
)

export const chartReportSummarySlice = createSlice({
	name: 'chartReportSummary',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
        analysisRemark:''
    },
	extraReducers: {
		[getChartReportSummary.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getChartReportSummary.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
            state.analysisRemark = action.payload.analysisRemark
		},
		[getChartReportSummary.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default chartReportSummarySlice.reducer;