import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import {useFilters} from "../shared/useFilter";



interface Product{
    category: string
}

interface FetchCategoryModel{
    products : Product[];
}
const SideBar = () => {

    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "fashion",
        "trend",
        "shoes",
        "shirt"
    ])

    const{searchQuery,setSearchQuery,selectCatogory,setSelectCatogory,minPrice,setMinPrice,maxPrice,setMaxPrice,setKeyword}= useFilters();

    useEffect(()=>{

        const fetchCategories = async()=>{
            try {
                const responce = await axios.get("https://dummyjson.com/products");
                const data : FetchCategoryModel = responce.data;
                // console.log(data);
             const uniqueCategories = Array.from(new Set(data.products.map(product => product.category) ) )
            //  console.log(uniqueCategories)
             setCategories(uniqueCategories);
                
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.error("failed to fetch products by axios");
                }
            }
        }

        fetchCategories();
    },[])


    const handelMinPrice =(e: ChangeEvent<HTMLInputElement>)=> {
            const min = e.target.value;
            setMinPrice(min ? parseFloat(min) : undefined);
            // console.log(parseFloat(min));
    }
    const handelMaxPrice =(e: ChangeEvent<HTMLInputElement>)=> {
            const max = e.target.value;
            setMinPrice(max ? parseFloat(max) : undefined);
            
    }

    // handelling categories 
    const handelCategoryRadio =(category: string)=> {
        setSelectCatogory(category);
        console.log(category)
    }

    // handelling keywords
    const handelKeywords =(keyword:string)=>{
        setKeyword(keyword);
        // console.log(keyword);
    }

    // hadel Reset button
    const handelReset =()=> {
        setSearchQuery("");
        setSelectCatogory("");
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setKeyword("");
    }


  return (

    <div className="w-64 min-h-screen shrink-0 bg-gray-300 p-5 font-meri">
        <h1 className="text-3xl font-bold  ">React Store</h1>
       {/* search and set Min and Max */}
       <section className="mt-8">
        <input type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="px-2 py-2 border-2 rounded sm:mb-0" 
         placeholder="search products.."/>

         <div className="flex mt-3 justify-center items-center ">
            <input type="text" value={minPrice ?? ""} onChange={handelMinPrice}  className="border-2 mr-2 px-5 py-3 mb-3 w-full" placeholder="MIN"/>
            <input type="text"  value={maxPrice ?? ""} onChange={handelMaxPrice} className="border-2 mr-2 px-5 py-3 mb-3 w-full" placeholder="MAX"/>
         </div>

         {/* categories  section*/}
            <div className="mb-5">
                <h2 className="text-lg  mb-3">Categories</h2>
            <section>
                {categories.map((catogory,index)=> 
                    (
                        <label key={index} className="block mb-2 ">
                            <input type="radio"
                             name="category" 
                             value={catogory} 
                             onChange={()=> handelCategoryRadio(catogory)}
                             checked={selectCatogory === catogory}
                             
                              className="mr-2 w-4 h-4" />
                            {catogory.toUpperCase()}
                        </label>
                    ))}

            </section>
            </div>


            {/* keywords section  */}

            <div className="mb-5 mt-5">
                    <h2 className=" text-lg font-semibold mb-3">Keywords</h2>
                    <div className="">
                        {keywords.map((keyword,index)=> 
                            (<button className="px-4 py-2 block w-full text-left border rounded mb-2 hover:bg-gray-400" key={index} onClick={()=>handelKeywords(keyword)}>{keyword.toUpperCase()}</button>))}
                    </div>
            </div>

       </section>


       {/* reset button */}

       <button onClick={handelReset} className="w-full bg-gray-700 text-white px-2 py-1 mb-16 rounded hover:bg-gray-900 transition-colors">Reset Filters</button>


    </div>
  );
};

export default SideBar