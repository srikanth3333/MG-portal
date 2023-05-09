import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReportsAgy = createAsyncThunk('report/reportsAgy', 
	async (payload, {dispatch}) => {
        let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/subDiv?filter=A-QUESS&boardCode=${payload.boardCode}&startDate=${users.startDate}&endDate=${users.endDate}`)
        .then(res => {
            try{
                let countLK = 0;
                let countOK = 0;
                let countMD = 0;
                let quessData = res.data.reduce((acc, d) => {
                    return {name:"A-QUESS",LK: d.LK + countLK, OK: d.OK + countOK, MD: d.MD + countMD, total: d.LK + d.OK + d.MD}
                }, {})
                return quessData
            }catch(e){
                return {quessData:[]}
            }
        })
	}
)


export const getReportsData = createAsyncThunk('reports/getReportsData', 
	async (payload, {getState}) => {
        let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/agencywisereport?filter=&boardCode=${users.boardCode}&startDate=${users.startDate}&endDate=${users.endDate}`)
        .then(res => {
            try{
               console.log('abhi')
               console.log(res)
                return {data: res.data}
            }catch(e){
                return {data:[]}
            }
        })
	}
)


export const getReportsAgyMega = createAsyncThunk('report/reportsAgyMegas', 
	async (payload) => {
        let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/subDiv?filter=A-MEGA&boardCode=${payload.boardCode}&startDate=${users.startDate}&endDate=${users.endDate}`)
        .then(res => {
            try{
                
                let countLK = 0;
                let countOK = 0;
                let countMD = 0;
                let megaData = res.data.reduce((acc, d) => {
                    if(d.OK) {
                        countOK += d.OK
                    }
                    if(d.LK) {
                        countLK += d.LK
                    }
                    if(d.MD) {
                        countMD += d.MD
                    }
                    return {name:"A-MEGA",LK: countLK, OK:countOK, MD: countMD, total: countLK + countOK + countMD}
                }, {})
                return megaData
            }catch(e){
                return {megaData:[]}
            }
        })
	}
)

export const getReportsAgyLtis = createAsyncThunk('report/reportsAgyLtis', 
	async (payload) => {
        let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/subDiv?filter=C-LTIS&boardCode=${payload.boardCode}&startDate=${users.startDate}&endDate=${users.endDate}`)
        .then(res => {
            try{
                let countLK = 0;
                let countOK = 0;
                let countMD = 0;
                let ltisData = res.data.reduce((acc, d) => {
                    if(d.OK) {
                        countOK += d.OK
                    }
                    if(d.LK) {
                        countLK += d.LK
                    }
                    if(d.MD) {
                        countMD += d.MD
                    }
                    return {name:"C-LTIS",LK: countLK, OK:countOK, MD: countMD, total: countLK + countOK + countMD}
                }, {})
                return ltisData
            }catch(e){
                return {ltisData:[]}
            }
        })
	}
)

export const getReportsAgyRrf = createAsyncThunk('report/reportsAgyRrf', 
	async (payload) => {
        let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/subDiv?filter=A-RRF&boardCode=${payload.boardCode}&startDate=${users.startDate}&endDate=${users.endDate}`)
        .then(res => {
            try{
                let countLK = 0;
                let countOK = 0;
                let countMD = 0;
                let rrfData = res.data.reduce((acc, d) => {
                    if(d.OK) {
                        countOK += d.OK
                    }
                    if(d.LK) {
                        countLK += d.LK
                    }
                    if(d.MD) {
                        countMD += d.MD
                    }
                    return {name:"A-RRF",LK: countLK, OK:countOK, MD: countMD, total: countLK + countOK + countMD}
                }, {})
                return rrfData
            }catch(e){
                return {rrfData:[]}
            }
        })
	}
)


export const getReportsAgyIkya = createAsyncThunk('report/reportsAgyIkya', 
	async (payload) => {
        let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/subDiv?filter=IKYA-RURAL&boardCode=${payload.boardCode}&startDate=${users.startDate}&endDate=${users.endDate}`)
        .then(res => {
            try{
                let countLK = 0;
                let countOK = 0;
                let countMD = 0;
                let ikyaData = res.data.reduce((acc, d) => {
                    if(d.OK) {
                        countOK += d.OK
                    }
                    if(d.LK) {
                        countLK += d.LK
                    }
                    if(d.MD) {
                        countMD += d.MD
                    }
                    return {name:"IKYA",LK: countLK, OK:countOK, MD: countMD, total: countLK + countOK + countMD}
                }, {})
                return ikyaData
            }catch(e){
                return {ikyaData:[]}
            }
        })
	}
)

export const getReportsAgyIngi = createAsyncThunk('report/reportsAgyIngi', 
	async (payload) => {
        let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/subDiv?filter=DATA INGENIOUS&boardCode=${payload.boardCode}&startDate=${users.startDate}&endDate=${users.endDate}`)
        .then(res => {
            try{
                let countLK = 0;
                let countOK = 0;
                let countMD = 0;
                let ingiData = res.data.reduce((acc, d) => {
                    if(d.OK) {
                        countOK += d.OK
                    }
                    if(d.LK) {
                        countLK += d.LK
                    }
                    if(d.MD) {
                        countMD += d.MD
                    }
                    return {name:"Ingi",LK: countLK, OK:countOK, MD: countMD, total: countLK + countOK + countMD}
                }, {})
                return ingiData 
            }catch(e){
                return {ingiData :[]}
            }
        })
	}
)

export const getReportsAgyFluent = createAsyncThunk('report/reportsAgyFluent', 
	async (payload) => {
        let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/subDiv?filter=FLUENTGRID&boardCode=${payload.boardCode}&startDate=${users.startDate}&endDate=${users.endDate}`)
        .then(res => {
            try{
                let countLK = 0;
                let countOK = 0;
                let countMD = 0;
                let fluentData = res.data.reduce((acc, d) => {
                    if(d.OK) {
                        countOK += d.OK
                    }
                    if(d.LK) {
                        countLK += d.LK
                    }
                    if(d.MD) {
                        countMD += d.MD
                    }
                    return {name:"Fluent",LK: countLK, OK:countOK, MD: countMD, total: countLK + countOK + countMD}
                }, {})
                return fluentData
            }catch(e){
                return {fluentData:[]}
            }
        })
	}
)

export const reportsAgySlice = createSlice({
	name: 'reportsAgy',
	initialState: {
        loading: true,
        error: false,
        quessData: [],
        megaData: [],
        ltisData: [],
        rrfData: [],
        ikyaData: [],
        ingiData: [],
        fluentData: [],
        data: [],
    },
	extraReducers: {
		[getReportsAgy.pending]: (state) => {
            state.loading = true
            state.error = false
		},
        [getReportsAgyRrf.pending]: (state, action) => {
			state.loading = true
            state.error = false
		},
		[getReportsAgyRrf.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.rrfData = action.payload
		},
        [getReportsAgy.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.quessData = action.payload
		},
        [getReportsAgyMega.pending]: (state, action) => {
			state.loading = true
            state.error = false
		},
        [getReportsAgyMega.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.megaData = action.payload
		},
        [getReportsAgyLtis.pending]: (state, action) => {
			state.loading = true
            state.error = false
		},
        [getReportsAgyLtis.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.ltisData = action.payload
		},
        [getReportsAgyIkya.pending]: (state, action) => {
			state.loading = true
            state.error = false
		},
        [getReportsAgyIkya.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.ikyaData = action.payload
		},
        [getReportsAgyIngi.pending]: (state, action) => {
			state.loading = true
            state.error = false
		},
        [getReportsAgyIngi.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.ingiData = action.payload
		},
        [getReportsAgyFluent.pending]: (state, action) => {
			state.loading = true
            state.error = false
		},
        [getReportsAgyFluent.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.fluentData = action.payload
		},
        [getReportsData.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getReportsAgy.rejected]: (state, action) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default reportsAgySlice.reducer;