import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"; // Вытягиваем хук useParams

import Loading from '../components/Loading';

import axios from 'axios';

import styles from '../scss/components/_fullpizza-block.module.scss'

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string
        title: string
        price: number
        rating: number
    }>()
    const params = useParams() // Возвращает объект с данными после : в path в компоненте App, тоесть в моем случае id, таких данных может быть цепочка
    const navigate = useNavigate()


    React.useEffect(() => {
        async function fecthPizza() {
            try {
                const res = await axios.get('https://62d9c99f9eedb69963629389.mockapi.io/items/' + params.id)
                setPizza(res.data)
            } catch (err) {
                alert('Ошибка!Такой пиццы не обнаружено')
                navigate('/')
            }
        }
        fecthPizza()
    }, [])

    // Тут pizza может быть undefined
    if (!pizza) { // Если наша pizza не загрузилась то вывести надпись загрузка при обновлении странички
        return <Loading />
    } // После проверки редактор кода понимает что pizza будет означать именно свой прописаный тип, а не сверху еще и undefined
    // Тут pizza уже не может быть undefined, а её параметры имеют определенный прописанный тип
    return (
        <div className={styles['fullpizza']}>
            <div className={styles['fullpizza__image']}>
                <img src={pizza.imageUrl} alt='картинка' />
            </div>
            <div className={styles['fullpizza__block']}>
                <span>Название пиццы: </span>
                <h2 className={styles['fullpizza__block-title']}>{pizza.title}</h2>
                <p className={styles['fullpizza__block-text']}><span>Цена: </span> {pizza.price}</p>
                <p className={styles['fullpizza__block-text']}><span>Рейтинг на сайте: </span>{pizza.rating} из 10</p>
            </div>
        </div>
    )
}


export default FullPizza