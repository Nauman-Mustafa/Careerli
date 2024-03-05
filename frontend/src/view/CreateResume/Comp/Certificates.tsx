// @ts-nocheck

import { Icon } from "@iconify/react";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import { appendText } from "../../../components/AutoCompleteComp/AppendData";
import AutoComplete from "../../../components/AutoCompleteComp/AutoComplete";
import TextGenerateModal from "../../../components/Modal/TextGenerateModal";
import {
  $collapser,
  savingData,
  selectSection,
  updateData,
  updateResume,
} from "../../../services";
import { getYears } from "../../../services/yearlist";

const Certificates = ({ docId, onDelete, info, setChangeState }: any) => {
  const editor = useRef(null);
  const ref = useRef(null);
  const [editName, setEditName] = useState(false);

  const { response, post, loading, get, data: repos, put } = useFetch();
  const [modalShow, setModalShow] = useState(false);

  const [content, setContent] = useState("");
  const [sectionTitle, setSectionTitle] = useState(info.title);
  const [certification, SetCertification] = useState(info.certificate);
  const [autoCompletionText, setAutoCompletionText] = useState("");
  const [modalContentShow, setModalContentShow] = useState({
    sentenceWriterModal: false,
    aiWriterModal: false,
    selectedIndex: 0,
  });
  const cleanHTML = (html) => html.replace(/style=".*?"/g, "");
  const config = {
    readonly: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    pastePlain: true,
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
    allowTabNavigtion: false,
    height: 200,
  };

  let handleChange = (i, e) => {
    let newFormValues = [...certification];
    if (typeof e === "object") {
      newFormValues[i][e.target.name] = e.target.value;
      SetCertification(newFormValues);
    } else {
      newFormValues[i]["description"] = e;
      SetCertification(newFormValues);
    }

    // SetcertificationObj(newFormValues);
  };

  let addFormFields = () => {
    SetCertification([
      ...certification,
      {
        certificateName: "",
        authority: "",
        certificationLink: "",
        dateReceMonth: "",
        dateReceYear: "",
        description: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...certification];
    newFormValues.splice(i, 1);

    SetCertification(newFormValues);

    if (auth.isLoggedIn) {
      const posteducations = async () => {
        const res = await put(`resume/update/${docId}`, {
          certification: {
            id: info.id,
            title: sectionTitle,
            cat: "certification",
            to: "certificates",
            icon: "ph:bookmark",
            order: info?.order,
            showComp: true,
            certificate: newFormValues,
          },
        });
      };
      posteducations();
    } else {
      updateData({
        certification: {
          id: info.id,
          title: sectionTitle,
          cat: "certification",
          to: "certificates",
          icon: "ph:bookmark",
          order: info?.order,
          showComp: true,
          certificate: newFormValues,
        },
      });
    }
  };

  const auth: any = useSelector((store: any) => store.auth);

  const [section, setSectionOpener] = useState("");

  useEffect(() => {
    if (info.certificate) {
      SetCertification(info.certificate);
    }
  }, [info]);
  useEffect(() => {
    info.certificate = certification;
    updateResume({ certification: info });

    const sub$ = $collapser.subscribe((v: string) => {
      setSectionOpener(v);
    });
    return () => {
      sub$.unsubscribe();
    };
  }, []);

  let data = {
    id: info.id,
    title: sectionTitle,
    cat: "certification",
    to: "certificates",
    icon: "ph:bookmark",
    order: info?.order,
    showComp: true,
    certificate: certification,
  };
  const updateValues = () => {
    if (auth.isLoggedIn) {
      postEducation();
    } else {
      updateData({
        certification: data,
      });
      savingData("saved");
    }
  };

  let _setTimeOut = null;
  const onFormChange = () => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    info.certificate = certification;
    updateResume({ certification: info });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues, 1000);
  };

  const changeTitle = (e) => {
    e.stopPropagation();
    setEditName(false);
    updateResume({ certification: data });

    if (auth.isLoggedIn) {
      postEducation();
      updateResume({ certification: data });
    } else {
      updateData({
        certification: data,
      });
    }
  };

  const postEducation = async () => {
    const res = await put(`resume/update/${docId}`, {
      certification: data,
    });
    savingData("saved");
  };

  const updateContent = (v: string) => {
    const { selectedIndex } = modalContentShow;
    setContent(v);
    SetCertification(
      certification?.map((item, i) => {
        if (i === selectedIndex) {
          item.description = v;

          return item;
        }
        return item;
      })
    );
    onFormChange();
  };
  useEffect(() => {
    if (autoCompletionText) {
      appendText(autoCompletionText);
    }
  }, [autoCompletionText]);
  const handleEditorChange = (newContent) => {
    const elem = document.querySelector(".jodit-wysiwyg>p");
    if (autoCompletionText) {
      const lastChar = newContent
        .replace(/(<([^>]+)>)/gi, "")
        ?.replace(/(&nbsp;|\s)+/g, " ")
        .slice(-1);

      if (lastChar === " " || lastChar === "\t" || lastChar === "\n") {
        document.getElementById("text-append")?.remove();
        let completeText = `${content
          .replace(/(<([^>]+)>)/gi, "")
          ?.replace(/(&nbsp;|\s)+/g, " ")
          .trim()} ${autoCompletionText}`;
        updateContent(completeText);
        setAutoCompletionText("");
      }
    } else {
      setAutoCompletionText("");
    }
  };

  let isOpend = section === "certificates";
  isOpend ? setChangeState(ref) : null;
  return (
    <>
      <div className="resume-box" ref={ref}>
        <div
          className="box-header d-flex justify-content-between"
          onClick={() => {
            selectSection("certificates");
          }}
          aria-controls="certificates"
          aria-expanded={section === "certificates"}>
          <div className="header-left d-flex align-items-center">
            <div
              className="figure-icon"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <Icon icon="ph:bookmark" />
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
          <div className="header-right">
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <Icon icon="bi:trash" hFlip={true} onClick={onDelete} />
            </button>
          </div>
        </div>
        {isOpend ? (
          <Collapse in={section === "certificates"}>
            <form
              className="box-body"
              id="certificates"
              onChange={onFormChange}>
              {certification?.map((item, i) => (
                <div className="row">
                  {i >= 1 ? (
                    <div className="col-lg-12">
                      <hr />
                    </div>
                  ) : null}
                  {i ? (
                    <div className="col-lg-12">
                      <div className="add-documents remove-documents">
                        <Icon icon="bi:trash" hFlip={true} onClick={onDelete} />
                        <span onClick={() => removeFormFields(i)}>
                          Remove Certification
                        </span>
                      </div>
                    </div>
                  ) : null}
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>Certificate Name</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{
                            border: "gainsboro solid 1px",
                            paddingLeft: "3px",
                          }}
                          name="certificateName"
                          defaultValue={item?.certificateName}
                          value={item.certificateName || ""}
                          onChange={(e) => handleChange(i, e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>Authority</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{
                            border: "gainsboro solid 1px",
                            paddingLeft: "3px",
                          }}
                          name="authority"
                          defaultValue={item?.authority}
                          value={item.authority || ""}
                          onChange={(e) => handleChange(i, e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input icon-input">
                        <label>Certificate Link</label>
                        <input
                          type="url"
                          className="form-control"
                          style={{
                            border: "gainsboro solid 1px",
                          }}
                          name="certificationLink"
                          defaultValue={item?.certificationLink}
                          value={item.certificationLink || ""}
                          onChange={(e) => handleChange(i, e)}
                        />
                        <span className="small-icon">
                          <Icon icon="akar-icons:link-chain" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>Date Received</label>
                        <div className="d-flex date-input">
                          <select
                            className="form-control"
                            name="dateReceMonth"
                            value={item?.dateReceMonth || ""}
                            onChange={(e) => handleChange(i, e)}>
                            <option value="">Select Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>Jun</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                          </select>
                          <select
                            className="form-control"
                            name="dateReceYear"
                            defaultValue={item?.dateReceYear}
                            value={item.dateReceYear || ""}
                            onChange={(e) => handleChange(i, e)}>
                            <option value="">Select Year</option>
                            {getYears()}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="content-editor">
                      <label>
                        Description <span>(Optional)</span>
                      </label>
                      <JoditEditor
                        ref={editor}
                        defaultValue={item?.description}
                        value={cleanHTML(item?.description)}
                        tabIndex={1}
                        config={config}
                        onBlur={(newContent) => {
                          setContent(newContent);
                          handleChange(i, newContent);
                          onFormChange();
                        }}
                        placeholder=""
                        onChange={handleEditorChange}
                      />
                      <AutoComplete
                        toolType="sentence_autocomplete_generic"
                        text={content ? content : item?.description}
                        secName="sentence"
                        textHandler={updateContent}
                        ghostText={setAutoCompletionText}
                      />
                      <div className="editor-buttons">
                        <a
                          className="btn btn-white"
                          onClick={() => {
                            setModalShow(true);
                            setModalContentShow({
                              sentenceWriterModal: true,
                              aiWriterModal: false,
                              selectedIndex: i,
                            });
                          }}>
                          <Icon icon="ph:keyboard" />
                          <span>Sentence Rewriter</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                // <CertificateSection
                //   item={item}
                //   i={i}
                //   handleChange={handleChange}
                //   removeFormFields={removeFormFields}
                //   onDelete={onDelete}
                // />
              ))}
              <div className="row">
                <div className="col-lg-12">
                  <div className="add-documents">
                    <Icon icon="akar-icons:plus" hFlip={true} />
                    <span onClick={() => addFormFields()}>
                      Add Certification
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </Collapse>
        ) : null}
      </div>
      <TextGenerateModal
        secName="generic"
        text={content}
        setText={updateContent}
        showModal={modalShow}
        showModalHandler={setModalShow}
        modalContentShow={modalContentShow}
      />
    </>
  );
};
export default Certificates;
