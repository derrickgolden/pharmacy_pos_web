import { createSlice } from '@reduxjs/toolkit';

const medicineListSlice = createSlice({
  name: 'medicineList',
  initialState: [],
  reducers: {
    setMedicineList: (state, action) => {      
        return action.payload;
    }
  }  
});

// Action creators for signup details
export const { setMedicineList } = medicineListSlice.actions;

export default medicineListSlice.reducer;
