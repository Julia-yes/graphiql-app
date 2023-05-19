import { createContext, memo, PropsWithChildren, useState } from 'react';
import { AddTabs } from '../utils/ParseData';
import { Sections } from '../enums/Sections';

interface IDataContext {
  variables: string;
  setNewVariables(value: string): void;
  headers: string;
  setNewHeaders(value: string): void;
  data: object | null;
  setNewData(newData: object | null): void;
  loading: boolean;
  setNewLoading(value: boolean): void;
  error: string | null;
  setNewError(value: string): void;
  variablesError: string | null;
  setNewVariablesError(value: string): void;
  request: string;
  setNewRequest(value: string): void;
  section: Sections.HEADERS | Sections.VARIABLES;
  changeSection(value: string): void;
  sectionState: boolean;
  changeSectionState(value: boolean): void;
}

export const DataContext = createContext<IDataContext>({
  variables: '',
  setNewVariables: () => {},
  headers: '',
  setNewHeaders: () => {},
  data: null,
  setNewData: () => {},
  loading: false,
  setNewLoading: () => {},
  error: null,
  setNewError: () => {},
  variablesError: null,
  setNewVariablesError: () => {},
  request: '',
  setNewRequest: () => {},
  section: Sections.VARIABLES,
  changeSection: () => {},
  sectionState: true,
  changeSectionState: () => {},
});

export const DataProvider = memo(({ children }: PropsWithChildren) => {
  const [variables, setVariables] = useState<string>('');
  const setNewVariables = (value: string) => {
    setVariables(value);
  };
  const [headers, setHeaders] = useState<string>('');
  const setNewHeaders = (value: string) => {
    setHeaders(value);
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

  const [variablesError, setVariablesError] = useState('');
  const setNewVariablesError = (value: string) => {
    setVariablesError(value);
  };

  const [request, setRequest] = useState<string>(
    AddTabs('query Test($page: Int) {characters(page: $page) {results {name gender species}}}')
  );
  const setNewRequest = (value: string) => {
    setRequest(value);
  };

  const [section, changeActiveSection] = useState<Sections.HEADERS | Sections.VARIABLES>(
    Sections.VARIABLES
  );
  const changeSection = (value: Sections.HEADERS | Sections.VARIABLES) => {
    changeActiveSection(value);
  };

  const [sectionState, changeActiveSectionState] = useState<boolean>(true);
  const changeSectionState = (value: boolean) => {
    changeActiveSectionState(value);
  };

  return (
    <DataContext.Provider
      value={{
        variables,
        setNewVariables,
        headers,
        setNewHeaders,
        data,
        setNewData,
        loading,
        setNewLoading,
        error,
        setNewError,
        variablesError,
        setNewVariablesError,
        request,
        setNewRequest,
        section,
        changeSection,
        sectionState,
        changeSectionState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
});
