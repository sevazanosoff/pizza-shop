import React from 'react'

import styles from '../scss/components/_notfoundpizza.module.scss'

const NotFoundPizza: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>:(</span>
                <br />
                Ничего не найдено!
            </h1>
            <p className={styles.description}>К сожалению данная пицца отсуствует в нашем интернет-магазине</p>
        </div>
    )
}

export default NotFoundPizza
