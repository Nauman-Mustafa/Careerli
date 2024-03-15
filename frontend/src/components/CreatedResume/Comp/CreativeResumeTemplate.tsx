// @ts-nocheck
import { Icon } from "@iconify/react";
import { createRef, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import { TempType } from "../../../enums/template.enum";
import { $resume } from "../../../services";
import LoginModal from "../../Login/LoginModal";
import "../resumeStyle.scss";
import ClassicResumeTemlpate from "./ClassicResumeTemlpate";
import ClassicResumeTemlpate11 from "./ClassicResumeTemlpate11";
import ClassicResumeTemlpate7 from "./ClassicResumeTemlpate7";
import ResumeCreativeTemplate from "./ResumeCreativeTemplate";
import { toast } from "react-toastify";
// import CreativeTemplate from "./creativeTemplate";

const CreativeResumeTemplate = ({ docId }) => {
  const ref: any = createRef();
  const { data: repos, put, get, request, loading } = useFetch();
  const [modalShow, setModalShow] = useState(false);
  const auth: any = useSelector((store: any) => store.auth);
  const [data, setData] = useState<any>({});

  const [template, setTemplate] = useState("");
  const _template = JSON.parse(localStorage.getItem("templateType"));
  useEffect(() => {
    const $sub = $resume.subscribe((v) => {
      setData(v);
    });
    // const $temp = $template.subscribe((v) => {
    //   setTemplate(v);
    // });
    return () => {
      $sub.unsubscribe();
      // $temp.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (docId != "guestUser" && auth.isLoggedIn && docId) {
      fetchResume();
    } else {
      setTemplate(_template?.resumeName);
    }
  }, [docId]);

  const fetchResume = async () => {
    const res = await get(`resume/my-resume/${docId}`);
    // console.log(res?.data?.profileImage, "res ponse ");

    setTemplate(res?.data?.resumeType);
    // setResumeStyle(res?.data?.resumeStyle);
  };
  const downloadHandler = async () => {
    if (!auth.isLoggedIn) {
      // toast.error("Please Login First");
      setModalShow(true);
    } else {
      if (docId !== "guestUser") {
        const res = await get("resume/generate/" + docId);
        if ((res.StatusCode === 400) | 404 | 500) {
          toast.error(res.message);
        } else {
          const link = document.createElement("a");
          link.href = res["url"];
          link.download = "MyResume.pdf";
          link.click();
          link.remove();
        }
      }
    }
  };
  const getTemplate = (templateType) => {
    switch (templateType) {
      case TempType.TEMPLATE_ONE:
        return <ResumeCreativeTemplate data={data} />;
      case TempType.TEMPLATE_TWO:
        return <ClassicResumeTemlpate data={data} />;
      case TempType.TEMPLATE_SEVEN:
        return <ClassicResumeTemlpate7 data={data} />;
      case TempType.TEMPLATE_ELEVEN:
        return <ClassicResumeTemlpate11 data={data} />;
    }
  };
  return (
    <>
      <div className="created-resume-template">{getTemplate(template)}</div>
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

export default CreativeResumeTemplate;
