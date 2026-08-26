import { useContext } from "react";
import { Filter } from "./context";

export const useFilters = () => {
   const context = useContext(Filter);

   if(context  === undefined) {
    throw new Error("Its accessed inly within provider !")
   }
   return context;
}

