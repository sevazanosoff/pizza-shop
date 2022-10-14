import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import NotFoundPizza from '../components/NotFoundPizza'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Pagination from '../components/Pagination';


import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectFilter, selectPizza } from '../redux/filter/selectors' // Вытягиваем метод из слайса
import { setCategoryId, setPage } from '../redux/filter/slice'
import { fetchPizzas } from '../redux/pizza/asyncActions';
import axios from 'axios';

const Home: React.FC = () => {
    const [pizzasAll, setPizzas] = React.useState([])
    const [_, setSearchParams] = useSearchParams()
    // Redux
    const dispatch = useAppDispatch() // Вытаскиваем метод для react из библиотеки Redux
    const { categoryId, currentPage, searchValue } = useAppSelector(selectFilter) // Вытаскиваем нужныe стейты
    const { items, status } = useAppSelector(selectPizza)
    const sortType = useAppSelector((state) => state.filter.sort)
    // For App
    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [0].map((_, index) => <Skeleton key={index} />)
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    // const totalPages = Math.ceil(searchValue === '' ? pizzasAll.length / 4 : pizzas.length / 4)
    const totalPages = Math.ceil(pizzasAll.length / 4)
    const categoriesArray = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    // Redux func
    const onChangeCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx)) // передаем метод из reducers в dispatch для изменения стейта
        dispatch(setPage(1))
    }, [dispatch])

    const onChangePage = (number: number) => {
        dispatch(setPage(number))
    }

    // For totalPages
    // category request
    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const res = await axios.get(`https://62d9c99f9eedb69963629389.mockapi.io/items?&${category}`)
                setPizzas(res.data)
                dispatch(setPage(1))
            } catch (err) {
                console.warn(err)
            }
        }
        fetchPizza()
    }, [categoryId])
    // search request
    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const res = await axios.get(`https://62d9c99f9eedb69963629389.mockapi.io/items?&search=${searchValue}`)
                setPizzas(res.data)
                dispatch(setPage(1))
            } catch (err) {
                console.warn(err)
            }
        }
        fetchPizza()
    }, [searchValue])


    // Main request
    useEffect(() => {
        const search = searchValue ? `&search=${searchValue}` : ''
        const sortBy = sortType.sortProperty.replace('-', '')
        const sort = sortType.name
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        try {
            dispatch(fetchPizzas({ search, category, sortBy, order, currentPage: String(currentPage) })) // Делаем запрос на бэк и сохраняем все пиццы
            search
                ? setSearchParams({ 'search': searchValue, category: categoriesArray[categoryId], sort, 'page': String(currentPage) })
                : setSearchParams({ category: categoriesArray[categoryId], sort, 'page': String(currentPage) })
        } catch (err) {
            console.warn(err)
        }
        window.scrollTo(0, 40)
    }, [categoryId, sortType, searchValue, currentPage])

    console.log(1)

    // Main
    return (
        <>
            {searchValue && status === 'success' && totalPages === 0
                ?
                <div className="container">
                    <NotFoundPizza />
                </div >
                :
                <div className="container">
                    <div className="content__top">
                        <Categories value={categoryId} categoriesArray={categoriesArray} onChangeCategory={onChangeCategory} />
                        <Sort value={sortType} />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    {
                        status === 'error'
                            ? <div className='content__error-info'><h2>Ошибка!</h2><p>К сожалению не удалось получить пиццы.Попробуйте повторить попытку позже.</p></div>
                            : <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
                    }
                    {
                        status === 'success'
                            ? <Pagination onChangePage={onChangePage} totalPages={totalPages} pageCount={currentPage} />
                            : ''
                    }
                </div >
            }
        </>
    );
}

export default Home;



