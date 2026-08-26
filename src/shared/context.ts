import { createContext } from "react";

interface FilterContextType{
    searchQuery : string;
    setSearchQuery: (query: string) => void;
    selectCatogory: string;
    setSelectCatogory: (category: string)=> void;
    minPrice : number | undefined;
    setMinPrice: (price: number | undefined)=> void;
    maxPrice: number | undefined;
    setMaxPrice: (price: number | undefined)=> void;
    keyword: string;
    setKeyword : (keyword: string)=> void;

}

export const Filter = createContext<FilterContextType | undefined>(undefined);