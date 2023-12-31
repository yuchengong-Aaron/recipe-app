import axios from "axios";

const RECIPE_API_BASE_URL = `${process.env.REACT_APP_BACKEND_API_URL}/recipe`;

class RecipeService {

    postRecipe(recipeValues) {
        return axios.post(RECIPE_API_BASE_URL + "/upload-recipe",
            recipeValues,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("accessToken")
                }
            }
        );
    }

    findRecipesByAccount(accountId) {
        return axios.get(`${RECIPE_API_BASE_URL}/find-recipes?id=${accountId}`)
    }

    findRecipeById(recipeId) {
        return axios.get(`${RECIPE_API_BASE_URL}/get-recipe?id=${recipeId}`);
    }

    findIngredients(recipeId) {
        return axios.get(`${RECIPE_API_BASE_URL}/ingredients?id=${recipeId}`);
    }

    findDirections(recipeId) {
        return axios.get(`${RECIPE_API_BASE_URL}/directions?id=${recipeId}`);
    }

    findTags(recipeId) {
        return axios.get(`${RECIPE_API_BASE_URL}/tags?id=${recipeId}`);
    }

    editRecipe(recipeValues) {
        return axios.post(`${RECIPE_API_BASE_URL}/edit-recipe`, 
            recipeValues,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("accessToken")
                }
            }
        )
    }

    deleteRecipe(recipeId) {
        return axios.delete(RECIPE_API_BASE_URL + "/delete-recipe", 
            { 
                data: { 
                    id: recipeId
                },
                headers: {
                    authorization: "bearer " + localStorage.getItem("accessToken")
                }
            }
        );
    }
}

export default new RecipeService();