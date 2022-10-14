export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export type SortPopup = {
    name: string
    sortProperty: SortPropertyEnum
}

export interface FilterSliceState {
    inputValue: string
    searchValue: string
    categoryId: number
    currentPage: number
    sort: SortPopup
}