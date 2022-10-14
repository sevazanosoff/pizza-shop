import { SortPopup, SortPropertyEnum } from "./redux/filter/types"

// Sort
export type SortItem = {
    name: string
    sortProperty: SortPropertyEnum
}

export type PopupClick = MouseEvent & {
    path: Node[]
}

export type SortProps = {
    value: SortPopup
}

// Categories

export type CategoriesProps = {
    value: number
    categoriesArray: string[]
    onChangeCategory: (i: number) => void // (аргументы которые получит функция и тип) => указывает что это стрелочная функция, а void(не требует возвращения с помощью return)
}

// CartItem

export type CartItemProps = {
    id: string
    title: string
    price: number
    count: number
    imageUrl: string
    type: string
    size: number
}

// PizzaBlock

export type PizzaBlockItemProps = {
    id: string
    title: string
    price: number
    count: number
    imageUrl: string
    types: number[]
    sizes: number[]
}

// Pagination

export type PaginationProps = {
    pageCount: number
    totalPages: number
    onChangePage: (page: number) => void
}