import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const containerInline = {
  alignItems: "flex-start",
  maxWidth: "650px",
  padding: "1rem",
  lineHeight: "1.3",
  textAlign: "justify"
};

const header = {
  display: "flex",
  alignItems: "center",
  width: "100%"
}

const paragraph = {
  padding: "0.5rem"
};

const colouredText = {
  // color: "orange",
  // backgroundColor: "black",
  // padding: "0.5rem"
};

const highlightedText = {
  textDecoration: "underline"
};

const PrivacyPolicy = props => {
  return (
    <div className="container" style={containerInline}>
      <div style={header}>
        <h1>Privacy Policy</h1>
        <Button style={{marginLeft: "auto"}} id="submit1" color="info" onClick={props.history.goBack}>
          Go back
        </Button>
      </div>
      <h5>Privacy Policy of HOMAR webapp</h5>
      <h5>Personal Data</h5>
      <div style={paragraph}>
        <p style={colouredText}>
          While using our webapp, we may ask you to provide us with some
          personally identifiable information that can be used to contact or
          identify you. This may include: <br /> <br />
        </p>
        <ul>
          <li>
            <span>Email address</span>
          </li>
          <li>
            <span>
              Cookies (
              <a href="https://docs.google.com/document/d/1AUneTvcmrVqv3mFEeHRylM70kuecjLg4xMYyToT5P2s/edit?usp=sharing">
                <span>read more about them</span>
              </a>
              )
            </span>
          </li>
          <li>
            <span>
              <i>Usage Data</i>
            </span>
          </li>
          <li>
            <span>
              <i>Activity Data</i>
            </span>
          </li>
        </ul>
        <p style={colouredText}>
          Apart from those information we will never request other personal data
          (like your name, adress, age, gender or a phone number). We want you
          fully virtual here 🔮😎
        </p>
      </div>
      <h6>Usage Data</h6>
      <div style={paragraph}>
        <p style={colouredText}>
          We may also collect information how our webapp is accessed and used
          ("Usage Data"). This Usage Data may include information such as your
          computer's
          <span style={highlightedText}>
            Internet Protocol ("IP") address, browser type, browser version, the
            pages of our webapp that you visit, the time and date of your visit
            and other diagnostic data.
          </span>
        </p>
      </div>
      <h6>Activity Data</h6>
      <div style={paragraph}>
        <p style={colouredText}>
          <span>
            We may also collect collect data about your actions inside the
            Entity (<Link to="/entity">die Entitat subpage</Link>), eg. results
            of your
          </span>
          <a href="https://docs.google.com/document/d/1AUneTvcmrVqv3mFEeHRylM70kuecjLg4xMYyToT5P2s/edit?usp=sharing">
            <span> Subdecadence </span>
          </a>
          <span>
            spreads or the messages you leave for other users (currently only as
            planned features).
          </span>
        </p>
      </div>
      <h5>Use of Data</h5>
      <div style={paragraph}>
        <p style={colouredText}>
          <span>
            Upon registration all of the above data may be connected to your
            user profile in order to unlock features depending on that data
            (like user/"player" achievements).
          </span>
        </p>
        Other possible uses of thus collected data:
        <br />
        <ul>
          <li>
            <span>To provide and maintain the webapp</span>
          </li>
          <li>
            <span>To notify you about changes to the webapp</span>
          </li>
          <li>
            <span>
              To provide analysis or valuable information so that we can improve
              the webapp
            </span>
          </li>
          <li>
            <span>To monitor the usage of the webapp</span>
          </li>
          <li>
            <span>To detect, prevent and address technical issues</span>
          </li>
        </ul>
      </div>
      <h5>External Services</h5>
      <div style={paragraph}>
        <p>
          The app does use third party services that may collect information
          used to identify you.
        </p>
        <p>
          The app does use third party services that may collect information
          used to identify you. Link to privacy policy of third party service
          providers used by the app:
        </p>
        <ul>
          <li>
            <a href="https://firebase.google.com/support/privacy/">
              Firebase Realtime Database
            </a>
          </li>
          <li>
            <a href="https://firebase.google.com/policies/analytics/">
              Firebase Analytics
            </a>
          </li>
        </ul>
      </div>
      <h5>Security</h5>
      <div style={paragraph}>
        <p style={colouredText}>
          We value your trust in providing us your Personal Information, thus we
          are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and we
          cannot guarantee its absolute security.
        </p>
      </div>
      <h5>Links to Other Sites</h5>
      <div style={paragraph}>
        <p style={colouredText}>
          This webapp may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by me. Therefore, I strongly advise
          you to review the Privacy Policy of these websites. I have no control
          over and assume no responsibility for the content, privacy policies,
          or practices of any third-party sites or services.
        </p>
      </div>
      <h5>Children’s Privacy</h5>
      <div style={paragraph}>
        <p style={colouredText}>
          These Services do not address anyone under the age of 13. I do not
          knowingly collect personally identifiable information from children
          under 13. In the case I discover that a child under 13 has provided me
          with personal information, I immediately delete this from our servers.
          If you are a parent or guardian and you are aware that your child has
          provided us with personal information, please contact me so that I
          will be able to do necessary actions.
        </p>
      </div>
      <h5>Changes to This Privacy Policy</h5>
      <div style={paragraph}>
        <p style={colouredText}>
          I may update our Privacy Policy from time to time. Thus, you are
          advised to review this page periodically for any changes. I will
          notify you of any changes by posting the new Privacy Policy on this
          page. These changes are effective immediately after they are posted on
          this page.
        </p>
      </div>
      <h5>Contact Us</h5>
      <div style={paragraph}>
        <p style={colouredText}>
          If you have any questions or suggestions about my Privacy Policy, do
          not hesitate to contact us by email: inthenameoferis(at)gmail.com
        </p>
      </div>
      <div style={paragraph}>
        <p style={colouredText}>
          <span>This privacy policy page was created with help of </span>
          <a href="https://app-privacy-policy-generator.firebaseapp.com/#">
            <span>App Privacy Policy Generator</span>
          </a>
          <span> and </span>
          <a href="https://www.freeprivacypolicy.com/">
            <span>Free Privacy Policy Generator</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
