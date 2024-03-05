import React, { Component } from "react";
import Header from "../../components/Header/Header";
import ResumeTemplate from "../../components/ResumeTemplate/ResumeTemplate";
import TopContent from "../../components/TopContent/TopContent";

export class MyCoverLetter extends Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <TopContent />
          <ResumeTemplate />
        </main>
      </>
    );
  }
}
