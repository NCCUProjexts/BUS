import ajax from "../../api"

const set_course_result = (result) => {
  return {
    type: "course.result.set",
    result: result
  }
}

const clear_course_result = () => {
  return {
    type: "course.result.clear"
  }
}

export const getCourse = (searchParam) => {
  return function (dispatch) {
    dispatch(clear_course_result())
    dispatch({ type: "course.loading" })
    return ajax("/api/v2/courserate/search", "get", { params: { search_string: searchParam } }).then(res => {
      dispatch({ type: "course.done" });
      dispatch(set_course_result(res.data.data));

      return res.data;
    })
  }
}

export const getCourseDetail = () => { }