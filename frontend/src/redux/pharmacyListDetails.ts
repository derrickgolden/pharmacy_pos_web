
import { createSlice } from '@reduxjs/toolkit';

const pharmacyListDetailsSlice = createSlice({
  name: 'pharmacyListDetails',
  initialState: [],
  reducers: {
    setPharmacyListDetails: (state, action) => {
      console.log(action.payload);
      
        return action.payload;
    }
  }  
});

// Action creators for signup details
export const { setPharmacyListDetails } = pharmacyListDetailsSlice.actions;

export default pharmacyListDetailsSlice.reducer;
