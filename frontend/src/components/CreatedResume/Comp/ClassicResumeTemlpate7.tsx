// @ts-nocheck

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import { $resumeStyle, $sectionList } from "../../../services";
const ClassicResumeTemlpate7 = ({ data }: any) => {
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

  return (
    <div
      className="Classic-Resume-Temlpate template-7"
      style={{
        fontFamily: resumeStyleData?.fontFamily,
        backgroundColor: resumeStyleData?.backgroundColor,
        color: resumeStyleData?.color,
        height: "100vh",
      }}>
      <div className="d-flex justify-content-between">
        <div className="">
          <div className="shortName">
            <span
              className="text-left"
              style={{ fontWeight: resumeStyleData?.fontWeight }}>
              {data?.profile?.firstName
                ? data?.profile?.firstName.charAt(0)
                : ""}
            </span>
            <span
              style={{
                border: `1px solid ${
                  resumeStyleData?.color ? resumeStyleData?.color : "#000000"
                } `,
              }}
              className="line"></span>
            <span
              className="text-right"
              style={{ fontWeight: resumeStyleData?.fontWeight }}>
              {data?.profile?.lastName ? data?.profile?.lastName.charAt(0) : ""}
            </span>
          </div>
        </div>
        <div className="">
          <div className="header-title">
            <h1
              style={{
                fontSize: `calc(${resumeStyleData?.fontSize}px * 1.75)`,
                fontWeight: resumeStyleData?.fontWeight,
              }}>
              {data?.profile?.firstName
                ? `${data?.profile?.firstName}  ${data?.profile?.lastName}`
                : ""}
            </h1>
            <div className="user-info">
              {data?.profile?.email && <span> {data?.profile?.email}</span>}
              {data?.profile?.phone && <span>{data?.profile?.phone}</span>}
              {data?.profile?.postalCode && (
                <span>{data?.profile?.postalCode}</span>
              )}
              {data?.profile?.city && <span>{data?.profile?.city}</span>}
            </div>
          </div>
        </div>
        <div className="links">
          {data?.profile?.linkedin && (
            <div className="single-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 20 20">
                <path
                  fill={
                    resumeStyleData?.color ? resumeStyleData?.color : "black"
                  }
                  d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4zM7.65 13.979H5.706V7.723H7.65v6.256zm-.984-7.024c-.614 0-1.011-.435-1.011-.973c0-.549.409-.971 1.036-.971s1.011.422 1.023.971c0 .538-.396.973-1.048.973zm8.084 7.024h-1.944v-3.467c0-.807-.282-1.355-.985-1.355c-.537 0-.856.371-.997.728c-.052.127-.065.307-.065.486v3.607H8.814v-4.26c0-.781-.025-1.434-.051-1.996h1.689l.089.869h.039c.256-.408.883-1.01 1.932-1.01c1.279 0 2.238.857 2.238 2.699v3.699z"
                />
              </svg>
              <span>{data?.profile?.linkedin}</span>
            </div>
          )}
          {data?.profile?.websiteLink && (
            <div className="single-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24">
                <path
                  fill={
                    resumeStyleData?.color ? resumeStyleData?.color : "black"
                  }
                  d="M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24a2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24a2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24a.973.973 0 0 1 0-1.42Z"
                />
              </svg>
              <span>{data?.profile?.websiteLink}</span>
            </div>
          )}
        </div>
      </div>
      <div className="Summary__Content">
        {rearangeList?.map((item: any) => {
          return (
            <>
              {item?.cat === "workHistory" && item.showComp ? (
                <div
                  className="summary d-flex"
                  style={{ borderTopColor: resumeStyleData?.color }}>
                  <div className="w-25">
                    <h2
                      style={{
                        fontWeight: resumeStyleData?.fontWeight,
                        fontSize: `${resumeStyleData?.fontSize}px`,
                      }}>
                      {item.title}
                    </h2>
                  </div>
                  <div className="w-75">
                    {item?.history?.map((item: any) => {
                      return (
                        <div className="professional__InnerContent">
                          {item.jobTitle && (
                            <h4
                              style={{
                                fontWeight: resumeStyleData?.fontWeight,
                              }}>
                              {item.jobTitle}
                            </h4>
                          )}

                          <p>
                            {item.employer} | {item.startMonth}-{item.startYear}
                            -
                            {item.stillWork
                              ? "Present"
                              : `${item.endMonth} - ${item.endYear}`}
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
              ) : item?.cat === "education" && item.showComp ? (
                <div
                  className="summary d-flex"
                  style={{ borderTopColor: resumeStyleData?.color }}>
                  <div className="w-25">
                    <h2
                      style={{
                        fontWeight: resumeStyleData?.fontWeight,
                        fontSize: `${resumeStyleData?.fontSize}px`,
                      }}>
                      {item?.title}
                    </h2>
                  </div>
                  <div className="w-75">
                    <>
                      {item?.educationHistory?.map((item: any) => {
                        return (
                          <>
                            <div className="">
                              {item.school && (
                                <h4
                                  style={{
                                    fontWeight: resumeStyleData?.fontWeight,
                                  }}>
                                  {item.school}
                                </h4>
                              )}
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
                            </div>
                          </>
                        );
                      })}
                    </>
                  </div>
                </div>
              ) : item?.cat === "skills" && item.showComp ? (
                <div
                  className="summary"
                  style={{ borderTopColor: resumeStyleData?.color }}>
                  <div className="w-25">
                    <h2
                      style={{
                        fontWeight: resumeStyleData?.fontWeight,
                        fontSize: `${resumeStyleData?.fontSize}px`,
                      }}>
                      {item?.title}
                    </h2>
                  </div>
                  <div className="w-75">
                    {item && (
                      <ul className="d-flex flex-wrap w-100">
                        {item?.list?.map((skills: any) => (
                          <li style={{ width: "50%" }}>{skills}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ) : item?.cat === "hobbies" && item.showComp ? (
                <div
                  className="summary"
                  style={{ borderTopColor: resumeStyleData?.color }}>
                  <div className="w-25">
                    <h2
                      style={{
                        fontWeight: resumeStyleData?.fontWeight,
                        fontSize: `${resumeStyleData?.fontSize}px`,
                      }}>
                      {item?.title}
                    </h2>
                  </div>
                  <div className="w-75">
                    {item && (
                      <ul className="d-flex flex-wrap w-100">
                        {item?.list?.map((hobbies: any) => (
                          <li style={{ width: "50%" }}>{hobbies}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ) : item?.cat === "certification" && item.showComp ? (
                <div
                  className="summary"
                  style={{ borderTopColor: resumeStyleData?.color }}>
                  <div className="w-25">
                    <h2
                      style={{
                        fontWeight: resumeStyleData?.fontWeight,
                        fontSize: `${resumeStyleData?.fontSize}px`,
                      }}>
                      {item?.title}
                    </h2>
                  </div>
                  <div className="w-75">
                    {item ? (
                      <>
                        {item?.certificate?.map((item: any) => {
                          return (
                            <>
                              {item?.certificateName && (
                                <h4
                                  style={{
                                    fontWeight: resumeStyleData?.fontWeight,
                                  }}>
                                  {item?.certificateName}
                                </h4>
                              )}
                              <p>
                                {item.authority}
                                {item.dateReceMonth && (
                                  <> - {item.dateReceMonth}</>
                                )}
                                {item.dateReceYear && (
                                  <> - {item.dateReceYear}</>
                                )}
                              </p>
                              {item.certificationLink && (
                                <p>{item.certificationLink}</p>
                              )}
                              {item?.description && (
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: item?.description,
                                  }}
                                />
                              )}
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <div>---</div>
                    )}
                  </div>
                </div>
              ) : item?.cat === "languages" && item.showComp ? (
                <div
                  className="summary"
                  style={{ borderTopColor: resumeStyleData?.color }}>
                  <div className="w-25">
                    <h2
                      style={{
                        fontWeight: resumeStyleData?.fontWeight,
                        fontSize: `${resumeStyleData?.fontSize}px`,
                      }}>
                      {item?.title}
                    </h2>
                  </div>
                  <div className="w-75">
                    <ul className="d-flex flex-wrap W-100">
                      {item ? (
                        <>
                          {item?.list?.map((skills: any) => (
                            <li style={{ width: "50%" }}>{skills}</li>
                          ))}
                        </>
                      ) : (
                        <div>---</div>
                      )}
                    </ul>
                  </div>
                </div>
              ) : item?.cat === "references" && item.showComp ? (
                <div
                  className="summary"
                  style={{ borderTopColor: resumeStyleData?.color }}>
                  <div className="w-25">
                    <h2
                      style={{
                        fontWeight: resumeStyleData?.fontWeight,
                        fontSize: `${resumeStyleData?.fontSize}px`,
                      }}>
                      {item?.title}
                    </h2>
                  </div>
                  <div className="w-75">
                    <div className="row">
                      <div className="col-md-6">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                          }}>
                          References 1
                        </h4>
                        <h5>{item?.personOne}:</h5>
                        <p>{item?.personeOneContact}</p>
                      </div>
                      <div className="col-md-6">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                          }}>
                          References 2
                        </h4>
                        <h5> {item?.personTwo}:</h5>
                        <p>{item?.personTwoContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : item?.cat === "publications" && item.showComp ? (
                <div
                  className="summary"
                  style={{ borderTopColor: resumeStyleData?.color }}>
                  <div className="w-25">
                    <h2
                      style={{
                        fontWeight: resumeStyleData?.fontWeight,
                        fontSize: `${resumeStyleData?.fontSize}px`,
                      }}>
                      {item?.title}
                    </h2>
                  </div>
                  <div className="w-75">
                    <>
                      {item?.publicationList?.map((item: any) => {
                        return (
                          <div>
                            {item.title && (
                              <h4
                                style={{
                                  fontWeight: resumeStyleData?.fontWeight,
                                }}>
                                {item.title}
                              </h4>
                            )}
                            <p>
                              {item.publisher ||
                                item.isbn ||
                                item.dateReceMonth ||
                                (item.dateReceYear ? (
                                  <>
                                    {item.publisher}{" "}
                                    {item.isbn && <> | {item.isbn}</>}
                                    {item.dateReceMonth && (
                                      <> - {item.dateReceMonth}</>
                                    )}
                                    {item.dateReceYear && (
                                      <> - {item.dateReceYear}</>
                                    )}
                                  </>
                                ) : (
                                  ""
                                ))}
                            </p>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            />
                          </div>
                        );
                      })}
                    </>
                  </div>
                </div>
              ) : item?.cat === "achievements" && item.showComp ? (
                <div
                  className="summary"
                  style={{ borderTopColor: resumeStyleData?.color }}>
                  <div className="w-25">
                    <h2
                      style={{
                        fontWeight: resumeStyleData?.fontWeight,
                        fontSize: `${resumeStyleData?.fontSize}px`,
                      }}>
                      {item?.title}
                    </h2>
                  </div>
                  <div className="w-75">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}
                    />
                  </div>
                </div>
              ) : item?.cat === "customSection" && item.showComp ? (
                <div
                  className="summary"
                  style={{ borderTopColor: resumeStyleData?.color }}>
                  <div className="w-25">
                    <h2
                      style={{
                        fontWeight: resumeStyleData?.fontWeight,
                        fontSize: `${resumeStyleData?.fontSize}px`,
                      }}>
                      {item?.title}
                    </h2>
                  </div>
                  <div className="w-75">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}
                    />
                  </div>
                </div>
              ) : item?.cat === "summary" && item.showComp ? (
                <div
                  className="summary"
                  style={{ borderTopColor: resumeStyleData?.color }}>
                  <div className="w-25">
                    <h2
                      style={{
                        fontWeight: resumeStyleData?.fontWeight,
                        fontSize: `${resumeStyleData?.fontSize}px`,
                      }}>
                      {item?.title}
                    </h2>
                  </div>
                  <div className="w-75">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ClassicResumeTemlpate7;
