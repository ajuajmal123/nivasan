import { redirect } from "next/navigation";

export default function AboutPageRedirect() {
  redirect("/#about");
  return null;
}
