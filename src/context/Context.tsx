import { createContext, memo, PropsWithChildren, useState } from 'react';

interface IDataContext {
  query: string | null;
  setNewValue(value: string): void;
  data: object | null;
  setNewData(newData: object | null): void;
  loading: boolean;
  setNewLoading(value: boolean): void;
  error: string | null;
  setNewError(value: string): void;
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
});
