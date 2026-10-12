import Header from "@/components/header";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container">
        <p>page text</p>

        <div style={{ width: "10rem", height: "100rem", backgroundColor: "blue" }} /> {/* placeholder for testing scrolling behavior */}
        
      </div>
    </main>
  );
}
