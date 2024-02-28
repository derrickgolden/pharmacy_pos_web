
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserDetails {
  user_id: string;
  first_name: string;
  last_name: string;
}

interface UserDetailsState {
  user_id: string;
  first_name: string;
  last_name: string;
}

const initialState: UserDetails = {
  user_id: "",
  first_name: "",
  last_name: "",
}

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      return action.payload;
    }
  }  
});

// Action creators for signup details
export const { setUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;

