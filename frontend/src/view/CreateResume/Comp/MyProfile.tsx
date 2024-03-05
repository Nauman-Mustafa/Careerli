// @ts-ignore
// @ts-nocheck
import { Icon } from "@iconify/react";
import * as csc from "country-state-city";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Collapse, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFetch from "use-http";
import Profile from "../../../components/Profile/Profile";
import {
  $collapser,
  $sectionList,
  getDataFromLocalDB,
  savingData,
  selectSection,
  updateData,
  updateResume,
} from "../../../services";
const MyProfile = ({ docId, info, setChangeState }: any) => {
  const [editName, setEditName] = useState(false);

  const [sectionTitle, setSectionTitle] = useState(info.title);
  const ref = useRef(null);
  const hiddenFileInput = useRef(null);
  const [profile, SetProfile] = useState(info);
  const [check, SetCheck] = useState(false);
  const [loader, setLoader] = useState(false);

  const [preview, setPreview] = useState([]);
  const [profileImage, setProfileImage] = useState();

  const auth: any = useSelector((store: any) => store.auth);
  const [section, setSectionOpener] = useState("");
  useEffect(() => {
    if (!auth.isLoggedIn) {
      const { profileImage } = getDataFromLocalDB();
      setProfileImage(profileImage);
    }

    const sub$ = $sectionList.subscribe((v: any) => {
      // setData(v);
      setProfileImage(v?.profileImage);
    });

    return () => {
      sub$.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (info) {
      SetProfile(info);
    }
  }, [info]);
  useEffect(() => {
    updateResume({ profile });
    if (auth.isLoggedIn) {
      // fecthResume();
    } else {
    }
    const sub$ = $collapser.subscribe((v: string) => {
      setSectionOpener(v);
    });
    return () => {
      sub$.unsubscribe();
    };
  }, []);
  // console.log(profileImage, "profileImage")
  const updateValues = () => {
    if (auth.isLoggedIn) {
      postProfile();
    } else {
      profile.title = sectionTitle;
      (profile.cat = "profile"),
        (profile.order = info?.order),
        (profile.showComp = true),
        updateData({
          profile,
        });
      savingData("saved");
    }
    // }
  };

  let _setTimeOut = null;
  const onFormChange = () => {
    if (_setTimeOut) clearTimeout(_setTimeOut);

    updateResume({ profile });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues, 1000);
  };

  const changeTitle = (e) => {
    e.stopPropagation();

    if (auth.isLoggedIn) {
      postProfile();
      updateResume({ profile });
    } else {
      profile.title = sectionTitle;
      (profile.cat = "profile"),
        (profile.order = info?.order),
        (profile.showComp = true),
        updateResume({ profile });
      updateData({
        profile,
      });
    }
    setEditName(false);
  };
  const postProfile = async () => {
    profile.title = sectionTitle;
    (profile.cat = "profile"),
      (profile.order = info?.order),
      (profile.showComp = true);

    const res = await put(`resume/update/${docId}`, {
      profile: profile,
    });
    savingData("saved");
    if (res) {
    }
  };
  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };
  const { response, post, loading, get, data: repos, put } = useFetch();
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL, "baseURL");
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };
  const handleChange = async (event: any) => {
    const file = event.target.files[0];
    setPreview({
      imgRef: URL.createObjectURL(file),
    });
    if (auth.isLoggedIn) {
      const formData = new FormData();
      setLoader(true);
      formData.append("file", file);
      const res = await put(`resume/avatar/${docId}`, formData);
      setProfileImage(res?.data?.profileImage);
      updateResume({ profileImage: res?.data?.profileImage });
      toast.success("successfully uploaded");
      setLoader(false);
    } else {
      const file = event.target.files[0];
      getBase64(file)
        .then((result) => {
          file["base64"] = result;
          console.log("File Is", file);
          updateData({
            profileImage: file.base64,
          });
          setProfileImage(file.base64);
          updateResume({ profileImage: file.base64 });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  async function removeFile(e: any) {
    const res = await put(`resume/update/${docId}`, {
      profileImage: "",
    });
    setProfileImage("");
    updateResume({ profileImage: "" });
    setPreview([]);
    toast.success("successfully removed");
  }
  const acceptedFile = useMemo(
    () => [
      "image/jpg , .jpg",
      "image/png , .png",
      "image/jpeg , .jpeg",
      "image/gif , .gif",
      "image/svg , .svg",
    ],
    []
  );

  const countries = csc.Country.getAllCountries();

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  }));

  let isOpend = section === "myProfile";
  isOpend ? setChangeState(ref) : null;
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div className="resume-box" ref={ref}>
      <div
        className="box-header d-flex justify-content-between"
        onClick={() => {
          selectSection("myProfile");
        }}
        aria-controls="myProfile"
        aria-expanded={section === "myProfile"}>
        <div className="header-left d-flex align-items-center">
          <div
            className="figure-icon profile-icon"
            onClick={(e) => {
              e.stopPropagation();
            }}>
            {profileImage && (
              <span onClick={(e) => removeFile(e)} className="remove-image">
                <Icon icon="charm:circle-cross" />
              </span>
            )}
            {profileImage ? (
              <img src={profileImage} />
            ) : preview.length === 0 ? (
              <Icon icon="humbleicons:image" />
            ) : (
              <img src={preview.imgRef} />
            )}
          </div>
          <h5
            onClick={(e) => {
              e.stopPropagation();
            }}>
            {editName ? (
              <input
                type="text"
                defaultValue={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
              />
            ) : (
              `${sectionTitle}`
            )}
            <button
              className={
                editName ? "edit-button d-none" : "edit-button edit-btn"
              }
              onClick={(e) => {
                e.stopPropagation();
                setEditName(true);
              }}>
              <Icon icon="eva:edit-2-outline" />
            </button>
            <button
              className={editName ? "edit-button" : "edit-button d-none"}
              onClick={(e) => changeTitle(e)}>
              <Icon icon="charm:circle-tick" />
            </button>
          </h5>
        </div>
        {check && <Profile />}
        <div className="header-right">
          {/* <div
            className="btn-upload"
            onClick={(e) => {
              e.stopPropagation();
             SetCheck(!check)
            }}
          >
           
            <p htmlFor="file">
              <Icon icon="prime:cloud-upload" hFlip={true} />
              <span>{check? "Close Webcam":"Use WebCam"}</span>
            </p>
          </div> */}
          {!check && (
            <div
              className="btn-upload"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(e);
              }}>
              <input
                type="file"
                className="inputfile"
                ref={hiddenFileInput}
                onChange={handleChange}
                accept={acceptedFile}
              />
              <p htmlFor="file">
                <Icon icon="prime:cloud-upload" hFlip={true} />
                <span>
                  {loader ? <Spinner animation="border" /> : "Upload Photo"}{" "}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      {isOpend ? (
        <Collapse in={section === "myProfile"}>
          <form className="box-body" id="myProfile" onKeyUp={onFormChange}>
            <div className="row">
              <div className="col-xl-6">
                <div className="form-group">
                  <div className="form-input">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        border: "gainsboro solid 1px",
                        paddingLeft: "3px",
                      }}
                      defaultValue={profile?.firstName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        SetProfile((prev) => {
                          return {
                            ...prev,
                            firstName: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <div className="form-input">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        border: "gainsboro solid 1px",
                        paddingLeft: "3px",
                      }}
                      defaultValue={profile?.lastName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        SetProfile((prev) => {
                          return {
                            ...prev,
                            lastName: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <div className="form-input">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      style={{
                        border: "gainsboro solid 1px",
                        paddingLeft: "3px",
                      }}
                      defaultValue={profile?.email}
                      onBlur={(e) => {
                        const value = e.target.value.trim().toLowerCase();
                        if (value) {
                          const isValidEmail = re.test(value);
                          !isValidEmail &&
                            toast.error("Enter Valid Email Address");
                        }
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value.trim().toLowerCase();
                        const isValidEmail = re.test(value);
                        if (isValidEmail) {
                          SetProfile((prev) => {
                            return {
                              ...prev,
                              email: e.target.value,
                            };
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <div className="form-input">
                    <label>
                      Phone Number <span>(Optional)</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      style={{
                        border: "gainsboro solid 1px",
                        paddingLeft: "3px",
                      }}
                      maxLength={15}
                      defaultValue={profile?.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const phoneNumber = e.target.value;

                        // Define a regular expression pattern for a valid phone number.
                        const phonePattern = /^\d{10,15}$/; // This pattern allows for 10 to 15 digits.

                        // Test if the input matches the phone number pattern.
                        if (phonePattern.test(phoneNumber)) {
                          // Input is a valid phone number.
                          SetProfile((prev) => {
                            return {
                              ...prev,
                              phone: phoneNumber,
                            };
                          });
                        } else {
                          // Input is not a valid phone number. You can handle this as per your requirements.
                          // For example, display an error message or prevent further action.
                          // toast.error("Invalid phone number")
                          console.error("Invalid phone number");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <div className="form-input">
                    <label>Designation</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        border: "gainsboro solid 1px",
                        paddingLeft: "3px",
                      }}
                      defaultValue={profile?.designation}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        SetProfile((prev) => {
                          return {
                            ...prev,
                            designation: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <div className="form-input">
                    <label>
                      Country<span>(Optional)</span>
                    </label>
                    <select
                      className="form-control"
                      style={{
                        border: "gainsboro solid 1px",
                        paddingLeft: "3px",
                      }}
                      defaultValue={profile?.city}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        SetProfile((prev) => {
                          return {
                            ...prev,
                            city: e.target.value,
                          };
                        });
                      }}>
                      {updatedCountries?.map((country, i) => (
                        <option key={i}>{country.label}</option>
                      ))}

                      {/* <option>New York, USA</option>
                      <option>London, UK</option> */}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-xl-6">
                <div className="form-group">
                  <div className="form-input">
                    <label>
                      Postal Code
                      <span>(Optional)</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      style={{
                        border: "gainsboro solid 1px",
                        paddingLeft: "3px",
                      }}
                      defaultValue={profile?.postalCode}
                      maxLength={10}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        SetProfile((prev) => {
                          return {
                            ...prev,
                            postalCode: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <div className="form-input icon-input">
                    <label>
                      Website Link
                      <span>(Portfolio, Profile URL)</span>
                      <span>(Optional)</span>
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      style={{
                        border: "gainsboro solid 1px",
                      }}
                      defaultValue={profile?.websiteLink}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        SetProfile((prev) => {
                          return {
                            ...prev,
                            websiteLink: e.target.value,
                          };
                        });
                      }}
                    />
                    <span className="small-icon">
                      <Icon icon="akar-icons:link-chain" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <div className="form-input icon-input">
                    <label>
                      LinkedIn Profile
                      <span>(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        border: "gainsboro solid 1px",
                      }}
                      defaultValue={profile?.linkedin}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        SetProfile((prev) => {
                          return {
                            ...prev,
                            linkedin: e.target.value,
                          };
                        });
                      }}
                    />
                    <span className="small-icon">
                      <Icon icon="ant-design:linkedin-outlined" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Collapse>
      ) : null}
    </div>
  );
};

export default MyProfile;
