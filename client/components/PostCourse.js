import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postCourse } from '../store';


const PostCourse = (props) => {
  return (
    <form onSubmit={(event) => props.addCourse(event)}>
      <div>
        <label>
          Course Name:
        <input className="form-control" type="text" name="courseName" />
        </label>
      </div>
      <div>
        <label>
          Course ID:
          <input className="form-control" type="text" name="courseID" />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input className="form-control" type="textarea" name="courseDescription" />
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
    addCourse: (event) => {
      event.preventDefault()
      const courseName = event.target.courseName.value
      const courseID = event.target.courseID.value
      const courseDescription = event.target.courseDescription.value
      const courseInfo = {
        name: courseName,
        courseID,
        description: courseDescription
      }
      console.log('Posting Course Info =>', courseName, courseDescription, courseID)
      dispatch(postCourse(courseInfo))
      event.target.courseName.value = '';
      event.target.courseID.value = '';
      event.target.courseDescription.value = '';
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCourse))
