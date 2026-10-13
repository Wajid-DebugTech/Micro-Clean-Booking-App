import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <p>page text</p>
        {/* placeholder for testing scrolling behavior */}
        <div
          style={{ width: "10rem", height: "100rem", backgroundColor: "blue" }}
        />
      </main>
    </>
  );
}
