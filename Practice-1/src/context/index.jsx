import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const GlobalContext = createContext(null);

function GlobalState({children}) {

    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);

    const navigate = useNavigate();

    async function handleSubmit(event) {

        event.preventDefault();

        try {
            
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);

            const data = await res.json();

            if(data?.data?.recipes) {
                setRecipeList(data?.data?.recipes);
                setLoading(false);
                setSearchParam("");
                navigate('/');
            }

        } 
        catch (error) {
            console.log(error);
            setLoading(false);
            setSearchParam("");
        }
    }

    function handleAddToFavorite(getCurrentItem) {
        console.log(getCurrentItem);

        let copyFavoritesList = [...favoritesList];
        const index = copyFavoritesList.findIndex(item => item.id === getCurrentItem.id);

        if(index === -1) {
            copyFavoritesList.push(getCurrentItem);
        }
        else {
            copyFavoritesList.splice(index);
        }

        setFavoritesList(copyFavoritesList);
    }

    console.log(favoritesList);

    return (
        <>
            <GlobalContext.Provider value={{searchParam, setSearchParam, loading, recipeList 
                ,handleSubmit, recipeDetailsData, setRecipeDetailsData, handleAddToFavorite, favoritesList}}>
                {children}
            </GlobalContext.Provider>
        </>
    );
}

export default GlobalState;