import { useState } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
    const {setSearchTerm,fetchRandomMeal} = useGlobalContext();
 
    const [search , setSearch] = useState('')

   const handleChange=(e)=>
   {
    setSearch(e.target.value)
   }

   const handleSubmit=(e)=>
   {
        e.preventDefault();
        if(search!='')
        {
            setSearchTerm(search)
         
        }
      
   }

   const handleRandomMeal=()=>
   {
    setSearchTerm('')
    setSearch('')
    fetchRandomMeal()
   }

    return ( 
        <header className="search-container">
            <form onSubmit={handleSubmit}>
            <input type="text" className="form-input" 
            placeholder="Search item"
            value={search}
            onChange={handleChange}/>
           <button type="submit" className="btn">Search</button>
           <button type="button"
            className="btn btn-hipster"
            onClick={handleRandomMeal}>Surprise me</button>
            </form>

        </header>
     );
}
 
export default Search;