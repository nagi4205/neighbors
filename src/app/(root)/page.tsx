"use client";

function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  console.log("iine");
  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10 text-sky-300">
        アップル
      </section>
    </>
  );
}

export default Home;
