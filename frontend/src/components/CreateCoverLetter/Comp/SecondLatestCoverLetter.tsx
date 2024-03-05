import { useState } from "react";
const SecondLatestCoverLetter = ({ data, resumeStyleData }: any) => {
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
      <div
        className="created-resume-template second-coverletter"
        style={{
          fontFamily: resumeStyleData?.fontFamily,
        }}
      >
        <div className="second-cover-template ">
          <div
            style={{
              backgroundColor: resumeStyleData?.backgroundColor,
            }}
            className="second-cover-letter"
          ></div>
          <h1
            style={{
              color: resumeStyleData?.color,
              fontWeight: resumeStyleData?.fontWeight,
              fontSize: `${resumeStyleData?.fontSize}px`,
              lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.4)`,
            }}
          >
            {data?.profile?.firstName ? (
              <>
                {data?.profile?.firstName} <br /> {data?.profile?.lastName}
              </>
            ) : (
              ""
            )}
          </h1>
          <div className="personal-infromation">
            <div className="row">
              <div className="col-md-4">
                <div className="d-flex">
                  {data?.profile?.email ? (
                    <p>
                      <span> Email: </span>
                      {data?.profile?.email}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex">
                  {data?.profile?.phone ? (
                    <p>
                      <span> Phone Number: </span>
                      {data?.profile?.phone}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="d-flex">
                  {data?.profile?.city || data?.profile?.postalCode ? (
                    <p>
                      <span> Address: </span>
                      {data?.profile?.city},{data?.profile?.postalCode}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex">
                  {data?.profile?.websiteLink ? (
                    <p>
                      <span> Website: </span>
                      {data?.profile?.websiteLink}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="bottom-div"></div>
            <div className="innter-content">
              <h2
                style={{
                  color: resumeStyleData?.color,
                  fontWeight: resumeStyleData?.fontWeight,
                }}
              >
                {data?.profile?.date ? dateFormat(data?.profile?.date) : ""}
              </h2>
              <p>
                {data?.receipient?.firstName ? data?.receipient?.firstName : ""}
              </p>
              <p>
                {data?.receipient?.companyName
                  ? data?.receipient?.companyName
                  : ""}
              </p>
              <p>
                {data?.receipient?.companyAddress
                  ? data?.receipient?.companyAddress
                  : ""}
              </p>
              <p>
                {data?.receipient?.postalCode
                  ? data?.receipient?.postalCode
                  : ""}
              </p>
              <div className="Name-Test">
                <p>
                  {data?.receipient?.firstName ? (
                    <>
                      {data?.introduction?.title} {data?.receipient?.firstName}{" "}
                      <span style={{ fontWeight: "normal" }}>
                        {data?.receipient?.lastName}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <div className="body-content">
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
                    : "Best regards,"}
                </p>
              </div>
              <h5>
                {data?.profile?.firstName ? (
                  <>
                    {data?.profile?.firstName}
                    <span>{data?.profile?.lastName}</span>
                  </>
                ) : (
                  ""
                )}
              </h5>
            </div>
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

export default SecondLatestCoverLetter;
