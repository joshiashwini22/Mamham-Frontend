import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

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
      <h2>Top 5 Ordered Dishes</h2>
      <Bar
        data={topDishesData}
        options={{
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: "Top 5 Ordered Dishes",
              fontSize: 20
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};

export default TopDishes;
