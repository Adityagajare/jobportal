import { call, put, takeEvery, } from "redux-saga/effects";
import { getAllJobsSuccess, getAllJobsFailure, deleteJob, DeleteJobFailure } from '~/actions'


function* workGetJobPost() {
    try {
      const response = yield call(() => fetch('http://localhost:5000/api/admin/jobdetails'));
      const data = yield response.json();
      yield put(getAllJobsSuccess(data.jobs));
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      yield put(getAllJobsFailure(error.message));
    }
  }

function* workDeleteJobPost(action:any) {
    try {
        const jobId = action.payload;
        const response = yield call(()=> fetch(`http://localhost:5000/api/admin/jobdelete/${jobId}`,
        { method: 'DELETE'}
        ));
        const deletedJob = yield response.json();
        yield put(deleteJob(deletedJob));
    }catch(error:any){
        yield put(DeleteJobFailure(error.message));
    }
}
  

export default function* alljobs() {
    yield takeEvery('allJobs/getAllJobs', workGetJobPost);
    yield takeEvery('alljobs/deleteJob', workDeleteJobPost)
  }


