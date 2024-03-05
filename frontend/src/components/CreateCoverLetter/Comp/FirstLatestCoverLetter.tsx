import { useState } from "react";
const FirstLatestCoverLetter = ({ data, resumeStyleData }: any) => {
  const [loading, setLoader] = useState(false);
  function dateFormat(ts: any): String {
    return new Date(ts).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <>
      <div className="created-resume-template first-coverletter">
        <div
          className="cover-letter-template"
          style={{
            fontFamily: resumeStyleData?.fontFamily,
          }}
        >
          <div
            style={{
              backgroundColor: resumeStyleData?.backgroundColor,
            }}
            className="top-header"
          ></div>
          <div
            className="cover-latter-template"
            style={{
              fontFamily: `${resumeStyleData?.fontFamily} !important`,
            }}
          >
            <h1
              style={{
                color: resumeStyleData?.color,
                fontWeight: resumeStyleData?.fontWeight,
                fontSize: `${resumeStyleData?.fontSize}px`,
              }}
            >
              {" "}
              {data?.profile?.firstName ? (
                <>
                  {data?.profile?.firstName} <b>{data?.profile?.lastName}</b>
                </>
              ) : (
                "MARK SMITH"
              )}{" "}
            </h1>
            <div className="infromation-div">
              {data?.profile?.websiteLink ? (
                <p>{data?.profile?.websiteLink} </p>
              ) : (
                ""
              )}

              {data?.profile?.email ? <p>{data?.profile?.email}</p> : ""}
              {data?.profile?.phone ? <p>{data?.profile?.phone}</p> : ""}
              {data?.profile?.city || data?.profile?.postalCode ? (
                <p>
                  {data?.profile?.city}, {data?.profile?.postalCode}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="Latter-Date">
              {data?.profile?.date ? dateFormat(data?.profile?.date) : ""}
            </div>
            <div className="Letter-header">
              {data?.receipient?.firstName ? (
                <p>{data?.receipient?.firstName}</p>
              ) : (
                ""
              )}
              {data?.receipient?.positionHeld ? (
                <p>{data?.receipient?.positionHeld}</p>
              ) : (
                ""
              )}
              {data?.receipient?.companyName ? (
                <p>{data?.receipient?.companyName}</p>
              ) : (
                ""
              )}
              {data?.receipient?.companyAddress ? (
                <p>{data?.receipient?.companyAddress}</p>
              ) : (
                ""
              )}
              {data?.receipient?.postalCode}
            </div>
            <div className="Latter-Date mt-3">
              Dear,{" "}
              {data?.receipient?.firstName ? (
                <>
                  {data?.introduction?.title}{" "}
                  <span>{data?.receipient?.firstName}</span>{" "}
                  <span>{data?.receipient?.lastName}</span>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="paragraph">
              {data?.introduction?.opener ? (
                <div
                  className="description-text"
                  dangerouslySetInnerHTML={{
                    __html: data?.introduction?.opener,
                  }}
                />
              ) : ""}

              {data?.body ? (
                <div
                  className="description-text"
                  dangerouslySetInnerHTML={{
                    __html: data?.body,
                  }}
                />
              ) : ""}

              {data?.closing?.closingData ? (
                <div
                  className="description-text"
                  dangerouslySetInnerHTML={{
                    __html: data?.closing?.closingData,
                  }}
                />
              ) : ""}
            </div>
            <div className="Regards-text">
              <p>
                {data?.closing?.signing
                  ? data?.closing?.signing
                  : "Best regards,"}{" "}
              </p>
            </div>
            <h5>
              {data?.profile?.firstName ? (
                <>
                  {data?.profile?.firstName}{" "}
                  <span>{data?.profile?.lastName}</span>
                </>
              ) : (
                ""
              )}
            </h5>
          </div>
        </div>
      </div>
      {/* <div className="d-flex justify-content-center">
        <button className="btn btn-yellow">
          <Icon icon="eva:download-fill" hFlip={true} />
          {loading ? <Spinner animation="border" /> : "Download PDF"}
        </button>
      </div> */}
    </>
  );
};

export default FirstLatestCoverLetter;
