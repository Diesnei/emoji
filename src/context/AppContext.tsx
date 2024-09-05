'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface AppContextState {
    query: string;
    setQuery: (query: string) => void;
    categoryId: string | null;
    setCategoryId: (categoryId: string | null) => void;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

interface AppContextProviderProps {
    children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
    const [query, setQuery] = useState<string>('');
    const [categoryId, setCategoryId] = useState<null|string>(null);

    return (
        <AppContext.Provider
            value={{
                query, setQuery,
                categoryId, setCategoryId
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = (): AppContextState => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('"useAppContext" must be used within an AppContextProvider');
    }
    return context;
};