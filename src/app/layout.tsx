import type { Metadata } from 'next';
import './styles.scss';

export const metadata: Metadata = {
    title: 'Emoji app',
    description: 'Easily get any emoji you want',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className='main-layout'>
                {children}
            </body>
        </html>
    );
}
