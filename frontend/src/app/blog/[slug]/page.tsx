type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
};

async function getPost(slug: string): Promise<Post> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${apiUrl}/api/blog/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

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
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: `${post.title} | MaBoutique Blog`,
    description: post.content.substring(0, 160),
  };
}
