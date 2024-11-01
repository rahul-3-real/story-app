import { useSelector } from "react-redux";

import ProfileDetailUpdate from "./ProfileDetailUpdate";
import ProfileEmailUpdate from "./ProfileEmailUpdate";
import {
  Accordion,
  AccordionItem,
  AccordionTitle,
  AccordionContent,
} from "../../Accordion";

const ProfileEdit = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <h4 className="heading">Edit Profile</h4>
      <hr className="heading-divider" />

      <Accordion>
        <AccordionItem index={0}>
          <AccordionTitle>Update Email</AccordionTitle>
          <AccordionContent>
            <ProfileEmailUpdate user={user} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem index={1}>
          <AccordionTitle>Personal Information</AccordionTitle>
          <AccordionContent>
            <ProfileDetailUpdate user={user} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ProfileEdit;
