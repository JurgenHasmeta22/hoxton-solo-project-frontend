import "./Contact.css";
import ContactContainer1 from "../../Components/Contact/ContactContainer1/ContactContainer1";
import ContactContainer2 from "../../Components/Contact/ContactContainer2/ContactContainer2";
import ContactContainer3 from "../../Components/Contact/ContactContainer3/ContactContainer3";
import HeaderCommon from "../../Components/Common/HeaderCommon/HeaderCommon";
import FooterCommon from "../../Components/Common/FooterCommon/FooterCommon";
import { useEffect } from "react";

function ContactPage({ validateUser }: any) {
  useEffect(() => {
    validateUser();
  }, []);

  return (
    <>
      <HeaderCommon />
      <ContactContainer1 />
      <ContactContainer2 />
      <ContactContainer3 />
      <FooterCommon />
    </>
  );
}

export default ContactPage;
