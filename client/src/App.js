import React, { Component, Fragment } from "react";
import "./App.css";
import gif from "./random.gif";

class App extends Component {
  state = {
    response: [],
    post: "",
    responseToPost: "",
    maximum: "",
    minimum: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res =>
        this.setState({
          response: res.data,
          maximum: `0${Math.max(...res.data)}`,
          minimum: `0${Math.min(...res.data)}`
        })
      )
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/number");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/number", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.post })
    });
    this.callApi()
      .then(res =>
        this.setState({
          response: res.data,
          post: ""
        })
      )
      .catch(err => console.log(err));
  };

  ascending = () => {
    const { response } = this.state;
    const sorted = response.sort();
    this.setState({ response: sorted });
  };

  descending = () => {
    const { response } = this.state;
    const sorted = response.sort().reverse();
    this.setState({ response: sorted });
  };

  render() {
    return (
      <Fragment>
        <div className="App">
          <h3 className="text-title text-blue text-center mt-4 mb-4">
            the random number generator app
          </h3>
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <img src={gif} alt="random number" />
              </div>
              <div className="col-md-6">
                <div className="text-center text-capitalize">
                  total numbers generated : {this.state.response.length}
                </div>
                <div className="card mb-4">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Numbers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.response.map((item, index) => (
                        <tr key={index}>
                          <td>{item}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-md-6">
                <div>
                  <form
                    onSubmit={this.handleSubmit}
                    className="col-10 col-md-3 mx-auto mb-3"
                  >
                    <div>
                      <input
                        type="text"
                        className="form-control input-fld"
                        placeholder="Enter value"
                        value={this.state.post}
                        onChange={e => this.setState({ post: e.target.value })}
                      />
                      <br />
                      <div className="col-10 col-md-4">
                        <button className="btn btn-success" type="submit">
                          Generate
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="row mb-3">
                  <div className="col-10 col-md-6 mx-auto">
                    <div className="row">
                      <div className="col-10 col-md-4">
                        <button
                          onClick={this.ascending}
                          className="btn btn-primary"
                        >
                          <i class="fas fa-arrow-up" />&nbsp; Sort Ascending
                        </button>
                      </div>
                      <div className="col-10 col-md-4">
                        <button
                          onClick={this.descending}
                          className="btn btn-info"
                        >
                          <i class="fas fa-arrow-down" />&nbsp; Sort Descending
                        </button>
                      </div>
                    </div>
                  </div>

                  <div align="centre">
                    <br />
                    <div className="text-capitalize fancy-border">
                      <p>max number generated: {this.state.maximum}</p>
                    </div>
                    <br />
                    <div className="text-capitalize fancy-border">
                      <p>min number generated: {this.state.minimum}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
