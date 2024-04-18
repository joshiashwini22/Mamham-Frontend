import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const TopDishes = () => {
  const [topDishes, setTopDishes] = useState({
    labels: [],
    datasets: [
      {
        label: "Quantity Ordered",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: []
      }
    ]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      
      const response = await axios.get("http://127.0.0.1:8000/api/customization/dashboard/order");
      console.log(response)
      const topDish = response.data.top_dishes_data;

      const labels = topDish.map(dish => dish.dish__name);
      const quantities = topDish.map(dish => dish.quantity);

      setTopDishes({
        ...topDishes,
        labels: labels,
        datasets: [
          {
            ...topDishes.datasets[0],
            data: quantities
          }
        ]
      });
    } catch (error) {
      console.error("Error fetching top dishes:", error);
    }
  };

  return (
    <div>
      <h2>Top 5 Ordered Dishes</h2>
      
    </div>
  );
};

export default TopDishes;
