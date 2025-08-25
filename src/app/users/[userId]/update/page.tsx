import { getUser, updateUser } from "@/__generated__/api";
import Link from "next/link";
import { redirect } from "next/navigation";

const updateUserAction = async (formData: FormData) => {
  "use server";
  const userId = Number(formData.get("userId"));
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  await updateUser(userId, {
    name,
    email,
    tags: tags,
  });
  redirect(`/users/${userId}`);
};

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function UpdateUserPage(props: Props) {
  const params = await props.params;
  const user = await getUser(Number(params.userId));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <Link
            href={`/users/${params.userId}`}
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-labelledby="back-to-user"
            >
              <title id="back-to-user">Back to User Detail</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to User Detail
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Update User #{params.userId}
          </h1>

          <form className="space-y-6" action={updateUserAction}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                defaultValue={user.data.name}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black"
                placeholder="Enter user name"
                name="name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                defaultValue={user.data.email}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black"
                placeholder="Enter email address"
                name="email"
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                defaultValue={user.data.tags?.join(", ")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black"
                placeholder="Enter tags separated by commas (e.g., premium, active)"
                name="tags"
              />
              <p className="mt-2 text-sm text-gray-500">
                Optional. Separate multiple tags with commas.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Update User
              </button>
              <Link
                href={`/users/${params.userId}`}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
