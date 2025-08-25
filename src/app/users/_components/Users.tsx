import Link from "next/link";
import { getUsers } from "@/__generated__/api";

export async function Users(props: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const users = await getUsers({
    name:
      typeof props.searchParams.name === "string"
        ? props.searchParams.name
        : undefined,
    limit: props.searchParams.limit
      ? parseInt(props.searchParams.limit as string, 10)
      : undefined,
    tags: Array.isArray(props.searchParams.tags)
      ? props.searchParams.tags
      : undefined,
  });
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Users</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.data.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <Link
              href={`/users/${user.id}`}
              className="block p-6 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  ID: {user.id}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {user.name}
              </h3>
              <p className="text-gray-600 mb-3">{user.email}</p>
              {user.tags && user.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {user.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
