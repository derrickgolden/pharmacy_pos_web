import { configureStore } from '@reduxjs/toolkit'
import userDetailsReducer from './userDetails'
import callApiReducer from './callApi'
import groupListReducer from './groupList'
import medicineListReducer from './medicineList'
import pharmacyListDetailsReducer from './pharmacyListDetails'
import salesReportReducer from './salesReport'
import rerenderReducer from './rerender'
import activePharmacyReducer from './activePharmacy'

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer, 
    callApi: callApiReducer,
    groupList: groupListReducer,
    medicineList: medicineListReducer,
    pharmacyListDetailsList: pharmacyListDetailsReducer,
    salesReport: salesReportReducer,
    rerender: rerenderReducer,
    activePharmacy: activePharmacyReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
