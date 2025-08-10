import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
};

async function getPosts(): Promise<Post[]> {
  // In a real app, the base URL would come from an environment variable
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${apiUrl}/api/blog`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Notre Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-700">{post.content.substring(0, 150)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
