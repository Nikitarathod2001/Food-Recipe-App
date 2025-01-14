import { createContext, useState } from "react";


export const GlobalContext = createContext(null);

function GlobalState({children}) {

    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
            const data = await res.json();

            if(data?.data?.recipes) {
                setRecipeList(data?.data?.recipes);
                setSearchParam("");
                setLoading(false);
            }

        } 
        catch (error) {
            console.log(error);
            setSearchParam("");
            setLoading(false);
        }
    }

    return (
        <>
            <GlobalContext.Provider value={{searchParam, setSearchParam, handleSubmit, loading, recipeList}}>
                {children}
            </GlobalContext.Provider>
        </>
    );
}

export default GlobalState;