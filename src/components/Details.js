import { useSelector } from 'react-redux';
import Chart from './Chart';
import AnalysesList from './AnalysesList';
import style from './compnents.module.css';


const useDatasets = () => useSelector((s) => s.datasets.items);
const useSelectedId = () => useSelector((s) => s.datasets.selectedId);

const Details = () => {
    const datasets = useDatasets();
    const id = useSelectedId();
    const d = datasets.find((x) => x.id === id);
    if (!d) return <div style={{ color: '#64748b' }}>Select a dataset…</div>;
    return (
        <div className={style.details}>
            <div className={style.dataList}>
                <h4>{d.name}</h4>
                <p>{d.description}</p>
            </div>
            <Chart dataset={d} />
            <AnalysesList datasetId={d.id} />
        </div>
    );
}

export default Details;