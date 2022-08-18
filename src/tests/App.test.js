import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithContext } from './helpers/renderWithContext';
import mockPlanets from './mocks/mockPlanets';

beforeEach(() => global.fetch = jest.fn(async () => ({
  json: async () => mockPlanets,
})));

afterEach(() => jest.clearAllMocks());

describe('A requisição para a API:', () => {
  it('É feita com o endpoint correto', () => {
    renderWithContext(<App />);
    
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
  });

  it('Uma mensagem de erro aparece no console quando há erro na requisição', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => {throw new Error("erro")},
    }));

    console.log = jest.fn();

    await waitFor(() => renderWithContext(<App />));

    expect(console.log).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(new Error('erro'));
  })
});

describe('A tabela de planetas:', () => {
  it('Renderiza 13 colunas e 10 linhas', async () => {
    await waitFor(() => renderWithContext(<App />));
    
    const rows = screen.getAllByRole('row');
    const headers = rows[0];

    expect(headers.children.length).toBe(13);
    expect(rows.length).toBe(11);
  });
});

describe('O filtro por nome:', () => {
  it('Altera a tabela para mostrar apenas os resultados filtrados', async () => {
    await waitFor(() => renderWithContext(<App />));
    
    const nameFilter = screen.getByTestId("name-filter");

    expect(nameFilter).toBeInTheDocument();

    userEvent.type(nameFilter, 'oo');

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
  });
});

describe('Os filtros por valores numéricos:', () => {
  it('Renderizam corretamente quando a página é carregada', async () => {
    await waitFor(() => renderWithContext(<App />));
    
    const selectColumn = screen.getByTestId("column-filter");
    const selectComparison = screen.getByTestId("comparison-filter");
    const inputValue = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    expect(selectColumn).toBeInTheDocument();
    expect(selectColumn.children.length).toBe(5);
    expect(selectComparison).toBeInTheDocument();
    expect(selectComparison.children.length).toBe(3);
    expect(inputValue).toBeInTheDocument();
    expect(inputValue.type).toBe('number')
    expect(buttonFilter).toBeInTheDocument();
  });

  it('Um filtro é aplicado da maneira esperada:', async () => {
    await waitFor(() => renderWithContext(<App />));
    
    const selectColumn = screen.getByTestId("column-filter");
    const selectComparison = screen.getByTestId("comparison-filter");
    const inputValue = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.selectOptions(selectColumn, 'orbital_period');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(inputValue, '400');
    userEvent.click(buttonFilter);

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(6);
  });

  it('Remove uma opção de coluna após ela ser selecionada em um filtro', async () => {
    await waitFor(() => renderWithContext(<App />));
    
    const selectColumn = screen.getByTestId("column-filter");
    const selectComparison = screen.getByTestId("comparison-filter");
    const inputValue = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");
    const orbitalOption = screen.getByRole('option', { name: /orbital_period/i})

    expect(orbitalOption).toBeInTheDocument();

    userEvent.selectOptions(selectColumn, 'orbital_period');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(inputValue, '400');
    userEvent.click(buttonFilter);

    expect(orbitalOption).not.toBeInTheDocument();
  });

  it('É possível excluir filtros aplicados individualmente', async () => {
    await waitFor(() => renderWithContext(<App />));
    
    const selectColumn = screen.getByTestId("column-filter");
    const selectComparison = screen.getByTestId("comparison-filter");
    const inputValue = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");
    const planetAlderaan = screen.getByText('Alderaan');

    expect(planetAlderaan).toBeInTheDocument();

    userEvent.selectOptions(selectColumn, 'orbital_period');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(inputValue, '400');
    userEvent.click(buttonFilter);

    expect(planetAlderaan).toBeInTheDocument();

    userEvent.selectOptions(selectColumn, 'population');
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.type(inputValue, '200000');
    userEvent.click(buttonFilter);
    
    expect(planetAlderaan).not.toBeInTheDocument();

    const appliedFiltersRows = screen.getAllByTestId("filter");
    expect(appliedFiltersRows.length).toBe(2);

    userEvent.click(appliedFiltersRows[1].children[1]);

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(6);
  });

  it('O botão para remover todos os filtros funciona como o esperado', async () => {
    await waitFor(() => renderWithContext(<App />));
    
    const selectColumn = screen.getByTestId("column-filter");
    const selectComparison = screen.getByTestId("comparison-filter");
    const inputValue = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.selectOptions(selectColumn, 'orbital_period');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(inputValue, '400');
    userEvent.click(buttonFilter);

    userEvent.selectOptions(selectColumn, 'population');
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.type(inputValue, '4500000000');
    userEvent.click(buttonFilter);

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(1);

    const buttonRemoveAllFilters = screen.getByTestId('button-remove-filters');
    userEvent.click(buttonRemoveAllFilters);
  
    const unfilteredRows = screen.getAllByRole('row');
    expect(unfilteredRows.length).toBe(11);
  })
});
