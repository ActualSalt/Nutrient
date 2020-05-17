import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';


const App = () =>{
  //API Declaration 
  const APP_ID = "938c5ace";
  const APP_KEY = "554b8adf11bf109e8f43d51a7f71db34";
  //State variable declaration
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');
  
  useEffect(() =>{
    getRecipes();
    //When [] changes, useEffect runs 
  }, [query]);

  const getRecipes = async () => {
    //Add 'await' since you do not know when the data will be coming in 
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    //JSON will standardize the data to be more readable
    const data = await response.json();  
    //Get items from "hits"
    console.log(data.hits);
    setRecipes(data.hits);
  }

  //Update input string 
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  //Flow block for API request until the form is submitted 
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    //Reset search 
    setSearch('');
  }

  //OUTPUT
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" 
        value={search} 
        onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipesContainer">
        {recipes.map(recipe =>(
          <Recipe 
          key={recipe.recipe.label+recipe.recipe.calories}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        ))} 
      </div>
    </div>
  )
}


export default App;
