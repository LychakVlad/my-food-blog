import Recipe from "../../../components/Recipe/Recipe";
import { IPost } from "../../../types/recipe.interface";

// export const dynamic = "force-dynamic";

// export async function generateStaticParams() {
//   try {
//     const posts = await fetch(`${process.env.NEXTAUTH_URL}/api/recipe`);
//     const data = await posts.json();
//     console.log(
//       data.map((post: IPost) => ({
//         id: post._id,
//       })),
//     );
//     return data.map((post: IPost) => ({
//       id: post._id,
//     }));
//   } catch (error) {
//     console.log(error);
//   }
// }

async function getRecipe(id: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/recipe/${id}`);
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
