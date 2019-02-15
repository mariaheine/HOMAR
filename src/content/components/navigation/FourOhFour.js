import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText
} from "reactstrap";

const imgURL =
  "https://firebasestorage.googleapis.com/v0/b/homar-webapp.appspot.com/o/media%2Fimages%2F404.jpg?alt=media&token=4c06156c-022d-4519-923a-32df428bb355";

const card = {
  animation: "infinite",
  animationName: "shadowDark",
  animationDuration: "5s"
};

const body = {
  padding: "1rem"
};

const header = {
  fontSize: "1.5rem",
  marginBottom: "0",
  display: "flex",
  alignItems: "baseline",
  lineHeight: "0.7"
};

const headerLeft = {
    
  fontSize: "1rem",
  marginLeft: "auto"
};

const image404 = {
  maxWidth: "420px",
  width: "100%",
  height: "auto"
};

const quoteText = {
  fontStyle: "italic"
};

const quoteAuthor = {
  width: "100%",
  textAlign: "right",
  position: "relative",
  top: "-1rem"
};

const FourOhFour = props => {
  return (
    <div className="container">
      <Card style={card}>
        <CardBody style={body}>
          <CardTitle style={header}>
            <span>Four Oh Four</span>
            <span style={headerLeft}>2🐟1🍄</span>
          </CardTitle>
        </CardBody>
        <CardImg style={image404} width="30%" src={imgURL} />
        <CardBody style={body}>
          <CardText />
          <CardText style={quoteText}>
            Not all those who wander are lost.
          </CardText>
          <CardText style={quoteAuthor}>- J. Peterson</CardText>
          <Button
            style={{ width: "100%" }}
            color="warning"
            onClick={props.history.goBack}
          >
            Go back
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default FourOhFour;
