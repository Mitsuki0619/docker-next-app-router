interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export default async function TestServerComponent() {
  const posts = await fetchPosts();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Posts from JSONPlaceholder</h2>
      <div className="space-y-4">
        {posts.slice(0, 5).map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              {post.id}. {post.title}
            </h3>
            <p className="text-gray-600">{post.body}</p>
            <p className="text-sm text-gray-400 mt-2">User ID: {post.userId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
