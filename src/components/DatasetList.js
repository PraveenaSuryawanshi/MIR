// import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDataset } from '../store/action';
import style from './compnents.module.css';

const useDatasets = () => useSelector((s) => s.datasets.items);
const useSelectedId = () => useSelector((s) => s.datasets.selectedId);

const DatasetList = () => {
    const datasets = useDatasets();
    const selected = useSelectedId();
    const dispatch = useDispatch();

    return (
        <div className={style.dataList}>
            <div className={style.dataListContainer}>
                {datasets.map((d) => (
                    <button key={d.id} onClick={() => dispatch(selectDataset(d.id))} style={{background: selected === d.id ? '#eef2ff' : 'white' }}>
                        <h4>{d.name}</h4>
                        <p>{d.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DatasetList;