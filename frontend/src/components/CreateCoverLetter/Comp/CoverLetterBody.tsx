// @ts-nocheck

import { Icon } from "@iconify/react";
import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "use-http";
import { savingData, updateCover, updateCoverLetter } from "../../../services";
import AutoComplete from "../../AutoCompleteComp/AutoComplete";
import TextGenerateModal from "../../Modal/TextGenerateModal";
const CoverLetterBody = ({ coverLetterData, id }) => {
  const editor = useRef(null);
  const [modalShow, setModalShow] = useState(false);
  const {
    response,
    post,
    loading,
    get,
    data: repos,
    put,
    request,
  } = useFetch();
  const [modalContentShow, setModalContentShow] = useState({
    sentenceWriterModal: false,
    aiWriterModal: false,
  });
  const [content, setContent] = useState(coverLetterData?.body);
  const auth: any = useSelector((store: any) => store.auth);
  const [autoCompletionText, setAutoCompletionText] = useState("");
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);
  const generatedAIData = useMemo(
    () => [
      "Helping the Head Chef to pick and train new employees.",
      "Scheduling special board, creating innovative and authentic dishes.",
      "Responsible for completing all audit and quality standards documentation.",
      "Turn on ovens, dish machine, lights, salad bar; fill and turn on hot food line; set up prep stations for the Chef and myself; inspect and replenish snack kitchen.",
      "Responsible for completing all audit and quality standards documentation.",
    ],
    []
  );

  useEffect(() => {
    if (coverLetterData) {
      setContent(coverLetterData?.body);
    }
  }, [coverLetterData]);

  useEffect(() => {
    updateCover({ body: content });
  }, [content]);
  const updateValues = (data) => {
    if (auth.isLoggedIn) {
      postBody(data);
    } else {
      updateCoverLetter({
        body: data,
      });
      savingData("saved");
    }
  };

  let _setTimeOut = null;
  const onFormChange = (data) => {
    if (_setTimeOut) clearTimeout(_setTimeOut);

    updateCover({ body: data });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues(data), 1000);
  };

  const updateContent = (v: string) => {
    updateCover({ body: v });
    updateCoverLetter({
      body: v,
    });
    setContent(v);
  };
  const postBody = async (data) => {
    const res = await put(`cover-letter/update/${id}`, {
      body: data,
    });
    savingData("saved");
  };
  const cleanHTML = (html) => {
    if (html) {
      return html.replace(/(<[^>]+) style=".*?"/g, "$1");
    }
    return "";
  };

  const config = {
    readonly: false,
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
    askBeforePasteHTML: false,
    toolbarSticky: true,
    allowTabNavigtion: false,
    height: 200,
  };
  return (
    <>
      <form className="resume-box">
        <div className="row">
          <div className="col-lg-12">
            <div className="content-editor">
              <label>Write your Body</label>
              <JoditEditor
                ref={editor}
                defaultValue={content}
                value={cleanHTML(content)}
                tabIndex={1}
                config={config}
                onBlur={(newContent) => {
                  setContent(newContent);
                  onFormChange(newContent);
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
        coverSummary="body"
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
export default CoverLetterBody;
