export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export type FetchPizzasArgs = {
    search: string
    category: string
    sortBy: string
    order: string
    currentPage: string
}

export type Pizza = {
    id: string
    title: string
    price: number
    count: number
    imageUrl: string
    types: number[]
    sizes: number[]
}

export interface PizzaSliceState {
    items: Pizza[];
    status: Status
}
