import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Blogging Platform</title>
        <meta
          name="description"
          content="A blogging platform with Markdown editor"
        />
      </Head>
      <main>
        <h1>Welcome to the Blogging Platform</h1>
        <p>Start writing your posts using the Markdown editor.</p>
      </main>
    </div>
  );
}
