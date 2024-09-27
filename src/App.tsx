import Card from "@/components/Card";
import "./App.css";

function App() {
  const colors1 = ["red", "orange", "green", "blue"];
  const colors2 = ["indigo", "purple"];

  return (
    <main
      style={{
        width: "100%",
        height: "100vh",
        maxWidth: 480,
        backgroundColor: "white",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        <Card colors={colors1} style={{ height: "60px", alignSelf: "center" }} />
        <Card colors={colors2} style={{ width: "50%", height: "120px", alignSelf: "center" }} />
      </div>
    </main>
  );
}

export default App;
