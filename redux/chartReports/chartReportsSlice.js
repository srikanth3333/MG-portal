import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChartReports = createAsyncThunk('charts/getChartReports', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/analysis?startDate=${users.startDate}&endDate=${users.endDate}&subDiv=${payload.subDiv}&sectionCode=${payload.section}&areaCode=${payload.areaCode}&mrid=${payload.mrid}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                if (res.data && res.data.remarkCounts) {
                    // let graphData = [];
                    // for (const [key, value] of Object.entries(res.data.remarkCounts.total)) {
                    //     // if(key == "Incorrect Reading" || key == "Invalid Image" || key == "Parameter is unclear" || key == "Meter Mismatch" || key == "Spoof" || key == "Unclear Image" || key == "Incorrect Parameter" || key == "Ok")
                    //     // {
                    //     //     graphData.push({"analysisRemark": key, "val": value})
                    //     // }

                    //     graphData.push({"analysisRemark": key, "val": value})
                        
                    // }
                    console.log(res)
                    let graphData = [];
                    for (const [key, value] of Object.entries(res.data?.remarkCounts?.total)) {
                        
                        if (key == 'IP' ) {
                            graphData.push({"analysisRemark": "Incorrect Parameter", "val": value})
                        } 
                        if (key == 'IR' ) {
                        
                            graphData.push({"analysisRemark": "Incorrect Reading", "val": value})
                        } if (key == 'II' ) {
                        
                            graphData.push({"analysisRemark": "Invalid Image", "val": value})
                        } if (key == 'MM' ) {
                        
                            graphData.push({"analysisRemark": "Meter Mismatch", "val": value})
                        } if (key == 'PU' ) {
                        
                            graphData.push({"analysisRemark": "Parameter is unclear", "val": value})
                        } if (key == 'SP' ) {
                        
                            graphData.push({"analysisRemark": "Spoof", "val": value})
                        } if (key == 'UI' ) {
                        
                            graphData.push({"analysisRemark": "Unclear Image", "val": value})
                        }
                        if (key == "OK") {
                            graphData.push({"analysisRemark": "OK", "val": value})
                        }
                        
                    }
                    
                    return {data: graphData, startDate: payload.startDate == ''? '' :payload.startDate, 
                        endDate: payload.endDate == '' ? '' : payload.endDate,section:payload.section, 
                        parameter: payload.parameter,
                        subDiv: payload.subDiv,areaCode: payload.areaCode,
                        mrid:payload.mrid}
                }
                
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const chartReportSlice = createSlice({
	name: 'charts',
	initialState: {
        loading: true,
        error: false,
        startDate: '',
        endDate: '',
        data: [],
        section:'',
        parameter:'',
        subDiv:'',
        areaCode: '',
        mrid: '',
    },
	extraReducers: {
		[getChartReports.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getChartReports.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.startDate = action.payload.startDate
            state.endDate = action.payload.endDate
            state.section = action.payload.section
            state.parameter = action.payload.parameter
            state.subDiv = action.payload.subDiv
            state.areaCode = action.payload.areaCode
            state.mrid = action.payload.mrid
		},
		[getChartReports.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default chartReportSlice.reducer;