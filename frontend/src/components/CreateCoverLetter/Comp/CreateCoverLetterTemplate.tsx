// @ts-nocheck
import { Icon } from "@iconify/react";
import { createRef, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import { $coverLetter } from "../../../services";
import "../../CreatedResume/resumeStyle.scss";
import LoginModal from "../../Login/LoginModal";

const CreateCoverLetterTemplate = () => {
  const ref: any = createRef();
  const { data: repos, put, get, request, loading } = useFetch();
  const [modalShow, setModalShow] = useState(false);
  const auth: any = useSelector((store: any) => store.auth);
  const [data, setData] = useState<any>({});
  const [id, setId] = useState("");
  const [selectedTemp, setSelectedTemp] = useState<string>("");
  const [resumeStyleData, setResumeStyle] = useState({});
  // const template = JSON.parse(localStorage.getItem("coverTemplateType"));
  const customStyle = JSON.parse(localStorage.getItem("coverStyle"));

  useEffect(() => {
    const $sub = $coverLetter.subscribe((v) => {
      setData(v);
    });
    return () => $sub.unsubscribe();
  }, []);

  useEffect(() => {
    setId(window.location.href.split("=")[1]);
  }, [id]);
  useEffect(() => {
    if (id != "guestUser" && auth.isLoggedIn && id) {
      fetchResume();
    } else {
      // setSelectedTemp(template);
      setResumeStyle(customStyle);
    }
  }, [id]);
  const fetchResume = async () => {
    const res = await get(`cover-letter/my-cover-letter/${id}`);
    setSelectedTemp(res?.data?.coverTemplateType);
    setResumeStyle(res?.data?.coverStyle);
  };
  const downloadHandler = async () => {
    if (!auth.isLoggedIn) {
      // toast.error("Please Login First");
      setModalShow(true);
    } else {
      if (id !== "guestUser") {
        const res = await get("cover-letter/generate/" + id);
        const link = document.createElement("a");
        link.href = res["url"];
        link.download = "MyResume.pdf";
        link.click();
        link.remove();
      }
    }
  };

  return (
    <>
      <div className="created-resume-template">
        <div className="cover-letter-template">
          <div className="cover-letter-template-header">
            <div className="username">
              {data?.profile?.firstName} <b>{data?.profile?.lastName}</b>
            </div>
            <div className="designation">Marketing Specialist</div>
            <ul>
              <li>
                <b>Phone:</b>
                {data?.profile?.phone ? data?.profile?.phone : +92383774737}
              </li>
              <li>
                <b>Email:</b>{" "}
                {data?.profile?.email
                  ? data?.profile?.email
                  : "johnsmith@careerly.com"}
              </li>
            </ul>
          </div>
          <div
            className={`cover-letter-template-body font-weight-${resumeStyleData?.fontWeight} font-size-${resumeStyleData?.fontSize}`}
            style={{
              fontFamily: resumeStyleData?.fontFamily,
              backgroundColor: resumeStyleData?.backgroundColor,
              color: resumeStyleData?.color,
            }}
          >
            <p>Flowervilla, 02/09/2022</p>
            <p>
              <b>
                {data?.receipient?.firstName
                  ? data?.receipient?.firstName
                  : "Ms. Katherine"}{" "}
              </b>
              <br />
              {data?.receipient?.positionHeld
                ? data?.receipient?.positionHeld
                : "Head of marketing"}
            </p>
            <p>
              {data?.receipient?.companyName
                ? data?.receipient?.companyName
                : " Xyz Company,"}{" "}
              <br />
              {data?.receipient?.companyAddress
                ? data?.receipient?.companyAddress
                : " 0009 Street"}{" "}
              {data?.receipient?.postalCode} ,
              <br />
              Flowervilla, Poinio
            </p>
            <p>
              Dear{" "}
              {data?.receipient?.firstName
                ? data?.receipient?.firstName
                : "Katherine"}{" "}
              ,
            </p>

            {data?.introduction?.opener ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: data?.introduction?.opener,
                }}
              />
            ) : ""
            }

            {data?.body ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: data?.body,
                }}
              />
            ) : ""
            }

            {data?.closing?.closingData ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: data?.closing?.closingData,
                }}
              />
            ) : ""}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-yellow" onClick={() => downloadHandler()}>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <>
              <Icon icon="eva:download-fill" hFlip={true} />
              <span>Download PDF</span>
            </>
          )}
        </button>
      </div>

      <LoginModal showModal={modalShow} showModalHandler={setModalShow} />
    </>
  );
};

export default CreateCoverLetterTemplate;
