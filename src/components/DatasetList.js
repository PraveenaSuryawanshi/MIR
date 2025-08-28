// import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDataset } from '../store/action';
const useDatasets = () => useSelector((s) => s.datasets.items);
const useSelectedId = () => useSelector((s) => s.datasets.selectedId);

const DatasetList = () => {
    const datasets = useDatasets();
    const selected = useSelectedId();
    const dispatch = useDispatch();

    return (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 8 }}>
            <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))' }}>
                {datasets.map((d) => (
                    <button key={d.id} onClick={() => dispatch(selectDataset(d.id))} style={{ textAlign: 'left', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8, background: selected === d.id ? '#eef2ff' : 'white' }}>
                        <div style={{ fontWeight: 600 }}>{d.name}</div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>{d.description}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DatasetList;