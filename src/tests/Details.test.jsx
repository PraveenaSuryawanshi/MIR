import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Details from '../components/Details';

jest.mock('../components/compnents.module.css', () => ({}));

jest.mock('../components/Chart', () => (props) => (
  <div data-testid="chart-props">{JSON.stringify(props)}</div>
));
jest.mock('../components/AnalysesList', () => (props) => (
  <div data-testid="analyses-props">{JSON.stringify(props)}</div>
));

const renderWithState = (ui, preloadedState) => {
  const reducer = (state = preloadedState) => state;
  const store = createStore(reducer, preloadedState);
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('<Details />', () => {
  const dsA = {
    id: 'a',
    name: 'Dataset A',
    description: 'Alpha desc',
    historical: [['2024-01-01', 1]],
  };
  const dsB = {
    id: 'b',
    name: 'Dataset B',
    description: 'Bravo desc',
    historical: [['2024-02-01', 2]],
  };

  test('renders name and description of the selected dataset', () => {
    const state = {
      datasets: {
        items: [dsA, dsB],
        selectedId: 'b',
      },
    };
    renderWithState(<Details />, state);
    expect(screen.getByText('Dataset B')).toBeInTheDocument();
    expect(screen.getByText('Bravo desc')).toBeInTheDocument();
  });

  test('passes the selected dataset object to <Chart dataset={...}>', () => {
    const state = {
      datasets: {
        items: [dsA, dsB],
        selectedId: 'a',
      },
    };

    renderWithState(<Details />, state);
    const chartProps = JSON.parse(screen.getByTestId('chart-props').textContent);
    expect(chartProps.dataset).toBeTruthy();
    expect(chartProps.dataset.id).toBe('a');
    expect(chartProps.dataset.name).toBe('Dataset A');
    expect(chartProps.dataset.historical).toEqual([['2024-01-01', 1]]);
  });

  test('passes the selected dataset id to <AnalysesList datasetId={...}>', () => {
    const state = {
      datasets: {
        items: [dsA, dsB],
        selectedId: 'b',
      },
    };

    renderWithState(<Details />, state);

    const analysesProps = JSON.parse(screen.getByTestId('analyses-props').textContent);
    expect(analysesProps.datasetId).toBe('b');
  });

  test('throws if selected dataset is missing (documents current behavior)', () => {
    const state = {
      datasets: {
        items: [dsA],
        selectedId: 'missing-id',
      },
    };

    expect(() => renderWithState(<Details />, state)).toThrow();
  });
});
