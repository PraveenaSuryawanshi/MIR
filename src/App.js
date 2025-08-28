import DatasetList from './components/DatasetList';
import Details from './components/Details';

import './App.css';

function App() {
  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: 12, display: 'grid', gap: 12 }}>
      <h1 style={{ fontSize: 18, fontWeight: 700 }}>Data Explorer (MIR)</h1>
      <DatasetList />
      <Details />
    </div>
  );
}

export default App;
