import React from "react";
import contentImage from "../../assets/images/top-content-image.png";
import "./topContentStyle.scss";
const TopContent = ({ typeTemplate }: any) => {
  return (
    <section className="top-content">
      <div className="content-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="d-flex align-items-center h-100">
                <div className="content-wrapper">
                  <h1>
                    Get started with a {typeTemplate} template that fits you
                  </h1>
                  <p>Choose from our quality expert-curated styles</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content-figure">
                <img src={contentImage} alt="top content image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopContent;
