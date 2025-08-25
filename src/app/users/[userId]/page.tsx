import { deleteUser } from "@/__generated__/api";
import Link from "next/link";
import { redirect } from "next/navigation";

const deleteUserAction = async (formData: FormData) => {
  "use server";
  const userId = Number(formData.get("userId"));
  await deleteUser(userId);
  redirect("/users");
};

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function UserDetailPage(props: Props) {
  const params = await props.params;

  // Mock user data for static display
  const user = {
    id: parseInt(params.userId, 10),
    name: "田中太郎",
    email: "tanaka@example.com",
    tags: ["premium", "active"],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/users"
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-labelledby="back-to-users"
              >
                <title id="back-to-users">Back to Users</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Users
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {/* User Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-blue-600">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  {user.name}
                </h1>
                <p className="text-blue-100">User ID: {user.id}</p>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Contact Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <svg
                        className="w-5 h-5 text-gray-400 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Email</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                      <span className="text-gray-900 font-medium">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Actions
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href={`/users/${params.userId}/update`}
                      className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit User
                    </Link>
                    <form action={deleteUserAction}>
                      <input type="hidden" name="userId" value={user.id} />
                      <button
                        type="submit"
                        className="block w-full px-4 py-2 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete User
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
