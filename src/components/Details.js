import { useSelector } from 'react-redux';
import Chart from './Chart';
import AnalysesList from './AnalysesList';

const useDatasets = () => useSelector((s) => s.datasets.items);
const useSelectedId = () => useSelector((s) => s.datasets.selectedId);

const Details = () => {
    const datasets = useDatasets();
    const id = useSelectedId();
    const d = datasets.find((x) => x.id === id);
    if (!d) return <div style={{ color: '#64748b' }}>Select a dataset…</div>;
    return (
        <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 8 }}>
                <div style={{ fontWeight: 600 }}>{d.name}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{d.description}</div>
            </div>
            <Chart dataset={d} />
            <AnalysesList datasetId={d.id} />
        </div>
    );
}

export default Details;