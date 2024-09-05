import { ReactNode } from 'react';

import type { Metadata } from 'next';
import '../../styles/globals.scss';
import Header from '../../components/Header';
import Categories from '../../components/Categories';
import { AppContextProvider } from '@/context/AppContext';
import 'react-loading-skeleton/dist/skeleton.css'

export default function EmojisLayout({
    children,
    modal
}: {
    children: ReactNode,
    modal: ReactNode
}): ReactNode {
    return (
        <>
            <AppContextProvider>
                <Header />

                <aside>
                    <Categories />
                </aside>

                <main>
                    {children}
                </main>

                {modal}
            </AppContextProvider>
        </>
    );
}