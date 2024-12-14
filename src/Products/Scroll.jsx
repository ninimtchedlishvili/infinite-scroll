import React, { useEffect, useState, useRef } from "react";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page
  const loaderRef = useRef(null); // Reference for the observer

  // Fetch data function
  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=5&page=${page}`
      );
      const result = await response.json();
      setData((prev) => [...prev, ...result]); // Append new data to existing data
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // Increment page when the loader is visible
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  // Fetch data when the page changes
  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Infinite Scroll Example</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div key={index} className="p-4 border rounded-md shadow-md">
            <h2 className="text-lg font-medium">{item.title}</h2>
            <p className="text-gray-600">${item.price}</p>
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
          </div>
        ))}
      </div>
      {loading && <p className="text-gray-500">Loading...</p>}
      {/* Loader Element */}
      <div ref={loaderRef} className="h-10 w-full"></div>
    </div>
  );
};

export default InfiniteScroll;
