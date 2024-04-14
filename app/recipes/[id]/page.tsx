import Recipe from "../../../components/Recipe/Recipe";

async function getRecipe(id: string) {
  try {
    const res = await fetch(`/api/recipe/${id}`);
    const data = await res.json();
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
