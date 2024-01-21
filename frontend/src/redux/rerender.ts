import { createSlice } from '@reduxjs/toolkit';

const rerenderSlice = createSlice({
  name: 'salesReport',
  initialState: false,
  reducers: {
    setRerender: (state) => {      
        return !state;
    }
  }  
});

// Action creators for signup details
export const { setRerender } = rerenderSlice.actions;

export default rerenderSlice.reducer;
