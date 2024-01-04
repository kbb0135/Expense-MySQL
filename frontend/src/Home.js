import React from 'react'
import Header from './Header'
import Carousel from 'react-bootstrap/Carousel';
import { Chart } from "react-google-charts";
import './Expense.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';


export default function Home() {
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    title: "My Daily Activities",
  };
  return (
    <div>
      <Header />
      <div >
        <h1>Helps Managing your Expenses In Appealing Way!!!</h1>
        <h3>
         <Badge bg="danger">Visualize it!!</Badge>
      </h3>
      <h3>
         <Badge bg="primary">Manage Your Expenses!</Badge>
      </h3>
      <h3>
         <Badge bg="success">Track Your Expenses So That You Don't Get Behind!!</Badge>
      </h3>
        <br></br>
        <br></br>

        <div>
          <div>

          </div>
          <div className="Carousel-Container">
            <Carousel data-bs-theme="dark" className="Carousel-Container">
              <Carousel.Item>
                <img
                  className="d-block w-50 mx-auto"
                  src="https://t3.ftcdn.net/jpg/00/79/57/02/360_F_79570227_8hAFZ2EWXLq8kpjLqQXNmiAh4Fql8rI7.jpg"
                  alt="First slide"

                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-50 mx-auto"
                  src="https://t3.ftcdn.net/jpg/01/60/63/24/360_F_160632424_yvFn6XeZtGJhHTDEAeqpNDVEZBqzOmdD.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-50 mx-auto"
                  src="https://images.inc.com/uploaded_files/image/1920x1080/getty_862152778_380774.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        <div className="flex-container">
          <div className="left-content">
            <br></br>
            <br></br>
            <br></br>
            <h1 className="text-danger">Visualize your Data</h1>

            <p>Our expense management application is equipped with
              an array of powerful visualization tools
              aimed at providing insightful analyses of your
              financial data. Seamlessly tracking your expenses,
              our app offers an intuitive user interface presenting
              your spending patterns through dynamic pie charts,
              insightful bar graphs, and more. Easily categorize your
              expenditures and visualize the distribution of your finances
              with interactive pie charts, allowing you to comprehend
              where your money is being allocated. Gain deeper
              insights into your spending habits using our bar graphs,
              presenting a detailed comparison of expenses over time or
              across different categories. With these visualization features,
              our app empowers you to make informed financial decisions and
              effectively manage your budget, offering clarity and comprehension
              in your financial journey.</p>
          </div>

          <div className="right-content">
            <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width={"100%"}
              height={"400px"}
            />



          </div>

        </div>
        <Link to="/addexpense"><Button size="lg" className="btn btn-dark">
          Get Started With Your Expense
        </Button>
        </Link>
        <br></br>
        <br></br>
        <hr></hr>
        

        <div className="left-content">
          <h1 className="text-success">Track Your Progress</h1>
          <p>Our comprehensive expense management platform not only
            enables efficient financial tracking but also empowers
            users to monitor their progress seamlessly. Through a range of
            visualization tools including dynamic pie charts, insightful
            bar graphs, and trend analysis features, our app allows you
            to effortlessly track and visualize your financial journey.
            Monitor your spending habits, understand expense trends,
            and compare expenditures over time or across various
            categories using interactive graphs and charts.
            By visualizing your financial data, you can easily
            gauge progress towards your budget goals, identify areas
            for potential savings, and make informed financial decisions.
            Our app serves as a reliable companion in your financial
            planning, offering clear insights and progress tracking
            to help you achieve your financial objectives effectively</p>
        </div>
        <div className="image-container">
          <img src="https://www.jaspersoft.com/sites/jaspersoft/files/2023-09/pie-chart-example.svg" alt="img-1" />
        </div>
        <br></br>
        <br></br>
        <Link to="/visualizeexpense"><Button size="lg" className="btn btn-success">
          Visualize Your Data
        </Button>
        </Link>
        <br></br>
        <br></br>
        <hr></hr>

        <div className="flex-container">
          <div className="left-content">
            <Chart
              chartType="ColumnChart"
              data={data}
              options={options}
              width={"100%"}
              height={"400px"}
            />
          </div>
          <div className="right-content">
            <h1 className="text-warning bg-dark">Enjoy Your Savings!!!</h1>
            <p>Absolutely! "Enjoy Your Savings" is a wonderful
              way to wrap up the description of an expense management
              app that aims to assist users in managing their finances
              effectively. It adds a positive and encouraging note to the
              overall message. Here's an enhanced concluding sentence for
              the expense app's description:
              <br></br>
              "Start using our app today to gain control over
              your expenses, make informed financial decisions,
              and enjoy your savings with confidence!"</p>
          </div>


        </div>

      </div >

    </div >
  )
}
