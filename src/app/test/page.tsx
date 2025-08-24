import { getUsers } from "@/__generated__/api";
import { Users } from "./_components/Users";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TestPage(props: Props) {
  const searchParams = await props.searchParams;
  console.log("searchParams:", searchParams);

  const user = await getUsers({
    name: typeof searchParams.name === "string" ? searchParams.name : undefined,
    limit: null,
    tags: Array.isArray(searchParams.tags) ? searchParams.tags : undefined,
  });

  return (
    <div>
      <Users />
      <form>
        <input name="name" placeholder="name" />
        <input name="age" type="number" placeholder="age" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
