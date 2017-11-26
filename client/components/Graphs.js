import React, { Component } from 'react';
import { connect } from 'react-redux';
import makeHighchart from './Highcharts';




class Graphs extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    makeHighchart(this.props.emotions)
  }
  componentWillReceiveProps(nextEmotions) {
    makeHighchart(nextEmotions.emotions)
  }
  render() {
    const characteristics = ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise', 'createdAt'];
    return (
      <div>
        <div>
          <div id="container" style={{ width: '100%', height: '500px'}} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    emotions: ownProps.emotions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    normalizeData: (data, type) => {
      return data.map((inst) => {
        return inst[type]
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphs)