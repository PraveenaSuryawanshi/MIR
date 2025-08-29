import { useSelector } from 'react-redux';
import Style from './compnents.module.css';

const useAnalyses = () => useSelector((s) => s.analyses.items);

const AnalysesList = ({ datasetId }) => {
    const items = useAnalyses().filter((a) => a.dataset_id === datasetId);
    return (
        <section className={Style.listContainer}>
            <h3>Analyses ({items.length})</h3>
            <ul>
                {items.map((a) => (
                    <li key={a.id}>
                        #{a.id} • {a.status} • trend: {a.trend?.sign ?? 0} ({Math.round(a.trend?.probability || 0)}%)
                    </li>
                ))}
            </ul>
            {items.length === 0 && <div style={{ color: '#64748b' }}>No analyses.</div>}
        </section>
    );
}

export default AnalysesList;