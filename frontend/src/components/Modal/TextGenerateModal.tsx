// @ts-nocheck
import { Icon } from "@iconify/react";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFetch } from "use-http";
import aiWriterImage from "../../assets/images/ai-writer.png";
import sentenceWriterImage from "../../assets/images/sentence-writer.svg";
import { $coverLetter, $resume } from "../../services";
import LoginModal from "../Login/LoginModal";
let rewSentence =
  "Turn on ovens, dish machine, lights, salad bar; fill and turn on hot food line; set up prep stations for the Chef and myself; inspect and replenish snack kitchen. Helping the Head Chef to pick and train new employees. Responsible for completing all audit and quality standards documentation";
const TextGenerateModal = ({
  showModal,
  showModalHandler,
  modalContentShow,
  text,
  secName,
  setText,
  coverSummary,
}: any) => {
  const editor = useRef(null);
  const { response, post, loading, get, data: repos, put } = useFetch();
  const previousValue = useRef(null);
  const previousValueAI = useRef(null);
  const [content, setContent] = useState();

  const [show, setShow] = useState(false);
  const [aiToggle, setAiToggle] = useState("Low Summary");
  const [description, setDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDes, setJobDes] = useState("");
  const [specialAboutComp, setSpecialAboutComp] = useState("");
  const [reasonOfSpe, setReasonOfSpe] = useState("");
  // const [eduArry, setEduArry] = useState([]);
  // const [workArry, setWorkArryArry] = useState([]);
  // const [skillArry, setSkillArryArry] = useState([]);

  const [previous, setPrevious] = useState(false);
  const [previousAI, setPreviousAI] = useState(false);
  const [sentence, setSentance] = useState<any>([]);
  const [modalShow, setModalShow] = useState(false);
  const [aiSentance, setAiSentance] = useState([]);
  const [data, setData] = useState<any>({});
  const [coverData, setCoverData] = useState<any>({});
  const [docId, setId] = useState("");
  const [selected, setSelected] = useState(-1);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedIndexesAI, setSelectedIndexesAI] = useState([]);

  const toggleSelected = (index) => {
    if (selectedIndexes.includes(index)) {
      // Remove if already selected
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      // Add to selected
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };
  const toggleSelectedAI = (index) => {
    if (selectedIndexesAI.includes(index)) {
      // Remove if already selected
      setSelectedIndexesAI(selectedIndexesAI.filter((i) => i !== index));
    } else {
      // Add to selected
      setSelectedIndexesAI([...selectedIndexesAI, index]);
    }
  };
  let newAiPharase = [
    "It is a long established fact that a reader will be distracted by the readable",
    "content of a page when looking at its layout.",
    "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
  ];

  const auth: any = useSelector((store: any) => store.auth);
  // useEffect(() => {
  //   previousValueAI.current = aiSentance 
  // }, [aiSentance]);
  useEffect(() => {
    setId(window.location.href.split("=")[1]);
    if (window.location.href.split("=")[1] != "guestUser" && auth.isLoggedIn) {
      // fetchResume(window.location.href.split("=")[1]);
    }
  }, []);

  useEffect(() => {
    const $sub = $resume.subscribe((v) => {
      setData(v);
    });
    const $subs = $coverLetter.subscribe((v) => {
      setCoverData(v);
    });

    return () => {
      $sub.unsubscribe();
      $subs.unsubscribe();
    };
  }, []);

  let eduArryy = [];
  let workArryy = [];
  let workJobtitles = [];
  let exper = [];
  data?.education?.educationHistory.forEach((item) => {
    item?.degree ? eduArryy.push(item?.degree) : eduArryy;
  });
  data?.workHistory?.history.forEach((item) => {
    let today = new Date(`${item?.startMonth},${item?.startYear}`);
    let past = new Date(`${item?.endMonth},${item?.endYear}`);

    let a = calcDate(past, today);
    exper.push(a);

    item.jobTitle ? workArryy.push(item.jobTitle) : workArryy;
    item.jobTitle
      ? workJobtitles.includes(item.jobTitle)
        ? workJobtitles
        : workJobtitles.push(item.jobTitle)
      : workJobtitles;
  });
  let totalExp = 0;
  for (let i of exper) {
    totalExp += i;
  }

  let totalYearOfExp = Math.ceil(totalExp / 12);

  const aiToggleData = ["Low Summary", "High Summary"];

  const config = {
    readonly: false,
    enableDragAndDropFileToEditor: true,
    buttons: [
      "bold",
      "italic",
      "underline",
      "justify",
      "left",
      "right",
      "ul",
      "ol",
      "link",
    ],

    removeButtons: [
      "fullsize",
      "fontsize",
      "eraser",
      "font",
      "brush",
      "paragraph",
      "file",
      "eraser",
      "source",
      "hr",
      "image",
      "table",
      "formatpainter",
    ],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: false,
    toolbarSticky: true,
    askBeforePasteHTML: false,
    allowTabNavigtion: false,
    height: 200,
  };
  function calcDate(date1, date2) {
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);

    var message = date2;
    message += months;

    return months;
  }
  const generatePara = async () => {
    if (auth.isLoggedIn) {
      if (text == "" || !text) {
        toast.error("Please Enter text");
        return;
      }
      const res = await post("resume/ai-generation", {
        toolType: "sentence_rewriter",
        text: text
          ?.replace(/(<([^>]+)>)/gi, "")
          ?.replace(/(&nbsp;|\s)+/g, " ")
          .trim(),
        section_type: secName,
      });
      if (res.code === 200) {
        toast.success(res?.message);
        setSentance((pre) => [...pre, res?.data?.output]);
      } else {
        toast.error(res?.message);
      }
    } else {
      setModalShow(true);
    }
  };
  const SummaryAiGenerator = async () => {
    // setDescription("");
    previousValueAI.current = aiSentance 
    setSelectedIndexesAI([...selectedIndexes]);
    setSelectedIndexes([]);
    if (auth.isLoggedIn) {
      if (coverSummary === "introduction") {
        if (jobTitle === "") {
          toast("Please Enter Job Title");
          return;
        }
        if (companyName === "") {
          toast("Please Enter Company Name");
          return;
        }
        const res = await post("resume/ai-generation", {
          toolType: "ai_writer_cover_letter_introduction",
          companyName: companyName,
          jobTitle: jobTitle,
          specialAboutCompany: specialAboutComp,
          reasonOfBeingSpecial: reasonOfSpe,
        });

        if (res.code === 200) {
          // setJobTitle("");
          setSpecialAboutComp("");
          setReasonOfSpe("");
          toast.success(res?.message);

          typeof res?.data?.output == "string"
            ? setAiSentance((pre) => [...pre, res?.data?.output])
            : setAiSentance([]);
        } else {
          toast.error(res?.message);
        }
      }
      if (coverSummary === "body") {
        // if (jobTitle === "") {
        //   toast("Please Enter Job Title");
        //   return;
        // }
        let jobTitle = JSON.parse(localStorage.getItem("jobTitle"));
        const res = await post("resume/ai-generation", {
          toolType: "ai_writer_cover_letter_body",
          companyName: coverData?.receipient?.companyName,
          jobTitle: jobTitle,
          reasonOfBeingSpecial: reasonOfSpe,
        });

        if (res.code === 200) {
          // setJobTitle("");
          setSpecialAboutComp("");
          setReasonOfSpe("");
          toast.success(res?.message);

          typeof res?.data?.output == "string"
            ? setAiSentance((pre) => [...pre, res?.data?.output])
            : setAiSentance([]);
        } else {
          toast.error(res?.message);
        }
      }
      if (coverSummary === "closing") {
        // if (jobTitle === "") {
        //   toast("Please Enter Job Title");
        //   return;
        // }
        let jobTitle = JSON.parse(localStorage.getItem("jobTitle"));
        const res = await post("resume/ai-generation", {
          toolType: "ai_writer_cover_letter_conclusion",
          companyName: coverData?.receipient?.companyName,
          jobTitle: jobTitle,
          body: coverData?.body?.replace(/(<([^>]+)>)/gi, ""),
        });

        if (res.code === 200) {
          // setJobTitle("");
          setSpecialAboutComp("");
          setReasonOfSpe("");
          toast.success(res?.message);

          typeof res?.data?.output == "string"
            ? setAiSentance((pre) => [...pre, res?.data?.output])
            : setAiSentance([]);
        } else {
          toast.error(res?.message);
        }
      }
      if (secName === "work") {
        if (workJobtitles.length !== 0) {
          const res = await post("resume/ai-generation", {
            toolType: "ai_writer_work_description",
            work: workArryy.toString(),
            jobTitle: jobTitle ? jobTitle : workJobtitles[0],
            jobDescription: jobDes,
          });
          // setJobTitle("");
          setJobDes("");
          if (res.code === 200) {
            toast.success(res?.message);
            let formattedString = res?.data?.output?.split(/\.\s/);
            formattedString[formattedString.length - 1] = formattedString[
              formattedString.length - 1
            ].replace(/\.$/, "");
            typeof res?.data?.output == "string"
              ? setAiSentance(formattedString)
              : setAiSentance([]);
          } else {
            toast.error(res?.message);
          }
        } else {
          toast("Please go back Enter Job Title");
          // if (jobTitle !== "") {
          //   const res = await post("resume/ai-generation", {
          //     toolType: "ai_writer_work_description",
          //     work: jobTitle,
          //   });
          //   setJobTitle("");
          //   if (res.code === 200) {
          //     toast.success(res?.message);
          //     typeof res?.data?.output == "string"
          //       ?  setAiSentance((pre) => [...pre, res?.data?.output])
          //       : setAiSentance([]);
          //   } else {
          //     toast.error(res?.message);
          //   }
          // } else if (jobTitle === "") {
          //   toast("Please Enter Job Title");
          // }
        }
      } else if (secName === "summary") {
       
        if (aiToggle === "Low Summary") {
          if (jobTitle !== "") {
            const res = await post("resume/ai-generation", {
              toolType: "ai_writer_summary_low",
              jobTitle: jobTitle,
              jobDescription: jobDes,
            });
            // setJobTitle("");
            setJobDes("");
            if (res.code === 200) {
              toast.success(res?.message);
              typeof res?.data?.output == "string"
                ? setAiSentance((pre) => [...pre, res?.data?.output])
                : setAiSentance([]);
            } else {
              toast.error(res?.message);
            }
          } else {
            toast("Please Enter Job Title");
          }
        } else {
          if (
            eduArryy.length !== 0 &&
            workJobtitles.length !== 0 &&
            data?.skills?.list.length !== 0
          ) {
            jobTitle ? workArryy.push(jobTitle) : workArryy;
            totalYearOfExp
              ? workArryy.unshift(`${totalYearOfExp}+years of experience`)
              : workArryy;

            const res = await post("resume/ai-generation", {
              toolType: "ai_writer_summary",
              work: workArryy.toString(),
              skills: data?.skills?.list.toString(),
              education: eduArryy.toString(),
              jobTitle: jobTitle,
              jobDescription: jobDes,
            });
            // setJobTitle("");
            setJobDes("");
            if (res.code === 200) {
              toast.success(res?.message);

              typeof res?.data?.output == "string"
                ? setAiSentance((pre) => [...pre, res?.data?.output])
                : setAiSentance([]);
            } else {
              toast.error(res?.message);
            }
          } else {
            toast("Must fill Skills ,Work Experience and Education ");
          }
        }
      } else if (secName === "education") {
        if (eduArryy?.length !== 0) {
          const res = await post("resume/ai-generation", {
            toolType: "ai_writer_education_description",
            education: eduArryy.toString(),
          });
          // setJobTitle("");
          if (res.code === 200) {
            toast.success(res?.message);
            let formattedString = res?.data?.output?.split(/\.\s/);
            formattedString[formattedString.length - 1] = formattedString[
              formattedString.length - 1
            ].replace(/\.$/, "");
            typeof res?.data?.output == "string"
              ? setAiSentance(formattedString)
              : setAiSentance([]);
          } else {
            toast.error(res?.message);
          }
        } else {
          if (eduArryy?.length === 0) {
            toast("Please go back and select your Degree");
          }
        }
      } else if (secName === "skills") {
        if (jobTitle !== "") {
          const res = await post("resume/ai-generation", {
            toolType: "ai_writer_skills",
            job: jobTitle,
          });
         
          // setJobTitle("");

          if (res.code === 200) {
            toast.success(res?.message);
            let formattedString = res?.data?.output?.split(",");
            typeof res?.data?.output == "string"
              ? setAiSentance(formattedString)
              : setAiSentance([]);
          } else {
            toast.error(res?.message);
          }
        } else if (jobTitle === "") {
          toast("Please Enter Job Title");
        }
      }
    } else {
      setModalShow(true);
    }
  };

  const addSentences = (index: any, sentence: any) => {
    setSelected(index);
    setDescription((pre) => {
      

      if (secName === "work") {
        // Split the existing description into separate lines
        const lines = pre.split(". ");

        // Format the new sentence with a bullet point
        const formattedSentence = `<ul><li><p>${sentence}`;

        // Add the formatted sentence to the lines array
        lines.push(formattedSentence);

        // Join the lines with line breaks to create the new description
        const newDescription = lines.filter((i) => i).join("</p></li></ul>");

        return newDescription;
      }
      if (secName === "education") {
        return pre === "" ? `${sentence}` : `${pre}. ${sentence}`;
      } else if (secName === "skills") {
        return pre === "" ? sentence : `${pre}, ${sentence}`;
      } else {
        return `${sentence}`;
      }
    });
  };
 
  return (
    <>
      <Modal
        show={showModal}
        onHide={showModalHandler}
        centered
        className="resumeModal"
      >
        {modalContentShow.sentenceWriterModal === true ? (
          <div className="resume-modal-body">
            <Modal.Header closeButton>
              <div className="d-flex align-items-center">
                <h2>
                  <Icon icon="ph:keyboard" />
                  Sentence Rewriter
                </h2>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-container text-center">
                <figure className="modal-figure text-center">
                  <img src={sentenceWriterImage} alt="image not found" />
                </figure>
                <p>
                  Feeling specific ? Let’s help you rewrite your words to fit
                  standard requirements
                </p>
                {/* <button className="btn btn-linen">
                <Icon icon="pepicons:refresh" hFlip={true} />
                <span>Rewrite Sentence</span>
              </button> */}
              </div>
              <div className="generated-text-container">
                <ul>
                  {sentence?.length > 0 &&
                    sentence?.map((writer, i) => (
                      <>
                        {writer && (
                          <li
                            key={i}
                            className={selected === i ? "selected" : ""}
                          >
                            <div className="d-flex align-items-center">
                              <p className="generated-text">
                                {writer.replace(/(<([^>]+)>)/gi, "")}
                                {/* {previous ? previousValue.current : sentence} */}
                              </p>

                              {/* <button>
                            <Icon icon="eva:edit-outline" />
                          </button> */}
                              <button
                                onClick={() => {
                                  setSelected(i);
                                  setContent(writer);
                                }}
                              >
                               {selected === i? <Icon icon="mdi:tick" />:<Icon icon="akar-icons:circle-plus" />} 
                              </button>
                            </div>
                          </li>
                        )}
                      </>
                    ))}
                </ul>
                <div className="d-flex justify-content-center mt-5">
                  {/* {previous ? (
                    <button className="btn" onClick={() => setPrevious(false)}>
                      <Icon icon="eva:refresh-fill" hFlip={true} />
                      <span>Next</span>
                    </button>
                  ) : (
                    <button className="btn" onClick={() => setPrevious(true)}>
                      <Icon icon="eva:refresh-fill" hFlip={true} />
                      <span>Previous</span>
                    </button>
                  )} */}
                  <button
                    className="btn btn-linen"
                    style={{ marginBottom: "20px" }}
                    onClick={() => {
                      generatePara();
                      // setSentance(
                      //   "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content"
                      // );
                      // setPrevious(false);
                    }}
                  >
                    {loading ? (
                      <Spinner animation="border" />
                    ) : (
                      <>
                        <Icon icon="pepicons:refresh" hFlip={true} />
                        <span>Generate New Phrase</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  rows={2}
                  defaultValue={text
                    ?.replace(/(<([^>]+)>)/gi, "")
                    ?.replace(/(&nbsp;|\s)+/g, " ")
                    .trim()}
                  value={content?.replace(/(<([^>]+)>)/gi, "")}
                  placeholder="Type in the phrase you’d like to add"
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-white"
                    onClick={() => {
                      setText(content);
                      showModalHandler();
                    }}
                  >
                    <span>Use This Phrase</span>{" "}
                    <Icon
                      icon="charm:arrow-right"
                      style={{ margin: "0 0 0 8px" }}
                    />
                  </button>
                </div>
              </div>
            </Modal.Body>
          </div>
        ) : modalContentShow.aiWriterModal === true ? (
          <div className="resume-modal-body">
            <Modal.Header closeButton>
              <div className="d-flex align-items-center">
                <h2>
                  <Icon icon="eva:flash-outline" style={{ color: "#AAC5E7" }} />
                  AI Writer
                  <span>
                    Add phrases to your resume by clicking the plus sign
                  </span>
                </h2>
              </div>
            </Modal.Header>
            <Modal.Body>
              {secName === "summary" && (
                <div className="d-flex justify-content-center">
                  <div className="d-flex ai-toggle-button">
                    {aiToggleData.map((data, index) => (
                      <button
                        key={index}
                        className={`${
                          aiToggle === data ? "active-button" : ""
                        }`}
                        onClick={() => setAiToggle(data)}
                      >
                        {data}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="row">
                {coverSummary !== "body" && coverSummary !== "closing" && (
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Job Title</label>
                      <input
                        defaultValue={
                          jobTitle
                            ? jobTitle
                            : secName === "work"
                            ? workJobtitles[0]
                            : ""
                        }
                        // value={jobTitle}
                        type="text"
                        className="form-control"
                        placeholder="Enter Job Title"
                        onChange={(e) => setJobTitle(e.target.value)}
                        onBlur={localStorage.setItem(
                          "jobTitle",
                          JSON.stringify(jobTitle)
                        )}
                      />
                    </div>
                  </div>
                )}
                {coverSummary === "introduction" && (
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        value={companyName}
                        type="text"
                        className="form-control"
                        placeholder="Enter Company Name"
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {secName !== "skills" ||
                  (coverSummary !== "introduction" && (
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Job Description (Optional)</label>
                        <input
                          value={jobDes}
                          type="text"
                          className="form-control"
                          placeholder="Enter Job Description"
                          onChange={(e) => setJobDes(e.target.value)}
                        />
                      </div>
                    </div>
                  ))}

                {coverSummary === "introduction" && (
                  <>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>
                          What makes this company special?{" "}
                          <span>(Optional)</span>
                        </label>
                        <input
                          value={specialAboutComp}
                          type="text"
                          className="form-control"
                          placeholder="e.g,, i want to work at X inc because..."
                          onChange={(e) => setSpecialAboutComp(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {coverSummary === "introduction" || coverSummary === "body" ? (
                  <>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>
                          Reason why you're a good fit for the role?{" "}
                          <span>(Optional)</span>
                        </label>
                        <input
                          value={reasonOfSpe}
                          type="text"
                          className="form-control"
                          placeholder=""
                          onChange={(e) => setReasonOfSpe(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              <div className="modal-container text-center">
                <figure className="modal-figure text-center">
                  <img src={aiWriterImage} alt="image not found" />
                </figure>
                <p>
                  Let our AI help you curate phrases that are steamlined to fit
                  just you.
                </p>
                {/* <button className="btn btn-linen">
                  <Icon icon="pepicons:refresh" hFlip={true} />
                  <span>Generate Phrases</span>
                </button> */}
              </div>
              <div className="generated-text-container">
                <ul
                  style={{
                    display: "flex",
                    flexFlow: "wrap",
                    alignItems: "center",
                  }}
                >
                  
                  {previousAI ? (
                     previousValueAI?.current?.map((writer, i) => (
                      <>
                        {writer && (
                          <li
                            style={{ padding: "0px 10px" }}
                            key={i}
                            className={
                              selectedIndexesAI.includes(i) ? "selected" : ""
                            }
                          >
                            <div className="d-flex align-items-center">
                              <p className="generated-text">
                                {writer.replace(/(<([^>]+)>)/gi, "")}
                                {/* {previous ? previousValue.current : sentence} */}
                              </p>

                              {/* <button>
                            <Icon icon="eva:edit-outline" />
                          </button> */}
                              <button
                                onClick={() => {
                                  toggleSelectedAI(i);
                                  addSentences(i, writer);
                                }}
                              >
                                {selectedIndexesAI.includes(i) ? (
                                  <Icon icon="mdi:tick" />
                                ) : (
                                  <Icon icon="akar-icons:circle-plus" />
                                )}
                              </button>
                            </div>
                          </li>
                        )}
                      </>
                    ))
                  ) : (
                    <>
                      {aiSentance?.length > 0 && (
                       aiSentance.map((writer, i) => (
                        <>
                          {writer && (
                            <li
                              style={{ padding: "0px 10px" }}
                              key={i}
                              className={
                                selectedIndexes.includes(i) ? "selected" : ""
                              }
                            >
                              <div className="d-flex align-items-center">
                                <p className="generated-text">
                                  {writer.replace(/(<([^>]+)>)/gi, "")}
                                  {/* {previous ? previousValue.current : sentence} */}
                                </p>
  
                                {/* <button>
                              <Icon icon="eva:edit-outline" />
                            </button> */}
                                <button
                                  onClick={() => {
                                    toggleSelected(i);
                                    addSentences(i, writer);
                                  }}
                                >
                                  {selectedIndexes.includes(i) ? (
                                    <Icon icon="mdi:tick" />
                                  ) : (
                                    <Icon icon="akar-icons:circle-plus" />
                                  )}
                                </button>
                              </div>
                            </li>
                          )}
                        </>
                      ))
                      )}
                    </>
                  )}
                </ul>
                <div className="d-flex justify-content-between mt-5">
                  {previousAI ? (
                    <button
                      className="btn"
                      onClick={() => setPreviousAI(false)}
                    >
                      <Icon icon="eva:refresh-fill" hFlip={true} />
                      <span>Next</span>
                    </button>
                  ) : (
                    <button className="btn" onClick={() => setPreviousAI(true)}>
                      <Icon icon="eva:refresh-fill" hFlip={true} />
                      <span>Previous</span>
                    </button>
                  )}
                  <button
                    className="btn btn-linen"
                    onClick={() => {
                      SummaryAiGenerator();
                      // setAiSentance(newAiPharase);
                    }}
                  >
                    {loading ? (
                      <Spinner animation="border" />
                    ) : (
                      <>
                        <Icon icon="pepicons:refresh" hFlip={true} />
                        <span>Generate New Phrase</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="content-editor mt-4">
                <label>
                  Description <span>(Optional)</span>
                </label>
                {/* <JoditEditor
                  ref={editor}
                  defaultValue={description
                    ?.replace(/(<([^>]+)>)/gi, "")
                    ?.replace(/(&nbsp;|\s)+/g, " ")
                    .trim()}
                  value={description
                    ?.replace(/(<([^>]+)>)/gi, "")
                    ?.replace(/(&nbsp;|\s)+/g, " ")
                    .trim()}
                  tabIndex={1}
                  config={config}
                  onBlur={(newContent) => {
                    setDescription(
                      newContent
                        ?.replace(/(<([^>]+)>)/gi, "")
                        ?.replace(/(&nbsp;|\s)+/g, " ")
                        .trim()
                    );
                  }}
                  placeholder=""
                  onChange={(newContent) => {}}
                /> */}
                <JoditEditor
                  ref={editor}
                  defaultValue={description
                    ?.replace(/(<([^>]+)>)/gi, (match, tagContent) => {
                      // Check if the tag content is empty or contains only whitespaces
                      if (tagContent.trim() === "") {
                        // Return empty string for empty tags
                        return "";
                      } else {
                        // Return the original match for non-empty tags
                        return match;
                      }
                    })
                    ?.replace(/(&nbsp;|\s)+/g, " ")
                    .trim()}
                  value={description
                    ?.replace(/(<([^>]+)>)/gi, (match, tagContent) => {
                      // Check if the tag content is empty or contains only whitespaces
                      if (tagContent.trim() === "") {
                        // Return empty string for empty tags
                        return "";
                      } else {
                        // Return the original match for non-empty tags
                        return match;
                      }
                    })
                    ?.replace(/(&nbsp;|\s)+/g, " ")
                    .trim()}
                  tabIndex={1}
                  config={config}
                  onBlur={(newContent) => {
                    const cleanedContent = newContent
                      ?.replace(/(<([^>]+)>)/gi, (match, tagContent) => {
                        // Check if the tag content is empty or contains only whitespaces
                        if (tagContent.trim() === "") {
                          // Return empty string for empty tags
                          return "";
                        } else {
                          // Return the original match for non-empty tags
                          return match;
                        }
                      })
                      ?.replace(/(&nbsp;|\s)+/g, " ")
                      .trim();

                    // Check if the cleaned content is empty
                    if (cleanedContent === "<p><br></p>") {
                      // Set the description as an empty string
                      setDescription("");
                    } else {
                      // Set the cleaned content as the description
                      setDescription(cleanedContent);
                    }
                  }}
                  placeholder=""
                  onChange={(newContent) => {}}
                />
                <div className="editor-buttons">
                  <button
                    className="btn btn-white"
                    onClick={() => {
                      setText(`${description}`);
                      showModalHandler();
                    }}
                  >
                    <span>Use This Phrase</span>{" "}
                    <Icon
                      icon="charm:arrow-right"
                      style={{ margin: "0 0 0 8px" }}
                    />
                  </button>
                </div>
              </div>
            </Modal.Body>
          </div>
        ) : null}
      </Modal>
      <LoginModal showModal={modalShow} showModalHandler={setModalShow} />
    </>
  );
};

export default TextGenerateModal;
