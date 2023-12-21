import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://s3.amazonaws.com/open-to-cors/assignment.json"
        );
        const fetchedProducts = response.data.products;
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const sortedProducts = Object.values(products).sort(
    (productA, productB) => productB.popularity - productA.popularity
  );
  return (
    <div>
      <h2 className="font-bold">FETCHED DATA</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              TITLE
            </th>
            <th scope="col" className="px-6 py-3">
              PRICE
            </th>
            <th scope="col" className="px-6 py-3">
              POPULARITY
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.values(sortedProducts).map((value, index) => {
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{value.title}</td>
                <td className="px-6 py-4">{value.price}</td>
                <td className="px-6 py-4">{value.popularity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
