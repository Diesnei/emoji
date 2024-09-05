import EmojiDetail from '@/components/EmojiDetail';

export default function EmojiModalPage({
    params
}: {
    params: { slug: string }
}) {
    return (
        <EmojiDetail slug={params.slug} />
    );
}