// @ts-nocheck

import { Icon } from "@iconify/react";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "use-http";
import { savingData, updateCover, updateCoverLetter } from "../../../services";
import AutoComplete from "../../AutoCompleteComp/AutoComplete";
import TextGenerateModal from "../../Modal/TextGenerateModal";
const CoverLetterClosing = ({ coverLetterData, id }) => {
  const editor = useRef(null);
  const [modalShow, setModalShow] = useState(false);
  const auth: any = useSelector((store: any) => store.auth);
  const [autoCompletionText, setAutoCompletionText] = useState("");
  const [modalContentShow, setModalContentShow] = useState({
    sentenceWriterModal: false,
    aiWriterModal: false,
  });
  const {
    response,
    post,
    loading,
    get,
    data: repos,
    put,
    request,
  } = useFetch();
  const [content, setContent] = useState(coverLetterData?.closing?.closingData);
  const [signing, setSigning] = useState("");
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

  useEffect(() => {
    if (coverLetterData) {
      setSigning(coverLetterData?.closing?.signing);
      setContent(coverLetterData?.closing?.closingData);
    }
  }, [coverLetterData]);

  useEffect(() => {
    updateCover({ closing: { signing, closingData: content } });
  }, [signing, content]);

  const updateValues = (data) => {
    // console.log(signing,"signing")

    if (auth.isLoggedIn) {
      postIntro(data);
    } else {
      updateCoverLetter({
        closing: { signing: data.sign, closingData: data.closingData },
      });
      savingData("saved");
    }
  };

  let _setTimeOut = null;
  const onFormChange = (data) => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    // console.log(signing,"signingsssss")
    updateCover({
      closing: { signing: data.sign, closingData: data.closingData },
    });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues(data), 1000);
  };

  const updateContent = (v: string) => {
    updateCover({ closing: { signing, closingData: v } });
    updateCoverLetter({
      closing: { signing, closingData: v },
    });
    setContent(v);
  };

  const postIntro = async (data) => {
    const res = await put(`cover-letter/update/${id}`, {
      closing: { signing: data.sign, closingData: data.closingData },
    });
    savingData("saved");
  };

  return (
    <>
      <form className="resume-box">
        <div className="row">
          <div className="col-lg-12">
            <div className="content-editor">
              <label>Write your Closing</label>
              <JoditEditor
                ref={editor}
                defaultValue={content}
                value={content}
                tabIndex={1}
                config={config}
                onBlur={(newContent) => {
                  setContent(newContent);
                  onFormChange({ sign: signing, closingData: newContent });
                }}
                placeholder=""
                onChange={(newContent) => {}}
              />
              <div className="d-flex">
                <AutoComplete
                  toolType="sentence_autocomplete_generic"
                  text={content}
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
                      });
                    }}>
                    <Icon icon="ph:keyboard" />
                    <span>Sentence Rewriter</span>
                  </a>
                  <a
                    className="btn btn-light-blue"
                    onClick={() => {
                      setModalShow(true);
                      setModalContentShow({
                        sentenceWriterModal: false,
                        aiWriterModal: true,
                      });
                    }}>
                    <Icon icon="eva:flash-outline" />
                    <span> AI Writer</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <div className="form-input">
                <label>Signing</label>
                <select
                  className="form-control"
                  defaultValue={signing}
                  onChange={(e) => {
                    setSigning(e.target.value);
                    onFormChange({
                      sign: e.target.value,
                      closingData: content,
                    });
                  }}>
                  <option value="">Select</option>
                  <option value="Your faithfully">Your faithfully</option>
                  <option value="Your Significancy">Your Significancy</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-6">
            <div className="form-group">
              <div className="form-input icon-input">
                <label>
                  Upload Signature <span>(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={bodyData?.signature}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBodyData((prev) => {
                      return {
                        ...prev,
                        signature: e.target.value,
                      };
                    });
                  }}
                />
                <span className="small-icon">
                  <Icon icon="quill:signature" />
                </span>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="generated-text-container">
          <ul>
            <li>
              <div className="d-flex align-items-center">
                <p className="generated-text">
                  Turn on ovens, dish machine, lights, salad bar; fill and turn
                  on hot food line; set up prep stations for the Chef and
                  myself; inspect and replenish snack kitchen. Helping the Head
                  Chef to pick and train new employees. Responsible for
                  completing all audit and quality standards documentation.
                </p>
                <button>
                  <Icon icon="akar-icons:circle-plus" />
                </button>
              </div>
            </li>
          </ul>
          <div className="d-flex justify-content-center my-3">
            <button className="btn btn-default">
              <Icon icon="eva:refresh-fill" hFlip={true} />
              <span>Previous</span>
            </button>
            <button className="btn btn-default">
              <span>Next</span>
              <Icon
                icon="eva:refresh-fill"
                style={{ margin: "auto", marginLeft: "8px" }}
              />
            </button>
          </div>
        </div> */}
      </form>

      <TextGenerateModal
        coverSummary="closing"
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
export default CoverLetterClosing;
