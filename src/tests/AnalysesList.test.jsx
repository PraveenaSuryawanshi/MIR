import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AnalysesList from '../components/AnalysesList';

jest.mock('./compnents.module.css', () => ({}));

const renderWithState = (ui, preloadedState) => {
  const reducer = (state = preloadedState, _action) => state;
  const store = createStore(reducer, preloadedState);
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('<AnalysesList />', () => {
  test('renders only analyses matching the datasetId and shows correct count', () => {
    const state = {
      analyses: {
        items: [
          { id: 1, dataset_id: 'ds-1', status: 'done', trend: { sign: 1, probability: 73.4 } },
          { id: 2, dataset_id: 'ds-2', status: 'running', trend: { sign: -1, probability: 51.9 } },
          { id: 3, dataset_id: 'ds-1', status: 'queued', trend: { sign: 0, probability: 10.1 } },
        ],
      },
    };

    renderWithState(<AnalysesList datasetId="ds-1" />, state);
    expect(screen.getByText(/Analyses \(2\)/)).toBeInTheDocument();
    expect(screen.getByText('#1 • done • trend: 1 (73%)')).toBeInTheDocument();
    expect(screen.getByText('#3 • queued • trend: 0 (10%)')).toBeInTheDocument();
    expect(screen.queryByText('#2 • running • trend: -1 (52%)')).not.toBeInTheDocument();
  });

  test('rounds probability and falls back to 0% when missing', () => {
    const state = {
      analyses: {
        items: [
          { id: 10, dataset_id: 'ds-x', status: 'done', trend: { sign: -1, probability: 49.6 } },
          { id: 11, dataset_id: 'ds-x', status: 'done', trend: { sign: 1 } },
        ],
      },
    };

    renderWithState(<AnalysesList datasetId="ds-x" />, state);

    expect(screen.getByText('#10 • done • trend: -1 (50%)')).toBeInTheDocument();
    expect(screen.getByText('#11 • done • trend: 1 (0%)')).toBeInTheDocument();
  });

  test('falls back to trend sign 0 when trend or sign is missing', () => {
    const state = {
      analyses: {
        items: [
          { id: 20, dataset_id: 'ds-y', status: 'done' },
          { id: 21, dataset_id: 'ds-y', status: 'done', trend: { probability: 12 } },
          { id: 22, dataset_id: 'ds-y', status: 'done', trend: { sign: null, probability: 33 } },
        ],
      },
    };

    renderWithState(<AnalysesList datasetId="ds-y" />, state);

    expect(screen.getByText('#20 • done • trend: 0 (0%)')).toBeInTheDocument();
    expect(screen.getByText('#21 • done • trend: 0 (12%)')).toBeInTheDocument();
    expect(screen.getByText('#22 • done • trend: 0 (33%)')).toBeInTheDocument();
  });

  test('shows empty state when there are no matching analyses', () => {
    const state = {
      analyses: {
        items: [
          { id: 100, dataset_id: 'other', status: 'done', trend: { sign: 1, probability: 80 } },
        ],
      },
    };

    renderWithState(<AnalysesList datasetId="target" />, state);

    expect(screen.getByText(/Analyses \(0\)/)).toBeInTheDocument();
    expect(screen.getByText('No analyses.')).toBeInTheDocument();
  });
});
