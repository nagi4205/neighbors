// not installed
// import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// not created
import PostCard from "@/components/cards/PostCard";
// import Pagination from "@/components/shared/Pagination";

// not created
import PostList from "@/lib/actions/post.action";
import InputForm from "@/components/forms/InputForm";
// import { fetchUser } from "@/lib/actions/user.actions";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // const user = await currentUser();
  // if (!user) return null;
  console.log("ぐみ");
  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text text-left text-sky-400">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        <PostList />
        <InputForm />
      </section>
    </>
  );
}

export default Home;
