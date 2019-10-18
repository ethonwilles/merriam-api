import React from "react";
import axios from "axios";
import API_KEY from "./keys";

import "./styles/main.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "asdfadfafd",
      definitions: ["Enter a Word to get a Definition!"]
    };
  }

  handleGetData = () => {
    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${this.state.word}?key=${API_KEY}`
      )
      .then(res => res)
      .then(data => {
        if (data.data.length === 0) {
          this.setState({ definitions: ["not a valid word"] });
        } else {
          this.setState({
            definitions: [
              data.data[0].shortdef !== undefined
                ? data.data[0].shortdef
                : ["Not a Valid Word"]
            ]
          });
        }
      });
  };

  handleMap = () => {
    return this.state.definitions.map(item => {
      return <p>{item}</p>;
    });
  };

  handleOnSubmit = e => {
    this.setState({ definitions: ["Getting definitions..."] });
    e.preventDefault();
    this.handleGetData();
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            placeholder="Enter Word to be defined here"
            onChange={e => {
              this.setState({ word: e.target.value });
            }}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="definitions">
          <h3>definitions</h3> <br />{" "}
          <div className="actual_defs">{this.handleMap()}</div>
        </div>
      </div>
    );
  }
}

export default App;
