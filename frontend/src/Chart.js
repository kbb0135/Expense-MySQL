import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Chart } from "react-google-charts";
import axios from 'axios';

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "My Daily Activities",
};
export default function VisualChart() {

    const [item, setItem] = useState([])
    useEffect(() => {

        axios.get("http://localhost:7000/add").then((response) => {
            setItem(response.data)
            console.log(response.data)
        })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.status)
                }
            })

    }, [])

    const value = [
      ["CategoryName", "Price"],
    ]

  return (
    <div>
      <Header />
      <div>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
        <div>
          <br></br>
          <Chart
            chartType="BarChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
      </div>
    </div>
  )
}
