import React from 'react';

import styles from './NoutFoundBlock.module.scss'


const NotFoundBlock: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>:(</span>
                <br />
                Ничего не найдено!
            </h1>
            <p className={styles.description}>К сожалению данная страница отсуствует в нашем интернет-магазине</p>
        </div>
    );
}

export default NotFoundBlock;
