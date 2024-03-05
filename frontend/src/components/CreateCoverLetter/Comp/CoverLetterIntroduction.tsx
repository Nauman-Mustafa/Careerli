// @ts-ignore
// @ts-nocheck
import { Icon } from "@iconify/react";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "use-http";
import { savingData, updateCover, updateCoverLetter } from "../../../services";
import AutoComplete from "../../AutoCompleteComp/AutoComplete";
import TextGenerateModal from "../../Modal/TextGenerateModal";
const CoverLetterIntroduction = ({ coverLetterData, id }) => {
  const editor = useRef(null);
  const {
    response,
    post,
    loading,
    get,
    data: repos,
    put,
    request,
  } = useFetch();
  const [content, setContent] = useState(coverLetterData?.introduction?.opener);
  const [title, setTitle] = useState(coverLetterData?.introduction?.title);
  const [modalShow, setModalShow] = useState(false);
  const auth: any = useSelector((store: any) => store.auth);
  const [modalContentShow, setModalContentShow] = useState({
    sentenceWriterModal: false,
    aiWriterModal: false,
    selectedIndex: 0,
  });
  useEffect(() => {
    if (coverLetterData) {
      setTitle(coverLetterData?.introduction?.title);
      setContent(coverLetterData?.introduction?.opener);
    }
  }, [coverLetterData]);

  const updateValues = (data) => {
    if (auth.isLoggedIn) {
      postIntro(data);
    } else {
      updateCoverLetter({
        introduction: { opener: data.opener, title: data.title },
      });
      savingData("saved");
    }
  };

  useEffect(() => {
    updateCover({ introduction: { opener: content, title: title } });
  }, [content]);

  let _setTimeOut = null;
  const onFormChange = (data) => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    updateCover({ introduction: { opener: data.opener, title: data.title } });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues(data), 1000);
  };

  const updateContent = (v: string) => {
    updateCover({ introduction: { opener: v, title: title } });
    updateCoverLetter({
      introduction: { opener: v, title: title },
    });
    setContent(v);
  };
  const postIntro = async (data) => {
    const res = await put(`cover-letter/update/${id}`, {
      introduction: { opener: data.opener, title: data.title },
    });
    savingData("saved");
  };
  const cleanHTML = (html) => {
    if (html) {
      return html.replace(/(<[^>]+) style=".*?"/g, "$1");
    }
    return "";
  };

  const [autoCompletionText, setAutoCompletionText] = useState("");

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
    toolbarSticky: true,
    askBeforePasteHTML: false,
    allowTabNavigtion: false,
    height: 200,
  };
  return (
    <div className="box-body">
      <form>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <div className="form-input">
                <label>Title</label>
                <select
                  className="form-control"
                  defaultValue={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    onFormChange({ title: e.target.value, opener: content });
                  }}>
                  <option value="">Select</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="content-editor">
              <label>Write your Opener</label>
              <JoditEditor
                ref={editor}
                defaultValue={content}
                value={cleanHTML(content)}
                tabIndex={1}
                config={config}
                onBlur={(newContent) => {
                  setContent(newContent);
                  onFormChange({ title: title, opener: newContent });
                }}
                placeholder=""
                onChange={(newContent) => {}}
              />

              <div className="d-flex align-items-center">
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
      </form>
      <TextGenerateModal
        coverSummary="introduction"
        secName="generic"
        text={content}
        setText={updateContent}
        showModal={modalShow}
        showModalHandler={setModalShow}
        modalContentShow={modalContentShow}
      />
    </div>
  );
};

export default CoverLetterIntroduction;
