import { Icon } from "@iconify/react";
import React from "react";
import umberallaImage from "../../assets/images/umbrella.png";
const Testimonials = () => {
  return (
    <div className="testimonials">
      <div className="container">
        <div className="testimonials-wrapper">
          <div className="single-testimonial">
            <figure>
              <img src={umberallaImage} />
            </figure>
            <div className="heading1">Testimonials</div>
            <div className="testimonial-description">
              Friendly and outgoing Customer Service Representative with 7 years
              of experience in busy call centers. Proven ability to deliver
              exceptional customer service and to resolve issues promptly.
              Friendly and outgoing Customer Service Representative with 7 years
              of experience in busy call centers. Proven ability to deliver
              exceptional customer service and to resolve issues promptly.{" "}
            </div>
            <div className="stars">
              <div className="single-star">
                <Icon icon="clarity:star-solid" />
              </div>
              <div className="single-star">
                <Icon icon="clarity:star-solid" />
              </div>
              <div className="single-star">
                <Icon icon="clarity:star-solid" />
              </div>
              <div className="single-star">
                <Icon icon="clarity:star-solid" />
              </div>
              <div className="single-star">
                <Icon icon="clarity:star-solid" />
              </div>
            </div>
            <div className="username">Chris Christopher</div>
            <div className="designation">Job seeker</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
