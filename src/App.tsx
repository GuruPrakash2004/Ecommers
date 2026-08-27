import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilterContextProvider from "./component/FilterContextProvider";
import MainContainer from "./component/MainContainer";
import SideBar from "./component/SideBar";
import ProductPage from "./component/ProductPage";
import TopSellers from "./component/TopSellers";
import PopularBlogs from "./component/PopularBlogs";





const App = () => {

  return (
    <div>
      <FilterContextProvider>
        <BrowserRouter>
        <div className="flex h-screen ">
            <SideBar />
            
            
            <div className="rounded w-full flex justify-between flex-wrap">
              <Routes>
                  <Route path="/" element={<MainContainer/>}/>     
                  <Route path="/product/:id" element={<ProductPage />}/>     
              </Routes>
              <div className="">
                <TopSellers />
                <PopularBlogs />
              </div>
            </div>
        </div>
        </BrowserRouter>
      </FilterContextProvider>
    </div>
  )
}

export default App