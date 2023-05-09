import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSkippedData = createAsyncThunk('readings/skippedData', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/skippedDataDetail?page=${payload.page}&reason=${payload.reason}&boardCode=${users.boardCode}&mobileNo=${payload.mobileNo}&startDate=${users.startDate}&endDate=${users.endDate}`)
        .then(res => {
            
            try{
                
                return {data:res.data.data,count:res.data.data.length,total:res.data.data.total}
            }catch(e){ 
                return {data:[],count:0,total:0}
            }
        })
	}
)


export const getSkippedGraphData = createAsyncThunk('readings/skippedGraphData', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/skippedGraphData?reason=${payload.reason}&boardCode=${users.boardCode}&uidNo=${payload.uidNo}&mobileNo=${payload.mobileNo}&startDate=${users.startDate}&endDate=${users.endDate}`)
        .then(res => {
            try{
                console.log(res)
                let respData = res.data.reduce((acc,d,index) => {
                    return {...acc, [index]:{id:d.mobileNo,consumerCount:d.count,remark:d.remark}}
                })
                return {graphData:Object.values(respData),count:res.data.length,total:res.data.total}
            }catch(e){ 
                return {graphData:[]}
            }
        })
	}
)

export const skippedDataSlice = createSlice({
	name: 'skippedData',
	initialState: {
        loading: true,
        error: false,
        data: [],
        graphData:[],
        total:0,
        count: 0,
    },
	extraReducers: {
		[getSkippedData.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getSkippedData.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.total =  action.payload.total
            state.count = action.payload.count
		},
        [getSkippedGraphData.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.graphData = action.payload.graphData
		},
		[getSkippedData.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default skippedDataSlice.reducer;