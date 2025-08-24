"use client";

import { getUsers } from "@/__generated__/api";

export function Users() {
  getUsers({
    name: "test",
    limit: null,
    tags: ["tag1", "tag2"],
  });
  return <div>Users Component</div>;
}
