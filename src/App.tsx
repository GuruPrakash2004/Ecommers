import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilterContextProvider from "./component/FilterContextProvider";
import MainContainer from "./component/MainContainer";
import SideBar from "./component/SideBar";




const App = () => {

  

  return (
    <div>
      <FilterContextProvider>
        <BrowserRouter>
        <div className="flex h-screen">
            <SideBar />
            
            
            <div className="rounded w-full flex justify-between flex-wrap">
              <Routes>
                  <Route path="/" element={<MainContainer/>}/>
              </Routes>
            </div>
        </div>
        </BrowserRouter>
      </FilterContextProvider>
    </div>
  )
}

export default App