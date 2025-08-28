import  { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Brush } from 'recharts';
import style from './compnents.module.css';

const useAnalyses = () => useSelector((s) => s.analyses.items);

const Chart = ({ dataset }) => {

    const analyses = useAnalyses().filter((a) => a.dataset_id === dataset.id);
   
    const data = useMemo(() => {
        const m = new Map();
        (dataset.historical || []).forEach(([date, value]) => m.set(date, { date, actual: value }));
        analyses.forEach((a) => {
            Object.entries(a.forecast || {}).forEach(([date, v]) => {
                const row = m.get(date) || { date };
                row['f_' + a.id] = v; m.set(date, row);
            });
        });
        return Array.from(m.values()).sort((a, b) => a.date.localeCompare(b.date));
    }, [dataset, analyses]);


    return (
        <div className={style.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" minTickGap={24} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="actual" dot={false} strokeWidth={2} name="Actual" />
                    {analyses.map((a) => (
                        <Line key={a.id} type="monotone" dataKey={'f_' + a.id} dot={false} strokeDasharray="6 4" name={`Forecast #${a.id}`} />
                    ))}
                    <Brush dataKey="date" height={20} travellerWidth={8} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;