import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { updateCourse } from '../../../redux/slices/courseSlice';
import { postCourse } from '../../../redux/slices/courseSlice';
import { CourseTypeIcon, CourseCategoryIcon,CourseDurationIcon} from '../../../icons';
import { Rating } from "react-simple-star-rating";

const StepFour = () => {
  const selectedCourse = useSelector(state => state.courseReducer.selectedCourse);
  const postCourseResponse = useSelector(state => state.courseReducer.postCourseResponse);
  
  const navigate = useNavigate();
  const params = useParams();
  // const [orgTypeId, set_orgTypeId] = useState(params.id);
  const dispatch = useDispatch();
  

  const publishCourse =() => {
    if(params.id){
    dispatch(updateCourse({...selectedCourse, published: true}));
    goToDashboard();
  }else{
    console.log("goback");
    goToDashboard();
  }
}

  const goToDashboard = () => navigate('/course');

  return (
    <div>
      <div className='review-step'>
        <img src={params.id ? selectedCourse?.poster : postCourseResponse?.course?.poster} />
        <div className='data-container'>
          <div className='course-header'>
            <h3>{params.id ? selectedCourse?.name : postCourseResponse?.course?.name}</h3>
            {/* <p>{params.id ? selectedCourse?.ratings : postCourseResponse?.course?.ratings}</p> */}
            <div className="disabled-rating">
            <Rating initialValue={params.id ? selectedCourse?.ratings : postCourseResponse?.course?.ratings} size={25} fillColor="var(--complete-step-color)" />
          </div>
          </div>
          <div className='course-short-info'>
         <p>  <CourseTypeIcon className="icon"/>{params.id ? selectedCourse?.type : postCourseResponse?.course?.type}</p>
           <p>  <CourseCategoryIcon className="icon"/>{params.id ? selectedCourse?.category : postCourseResponse?.course?.category}</p>
            <p><CourseDurationIcon className="icon"/> {params.id ? selectedCourse?.duration : postCourseResponse?.course?.duration}</p>
          </div>
          <div>
            {params.id ? 'Lorem ipsum dolor sit amet consectetur. Ultricies in in in vitae pellentesque. Eget urna vestibulum a ut in. At elementum dignissim non eros magna augue ligula. Non eu faucibus enim id at nisl pharetra nam tellus. Id eget ornare tempus id.' : 'Lorem ipsum dolor sit amet consectetur. Ultricies in in in vitae pellentesque. Eget urna vestibulum a ut in. At elementum dignissim non eros magna augue ligula. Non eu faucibus enim id at nisl pharetra nam tellus. Id eget ornare tempus id.'}
          </div>
          <div className='skills'>
            {(params.id ? selectedCourse?.skills : postCourseResponse?.course?.skills)?.map(skill => <div className='skill'>{skill}</div>)}
          </div>
        </div>
      </div>
      <div className='actions'>
        <div className='action-bar module-uploader'>
          <input className='primary-button' type='button' value='Save as Draft' onClick={goToDashboard} />
        </div>
        <div className='action-bar'>
          <input className='secondary-button' type='button' value='Cancel' onClick={goToDashboard} />
          <input className='primary-button' type='button' value='Save & Publish' onClick={publishCourse} />
        </div>
      </div>
    </div>
  )
  
}

export default StepFour