import { Component, Fragment } from "react";
import { Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";

class MobxContainer extends Component {
  render() {
    return (
      <Provider stores={window.mobx_app.mobx_stores}>
        <Fragment>
          {this.props.children}
          {window.mobx_app.devTools && <DevTools />}
        </Fragment>
      </Provider>
    );
  }
}

export default MobxContainer;
