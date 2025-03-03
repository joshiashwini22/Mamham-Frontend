import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement } from "chart.js";

ChartJS.register(
  CategoryScale, LinearScale,
  BarElement, ArcElement
)

const TopDishes = () => {
  const [topDishesData, setTopDishesData] = useState({
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
      const topDishes = response.data.top_dishes_data;

      const labels = topDishes.map(dish => dish.dish__name);
      const quantities = topDishes.map(dish => dish.quantity);

      setTopDishesData({
        ...topDishesData,
        labels: labels,
        datasets: [
          {
            ...topDishesData.datasets[0],
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
            <h3 className="text-red-700 text-4xl font-bold sm:text-2xl text-center">
Top 5 Ordered Dishes</h3>
<br/>

      <Bar
        data={topDishesData}
        options={{
          title: {
            display: true,
            text: "Quantity of Each Dish Ordered",
            fontSize: 20
          },
          legend: {
            display: true,
            position: "right"
          }
        }}
      />
    </div>
  );
};

export default TopDishes;
