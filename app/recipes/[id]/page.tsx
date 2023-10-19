export async function generateStaticParams() {
  const posts = await fetch('/api/recipe').then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Page({ params }: { params }) {
  console.log(params);
  return <div>My Post:</div>;
}
