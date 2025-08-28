import { useSelector } from 'react-redux';

const useAnalyses = () => useSelector((s) => s.analyses.items);

const AnalysesList = ({ datasetId }) => {
    const items = useAnalyses().filter((a) => a.dataset_id === datasetId);
    return (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 8 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Analyses ({items.length})</div>
            {items.map((a) => (
                <div key={a.id} style={{ fontSize: 14, padding: '6px 0', borderTop: '1px solid #f1f5f9' }}>
                    #{a.id} • {a.status} • trend: {a.trend?.sign ?? 0} ({Math.round(a.trend?.probability || 0)}%)
                </div>
            ))}
            {items.length === 0 && <div style={{ color: '#64748b' }}>No analyses.</div>}
        </div>
    );
}

export default AnalysesList;