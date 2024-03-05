// @ts-nocheck
import React, { useCallback, useState } from "react";
import Webcam from "react-webcam";
//@ts-ignore
const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 100,
  height: 100,
  facingMode: "user",
};
const Profile = () => {
  const [picture, setPicture] = useState<any>("");
  const webcamRef = React.useRef(null);
  const capture = useCallback(() => {
    const pictureSrc = webcamRef?.current?.getScreenshot();
    setPicture(pictureSrc);
  });
  console.log(picture);
  return (
    <div>
      <div>
        {picture == "" ? (
          <Webcam
            audio={false}
            height={100}
            ref={webcamRef}
            width={100}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} />
        )}
      </div>
      <div>
        {picture != "" ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                setPicture("");
              }}
              className="btn btn-primary"
            >
              Retake
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setPicture("");
              }}
              className="btn btn-primary"
            >
              Upload
            </button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="btn btn-danger"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  );
};
export default Profile;
