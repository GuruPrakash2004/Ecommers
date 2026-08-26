import { useState, type ReactNode } from "react";
import { Filter } from "../shared/context";

type ProviderProps =  {
    children : ReactNode
  }



const FilterContextProvider = ({children}: ProviderProps) => {

  const [searchQuery,setSearchQuery]  = useState<string>("");
  const [selectCatogory,setSelectCatogory]  = useState<string>("");
  const [minPrice,setMinPrice]  = useState<number | undefined>(undefined);
  const [maxPrice,setMaxPrice]  = useState<number | undefined>(undefined);
  const [keyword,setKeyword]  = useState<string>("");

  

  return (
    <Filter.Provider value={{searchQuery,setSearchQuery,selectCatogory,setSelectCatogory,minPrice,setMinPrice,maxPrice,setMaxPrice,keyword,setKeyword}}>
      {children}
    </Filter.Provider>
  )
}

export default FilterContextProvider