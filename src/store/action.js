import { SELECT_DATASET, SET_ANALYSES } from "../store/actionTypes";

export const selectDataset = (id) => ({ type: SELECT_DATASET, payload: id });
export const setAnalyses = (payload) => ({ type: SET_ANALYSES, payload });