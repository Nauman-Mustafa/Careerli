// @ts-nocheck

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import Subtract from "../../../assets/images/Subtract.svg";
import Subtractright from "../../../assets/images/Subtractright.svg";
import profile from "../../../assets/images/profile_img.svg";
import {
  $resumeStyle,
  $sectionList,
  getDataFromLocalDB,
} from "../../../services";
import { svgIcons } from "../../../assets/svg/svgIcons";
const ResumeCreativeTemplate = ({ data }: any) => {
  const [selectedTemp, setSelectedTemp] = useState<string>("");
  const { response, post, loading, get, put, request } = useFetch();
  const [docId, setId] = useState("");
  const [resumeStyleData, setResumeStyle] = useState<any>({});
  const template = JSON.parse(localStorage.getItem("templateType"));
  const customStyle = JSON.parse(localStorage.getItem("resumeStyle"));
  const auth: any = useSelector((store: any) => store.auth);
  const [profileImage, setProfileImage] = useState();
  useEffect(() => {
    setId(window.location.href.split("=")[1]);
  }, []);
  useEffect(() => {
    if (docId != "guestUser" && auth.isLoggedIn && docId) {
      fetchResume();
    } else {
      setSelectedTemp(template);
      setResumeStyle(customStyle);
      let imageData = getDataFromLocalDB();

      setProfileImage(imageData?.profileImage);
    }
  }, [docId]);

  useEffect(() => {
    const sub$ = $sectionList.subscribe((v: any) => {
      setProfileImage(v?.profileImage);
    });
    const style$ = $resumeStyle.subscribe((s: any) => {
      setResumeStyle(s);
    });
    return () => {
      style$.unsubscribe();
      sub$.unsubscribe();
    };
  }, []);

  const fetchResume = async () => {
    const res = await get(`resume/my-resume/${docId}`);
    // console.log(res?.data?.profileImage, "res ponse ");

    setProfileImage(res?.data?.profileImage);
    setSelectedTemp(res?.data?.templateType);
    setResumeStyle(res?.data?.resumeStyle);
  };

  let dataMapped = () => {
    if (Object.keys(data).length < 1) return [];
    const { customSection, ...others }: any = data;
    const values = Object.values(others).concat(customSection);

    return [...values];
  };
  const activeList = () => dataMapped()?.filter((obj: any) => obj?.showComp);

  const rearangeList = activeList().sort(function (a: any, b: any) {
    return a.order - b.order;
  });
  // const ele = document
  //   .querySelector(".description-text *")
  //   ?.removeAttribute("style");
  // console.log(ele, "ele");
  // console.log(data?.profile, "data?.profile?")
  return (
    <div
      className={`Resume-Creative-Template`}
      style={{
        fontFamily: resumeStyleData?.fontFamily,
        backgroundColor: resumeStyleData?.backgroundColor,
        color: resumeStyleData?.color,
        fontWeight: resumeStyleData?.fontWeight,
        fontSize: resumeStyleData?.fontSize,
        height: "100vh",
      }}>
      <div>
        <div className="Templete__img">
          <img src={Subtract} alt="img not found" className="create-img-one" />
          <img
            src={Subtractright}
            alt="img not found"
            className="create-img-two"
          />
        </div>
        <div className="Resume-Heading">
          <h1 style={{ fontWeight: resumeStyleData?.fontWeight }}>
            {data?.profile?.firstName
              ? `${data?.profile?.firstName}  ${data?.profile?.lastName}`
              : ""}
          </h1>
          <h4
            style={{
              fontWeight: resumeStyleData?.fontWeight,
              color: "#808080",
            }}
            className="text-center">
            {data?.profile?.designation ? data?.profile?.designation : ""}
          </h4>
        </div>
        <div className="creative__Template">
          <div
            className="Resume-left-side"
            style={{ borderRightColor: resumeStyleData?.color }}>
            {data?.profileImage || profileImage ? (
              <div className="creative__profile">
                <img
                  src={
                    data?.profileImage
                      ? data?.profileImage
                      : profileImage
                      ? profileImage
                      : profile
                  }
                  alt=""
                />
              </div>
            ) : null}
            <div className="personalprofile">
              <div className="d-flex align-items-center mb-3">
                {/* <img src={personalprofile} alt="profile" /> */}
                {data?.summary?.showComp && data?.summary?.description ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 26 28"
                      fill="none">
                      <path
                        d="M9.66702 15.5162C13.416 15.5162 16.4551 12.2599 16.4551 8.24296C16.4551 4.22606 13.416 0.969727 9.66702 0.969727C5.91805 0.969727 2.87891 4.22606 2.87891 8.24296C2.87891 12.2599 5.91805 15.5162 9.66702 15.5162Z"
                        fill={
                          resumeStyleData?.color
                            ? resumeStyleData?.color
                            : "black"
                        }
                      />
                      <path
                        d="M15.0005 21.3348C17.4106 21.3348 19.3643 19.381 19.3643 16.9709C19.3643 14.5607 17.4106 12.6069 15.0005 12.6069C12.5905 12.6069 10.6367 14.5607 10.6367 16.9709C10.6367 19.381 12.5905 21.3348 15.0005 21.3348Z"
                        fill={
                          resumeStyleData?.color
                            ? resumeStyleData?.color
                            : "black"
                        }
                      />
                      <path
                        d="M22.6837 12.0416C24.5204 3.05282 17.2173 -1.06092 9.1123 0.233717C1.00633 1.52641 1.31082 6.42954 0.833715 8.76958C-0.115651 14.6337 5.92092 21.1874 5.92092 21.1874L5.57667 28H15.4059L16.1584 24.8677C16.1584 24.8677 16.585 25.5834 19.1248 25.7986C21.6655 26.0139 21.3561 22.9126 21.3561 22.9126C21.3561 22.9126 23.0473 22.1659 23.0473 21.6073C23.0473 21.0468 22.0466 20.3253 22.0466 20.3253C22.0466 20.3253 23.122 20.5183 23.5118 20.0654C23.8988 19.6125 23.0367 17.9765 23.0367 17.9765C23.0367 17.9765 24.3633 17.9426 25.1449 17.0824C25.9265 16.2232 22.6837 13.6795 22.6837 12.0416ZM8.64489 13.2703C8.64489 13.2703 8.58962 12.6632 8.56247 12.3596C8.3181 12.2947 8.08245 12.2084 7.8565 12.1075C7.58886 12.3344 7.05357 12.7873 7.05357 12.7873C7.05357 12.7873 6.96241 12.8377 6.91683 12.863C6.87126 12.8872 6.01983 12.7873 6.01983 12.7873L4.55554 11.0582V10.0254C4.55554 10.0254 5.11895 9.5483 5.40018 9.30974C5.33908 9.07797 5.30223 8.84231 5.28575 8.5989C4.91628 8.42919 4.17929 8.09269 4.17929 8.09269L3.88352 7.23251L3.91746 7.09189L4.86295 5.03211L5.86274 4.7693C5.86274 4.7693 6.49888 5.06023 6.81598 5.20473C7.00993 5.04763 7.21939 4.90507 7.44049 4.77997C7.40849 4.39691 7.34643 3.62983 7.34643 3.62983L8.0776 2.8996L10.3351 2.71728L11.0663 3.44849C11.0663 3.44849 11.1129 4.03131 11.1371 4.32224C11.4309 4.40176 11.7112 4.50747 11.9779 4.63645C12.2222 4.42601 12.7119 4.00707 12.7119 4.00707H13.7466L15.2216 5.72743V6.75926C15.2216 6.75926 14.6233 7.2713 14.3236 7.52828C14.3682 7.73678 14.3915 7.95207 14.4022 8.1693C14.7804 8.3875 15.5348 8.82389 15.5348 8.82389L15.7976 9.82372L14.664 11.7846L13.6642 12.0474C13.6642 12.0474 13.0775 11.708 12.7837 11.5392C12.6179 11.6682 12.4404 11.7826 12.2562 11.8883C12.2911 12.2801 12.3619 13.0627 12.3619 13.0627L11.6317 13.7939L9.37704 13.9995L8.64489 13.2703ZM17.8428 19.0433L17.2018 19.212C17.2018 19.212 16.8255 18.9938 16.6364 18.8862C16.5298 18.9686 16.4153 19.0413 16.297 19.1092C16.3193 19.3613 16.3649 19.8617 16.3649 19.8617L15.8975 20.3301L14.4516 20.462L13.9833 19.9936C13.9833 19.9936 13.9474 19.6057 13.9299 19.4089C13.7728 19.3672 13.6225 19.3109 13.478 19.2469C13.3064 19.3924 12.9631 19.6823 12.9631 19.6823C12.9631 19.6823 12.904 19.7143 12.8758 19.7318C12.8467 19.7493 12.2998 19.6823 12.2998 19.6823L11.3611 18.572V17.9086C11.3611 17.9086 11.7218 17.6032 11.9022 17.4499C11.8634 17.3025 11.8402 17.1493 11.8295 16.9932C11.5919 16.8855 11.1196 16.6683 11.1196 16.6683L10.9296 16.1185L10.9509 16.0273L11.557 14.7074L12.199 14.5387C12.199 14.5387 12.6062 14.7239 12.8099 14.818C12.934 14.7171 13.0688 14.627 13.2104 14.5455C13.191 14.3001 13.1512 13.8065 13.1512 13.8065L13.6196 13.3381L15.0674 13.2218L15.5368 13.6902C15.5368 13.6902 15.5659 14.0635 15.5814 14.2507C15.7695 14.3021 15.9499 14.37 16.1205 14.4524C16.2776 14.3176 16.5918 14.048 16.5918 14.048H17.2561L18.2035 15.1535V15.8169C18.2035 15.8169 17.8195 16.1456 17.6265 16.3105C17.6556 16.4443 17.6702 16.582 17.677 16.7226C17.9194 16.8632 18.4043 17.1416 18.4043 17.1416L18.572 17.7835L17.8428 19.0433Z"
                        fill={
                          resumeStyleData?.color
                            ? resumeStyleData?.color
                            : "black"
                        }
                      />
                    </svg>

                    <h4
                      style={{
                        fontWeight: resumeStyleData?.fontWeight,
                        fontSize: `${resumeStyleData?.fontSize}px`,
                      }}>
                      {data?.summary?.title
                        ? data?.summary?.title
                        : " PERSONAL"}{" "}
                      <br /> {data?.summary?.title ? null : "PROFILE"}
                    </h4>
                  </>
                ) : null}
              </div>
              <div>
                {data?.summary?.description && data?.summary?.showComp ? (
                  <p
                    // className="description-text"
                    dangerouslySetInnerHTML={{
                      __html: data?.summary?.description,
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="personalprofile">
              <div className="d-flex align-items-center mb-3">
                {/* <img src={mailBox} alt="profile" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 26 26"
                  fill="none">
                  <g clipPath="url(#clip0_1617_128)">
                    <path
                      d="M2.49549 9.08274C2.82438 9.31483 3.8158 10.0041 5.46978 11.1503C7.12382 12.2964 8.39093 13.179 9.27115 13.7979C9.36786 13.8657 9.57332 14.0132 9.88763 14.2405C10.202 14.468 10.4632 14.6518 10.671 14.792C10.879 14.9321 11.1305 15.0894 11.4256 15.2634C11.7207 15.4373 11.9988 15.5681 12.26 15.6547C12.5212 15.742 12.763 15.7853 12.9854 15.7853H13H13.0146C13.2371 15.7853 13.479 15.742 13.7402 15.6547C14.0012 15.5681 14.2796 15.4372 14.5744 15.2634C14.8694 15.0892 15.1208 14.9321 15.3288 14.792C15.5368 14.6518 15.7978 14.468 16.1123 14.2405C16.4265 14.013 16.6322 13.8657 16.729 13.7979C17.6187 13.179 19.8823 11.6071 23.519 9.08244C24.2251 8.58934 24.815 7.99436 25.2889 7.2979C25.7631 6.60174 26 5.87143 26 5.10737C26 4.46889 25.7701 3.92234 25.3106 3.46777C24.8512 3.0131 24.307 2.78589 23.6785 2.78589H2.32133C1.57659 2.78589 1.00346 3.03734 0.602045 3.54024C0.200682 4.04324 0 4.67196 0 5.42636C0 6.03572 0.266085 6.69606 0.798001 7.40695C1.32987 8.1179 1.89588 8.67655 2.49549 9.08274Z"
                      fill={
                        resumeStyleData?.color
                          ? resumeStyleData?.color
                          : "black"
                      }
                    />
                    <path
                      d="M24.5489 10.635C21.3766 12.7822 18.9678 14.4508 17.3237 15.6407C16.7724 16.0468 16.3251 16.3638 15.9817 16.5909C15.6382 16.8182 15.1814 17.0504 14.6106 17.2873C14.04 17.5245 13.5082 17.6427 13.0148 17.6427H13H12.9855C12.4922 17.6427 11.9601 17.5245 11.3895 17.2873C10.8189 17.0504 10.3618 16.8182 10.0184 16.5909C9.67515 16.3638 9.22775 16.0468 8.67647 15.6407C7.37059 14.6832 4.96698 13.0144 1.46555 10.635C0.914069 10.2677 0.425604 9.84668 0 9.3728V20.8926C0 21.5313 0.227209 22.0776 0.68188 22.5322C1.13645 22.987 1.68305 23.2143 2.32148 23.2143H23.6787C24.317 23.2143 24.8635 22.987 25.3182 22.5322C25.7729 22.0774 26 21.5314 26 20.8926V9.3728C25.584 9.83688 25.1005 10.2579 24.5489 10.635Z"
                      fill={
                        resumeStyleData?.color
                          ? resumeStyleData?.color
                          : "black"
                      }
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1617_128">
                      <rect width="26" height="26" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <h4
                  style={{
                    fontWeight: resumeStyleData?.fontWeight,
                    fontSize: `${resumeStyleData?.fontSize}px`,
                    lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.333)`,
                  }}>
                  GET IN TOUCH
                </h4>
              </div>

              {data?.profile?.phone ? (
                <p>
                  <b>Phone number:</b> {data?.profile?.phone}
                </p>
              ) : (
                ""
              )}
              {data?.profile?.email ? (
                <p>
                  <b>Email Address:</b> {data?.profile?.email}
                </p>
              ) : (
                ""
              )}

              {data?.profile?.city || data?.profile?.postalCode ? (
                <p>
                  <b>Home Address:</b> {data?.profile?.city},{" "}
                  {data?.profile?.postalCode}
                </p>
              ) : (
                ""
              )}
              {data?.profile?.linkedin ? (
                <p>
                  <b>Linkedin:</b>{" "}
                  <a href={data?.profile?.linkedin} target="_blank">
                    {data?.profile?.linkedin}
                  </a>
                </p>
              ) : (
                ""
              )}
              {data?.profile?.websiteLink ? (
                <p>
                  <b>Website:</b>{" "}
                  <a href={data?.profile?.websiteLink} target="_blank">
                    {data?.profile?.websiteLink}
                  </a>
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="Resume-right-side">
            {rearangeList?.map((item: any, i: number) => {
              return (
                <>
                  {item?.cat === "workHistory" && item.showComp ? (
                    <div key={i} className="professional__history">
                      <div className="professional__InnerContent mt-0">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h4>
                        {item?.history?.map((item: any, i: number) => {
                          return (
                            <div key={i}>
                              <h5
                                style={{
                                  fontWeight: resumeStyleData?.fontWeight,
                                }}>
                                {item.jobTitle}
                              </h5>
                              <p>
                                {item.employer} | {item.startMonth}-
                                {item.startYear} -{" "}
                                {item.stillWork
                                  ? "Present"
                                  : `${item.endMonth} - ${item.endYear}`}
                              </p>
                              <p
                                className="description-text"
                                dangerouslySetInnerHTML={{
                                  __html: item?.description,
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : item?.cat === "education" && item.showComp ? (
                    <div className="professional__history">
                      <div className="professional__InnerContent">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h4>
                        {item?.educationHistory?.map((item: any, i: number) => {
                          return (
                            <>
                              <h5
                                style={{
                                  fontWeight: resumeStyleData?.fontWeight,
                                }}
                                key={i}>
                                {item.school}
                              </h5>
                              <p>
                                {item.degree} | {item.startMonth}-
                                {item.startYear}-
                                {item.stillWork
                                  ? "Present"
                                  : `${item.endMonth} - ${item.endYear}`}
                              </p>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item?.description,
                                }}
                              />
                            </>
                          );
                        })}
                      </div>
                    </div>
                  ) : item?.cat === "hobbies" && item.showComp ? (
                    <div className="professional__history">
                      <div className="professional__InnerContent">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h4>
                        <ul className="d-flex w-100 flex-wrap">
                          {item?.list?.map((hobbies: any, i: number) => (
                            <li key={i} style={{ width: "50%" }}>
                              {hobbies}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : item?.cat === "certification" && item.showComp ? (
                    <div className="professional__history">
                      <div className="professional__InnerContent">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h4>
                        {item?.certificate?.map((item: any, i: number) => {
                          return (
                            <div key={i} className="single-job">
                              <h5
                                style={{
                                  fontWeight: resumeStyleData?.fontWeight,
                                }}>
                                {item?.certificateName}
                              </h5>
                              <p>
                                {item.authority} - {item.dateReceMonth}-
                                {item.dateReceYear}
                              </p>
                              <p>{item.certificationLink}</p>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item?.description,
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : item?.cat === "publications" && item.showComp ? (
                    <div className="professional__history">
                      <div className="professional__InnerContent">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h4>
                        {item?.publicationList?.map((item: any, i: number) => {
                          return (
                            <div key={i} className="single-job">
                              <h5
                                style={{
                                  fontWeight: resumeStyleData?.fontWeight,
                                }}>
                                {item.title}
                              </h5>
                              <p>
                                {item.publisher} | {item.isbn}-
                                {item.dateReceMonth} - {item.dateReceYear}
                              </p>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item?.description,
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : item?.cat === "achievements" && item.showComp ? (
                    <div className="professional__history">
                      <div className="professional__InnerContent">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h4>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </div>
                    </div>
                  ) : item?.cat === "languages" && item.showComp ? (
                    <div className="professional__history">
                      <div className="professional__InnerContent">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h4>
                        <ul className="d-flex w-100 flex-wrap">
                          {item?.list?.map((languages: any, i: number) => (
                            <li key={i} style={{ width: "50%" }}>
                              {languages}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : item?.cat === "skills" && item.showComp ? (
                    <div className="professional__history">
                      <div className="professional__InnerContent">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h4>

                        <ul className="d-flex w-100 flex-wrap">
                          {item?.list?.map((skills: any, i: number) => (
                            <li key={i} style={{ width: "50%" }}>
                              {skills}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : item?.cat === "customSection" && item.showComp ? (
                    <div className="professional__history">
                      <div className="professional__InnerContent">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h4>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </div>
                    </div>
                  ) : item?.cat === "references" && item.showComp ? (
                    <div className="professional__history">
                      <div className="professional__InnerContent">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h4>

                        <div className="row">
                          <div className="col-md-6">
                            <h5
                              style={{
                                fontWeight: resumeStyleData?.fontWeight,
                              }}>
                              References 1
                            </h5>
                            <h6
                              style={{
                                fontWeight: resumeStyleData?.fontWeight,
                              }}>
                              {" "}
                              {item?.personOne}
                            </h6>
                            <p>{item?.personeOneContact}</p>
                          </div>
                          <div className="col-md-6">
                            <h5
                              style={{
                                fontWeight: resumeStyleData?.fontWeight,
                              }}>
                              References 2
                            </h5>
                            <h6
                              style={{
                                fontWeight: resumeStyleData?.fontWeight,
                              }}>
                              {item?.personTwo}
                            </h6>
                            <p>{item?.personTwoContact}</p>
                          </div>
                        </div>

                        {/* <ul>
                          <li>
                            {item?.personOne} - {item?.personeOneContact}
                          </li>
                          <li>
                            {item?.personTwo} - {item?.personTwoContact}
                          </li>
                        </ul> */}
                      </div>
                    </div>
                  ) : null}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCreativeTemplate;
