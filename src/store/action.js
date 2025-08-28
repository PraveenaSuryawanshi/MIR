import { SELECT_DATASET, SET_DATASETS, SET_ANALYSES } from "../store/actionTypes";

export const setDatasets = (payload) => ({ type: SET_DATASETS, payload });
export const selectDataset = (id) => ({ type: SELECT_DATASET, payload: id });
export const setAnalyses = (payload) => ({ type: SET_ANALYSES, payload });