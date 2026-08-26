import { useState } from "react";
import { useFilters } from "../shared/useFilter";


const MainContainer = () => {

    const {searchQuery,selectCatogory,minPrice,maxPrice,keyword} =  useFilters();

    const [products, setProducts] = useState<unknown[]>([]);
    const [filter , setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [dropDown, setDropDown] = useState(false);

    const itemsPerPage = 12;
   


    
  return (
    <section className="xl:w-220 lg:w-220 sm:w-160 xs:w-80 p-5">
        
        <div className="mb-5">
            <div className="flex flex-col sm:flex-row "></div>
        </div>
    </section>
  )
}

export default MainContainer