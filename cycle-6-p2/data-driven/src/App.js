import React, { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]); // original data
  const [filterData, setFilterData] = useState([]); // filtered data
  const [search, setSearch] = useState(""); // search query
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(null); // error state

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setFilterData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearch(query);

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilterData(filtered);
  };

  // Conditional rendering
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Data Driven ReactJS Application</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      {/* Data List */}
      {filterData.length > 0 ? (
        <ul>
          {filterData.map((item) => (
            <li key={item.id} style={{ marginBottom: "15px" }}>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}