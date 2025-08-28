import { useDispatch } from 'react-redux';
import { setDatasets, setAnalyses } from '../store/action';

const Importers = () => {
    const dispatch = useDispatch();
    const onRead = (file, kind) => file.text().then((txt) => {
        const json = JSON.parse(txt);
        if (kind === 'datasets') dispatch(setDatasets(json)); else dispatch(setAnalyses(json));
    }).catch((e) => alert('Invalid JSON: ' + e.message));


    return (
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <label style={{ border: '1px solid #e5e7eb', padding: 8, borderRadius: 8, cursor: 'pointer' }}>
                <input hidden type="file" accept="application/json" onChange={(e) => e.target.files?.[0] && onRead(e.target.files[0], 'datasets')} /> Import datasets.json
            </label>
            <label style={{ border: '1px solid #e5e7eb', padding: 8, borderRadius: 8, cursor: 'pointer' }}>
                <input hidden type="file" accept="application/json" onChange={(e) => e.target.files?.[0] && onRead(e.target.files[0], 'analyses')} /> Import analyses.json
            </label>
        </div>
    );
}

export default Importers;