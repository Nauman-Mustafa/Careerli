import React from "react";
import Header from "../../components/Header/Header";
import FAQs from "./FAQs";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
const PricingPlan = () => {
  return (
    <>
      <Header />
      <main>
        <div className="pricing-wrapper">
          <div className="pricing-top-container">
            <div className="top-container">
              <h1>
                Different plans for
                <br /> different needs
              </h1>
            </div>
          </div>
          <Pricing />
          <FAQs />
          <Testimonials />
        </div>
      </main>
    </>
  );
};

export default PricingPlan;
