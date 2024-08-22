import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "~/literals";
import { Job } from "~/types";

export const allJobsState: Job = {
    data: [],
    loading: STATUS.IDLE,
    error: '',
    id: '',
  };
  
  export const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState: allJobsState,
    reducers: {
      getAllJobs: state => {
        state.loading = STATUS.RUNNING;
      },
      getAllJobsSuccess: (state, action ) => {
        state.loading = STATUS.READY;
        state.data = action.payload;
      },
      getAllJobsFailure: state => {
        state.error = STATUS.ERROR;
        state.data = [];
        state.loading = STATUS.IDLE;
      },
      updateJobStatus: (state) => {
        state.loading = STATUS.RUNNING;
      },
      deleteJob: (state, { payload }) => {
        state.loading = STATUS.RUNNING;
        state.id = payload;
        state.data = state.data.filter(job => job.id !== payload);
      },
      DeleteJobFailure: (state) => {
          state.loading = STATUS.ERROR;
          state.loading = STATUS.IDLE;
      }
    },
  });
  
  export const { getAllJobs, getAllJobsSuccess, getAllJobsFailure, deleteJob, updateJobStatus, DeleteJobFailure } = allJobsSlice.actions;
  export default allJobsSlice.reducer;