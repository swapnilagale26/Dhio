import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import PopupMessage from '../../components/PopupMessage/PopupMessage';
import { DeleteIcon } from '../../icons';
import { postSurvey } from '../../redux/slices/surveySlice';

const TNAForm = () => {
  const [formData, setFormData] = useState({});
  const [message, showMessage] = useState(false);
  const [preview, showPreview] = useState(false);
  const [questionGroup, setQuestionGroup] = useState(null);
  const loadingRef = useRef(false);
  const [manualQuestions, setManualQuestions] = useState([{}]);

  const isError = useSelector(state => state.surveyReducer.isError);
  const isLoading = useSelector(state => state.surveyReducer.isLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    const formDataToUpdate = { ...formData };
    formDataToUpdate[event.target.name] = event.target.value;
    setFormData(formDataToUpdate);
  }

  const questionChangeHanlder = (event, index, optionIndex) => {
    const questions = [...manualQuestions];
    if(questions[index] && event.target.name !== 'option') {
      questions[index][event.target.name] = event.target.value;
    }
    if(event.target.name === 'type' && ['2', '3', '4'].includes(event.target?.value)) {
      questions[index].options = [];
    } else if(event.target.name === 'type' && !['2', '3', '4'].includes(event.target?.value)){
      delete questions[index].options;
    }

    if(event.target.name === 'option') {
      questions[index].options[optionIndex] = event.target.value
    }
    setManualQuestions(questions)
  }
  const onAddNewManualQuestion = () => {
    const questions = [...manualQuestions];
    questions.push({})
    setManualQuestions(questions)
  }

  const isFormValid = () => {
    if(!formData.title 
      || !formData.startDate
      || !formData.endDate
      || !questionGroup
      || !manualQuestions.length
      || manualQuestions.some(ques => !ques.text || !ques.type)
      || manualQuestions.some(ques => ques.options && ques.options.length < 2))
      return true;
    return false;
  }

  const onCancel = () => {
    if(preview) 
      showPreview(false);
    else 
      navigate('/survey');
  }

  const viewPreview = () => showPreview(true);

  const onQuestionRemove = (index) => {
    const questions = [...manualQuestions]
    questions.splice(index, 1);
    setManualQuestions(questions)
  }

  const saveTNA = (published) => {
    const payload = {...formData};
    payload.questions = [...manualQuestions];
    payload.published = published;
    payload.surveyType = 'TNA';
    loadingRef.current = true
    dispatch(postSurvey(payload));
  }

  useEffect(() => {
    if(!isLoading && loadingRef.current) {
      showMessage(true);
      loadingRef.current = false;
      if(!isError) {
        navigate('/survey');
      }
      setTimeout(() => {
        showMessage(false)
      }, 3000);
    }
  }, [isLoading, isError]);
  return (
    <div>
      {message && <PopupMessage isError={isError} />}
      {!preview ? (
      <>
        <div className='form-field'>
          <label>Title*</label>
          <input type='text' name='title' value={formData.title} onChange={onChangeHandler} />
          {/* <p className='error'>{error && error[0]?.name}</p> */}
        </div>
        <div className='form-fields-in-row'>
          <div className='form-field'>
            <label>Start Date*</label>
            <input type='date' name='startDate' value={formData.startDate} onChange={onChangeHandler}/>
          </div>
          <div className='form-field'>
            <label>End Date*</label>
            <input type='date' name='endDate' value={formData.endDate} onChange={onChangeHandler}/>
          </div>
        </div>
        <div className='form-field'>
          <label>TNA Objectives</label>
          <textarea type='text' className='objectives' name='objectives' value={formData.objective} onChange={onChangeHandler} />
        </div>
        <div className='question-bank-creator'>
          <h3>Select Question Type*</h3>
          {questionGroup === 2 && <Button variant='secondary' label="Add New" onClick={onAddNewManualQuestion}/>}
        </div>
        <div className='question-bank-section'>
          <div className='question-group'>
            <span className={questionGroup === 1 ? 'question-group-type selected': 'question-group-type'} onClick={() => setQuestionGroup(1)}>
              <input type='radio' name='questionGroup' id="tempates" checked={questionGroup === 1}/>
              <label for="tempates">Question Templates</label>
            </span>
            <span className={questionGroup === 2 ? 'question-group-type selected': 'question-group-type'} onClick={() => setQuestionGroup(2)}>
              <input type='radio' name='questionGroup' id="manual"  checked={questionGroup === 2}/>
              <label for="manual">Manual - Text Type</label>
            </span>
          </div>
          {questionGroup === 2 && (
            <div className='question-section'>
              {manualQuestions.map((question, index) => {
                return (
                  <React.Fragment key={index}>
                    <p className='question-counter'>Question {index+1}</p>
                    <div className='form-fields-in-row'>
                      <div className='form-field'>
                        <input type='text' name='text' value={question.text} onChange={(event) => questionChangeHanlder(event, index)}  placeholder='Write here'/>
                      </div>
                      <div className='form-field question-type'>
                        <select name='type' onChange={(event) => questionChangeHanlder(event, index)} value={question.type || ''}>
                          <option value='' disabled>Question Type</option>
                          <option value='1' selected={formData?.type === '1'}>Yes/No Question</option>
                          <option value='2' selected={formData?.type === '2'}>MCQ - 2 Options</option>
                          <option value='3' selected={formData?.type === '3'}>MCQ - 3 Options</option>
                          <option value='4' selected={formData?.type === '4'}>MCQ - 4 Options</option>
                          <option value='5' selected={formData?.type === '5'}>MRQ Question</option>
                        </select>
                      </div>
                      <DeleteIcon onClick={() => onQuestionRemove(index)}/>
                    </div>
                      {['2', '3'].includes(question.type) && (
                        <div className='form-fields-in-row'>
                          <div className='form-field'>
                            <input type='text' name='option' value={question.options[0] || ''} onChange={(event) => questionChangeHanlder(event, index, 0)} placeholder='Write here'/>
                          </div>
                          <div className='form-field'>
                            <input type='text' name='option' value={question.options[1] || ''} disabled={!question.options[0]} onChange={(event) => questionChangeHanlder(event, index, 1)}  placeholder='Write here' />
                          </div>
                          {question.type === '3' && (
                            <div className='form-field'>
                              <input type='text' name='option' value={question.options[2] || ''} disabled={!question.options[1]}  onChange={(event) => questionChangeHanlder(event, index, 2)}  placeholder='Write here' />
                            </div>
                          )}
                        </div>
                      )}
                      {question.type === '4' && (
                        <React.Fragment>
                          <div className='form-fields-in-row'>
                            <div className='form-field'>
                              <input type='text' name='option' value={question.options[0] || ''}  onChange={(event) => questionChangeHanlder(event, index, 0)}  placeholder='Write here' />
                            </div>
                            <div className='form-field'>
                              <input type='text' name='option' value={question.options[1] || ''} disabled={!question.options[0]} onChange={(event) => questionChangeHanlder(event, index, 1)}  placeholder='Write here' />
                            </div>
                          </div>
                          <div className='form-fields-in-row'>
                            <div className='form-field'>
                              <input type='text' name='option' value={question.options[2] || ''} disabled={!question.options[1]} onChange={(event) => questionChangeHanlder(event, index, 2)}  placeholder='Write here' />
                            </div>
                            <div className='form-field'>
                              <input type='text' name='option' value={question.options[3] || ''} disabled={!question.options[2]}  onChange={(event) => questionChangeHanlder(event, index, 3)}  placeholder='Write here' />
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                  </React.Fragment>
                )
              })
            }
          </div>
          )}
          </div>
        </>) : (
        <>
          <h3>Preview</h3>
          <div className='question-bank-section preview'>
            <p className='title'>{formData.title}</p>
            <p>{formData.startDate} - {formData.endDate}</p>
            <p>{formData.objectives}</p>
          </div>
          <h3>Questions</h3>
          {manualQuestions.map((question, index) => (
            <div className='question-bank-section preview' key={index}>
              <p className='question-counter'>Question {index+1}</p>
              <p className='title'>{question.text}</p>
              <div className='options'>{question.options?.map((option, optionIndex) => <span key={optionIndex}>{option}</span>)}</div>
            </div>
          ))}
        </>)
      }
      <div className='action-bar'>
        <input className='secondary-button' type='button' value='Cancel' onClick={onCancel}/>
        {preview && <input className='secondary-button' type='button' value='Save as Draft' onClick={() => saveTNA(false)} disabled={isFormValid()}/>}
        <input className='primary-button' type='button' value={!preview ? 'Preview' : 'Save & Publish'} onClick={() => !preview ? viewPreview() : saveTNA(true)} disabled={isFormValid()}/>
      </div>
    </div>
  )
}

export default TNAForm