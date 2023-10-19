import Recipe from '../../../components/Recipe';

export async function generateStaticParams() {
  const posts = await fetch(`${process.env.NEXTAUTH_URL}/api/recipe`);
  const data = await posts.json();

  return data.map((post) => ({
    id: post._id,
  }));
}

async function getRecipe(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/recipe/${id}`);
  const data = await res.json();
  return data;
}

export default async function RecipePage({ params }) {
  const recipe = await getRecipe(params.id);
  return <Recipe post={recipe} />;
}
