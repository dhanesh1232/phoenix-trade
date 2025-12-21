import { redirect } from "next/navigation";

export default function CustomNotFound() {
  redirect("/not-found");
}
