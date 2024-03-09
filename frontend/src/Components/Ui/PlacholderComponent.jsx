import React from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const PlacholderComponent = ({ type, myWidth, mySize,myAnimation,mybg }) => {
  return (
    <>
      {type === "p" ? (
        <Placeholder
          as="p"
          animation={myAnimation?myAnimation:"wave"}
          style={{ width: myWidth ? myWidth : "25%" }}
          bg={mybg}
        >
          <Placeholder xs={12} size={mySize} />
        </Placeholder>
      ) : (
        <Card style={{ width: myWidth ? myWidth : "18rem" }}>
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={8} />
            </Placeholder>
            <div className="text-end">
              <Placeholder.Button variant="primary" xs={6} />
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default PlacholderComponent;
