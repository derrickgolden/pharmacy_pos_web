import { createSlice } from '@reduxjs/toolkit';

const groupListSlice = createSlice({
  name: 'groupList',
  initialState: [],
  reducers: {
    setGroupList: (state, action) => {
        return action.payload;
    }
  }  
});

// Action creators for signup details
export const { setGroupList } = groupListSlice.actions;

export default groupListSlice.reducer;
