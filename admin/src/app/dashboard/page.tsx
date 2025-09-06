export default function Dashboard() {
  return (
    <div className="min-h-screen w-full p-6">
      <h1 className="text-3xl font-bold">Welcome to the Admin Dashboard</h1>
      
      {/* Example: Add more sections */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="shadow rounded-xl p-4">Card 1</div>
        <div className="shadow rounded-xl p-4">Card 2</div>
        <div className="shadow rounded-xl p-4">Card 3</div>
        <div className="shadow rounded-xl p-4">Card 3</div>
        <div className="shadow rounded-xl p-4">Card 3</div>
        <div className="shadow rounded-xl p-4">Card 3</div>
        <div className="shadow rounded-xl p-4">Card 3</div>
        <div className="shadow rounded-xl p-4">Card 3</div>
        <div className="shadow rounded-xl p-4">Card 3</div>
      </div>
    </div>
  );
}

