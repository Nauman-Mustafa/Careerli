import { useSelector } from "react-redux";
import CoverLetterTemplate from "../../components/CoverLetterTemplate/CoverLetterTemplate";
import Header from "../../components/Header/Header";
import MyCoverLetter from "../../components/MyCoverLetter";

const CoverLetter = () => {
  const auth: any = useSelector((store: any) => store.auth);
  return (
    <>
      <Header />
      <main>
        {auth.isLoggedIn ? <MyCoverLetter /> : <CoverLetterTemplate />}
      </main>
    </>
  );
};

export default CoverLetter;
