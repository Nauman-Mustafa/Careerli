import React, { Component } from "react";
import Header from "../../components/Header/Header";
import ResumeTemplate from "../../components/ResumeTemplate/ResumeTemplate";
import TopContent from "../../components/TopContent/TopContent";

export class CreateResume extends Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <TopContent typeTemplate="resume" />
          <ResumeTemplate />
        </main>
      </>
    );
  }
}
