import NigeriaSelect from "./components/NigeriaSelect";

function App() {
  const handleChange = (values: { state: string; lga: string }) => {
    console.log("Selected:", values);
  };

  const handleStateChange = (state: string) => {
    console.log("State changed:", state);
  };

  const handleLGAChange = (lga: string) => {
    console.log("LGA changed:", lga);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto px-3">
        <div className="bg-white p-6 rounded-lg shadow px-4">
          <h1 className="text-2xl font-bold mb-6 py-2">
            Nigeria State and local Govt Selection{" "}
          </h1>

          <NigeriaSelect
            onChange={handleChange}
            onStateChange={handleStateChange}
            onLGAChange={handleLGAChange}
            showLabels={true}
            required={true}
            className="space-y-6"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
