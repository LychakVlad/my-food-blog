import { API_URL } from "utils/consts";
import Recipe from "../../../components/Recipe/Recipe";
import axios from "axios";

async function getRecipe(id: string) {
  try {
    const { data } = await axios.get(`${API_URL}/api/recipe/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const recipe = await getRecipe(params.id);
    return <Recipe post={recipe} />;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return <div>Error fetching recipe. Please try again later.</div>;
  }
}
