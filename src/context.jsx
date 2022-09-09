import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios'

const AppContext = React.createContext();



const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"


const getFavoritesFromLocalStorage=()=>
{
    let favorites = localStorage.getItem('favorite');
    if(favorites)
    {
        favorites = JSON.parse(localStorage.getItem('favorite'))
    }
    else
    {
        favorites=[]
    }
    return favorites
}


const AppProvider = ({ children }) => {

    // const [name , setName] = useState('malik')

    // useEffect(()=>{
    // fetch("https://randomuser.me/api/").
    // then(res=> res.json()).then(data=> console.log(data))
    // },[])





    // const fetchData= async(url)=>
    //     {
    //         try{
    //         const response = await fetch(url)
    //         const data = await response.json()
    //         console.log(data)
    //         }
    //         catch(error)
    //         {
    //             console.log(error) 
    //         }
    //     }

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [favorite, setFavorites] = useState(getFavoritesFromLocalStorage())

  


    const fetchDataUsingAxios = async (url) => {

        try {
            setIsLoading(true)
            const { data } = await axios(url)
            if (data.meals != null) {
                setMeals(data.meals)
                setIsLoading(false)
            }
            else {
                setMeals([])

                setIsLoading(false)
                throw 'No data found'
            }


        } catch (error) {
            setIsLoading(false)
          //  console.log(error.response)
        }

    }

    const fetchRandomMeal = () => {
        fetchDataUsingAxios(randomMealUrl)
    }



    const selectMeal = (idMeal, favoriteMeal) => {

        let meal;
        if(favoriteMeal)
        {
            meal = favorite.find((meal) => meal.idMeal === idMeal)

        }
        else{
        meal = meals.find((meal) => meal.idMeal === idMeal)
        }
        setSelectedMeal(meal)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const addToFavorites = (idMeal) => {
        const alreadyFavorites = favorite.find((meal) => meal.idMeal === idMeal)
        if (alreadyFavorites) 
        {
            alert('oops...already favorite')
            return
        }
        const meal = meals.find((meal) => meal.idMeal === idMeal)
       const updatedFavorites = [...favorite, meal]
        setFavorites(updatedFavorites)
        localStorage.setItem("favorite",JSON.stringify(updatedFavorites))
       // console.log(favorites)

    }
    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorite.filter((meal) => meal.idMeal !== idMeal)
        setFavorites(updatedFavorites)
        localStorage.setItem("favorite",JSON.stringify(updatedFavorites))

    }

    // async await method  

    useEffect(() => {
        fetchDataUsingAxios(allMealsUrl)
    }, [])

    useEffect(() => {

        // fetchData()
        if (!searchTerm) return
        fetchDataUsingAxios(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])





    return (
        <AppContext.Provider value={{ meals, isLoading, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, favorite, addToFavorites, removeFromFavorites }}>
            {children}
        </AppContext.Provider>
    );
}

const useGlobalContext = () => {
    return useContext(AppContext)
}



export { AppContext, AppProvider, useGlobalContext }