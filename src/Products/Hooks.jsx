import React, { use, useEffect, useRef, useState } from "react";
import Loader from "./Loader";

const Scroll = () => {
  const [updateData, setUpdateData] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelevtedValue] = useState(1);
  const [getItem, setgetItem] = useState(false);
  const inputRef = useRef(null)
  console.log(data);

  const handleUpdate = () => {
    setUpdateData(true);
  };

  const getProduct = (e) => {
    setSelevtedValue(e.target.value);
  };

  const getOneItem = () => {
    setgetItem(true);
  };

  const handleClickforInput = () => {
    inputRef.current.focus();
  }



  let URL;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      {
        getItem
          ? (URL = `https://fakestoreapi.com/products/${selectedValue}`)
          : (URL = `https://fakestoreapi.com/products/`);
      }

      const response = await fetch(URL);
      const data = await response.json();
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, [selectedValue, updateData]);

  return (
    <>
      {getItem ? (
        <div>
            
          <select value={selectedValue} onChange={getProduct}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <div className="w-1/5">
            <h1>{data.title}</h1>
            <p>{data.price}</p>
            <img src={data.image} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col mx-[50px]">
          <button
            onClick={handleUpdate}
            className="bg-black p-2 my-2 w-[200px] text-white rounded-md"
          >
            Update Data
          </button>
          <button onClick={handleClickforInput}
            className="bg-black p-2 my-2 w-[200px] text-white rounded-md"
          >
            Click me
          </button>
          <input ref={inputRef} type="text" placeholder="Search" className="p-5"></input>
          <button
            onClick={getOneItem}
            className="bg-black p-2 my-2 w-[200px] text-white rounded-md"
          >
            Get an item
          </button>

          <div className="flex flex-wrap">
            {data.map((item, index) => {
              return (
                <div key={index} className="w-1/5">
                  <h1>{item.title}</h1>
                  <p>{item.price}</p>
                  <img src={item.image} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Scroll;