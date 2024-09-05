
import './styles.scss';
import EmojiDetail from '@/components/EmojiDetail';

export default function EmojiPage({
    params
}: {
    params: { slug: string }
}) {
    return (
        <div className='emoji-detail'>
            <EmojiDetail slug={params.slug} />
        </div>
    )
}