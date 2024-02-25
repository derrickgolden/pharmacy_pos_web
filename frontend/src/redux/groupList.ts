import { createSlice } from '@reduxjs/toolkit';
import { MedicineDetails } from '../user/sections/pointOfEntry/types';

interface Group {
  group_id: number;
  group_name: string;
  description: string;
  medicines: MedicineDetails[];
}

const initialState: Group[] = [];

const groupListSlice = createSlice({
  name: 'groupList',
  initialState,
  reducers: {
    setGroupList: (state, action) => {
        return action.payload;
    }
  }  
});

// Action creators for signup details
export const { setGroupList } = groupListSlice.actions;

export default groupListSlice.reducer;
