import ajax from "../../api"

const set_course_detail = (detail) => {
  return {
    type: "courseDetail.detail.set",
    detail: detail
  }
}

const clear_course_detail = () => {
  return {
    type: "courseDetail.detail.clear"
  }
}

const set_loading = () => {
  return {
    type: "courseDetail.loading"
  }
}

const set_done = () => {
  return {
    type: "courseDetail.done"
  }
}

export const getDetail = (id) => {
  return function (dispatch) {
    dispatch(clear_course_detail());
    dispatch(set_loading());
    return ajax("/api/v2/courserate/detail", "get", { params: { course_id: id } }).then(res => {
      dispatch(set_course_detail(res.data.data.default_course));
      dispatch(set_done());
      return res.data;
    })
  }
}