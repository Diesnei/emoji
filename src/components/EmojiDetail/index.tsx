'use client';

import { ReactNode, useEffect, useState } from 'react'
import './styles.scss'
import { Emoji } from '@/types/emoji';
import Image from 'next/image';
import api from '@/utils/api';
import Modal from '../Modal';

export default function EmojiDetail({ slug }: { slug: string }): ReactNode {
    const [emoji, setEmoji] = useState<null|Emoji>(null);

    useEffect(() => {
        getEmoji(slug);
    }, [slug]);

    const getEmoji = async (slug: string) => {
        await api.get(`emojis/${slug}`)
            .then(
                response => {
                    console.log('emoji response: ', response.data[0]);
                    setEmoji(response.data[0]);
                }
            ).catch(error => console.error(error));
    }
    
    return (
        <Modal
            title='Emoji modal'
        >
            <div className='emoji-detail'>
                {emoji === null
                    ?
                        'carregando'
                    :
                        <>
                            {emoji.character}
                            {emoji.codePoint}

                            <Image
                                src={`https://emojiapi.dev/api/v1/${emoji.codePoint}/32.png`}
                                alt={emoji.codePoint}
                                width={32}
                                height={32}
                            />
                        </>
                }
            </div>
        </Modal>
    );
}