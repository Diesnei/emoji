'use client';

import { ReactNode, useEffect, useState } from 'react';
import './styles.scss';
import api from '@/utils/api';
import { Category } from '@/types/category';
import { useAppContext } from '@/context/AppContext';
import Skeleton from 'react-loading-skeleton';
import classNames from 'classnames';

export default function Categories(): ReactNode {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { categoryId, setCategoryId } = useAppContext();

    useEffect(() => {
        list();
    }, []);

    const list = async () => {
        await api.get('/categories')
            .then(
                response => {
                    console.log('response: ', response);
                    setCategories(response.data);
                }
            ).catch(error => console.error(error));

        setIsLoading(false);
    }

    const formatCategorySlug = (slug: string): string => {
        return slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', '/');
    }

    if (isLoading) {
        return (
            <Skeleton
                count={11}
                height={40}
                borderRadius={8}
            />
        );
    }

    return (
        <div className='categories-container'>
            <ul className='categories-list'>
                <li
                    className={classNames({
                        'category-list-item': true,
                        'active': categoryId === null
                    })}
                    onClick={() => setCategoryId(null)}
                >
                    All
                </li>

                {categories.map(category => (
                    <li
                        key={category.slug}
                        className={classNames({
                            'category-list-item': true,
                            'active': categoryId === category.slug 
                        })}
                        onClick={() => setCategoryId(category.slug)}
                    >
                        {formatCategorySlug(category.slug)}
                    </li>
                ))}
            </ul>
        </div>
    );
}