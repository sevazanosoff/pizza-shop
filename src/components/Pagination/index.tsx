
import React from 'react';
import { PaginationProps } from '../../types';

import styles from './Pagination.module.scss'




const Pagination: React.FC<PaginationProps> = ({ onChangePage, pageCount, totalPages }) => {
    const totalPagesArray = []
    for (let i = 0; i < totalPages; i++) {
        totalPagesArray.push(i + 1)
    }

    return (
        <div className={styles['page']}>
            {pageCount !== 1 &&
                <span className={styles['page__arrow-prev']}
                    onClick={() => onChangePage(pageCount - 1)}
                ></span>
            }
            {totalPagesArray.map((p) =>
                <ul key={p} className={styles['page__list']}>
                    <li
                        onClick={() => onChangePage(p)}
                        className={pageCount === p ? styles['page__list-current'] : styles['page__list-item']}
                    >
                        {p}
                    </li>
                </ul>
            )}
            {pageCount !== totalPages &&
                <span className={styles['page__arrow-next']}
                    onClick={() => onChangePage(pageCount + 1)}
                ></span>
            }
        </div>
    );
}

export default Pagination;
