import React from 'react';

import { useAppDispatch } from '../redux/store';
import { setInputValue, setSearchValue } from '../redux/filter/slice'

import { CategoriesProps } from '../types';

const Categories: React.FC<CategoriesProps> = React.memo(({ value, categoriesArray, onChangeCategory }) => {
    const dispatch = useAppDispatch()

    const onClickCategory = (index: number) => {
        onChangeCategory(index)
        dispatch(setInputValue(''))
        dispatch(setSearchValue(''))

    }

    return (
        <div className="categories">
            <ul>
                {
                    categoriesArray.map((categoryName, index) => (
                        <li
                            onClick={() => onClickCategory(index)}
                            className={value === index ? 'active' : ''}
                            key={categoryName}
                        >
                            {categoryName}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
})

export default Categories;

















