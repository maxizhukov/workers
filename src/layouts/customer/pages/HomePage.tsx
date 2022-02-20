import React, {useRef} from "react";
import CustomerWorkSearch from "../../../components/Search/CustomerWorkSearch";
import "./styles.css";
import CategoryCard from "../../../components/Cards/CategoryCard/CategoryCard";
import serviceImage from "../../../assets/images/service.svg";
import {HomeOutlined} from "@ant-design/icons";
import Footer from "../../../components/Footer/Footer";

// eslint-disable-next-line max-len
const bg = "https://d1b747rczec55w.cloudfront.net/assets/home-bg-4dc4b66b752c785811e5c6b1d3df1f90b953d05e0ff367ff34f8823f34a0036a.svg";

export default function HomePage() {

  return(
    <div>
      <div className="home_main_container" style={{
        backgroundImage: `url(${bg})`,
        backgroundPositionX: "center",
        backgroundPositionY: "bottom",
        backgroundSize: "cover"
      }}>
        <div className="home_section_home">
          <h1>Find the ideal service provider for all day-to-day services</h1>
          <h2>Worket will provide you only approved workers!</h2>
          <CustomerWorkSearch />
        </div>
      </div>
      <div className="home_section_categories">
        <h2>Discover all categories</h2>
        {/* eslint-disable-next-line max-len */}
        <h4>Worket is always caring about your comfort, so we are trying to add new categories and workers every day</h4>
        <div className="home-section_categories_grid">
          <CategoryCard data={"data"} />
          <CategoryCard data={"data"} />
          <CategoryCard data={"data"} />
          <CategoryCard data={"data"} />
          <CategoryCard data={"data"} />
          <CategoryCard data={"data"} />
        </div>
        <h2>Our most popular services</h2>
        <div className="home_services_grid">
          <div
            className="home_services_grid_card"
            style={{backgroundImage: `url(${serviceImage})`}}
          >
            <h3>Furniture assembly</h3>
            <p>Avarage waiting time: 3 Minutes</p>
          </div>
          <div
            className="home_services_grid_card"
            style={{backgroundImage: `url(${serviceImage})`}}
          >
            <h3>Furniture assembly</h3>
            <p>Avarage waiting time: 3 Minutes</p>
          </div>
          <div
            className="home_services_grid_card"
            style={{backgroundImage: `url(${serviceImage})`}}
          >
            <h3>Furniture assembly</h3>
            <p>Avarage waiting time: 3 Minutes</p>
          </div>
          <div
            className="home_services_grid_card"
            style={{backgroundImage: `url(${serviceImage})`}}
          >
            <h3>Furniture assembly</h3>
            <p>Avarage waiting time: 3 Minutes</p>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        {/* eslint-disable-next-line max-len */}
        <path fill="#4157ff" fillOpacity="1" d="M0,192L60,202.7C120,213,240,235,360,202.7C480,171,600,85,720,85.3C840,85,960,171,1080,213.3C1200,256,1320,256,1380,256L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
      <div className="home_waves">
        <h3>How it works</h3>
        <div className="how_it_works_grid">
          <div className="how_it_works_grid_item">
            <h4>Request a service</h4>
            <p>Fill out the form</p>
          </div>
          <div className="how_it_works_grid_item">
            <h4>Book your jobber</h4>
            <p>Competent jobbers close to you offer their services</p>
          </div>
          <div className="how_it_works_grid_item">
            <h4>{"Smile, it's done!"}</h4>
            <p>Your jobber provides you with a service at the agreed price and date</p>
          </div>
        </div>

        <h3 style={{marginTop: "30px"}}>Our specialists</h3>
        <div className="how_it_works_grid">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="row">
              <HomeOutlined style={{fontSize: "40px", marginRight: "20px"}} />
              <div className="home_stats">
                <h4>12,000</h4>
                <p>Jobs completed</p>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="row">
              <HomeOutlined style={{fontSize: "40px", marginRight: "20px"}} />
              <div className="home_stats">
                <h4>12,000</h4>
                <p>Jobs completed</p>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="row">
              <HomeOutlined style={{fontSize: "40px", marginRight: "20px"}} />
              <div className="home_stats">
                <h4>12,000</h4>
                <p>Jobs completed</p>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="row">
              <HomeOutlined style={{fontSize: "40px", marginRight: "20px"}} />
              <div className="home_stats">
                <h4>12,000</h4>
                <p>Jobs completed</p>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="row">
              <HomeOutlined style={{fontSize: "40px", marginRight: "20px"}} />
              <div className="home_stats">
                <h4>12,000</h4>
                <p>Jobs completed</p>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="row">
              <HomeOutlined style={{fontSize: "40px", marginRight: "20px"}} />
              <div className="home_stats">
                <h4>12,000</h4>
                <p>Jobs completed</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        {/* eslint-disable-next-line max-len */}
        <path fill="#4157ff" fillOpacity="1" d="M0,192L60,202.7C120,213,240,235,360,202.7C480,171,600,85,720,85.3C840,85,960,171,1080,213.3C1200,256,1320,256,1380,256L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
      </svg>
      <Footer />
    </div>
  );
}
function useFocus(): [any, any] {
  throw new Error("Function not implemented.");
}

