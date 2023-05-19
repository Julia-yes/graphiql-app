import { createContext, memo, PropsWithChildren, useEffect, useState } from 'react';
import { AddTabs } from '../utils/ParseData';

interface IDataContext {
  query: string | null;
  setNewValue(value: string): void;
  data: object | null;
  setNewData(newData: object | null): void;
  loading: boolean;
  setNewLoading(value: boolean): void;
  error: string | null;
  setNewError(value: string): void;
  rows: number;
  setNewRows(value: number): void;
  request: string;
  setNewRequest(value: string): void;
}

export const DataContext = createContext<IDataContext>({
  query: '',
  setNewValue: () => {},
  data: null,
  setNewData: () => {},
  loading: false,
  setNewLoading: () => {},
  error: null,
  setNewError: () => {},
  rows: 1,
  setNewRows: () => {},
  request: '',
  setNewRequest: () => {},
});

export const DataProvider = memo(({ children }: PropsWithChildren) => {
  const [query, setQuery] = useState<string | null>(localStorage.getItem('search'));
  const setNewValue = (value: string) => {
    setQuery(value);
  };

  const [data, setData] = useState<object | null>(null);
  const setNewData = (value: object | null) => {
    setData(value);
  };

  const [loading, setLoading] = useState(false);
  const setNewLoading = (value: boolean) => {
    setLoading(value);
  };

  const [error, setError] = useState('');
  const setNewError = (value: string) => {
    setError(value);
  };

  const [rows, setRows] = useState(5);
  const setNewRows = (value: number) => {
    setRows(value);
  };

  const [request, setRequest] = useState<string>(
    AddTabs('query Test($page: Int) {characters(page: $page) {results {name gender species}}}')
  );
  const setNewRequest = (value: string) => {
    setRequest(value);
  };

  useEffect(() => {
    setNewLoading(true);
    checkRows();
    setNewLoading(false);
  }, [request]);

  const checkRows = () => {
    const numNewlines = (request.match(/\n/g) || []).length + 1;
    setNewRows(numNewlines ? numNewlines : 1);
  };

  return (
    <DataContext.Provider
      value={{
        query,
        setNewValue,
        data,
        setNewData,
        loading,
        setNewLoading,
        error,
        setNewError,
        rows,
        setNewRows,
        request,
        setNewRequest,
      }}
    >
      {children}
    </DataContext.Provider>
  );
});
