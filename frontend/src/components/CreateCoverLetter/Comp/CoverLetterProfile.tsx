// @ts-ignore
// @ts-nocheck
import { Icon } from "@iconify/react";
import * as csc from "country-state-city";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFetch } from "use-http";
import { savingData, updateCover, updateCoverLetter } from "../../../services";
const CoverLetterProfile = ({ coverLetterData, id }) => {
  const [preview, setPreview] = useState([]);
  const [sectionTitle, setSectionTitle] = useState();
  const [profile, SetProfile] = useState(coverLetterData?.profile);
  const [receipient, setReceipient] = useState(coverLetterData?.receipient);
  const auth: any = useSelector((store: any) => store.auth);
  const {
    response,
    post,
    loading,
    get,
    data: repos,
    put,
    request,
  } = useFetch();
  useEffect(() => {
    if (coverLetterData) {
      SetProfile(coverLetterData.profile);
      setReceipient(coverLetterData?.receipient);
    }
  }, [coverLetterData]);

  // useEffect(() => {
  //   updateCover({ profile, receipient });
  // }, [profile]);
  const updateValues = () => {
    if (auth.isLoggedIn) {
      postProfile();
    } else {
      updateCoverLetter({
        profile,
        receipient,
      });
      savingData("saved");
    }
  };

  let _setTimeOut = null;
  const onFormChange = () => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    updateCover({ profile, receipient });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues, 1000);
  };
  const countries = csc.Country.getAllCountries();

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  }));

  const postProfile = async () => {
    const res = await put(`cover-letter/update/${id}`, {
      profile: profile,
      receipient: receipient,
    });
    savingData("saved");
  };
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [isOpend, setIsOpend] = useState(false);

  const toggleDiv = () => {
    setIsOpend(!isOpend);
  };

  return (
    <div className="box-body">
      <div className="row">
        {/* <div className="col-lg-12">
          <h5>Profile</h5>
        </div> */}
        <div className="col-lg-12">
          <div className="form-group box-header">
            <div className="header-left d-flex align-items-center">
              {/* <div className="figure-icon profile-icon">
                {preview.length === 0 ? (
                  <Icon icon="humbleicons:image" />
                ) : (
                  <img src={preview.imgRef} />
                )}
              </div> */}
              <h5>
                Profile
                {/* <div className="dropdown">
              <button
                onClick={() => setActiveDropdown(true)}
                className={
                  activeDropDown
                    ? "dropdown-button active-button"
                    : "dropdown-button"
                }
              >
                <Icon icon="ph:info" />
              </button>
              <div
                className={
                  activeDropDown ? "dropdown-menu show" : "dropdown-menu"
                }
              >
                <h4>Smart Tip</h4>
                <p>Add your basic information to create your profile</p>
                <button
                  className="close"
                  onClick={() => setActiveDropdown(false)}
                >
                  <Icon icon="akar-icons:cross" onClick={onDelete} />
                </button>
              </div>
            </div> */}
              </h5>
            </div>
            {/* <div className="header-right">
              <div
                className="btn-upload"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(e);
                }}
              >
                <input
                  type="file"
                  className="inputfile"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  accept={acceptedFile}
                />
                <p htmlFor="file">
                  <Icon icon="prime:cloud-upload" hFlip={true} />
                  <span>Upload Photo</span>
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <form onKeyUp={onFormChange}>
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
                  type="text"
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
                      !isValidEmail && toast.error("Enter Valid Email Address");
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
                  type="text"
                  maxLength={15}
                  className="form-control"
                  style={{
                    border: "gainsboro solid 1px",
                    paddingLeft: "3px",
                  }}
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
                <label>
                  City, Country<span>(Optional)</span>
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
                  {updatedCountries?.map((country) => (
                    <option>{country.label}</option>
                  ))}
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
                  style={{
                    border: "gainsboro solid 1px",
                    paddingLeft: "3px",
                  }}
                  maxLength={10}
                  className="form-control"
                  defaultValue={profile?.postalCode}
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
              <div className="form-input">
                <label>Website Link</label>
                <input
                  type="text"
                  className="form-control"
                  style={{
                    border: "gainsboro solid 1px",
                    paddingLeft: "3px",
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
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="form-group">
              <div className="form-input">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  style={{
                    border: "gainsboro solid 1px",
                    paddingLeft: "3px",
                  }}
                  defaultValue={profile?.date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    SetProfile((prev) => {
                      return {
                        ...prev,
                        date: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <div className="form-input">
                <label>
                  Address
                  <span>(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                  defaultValue={profile?.address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    SetProfile((prev) => {
                      return {
                        ...prev,
                        address: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-12" onClick={toggleDiv}>
            <div className="form-group">
              <h5 className="mb-0">
                Receipient{" "}
                <span style={{ fontSize: "12px", color: "#999999" }}>
                  (Optional)
                </span>
              </h5>
            </div>
          </div>

          {/* <div className="col-lg-12">
            <div className="form-group">
              <div className="form-input">
                <label>Title</label>
                <select
                  className="form-control"
                  defaultValue={receipient?.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setReceipient((prev) => {
                      return {
                        ...prev,
                        title: e.target.value,
                      };
                    });
                  }}
                >
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Mrs.</option>
                </select>
              </div>
            </div>
          </div> */}

          {isOpend && (
            <>
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
                      defaultValue={receipient?.firstName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setReceipient((prev) => {
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
                      defaultValue={receipient?.lastName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setReceipient((prev) => {
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
                    <label>Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        border: "gainsboro solid 1px",
                        paddingLeft: "3px",
                      }}
                      defaultValue={receipient?.companyName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setReceipient((prev) => {
                          return {
                            ...prev,
                            companyName: e.target.value,
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
                    <label>Position Held</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        border: "gainsboro solid 1px",
                        paddingLeft: "3px",
                      }}
                      defaultValue={receipient?.positionHeld}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setReceipient((prev) => {
                          return {
                            ...prev,
                            positionHeld: e.target.value,
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
                      Company Address
                      <span>(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        border: "gainsboro solid 1px",
                        paddingLeft: "3px",
                      }}
                      defaultValue={receipient?.companyAddress}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setReceipient((prev) => {
                          return {
                            ...prev,
                            companyAddress: e.target.value,
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
                      defaultValue={receipient?.postalCode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setReceipient((prev) => {
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
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default CoverLetterProfile;
