import Header from "@/components/Header";

export default function Agree() {
  return (
    <div className="app">
      <Header returnText="Back to booking" />
      <main>
        <p>page text</p>
        {/* placeholder for testing scrolling behavior */}
        <div
          style={{ width: "10rem", height: "100rem", backgroundColor: "blue" }}
        />
      </main>
    </div>
  );
}
