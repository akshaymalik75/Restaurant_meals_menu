import React , {useContext} from 'react'
import { useGlobalContext } from '../context';
import { BsHandThumbsUp } from 'react-icons/bs';

const Meals = () => {
const {meals,isLoading,selectMeal,addToFavorites,removeFromFavorites} =useGlobalContext();

if(isLoading)
{
    return <h1>loading</h1> 
}
if(meals.length<1)
{
    return <h4>No items found..</h4>
}
    
    return ( 
        <section className='meals-container'>
          

            {meals && meals.map((singleMeal)=>
            {
                const {idMeal , strMeal: title,strMealThumb : image} = singleMeal
                return(
                    <article key={idMeal} className="single-meal">
                        <img src={image} alt="meal-img"  onClick={()=>
                            {
                                selectMeal(idMeal)
                            }} className='img'  />
                        <footer>
                            <h5>{title}</h5>
                            <button className='like-btn' onClick={()=>{
                                addToFavorites(idMeal)}}><BsHandThumbsUp /></button>
                        </footer>
                    </article>
                )
            })}
        </section>

     );
     
}
 
export default Meals;