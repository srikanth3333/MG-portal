import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function getSum(array, column) {
    let values = array.map((item) => parseInt(item[column]) || 0)
    return values.reduce((a, b) => a + b)
}

export const getltisSummary = createAsyncThunk('readings/getReadingsSummary', 
	async (payload, {getState}) => {
        let {users} = getState();
        // return await axios.get(`https://mr.bharatsmr.com/SBPDCL/MeterReading?isJson=true&page=${payload.page}`)
        return await axios.get(`https://mr.bharatsmr.com/dashboard/ltisStatus?filter=${users.agency}&boardCode=${users.boardCode}`)
        .then(res => {
            try{
                let result = users.sectionNames.reduce((acc,val) => {
                    return {...acc, [val.id]: {"name": val.area_name}}
                }, {})
                let data = res.data.reduce((acc,d,index) => {
                    return {...acc, [index]:{total:d.total,section:d.section,sectionName:result[d.section] && result[d.section].name ? result[d.section].name :'unknown',true:d.true,false:d.false,total:parseInt(d.true)+parseInt(d.false)}}
                },{}) 
                return {data:Object.values(data)}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const ltisSummarySlice = createSlice({
	name: 'ltisSummary',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
        billed:0,
        unBilled:0,
    },
	extraReducers: {
		[getltisSummary.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getltisSummary.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.count = action.payload.count
            state.billed = action.payload.billed
            state.unbilled = action.payload.unbilled
		},
		[getltisSummary.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default ltisSummarySlice.reducer;