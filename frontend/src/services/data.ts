// @ts-nocheck
import { v4 } from "uuid";
export const newResume = {
  resumeTitle: "My Resume",

  profile: {
    id: v4(),
    title: "Profile",
    cat: "profile",
    to: "myProfile",
    order: 1,
    icon: "ph:user-circle",
    showComp: true,

    firstName: "",
    lastName: "",
    city: "",
    email: "",
    phone: "",
    postalCode: "",
    websiteLink: "",
    linkedin: "",
  },
  workHistory: {
    id: v4(),
    title: "Work",
    to: "workHistory",
    cat: "workHistory",
    order: 2,
    showComp: true,

    icon: "ph:briefcase",
    history: [
      {
        jobTitle: "",
        employer: "",
        email: "",
        startMonth: "",
        stillWork: false,
        endMonth: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ],
  },
  education: {
    id: v4(),
    title: "Education",
    cat: "education",
    to: "education",
    order: 3,
    showComp: true,
    icon: "ph:graduation-cap-bold",
    educationHistory: [
      {
        school: "",
        location: "",

        fieldOfStudy: "",
        degree: "",
        startMonth: "",
        endMonth: "",
        startYear: "",
        stillWork: false,
        endYear: "",
        description: "",
      },
    ],
  },
  skills: {
    id: v4(),
    title: "Skills",
    cat: "skills",
    to: "skills",
    order: 4,
    showComp: true,
    icon: "ph:sparkle",
    list: [],
  },
  hobbies: {
    id: v4(),
    title: "Hobbies",
    cat: "hobbies",
    to: "hobbies",
    order: 6,
    showComp: false,
    icon: "ph:balloon",
    list: [],
  },
  certification: {
    id: v4(),
    title: "Certification",
    cat: "certification",
    to: "certificates",
    order: 7,
    showComp: false,
    icon: "ph:bookmark",
    certificate: [
      {
        certificateName: "",
        authority: "",
        certificationLink: "",
        dateReceMonth: "",
        dateReceYear: "",
        description: "",
      },
    ],
  },
  languages: {
    id: v4(),
    title: "Languages",
    cat: "languages",
    to: "languages",
    icon: "ph:translate-fill",
    order: 8,
    showComp: false,
    list: [],
  },
  references: {
    id: v4(),
    title: "References",
    cat: "references",
    to: "references",
    icon: "ph:users-four",
    order: 9,
    showComp: false,
    personOne: "",
    personeOneContact: "",
    personTwo: "",
    personTwoContact: "",
  },
  publications: {
    id: v4(),
    title: "Publications",
    cat: "publications",
    to: "publications",
    icon: "ph:books",
    order: 10,
    showComp: false,
    publicationList: [
      {
        title: "",
        publisher: "",
        isbn: "",
        dateReceMonth: "",
        dateReceYear: "",
        description: "",
      },
    ],
  },
  summary: {
    id: v4(),
    title: "Summary",
    cat: "summary",
    to: "summary",
    icon: "ph:notepad",
    order: 5,
    showComp: true,
    description: "",
  },
  achievements: {
    id: v4(),
    title: "Achievements",
    cat: "achievements",
    to: "achievements",
    order: 11,
    showComp: false,
    icon: "ph:trophy-light",
    description: "",
  },
  customSection: [],
};
