import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getGraph = createAsyncThunk('graph/getGraph', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/mrAnalysisExport?startDate=${users.startDate}&endDate=${users.endDate}&subDiv=${payload.subDiv}&sectionCode=${payload.section}&readingStatus=${payload.parameter}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                return {data: res.data, startDate: payload.startDate, 
                        endDate: payload.endDate,section:payload.section, 
                        parameter: payload.parameter,
                        subDiv: payload.subDiv}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const graphSlice = createSlice({
	name: 'graphs',
	initialState: {
        loading: true,
        error: false,
        startDate: '',
        endDate: '',
        data: [],
        section:'',
        parameter:'',
        subDiv:''
    },
	extraReducers: {
		[getGraph.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getGraph.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.startDate = action.payload.startDate
            state.endDate = action.payload.endDate
            state.section = action.payload.section
            state.parameter = action.payload.parameter
            state.subDiv = action.payload.subDiv
		},
		[getGraph.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default graphSlice.reducer;