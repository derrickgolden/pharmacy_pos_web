
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Pharmacy {
    pharmacy_id: number;
    user_id: number;
    pharmacy_name: string;
    location: string;
    pharmacy_email: string;
    pharmacy_tel: string;
    logo_path: string | null;
    extra_info: string;
    reg_date: string; // This assumes the date is a string in ISO format (e.g., "2024-02-09T09:44:34.000Z")
}

interface PharmacyState {
    pharmacy: Pharmacy | null;
    loading: boolean;
    error: string | null;
}

const initialState: PharmacyState = {
    pharmacy: null,
    loading: false,
    error: null
};

const activePharmacySlice = createSlice({
  name: 'activePharmacy',
  initialState,
  reducers: {
    setActivePharmacy: (state, action: PayloadAction<PharmacyState>) => {
      return action.payload;
    }
  }  
});

// Action creators for signup details
export const { setActivePharmacy } = activePharmacySlice.actions;

export default activePharmacySlice.reducer;

