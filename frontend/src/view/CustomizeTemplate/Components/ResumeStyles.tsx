// @ts-nocheck
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFetch from "use-http";
import editTemplate from "../../../assets/images/edit-template.svg";
import { updateResumeStyle } from "../../../services";
let customStyle = JSON.parse(localStorage.getItem("resumeStyle"));
const ColorOnChange = ({ color, background, styleData }) => {
  const [colorChange, setColorChange] = useState(styleData);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setColorChange(styleData);
  }, [styleData]);
  const handleChange = (e: any) => {
    setColorChange(e.target.value);
    if (color) {
      color((prev) => {
        return {
          ...prev,
          color: e.target.value,
        };
      });
    } else {
      background((prev) => {
        return {
          ...prev,
          backgroundColor: e.target.value,
        };
      });
    }
  };

  return (
    <div className="row">
      <div className="col-2">
        <div className="resume-form-group color-input">
          <div>
            <input
              type="color"
              id="favcolor"
              name="favcolor"
              value={colorChange}
              defaultValue={colorChange}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="col-5">
        <div className="resume-form-group">
          <input
            type="text"
            className="form-control"
            value={colorChange}
            defaultValue={colorChange}
          />
        </div>
      </div>
      {/* <div className="col-5">
        <div className="resume-form-group">
          <input
            type="text"
            className="form-control opacity"
            defaultValue="100"
          />
        </div>
      </div> */}
    </div>
  );
};
const ResumeStyles = ({userData}) => {
  console.log(userData?.userData?.roles)
  const { response, post, loading, get, data: repos, put } = useFetch();
  const auth: any = useSelector((store: any) => store.auth);
  const [docId, setDocId] = useState("");
  const [resetloader, setResetLoader] = useState(false);
  const [styleData, setStyleData] = useState<{
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lieHeight: string;
    color: string;
    backgroundColor: string;
  }>({
    fontFamily: "",
    fontSize: "",
    fontWeight: "",
    lieHeight: "",
    color: "#000000",
    backgroundColor: "#ffffff",
  });
  useEffect(() => {
    setDocId(window.location.href.split("=")[1]);
  }, []);
  useEffect(() => {
    if (docId != "guestUser" && auth.isLoggedIn && docId) {
      fetchResume();
    } else {
      setStyleData(customStyle);
    }
  }, [docId]);
  const fetchResume = async () => {
    const res = await get(`resume/my-resume/${docId}`);

    setStyleData(res?.data?.resumeStyle);
  };
  updateResumeStyle(styleData);
  const handleStyleChange = async () => {
    if (auth.isLoggedIn) {
      const res = await put(`resume/update/${docId}`, {
        resumeStyle: styleData,
      });
      toast("Changing Saved");
    } else {
      localStorage.setItem("resumeStyle", JSON.stringify(styleData));
      toast("Changing Saved");
    }
  };

  const resetToDefault = () => {
    setResetLoader(true);
    setTimeout(() => {
      setStyleData({
        fontFamily: "",
        fontSize: "",
        fontWeight: "",
        lieHeight: "",
        color: "",
        backgroundColor: "",
      });
      setResetLoader(false);
    }, 1000);
  };

  return (
    <div className="resume-styles">
      <div className="resume-styles-container">
        <div className="heading">Text Style</div>
        <div className="resume-form-group">
          <select
            className="form-control"
            value={styleData?.fontFamily}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStyleData((prev) => {
                return {
                  ...prev,
                  fontFamily: e.target.value,
                };
              });
            }}
          >
            <option>New Times Roman</option>
            <option>'Lato', sans-serif</option>
            <option>'Poppins', sans-serif</option>
            <option>"Satoshi"</option>
            <option>'Montserrat', sans-serif</option>
            <option disabled ={userData?.userData?.roles == "Free Member"}>'Arial'</option>
            <option disabled={userData?.userData?.roles == "Free Member"}>'Courier'</option>
            <option disabled={userData?.userData?.roles == "Free Member"}>'Monaco'</option>
            <option disabled={userData?.userData?.roles == "Free Member"}>'Calibri'</option>
            <option disabled={userData?.userData?.roles == "Free Member"}>'Fantacy'</option>

          </select>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="resume-form-group">
              <select
                className="form-control"
                value={styleData?.fontWeight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setStyleData((prev) => {
                    return {
                      ...prev,
                      fontWeight: e.target.value,
                    };
                  });
                }}
              >
                <option>regular</option>
                <option>100</option>
                <option>200</option>
                <option>300</option>
                <option>400</option>
                <option>500</option>
                <option>600</option>
                <option>700</option>
                <option>800</option>
                <option>900</option>
                <option>bold</option>
                <option>bolder</option>
              </select>
            </div>
          </div>
          <div className="col-4">
            <div className="resume-form-group">
              <select
                className="form-control"
                value={styleData?.fontSize}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setStyleData((prev) => {
                    return {
                      ...prev,
                      fontSize: e.target.value,
                    };
                  });
                }}
              >
                <option>12</option>
                <option>14</option>
                <option>16</option>
                <option>18</option>
                <option>20</option>
                <option>22</option>
                <option>24</option>
                <option>26</option>
                <option>28</option>
                <option>30</option>
                <option>32</option>
              </select>
            </div>
          </div>
          {/* <div className="col-3">
            <div className="resume-form-group">
              <input
                className="form-control line-height"
                type="text"
                value="0%"
              />
            </div>
          </div> */}
        </div>
        <ColorOnChange
          styleData={styleData?.color ? styleData?.color : "#ffffff"}
          color={setStyleData}
        />
        <div className="heading mt-4">Background Colors</div>
        <ColorOnChange
          styleData={
            styleData?.backgroundColor ? styleData?.backgroundColor : "#000000"
          }
          background={setStyleData}
        />
      </div>
      <div className="d-flex justify-content-center mt-4 mb-2 w-100">
        <button className="btn btn-yellow me-2" onClick={resetToDefault}>
          {resetloader ? <Spinner animation="border" /> : "Reset Default"}
        </button>
        <button className="btn btn-yellow" onClick={() => handleStyleChange()}>
          {loading ? <Spinner animation="border" /> : "Save Edits"}
        </button>
      </div>
      <div className="edit-template-box">
        <figure>
          <img src={editTemplate} alt="image not found" />
        </figure>
        <p>Edit templates to your taste</p>
      </div>
    </div>
  );
};

export default ResumeStyles;
