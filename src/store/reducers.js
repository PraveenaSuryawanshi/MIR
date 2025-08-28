import datasets from '../Data/datasets.json'
import analyses from '../Data/analyses.json';
import { SET_DATASETS, SELECT_DATASET, SET_ANALYSES } from '../store/actionTypes';

const initialDatasets = { items: datasets, selectedId: datasets[0]?.id || null };
export function datasetsReducer(state = initialDatasets, action) {
    switch (action.type) {
        case SET_DATASETS: {
            const items = action.payload;
            const stillSelected = items.some((d) => d.id === state.selectedId);
            return { items, selectedId: stillSelected ? state.selectedId : (items[0]?.id || null) };
        }
        case SELECT_DATASET:
            return { ...state, selectedId: action.payload };
        default:
            return state;
    }
}


const initialAnalyses = { items: analyses };
export function analysesReducer(state = initialAnalyses, action) {
    switch (action.type) {
        case SET_ANALYSES:
            return { items: action.payload };
        default:
            return state;
    }
}