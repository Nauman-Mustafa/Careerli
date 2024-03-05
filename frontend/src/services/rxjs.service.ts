import { BehaviorSubject, Subject } from "rxjs";
import { ELocalDB } from "../enums";

export const $resume: BehaviorSubject<any> = new BehaviorSubject<any>({});

export const updateResume = (data: any) => {
  $resume.next({ ...$resume.value, ...data });
};

export const $savingData: BehaviorSubject<any> = new BehaviorSubject<any>(
  false
);

export const savedResume = (data: any) => {
  $savingData.next(data);
};

export const $resumeStyle: BehaviorSubject<any> = new BehaviorSubject<any>({});

export const updateResumeStyle = (data: any) => {
  $resumeStyle.next(data);
};
export const $collapser: BehaviorSubject<string> = new BehaviorSubject<string>(
  "myProfile"
);

export const selectSection = (v: string) => {
  if (v === $collapser.value) $collapser.next("");
  else $collapser.next(v);
};
export const $saveStatus: BehaviorSubject<string> = new BehaviorSubject<string>(
  "saved"
);

export const savingData = (v: string) => {
  return $saveStatus.next(v);
};

export const $sectionList: Subject<any> = new Subject<any>();

export const $template: BehaviorSubject<string> = new BehaviorSubject<string>(
  "creative"
);

export const selectTemplate = (v: string) => {
  if (v === $collapser.value) $collapser.next("");
  else $collapser.next(v);
};

export const sectionListData = (data: any) => {
  $sectionList.next(data);
};

export const getDataFromLocalDB = () => {
  const data = localStorage.getItem(ELocalDB.LOCAL_DATA);
  if (data) {
    return JSON.parse(data);
  }
  return {};
};

export const storeInLocalDB = (data: { [key: string]: any }) => {
  localStorage.setItem(ELocalDB.LOCAL_DATA, JSON.stringify(data));
};

export const updateData = (data: { [key: string]: any }) => {
  const local = getDataFromLocalDB();

  const obj = {
    ...local,
    ...data,
  };

  storeInLocalDB(obj);
};

// cover letter

export const $coverLetterStyle: BehaviorSubject<any> = new BehaviorSubject<any>(
  {}
);

export const updateCoverLetterStyle = (data: any) => {
  $coverLetterStyle.next(data);
};

export const $coverLetter: BehaviorSubject<any> = new BehaviorSubject<any>({});

export const updateCover = (data: any) => {
  $coverLetter.next({ ...$coverLetter.value, ...data });
};

export const getDataFromLocalDBForCover = () => {
  const data = localStorage.getItem(ELocalDB.COVER_LETTER_DATA);
  if (data) {
    return JSON.parse(data);
  }
  return {};
};

export const storeCoverDataInLocalDB = (data: { [key: string]: any }) => {
  localStorage.setItem(ELocalDB.COVER_LETTER_DATA, JSON.stringify(data));
};

export const updateCoverLetter = (data: { [key: string]: any }) => {
  const local = getDataFromLocalDBForCover();

  const obj = {
    ...local,
    ...data,
  };

  storeCoverDataInLocalDB(obj);
};
