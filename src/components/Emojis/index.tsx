'use client';

import { useAppContext } from '@/context/AppContext';
import { Emoji } from '@/types/emoji';
import api from '@/utils/api';
import { ReactNode, useEffect, useState } from 'react';
import './styles.scss';
import axios, { CancelTokenSource } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Emojis(): ReactNode {
    const [emojis, setEmojis] = useState<Emoji[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cancelToken, setCancelToken] = useState<null|CancelTokenSource>(null);
    
    const { categoryId } = useAppContext();

    const router = useRouter()

    useEffect(() => {
        setIsLoading(true);

        if (cancelToken !== null) {
            cancelToken.cancel();
        }
        
        const cancelTokenSource = axios.CancelToken.source();
        setCancelToken(cancelTokenSource);

        if (categoryId === null) {
            getAllEmojis(cancelTokenSource);
            return;
        }
        getEmojisByCategory(cancelTokenSource);
    }, [categoryId])

    const getEmojisByCategory = async (cancelTokenSource: null|CancelTokenSource) => {
        await api.get(`/categories/${categoryId}`, {
            cancelToken: cancelTokenSource?.token
        })
            .then(
                response => {
                    console.log('response: ', response);
                    setEmojis(response.data === null
                        ? []
                        : response.data
                    );
                }
            ).catch(error => console.error(error));

        setIsLoading(false);
    }

    const getAllEmojis = async (cancelTokenSource: null|CancelTokenSource) => {
        await api.get('/emojis', {
            cancelToken: cancelTokenSource?.token
        })
            .then(
                response => {
                    console.log('response: ', response);
                    setEmojis(response.data);
                }
            ).catch(error => console.error(error));

        setIsLoading(false);
    }

    const handleEmojiClick = (emoji: Emoji): void => {
        console.log('emoji: ', emoji);

        router.push(`emojis/${emoji.slug}`);
    }

    if (isLoading) {
        return (
            'Carregando...'
        );
    }

    return (
        <div className='emojis-container'>
            {emojis.length > 0
                ?
                    <ul className='emojis-list'>
                        {emojis.map(emoji => (
                            <Link
                                key={emoji.slug}
                                href={`emojis/${emoji.slug}`}
                                className='emoji-list-item'
                            >
                                {emoji.character}
                            </Link>
                        ))}
                    </ul>
                :
                    'No emojis to show'
            }
        </div>
    );
}