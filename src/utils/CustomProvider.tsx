'use client';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme';
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store/store";
import CssBaseline from '@mui/material/CssBaseline';
import { createContext, useContext, useRef } from 'react';
import { Tokens } from 'next-firebase-auth-edge';

const TokensContext = createContext<Tokens | undefined>(undefined);

export const CustomProvider = ({ tokens, children }: { tokens: any, children: React.ReactNode }) => {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }
    return (
        <Provider store={storeRef.current}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <TokensContext.Provider value={tokens}>
                    {children}
                </TokensContext.Provider>
            </ThemeProvider>
        </Provider>
    );
}

export const useTokens = () => {
    const context = useContext(TokensContext);
    if (context === undefined) {
        throw new Error('useTokens must be used within a TokensProvider');
    }
    return context;
};
