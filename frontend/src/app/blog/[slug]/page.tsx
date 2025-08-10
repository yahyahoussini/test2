type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
};

async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`http://localhost:3001/api/blog/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        Publié le {new Date(post.created_at).toLocaleDateString('fr-FR')}
      </p>
      <div className="prose lg:prose-xl">
        {post.content}
      </div>
    </article>
  );
}

// Optional: Add metadata function to set the page title dynamically
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return {
    title: `${post.title} | MaBoutique Blog`,
    description: post.content.substring(0, 160),
  };
}
