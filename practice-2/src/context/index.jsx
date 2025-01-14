import { createContext, useState } from "react";


export const GlobalContext = createContext(null);

function GlobalState({children}) {

    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);

            const data = await res.json();

            if(data?.data?.recipes) {
                setRecipeList(data?.data?.recipes);
                setLoading(false);
                setSearchParam("");
            }

        } 
        catch (error) {
            console.log(error);
            setLoading(false);
            setSearchParam("");
        }
    }

    console.log(loading, recipeList);

    return (
        <>
            <GlobalContext.Provider value={{searchParam, setSearchParam, recipeList, loading ,handleSubmit,
                recipeDetailsData, setRecipeDetailsData
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    );
}

export default GlobalState;