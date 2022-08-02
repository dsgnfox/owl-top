import {SortEnum} from "../../components/Sort/Sort.props";
import {ProductModel} from "../../interfaces/product.interface";

export type SortActions = { type: SortEnum.Price } | { type: SortEnum.Rating };

export interface SortReducerState {
    sort: SortEnum;
    products: ProductModel[];
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
    switch (action.type) {
        case SortEnum.Rating: {
            return {
                sort: SortEnum.Rating,
                products: state.products.sort((a, b) => a.initialRating - b.initialRating)
            };
        }
        case SortEnum.Price: {
            return {
                sort: SortEnum.Price,
                products: state.products.sort((a, b) => b.price - a.price)
            };
        }
        default:
            throw new Error('Неверный тип сортировки');
    }
}