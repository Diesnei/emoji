import Link from 'next/link';

export default function Home() {
    return (
        <div className='home'>
            <Link href={'/emojis'}>
                See all emojis
            </Link>
        </div>
    );
}
