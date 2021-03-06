import React from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Button,
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../actions";

class Donation extends React.Component {
  state = {
    pledge: 0
  };

  handleChange = event => {
    this.setState({
      pledge: event.target.value
    });
  };

  handleClick = event => {
    event.preventDefault();
    if (this.state.pledge <= 0) {
      this.props.handleError("Donation must be greater than zero.");
    } else {
      this.props.changePledge(
        this.props.supportId,
        parseInt(this.state.pledge, 10),
        this.props.charity,
        this.props.userId
      );
      this.props.handleError(null);
    }
  };

  render() {
    return (
      <Card style={{ margin: "5px" }}>
        <CardBody>
          <CardTitle>
            <img
              className="donationCardImage"
              src={this.props.icon}
              alt={this.props.name}
            />
            {this.props.name}
          </CardTitle>
          <CardSubtitle>Goal: {this.props.tagline}</CardSubtitle>
          <br />

          <Form onSubmit={this.handleClick}>
            <Label for="donation">Donation Amount</Label>

            <InputGroup>
              <InputGroupAddon>$&nbsp; </InputGroupAddon>
              <Input
                onChange={this.handleChange}
                type="number"
                name="donation"
                id="donationAmount"
                value={this.state.pledge}
              />
              <Button
                style={{
                  borderColor: "RGB(130,100,200)",
                  color: "RGB(130,100,200)",
                  backgroundColor: "white",
                  marginLeft: "10px"
                }}
              >
                Confirm Change
              </Button>
            </InputGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
  componentDidMount() {
    this.setState({
      pledge: this.props.pledge
    });
  }
}

export default connect(null, actions)(Donation);
