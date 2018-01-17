import React from "react";
import { Row, Col } from "reactstrap";
import DonorFeedContainer from "./DonorFeedContainer";
import CharityFeedContainer from "./CharityFeedContainer";
import RightSidebarContainer from "./RightSidebarContainer";
import SearchContainer from "./SearchContainer";
import CharityFull from "../components/CharityFull";

class DonorViewContainer extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col />

          <Col sm="6">
            <SearchContainer />
          </Col>

          <Col />
        </Row>

        <Row>
          <Col>
            <DonorFeedContainer />
          </Col>

          <Col sm="6">
            <CharityFeedContainer />
          </Col>

          <Col>
            <RightSidebarContainer />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DonorViewContainer;
