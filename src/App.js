import DatasetList from './components/DatasetList';
import Details from './components/Details';

import './App.css';

function App() {
  return (
    <div className='App-header'>
      <h2>Data Explorer (MIR)</h2>
      <DatasetList />
      <Details />
    </div>
  );
}

export default App;
