import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { fetchSurvey } from '../../redux/slices/surveySlice';

import PopupMessage from '../../components/PopupMessage/PopupMessage';
import { postSurveyReport } from '../../redux/slices/surveyReportsSlice';
import './survey-submission.css';

const SurveySubmissionForm = () => {
  const [message, showMessage] = useState(false);
  const [questionFeedback, setQuestionFeedback] = useState([]);
  const loadingRef = useRef(false);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isError = useSelector(state => state.surveyReducer.isError);
  const isLoading = useSelector(state => state.surveyReducer.isLoading);
  const selectedSurvey = useSelector(state => state.surveyReducer.selectedSurvey);

  useEffect(() => {
    if(params?.id) {
      dispatch(fetchSurvey(params.id));
    }
  }, [params]);

  useEffect(() => {
    if(selectedSurvey?._id) {
      setQuestionFeedback(selectedSurvey.questions.map(question => ({ qId: question._id })));
    }
  }, [selectedSurvey]);

  useEffect(() => {
    if(!isLoading && loadingRef.current) {
      showMessage(true);
      loadingRef.current = false;
      if(!isError) {
        setTimeout(() => navigate('/dashboard'), 1000);
      }
      setTimeout(() => {
        showMessage(false)
      }, 3000);
    }
  }, [isLoading, isError]);

  const setQuesitonAnswer = (qId, response) => {
    setQuestionFeedback([...questionFeedback.map(que => que.qId === qId ? ({...que, response: response}) : que)]);
  }
  const onCancel = () => {
    navigate('/dashboard');
  }

  const isFormValid = () => questionFeedback.some(que => !que.response);
  const submitSurvey = () => {
    dispatch(postSurveyReport({id: selectedSurvey._id, questionFeedback}));
  }

  const breadcrumbs = [
    {
      menu: 'Survey Management',
      link: '/survey',
    },
    {
      menu: 'Submit Survey',
      link: '/survey',
    }
  ];

  return (
    <div className="container">
      <h2>Survey Management</h2>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      {message && <PopupMessage isError={isError} />}
      {selectedSurvey && (
        <div className='survey-form'>
          <h3>{selectedSurvey.title}</h3>
          <h5>{selectedSurvey.startDate} - {selectedSurvey.endDate}</h5>
          <h5>{selectedSurvey.objective}</h5>
          <div className='question-section'>
            {selectedSurvey.questions.map(question => (
              <div className='question-block' key={question._id}>
                <div className='question'>
                  {question.text}
                </div>
                {question.type === '1' && (
                  <div className='question-group'>
                    <span className={questionFeedback.some(que => que.qId === question._id && que.response === 'YES') ? 'question-group-type selected': 'question-group-type'} onClick={() => setQuesitonAnswer(question._id, 'YES')}>
                      <input type='radio' checked={questionFeedback.some(que => que.qId === question._id && que.response === 'YES')}/>
                      <label>YES</label>
                    </span>
                    <span className={questionFeedback.some(que => que.qId === question._id && que.response === 'NO') ? 'question-group-type selected': 'question-group-type'} onClick={() => setQuesitonAnswer(question._id, 'NO')}>
                      <input type='radio' id="manual" checked={questionFeedback.some(que => que.qId === question._id && que.response === 'NO')}/>
                      <label for="manual">NO</label>
                    </span>
                  </div>
                )}
                {['2','3','4'].includes(question.type) && (
                  <div className={question.type === '4' ? 'question-group columns-2': 'question-group'}>
                    {question.options.map((option) => {
                      const selected = questionFeedback.find(que => que.qId === question._id);
                      console.log(selected, selected?.response === option);
                      return (
                        <span className={selected?.response === option ? 'question-group-type selected': 'question-group-type'} onClick={() => setQuesitonAnswer(question._id, option)} key={question._id + option}>
                          <input type='radio' checked={selected?.response === option+''}/>
                          <label >{option}</label>
                        </span>
                    )})}
                  </div>
                )}
                {question.type === '5' && (
                  <textarea type='text' className='objectives' name='objectives' value={questionFeedback?.find(que => que.qId === question._id)?.response ||''} onChange={(event) => setQuesitonAnswer(question._id, event.target.value)} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='action-bar'>
          <input className='secondary-button' type='button' value='Cancel' onClick={onCancel}/>
          <input className='primary-button' type='button' value='Submit Survey' onClick={submitSurvey} disabled={isFormValid()}/>
        </div>
    </div>
  )
}

export default SurveySubmissionForm