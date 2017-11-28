import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setToast } from '../store';

const Toast = (props) => (
  <div>
  {
    props.toast.errorType &&
    <div id="toast-container" onClick={props.hideToast} className={props.toast.color}>
      <h5>{props.toast.errorType}</h5>
      <h6>{props.toast.message}</h6>
    </div>
  }
  </div>
);

const mapStateToProps = (state, ownProps) => {
  return {
    toast: state.toast
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideToast: () => {
      dispatch(setToast({}));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Toast));
