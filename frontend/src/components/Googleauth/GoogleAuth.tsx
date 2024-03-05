// @ts-nocheck

import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "use-http";
import { getDataFromLocalDB, getDataFromLocalDBForCover } from "../../services";
import { getSubscriptionData, saveLogin } from "../../store/action";

const Google = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { response, post, loading, get, put, request } = useFetch();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const location = JSON.parse(localStorage.getItem("location"));
  useEffect(() => {
    setIsLoading(true);
    console.log(
      window.location.href.split("/")[4].split("=")[1],
      "window.location.href.spl"
    );
    let access_token = window.location.href.split("/")[4].split("=")[1];
    let data = {
      access_token: access_token,
    };

    dispatch(saveLogin(data));
    const getUser = async () => {
      const res = await get("user/me");
      const subscriptionData = await get("subscription/subscription-data");

      if (response.ok) {
        dispatch(saveLogin(res.data));
        dispatch(getSubscriptionData(subscriptionData?.data));
      }
    };

    setTimeout(() => {
      getUser();
      if (
        location === "/dashboard/creative" ||
        location === "/dashboard/classic"
      ) {
        const CreateResume = async () => {
          const {
            resumeTitle,
            profile,
            workHistory,
            education,
            publications,
            skills,
            languages,
            hobbies,
            certification,
            references,
            summary,
            achievements,
            customSection,
            profileImage,
          } = getDataFromLocalDB();
          const resumeStyleData = JSON.parse(
            localStorage.getItem("resumeStyle") || "{}"
          );

          const template = JSON.parse(
            localStorage.getItem("templateType") || "{}"
          );
          request.cache.set;
          const res = await post("resume/create-resume", {
            resumeTitle,
            profile,
            workHistory,
            education,
            publications,
            skills,
            languages,
            hobbies,
            certification,
            references,
            summary,
            achievements,
            customSection,
            profileImage,
            templateCategory: template?.resumeCategory,
            resumeType: template?.resumeName,
            resumeStyle: resumeStyleData,
          });

          navigate(
            `/dashboard/${template?.resumeCategory}?id=${res?.data?._id}`
          );
          if (res.code == 200) {
            // console.log(profileImage, "profileImage");
            // const responses = await put(`resume/update/${res?.data?._id}`, {
            //   templateType: template,
            //   resumeType: template,
            //   resumeStyle: resumeStyleData,
            // });
            // const ress = await get("resume/generate/" + res?.data?._id);
            // const link = document.createElement("a");
            // link.href = ress["url"];
            // link.download = "MyResume.pdf";
            // link.click();
            // link.remove();
          }
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
          // if (res) {
          //
          // }
        };
        CreateResume();
      } else if (location === "/cover-letter/create-cover-letter") {
        const postHandle = async () => {
          const template = JSON.parse(
            localStorage.getItem("coverTemplateType") || ""
          );
          const customStyle = JSON.parse(
            localStorage.getItem("coverStyle") || "{}"
          );
          const data = getDataFromLocalDBForCover();

          const res = await post(`cover-letter/create`, {
            profile: data?.profile,
            receipient: data?.receipient,
            body: data?.body,
            closing: data?.closing,
            introduction: data?.introduction,
            coverLetterType: template,
            coverTemplateType: template,
            coverStyle: customStyle,
          });
          navigate(`/cover-letter/create-cover-letter?id=${res?.data?._id}`);
          // if (res.code == 200) {
          //   const rese = await get("cover-letter/generate/" + res?.data?._id);
          //   const link = document.createElement("a");
          //   link.href = rese["url"];
          //   link.download = "MyResume.pdf";
          //   link.click();
          //   link.remove();
          // }
        };
        postHandle();
      } else {
        navigate("/dashboard/my-resume");
      }
    }, 1000);

    // dispatch(Getuser(window.location.href.split("/")[4].split("=")[1])).then(
    //   (res: any) => {
    //     navigate("/dashboard");
    //   }
    // );
  }, []);

  return <div>{isLoading ? <Spinner animation="border" /> : null}</div>;
};

export default Google;
