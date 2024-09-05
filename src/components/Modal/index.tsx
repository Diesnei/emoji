import { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import './styles.scss';

export default function Modal({
    children,
    title
}: {
    children: ReactNode
    title: string
}): ReactNode {
    const router = useRouter();

    const handleClose = () => router.back();

    return (
        <dialog className='modal-dialog'>
            <div className='modal'>
                <div className='modal-header'>
                    <h2>
                        {title}
                    </h2>

                    <div
                        className='modal-header-close'
                        onClick={handleClose}
                    >
                        ❌
                    </div>
                </div>

                <div className='modal-body'>
                    {children}
                </div>
            </div>
        </dialog>
    )
}