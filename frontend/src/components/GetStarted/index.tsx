import { useNavigate } from "react-router-dom";
import topResumeImage from "../../assets/images/29.svg";
import "./style.scss";
const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div className="get-started-header d-flex">
      <figure>
        <img src={topResumeImage} alt="image not found" />
      </figure>
      <div className="resume-top-content">
        <h2>
          Upgrade to <b>Pro</b> to enjoy premium templates and personalized AI
          assistance.
        </h2>
        <button
          className="btn-get-started"
          onClick={() => navigate("/upgrade-plan")}
        >
          <span className="button-text">Get Started</span>
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
