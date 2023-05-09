import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDataDownload = createAsyncThunk('data/getDataDownload', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`http://localhost:5000/dashboard/readingSummaryDownload?readingStatus=${payload.readingStatus}&page=${payload.page}&mrid=${payload.mrid}&subDiv=${payload.subDiv}&sectionCode=${payload.section}&areaCode${payload.areaCode}&startDate=${users.startDate}&endDate=${users.endDate}&filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                return {data:res.data,count:res.data.length}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const dataDownloadlice = createSlice({
	name: 'DataDownload',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
        paginateData: [],
    },
    reducers: {
        addData: (state, action) => {
			state.paginateData.push(action.payload.data);
		},
    },
	extraReducers: {
		[getDataDownload.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getDataDownload.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
		},
		[getDataDownload.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});


export const { addData } = dataDownloadlice.actions;

export default dataDownloadlice.reducer;