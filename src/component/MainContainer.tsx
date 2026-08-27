import { useEffect, useState } from "react";
import { useFilters } from "../shared/useFilter";
import {  Tally3 } from "lucide-react";
import axios from "axios";
import type { Product } from "../utils/type";
import BookCard from "./BookCard";


const MainContainer = () => {

    const {searchQuery,selectCatogory,minPrice,maxPrice,keyword} =  useFilters();

    const [products, setProducts] = useState<Product[]>([]);

    const [filter , setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [dropDown, setDropDown] = useState(false);

    const itemsPerPage = 12;
  

    useEffect(()=>{

        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;
       
        if(keyword){
            url  = `https://dummyjson.com/products/search?q=${keyword}`
        }

      const  fetchProducts = async(url:string)=>
    {
        const responce = await axios.get(url);
        const data = await responce.data.products;
        setProducts(data);
        // console.log(data)

    }

    fetchProducts(url);
            
 
    }, [currentPage,keyword])

    // filter products
    const getFilterProducts = ()=>{

        let filterProducts = products;

        if(selectCatogory){
          filterProducts =  filterProducts.filter((product => product.category === selectCatogory))
        }

       if(minPrice !== undefined){
        filterProducts = filterProducts.filter((product=> product.price >= minPrice))
       }

       if(maxPrice !== undefined){
        filterProducts = filterProducts.filter((product=> product.price <= maxPrice))
       }
       if(searchQuery){
        filterProducts = filterProducts.filter((product => product.title.toLowerCase().includes(searchQuery.toLowerCase())))
       }

       switch (filter) {
        case "cheap":
            return filterProducts.sort((a,b)=> a.price - b.price);
           
        case "expensive":
            
            return filterProducts.sort((a,b)=> b.price - a.price);
        case "popular":
            
            return filterProducts.sort((a,b)=> b.rating - a.rating);;
       
        default:
            return filterProducts;
       }


    }
    const filteredProducts =  getFilterProducts();

    // pagination

  

   const  handelpageChange =(page: number)=>{
        if(page > 0 && page <= totalPage)
        setCurrentPage(page);
   }
const totalProducts = 200;
const totalPage = Math.ceil( totalProducts / itemsPerPage);

   const pagination =() =>{
        const button: number[] = [];
        let startPage = Math.max(1,currentPage-2);
        let endPage = Math.min(totalPage, currentPage+2);


        if(currentPage <= 2){
            endPage = Math.min(totalPage,5)
        }
        if(currentPage >=  totalPage -1){
            startPage = Math.max(1,totalPage-4);
        }

        for(let i = startPage ; i <= endPage ; i++){
                button.push(i);
        }

        return button;
   }

    


    console.log(filteredProducts);
    
  return (
    <section className="xl:w-220 md:w-220 sm:w-160 xs:w-80 p-5">
        
        <div className="mb-5">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="relative my-2">
                        <button className="border px-4 py-2 rounded-full flex items-center " onClick={()=> setDropDown(!dropDown)}>
                            <Tally3 className="mr-2"/>
                            {filter === "all" ? "Fliter" : filter.charAt(0).toLowerCase() + filter.slice(1)}
                        </button>

                        {  dropDown &&
                        (  
                            <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                                 <button onClick={()=> setFilter("cheap")} className="block py-2 px-4 w-full text-left hover:bg-gray-200">Cheap</button>     
                                 <button onClick={()=> setFilter("expensive")} className="block py-2 px-4 w-full text-left hover:bg-gray-200">Expensive</button>     
                                 <button onClick={()=> setFilter("popular")} className="block py-2 px-4 w-full text-left hover:bg-gray-200">Popular</button>     
                            </div>
                        )}
                    </div>
            </div>
            
            {/* grid sections */}
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {/* Book card */}
                {filteredProducts.map((product)=> 
                 (  <BookCard key={product.id} id={product.id} image={product.thumbnail} title={product.title} price={product.price}/>)
                )}
                  
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                {/* previous button */}
                <button className={`px-4 border   ${currentPage === 1 ? "bg-gray-800 text-white" : "bg-gray-500" } hover:cursor-pointer py-3 mx-2 rounded-full`}
                 onClick={()=> handelpageChange(currentPage-1)  }
                 disabled = {currentPage === 1}
                 >Previous</button>
                {/* 1,2,3 */}

                <div className="flex flex-wrap justify-center">
                    {pagination().map((page)=>
                        (
                            <button key={page} 
                            onClick={() => handelpageChange(page)}
                            className= {`border px-4 py-2 mx-1 rounded-full ${
                  page === currentPage ? "bg-black text-white" : ""
                }`}>{page}</button>
                        ))}
                </div>
                {/* next button */}
                <button className={`px-4 border   ${currentPage === totalPage ? "bg-gray-800 text-white" : "bg-gray-500" } hover:cursor-pointer py-3 mx-2 rounded-full`}
                    disabled = {currentPage ===  totalPage}
                  onClick={()=> handelpageChange(currentPage + 1)}>Next</button>
                </div>

        </div>

       
    </section>
  )
}

export default MainContainer