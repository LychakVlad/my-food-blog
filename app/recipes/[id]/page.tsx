import Recipe from '../../../components/Recipe/Recipe';
import { IPost } from '../../../types/recipe.interface';

interface Params {
  id: string;
}
export async function dynamicData() {
  const posts = await fetch(`${process.env.NEXTAUTH_URL}/api/recipe`);
  const data = await posts.json();

  return data.map((post: IPost) => ({
    id: post._id,
  }));
}

async function getRecipe(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/recipe/${id}`);
  const data = await res.json();
  return data;
}

export default async function RecipePage({ params }: { params: Params }) {
  const recipe = await getRecipe(params.id);
  return <Recipe post={recipe} />;
}

export const dynamic = 'force-dynamic';
