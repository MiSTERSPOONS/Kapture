import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const PostCourse = (props) => {
  return (
    <form onSubmit={(event) => props.postCourse(event)}>
      <div>
        <label>
          Course Description:
        <input className="form-control" type="text" name="courseName" />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input className="form-control" type="text" name="courseDescription" />
        </label>
      </div>
      <button className="btn btn-success">Create Course</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    postCourse: (event) => {
      event.preventDefault()
      const courseName = event.target.courseName.value
      const courseDescription = event.target.courseDescription.value
      console.log(courseName, courseDescription)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCourse))