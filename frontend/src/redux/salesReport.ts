import { createSlice } from '@reduxjs/toolkit';

const salesReportSlice = createSlice({
  name: 'salesReport',
  initialState: [],
  reducers: {
    setSalesReportList: (state, action) => {      
        return action.payload;
    }
  }  
});

// Action creators for signup details
export const { setSalesReportList } = salesReportSlice.actions;

export default salesReportSlice.reducer;
