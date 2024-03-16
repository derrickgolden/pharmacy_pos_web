
import { createSlice } from '@reduxjs/toolkit';
import { Pharmacy } from "./activePharmacy";

const initialState: Pharmacy[] | [] = []

const pharmacyListDetailsSlice = createSlice({
  name: 'pharmacyListDetails',
  initialState,
  reducers: {
    setPharmacyListDetails: (state, action) => {      
        return action.payload;
    }
  }  
});

// Action creators for signup details
export const { setPharmacyListDetails } = pharmacyListDetailsSlice.actions;

export default pharmacyListDetailsSlice.reducer;
