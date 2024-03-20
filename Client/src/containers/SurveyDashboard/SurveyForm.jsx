import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Button from "../../components/Button/Button";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import { DeleteIcon, TickIcon } from "../../icons";
import { fetchSurvey, postSurvey, updateSurvey } from "../../redux/slices/surveySlice";
// import Modal from 'react-modal';
import Modal from "../../components/Modal/Modal";
import QuestionModal from "./SurveyQuestionModal";
import SurveyPreview from "./SurveyPreview";

const SurveyForm = () => {
  const params = useParams();
  const [formData, setFormData] = useState({});
  const [message, showMessage] = useState(false);
  const [preview, showPreview] = useState(false);
  const [questionGroup, setQuestionGroup] = useState(null);
  const loadingRef = useRef(false);
  const [manualQuestions, setManualQuestions] = useState([{}]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateQuestions, settemplateQuestions] = useState([{}]);
  const [selectedTemplateQuestions, setSelectedTemplateQuestions] = useState([]);
  const [templateSaved, setTemplateSaved] = useState(false);
  const [templateStates, setTemplateStates] = useState({});

  const isError = useSelector((state) => state.surveyReducer.isError);
  const isLoading = useSelector((state) => state.surveyReducer.isLoading);
  const selectedSurvey = useSelector((state) => state.surveyReducer.selectedSurvey);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [defaultTemplates, setDefaultTemplates] = useState([
    {
      type: "MRQ",
      text: "Think of your favorite animal, place, and color. Now, say one of them!",
    },
    {
      type: "yes/no",
      text: "Think of your favorite animal, place, and color. Now, say one of them!",
    },
    {
      type: "MCQ",
      text: "Think of your favorite animal, place, and color. Now, say one of them!",
      options: [],
    },
    {
      type: "Descriptive",
      text: "Think of your favorite animal, place, and color. Now, say one of them!",
    },
    // {
    //   type: "Rating",
    //   text: "Think of your favorite animal, place, and color. Now, say one of them!"
    // }
  ]);

  useEffect(() => {
    if (templateQuestions) {
      const { type, text, options } = templateQuestions;

      const updatedDefaultTemplates = defaultTemplates.map((defaultTemplate) => {
        if (defaultTemplate.type === type) {
          return {
            ...defaultTemplate,
            text: text,
            options: options || [],
          };
        }
        return defaultTemplate;
      });

      setDefaultTemplates(updatedDefaultTemplates);
    }
  }, [templateQuestions]);

  const onChangeHandler = (event) => {
    const formDataToUpdate = { ...formData };
    formDataToUpdate[event.target.name] = event.target.value;
    setFormData(formDataToUpdate);
  };

  const questionChangeHanlder = (event, index, optionIndex) => {
    const questions = [...manualQuestions];
    let question = { ...questions[index] };
    if (question && event.target.name !== "option") {
      question = {
        ...question,
        [event.target.name]: event.target.value,
      };
    }
    if (event.target.name === "type" && ["2", "3", "4"].includes(event.target?.value)) {
      question = {
        ...question,
        options: [],
      };
    } else if (event.target.name === "type" && !["2", "3", "4"].includes(event.target?.value)) {
      delete question.options;
    }

    if (event.target.name === "option") {
      let options = [...question.options];
      options[optionIndex] = event.target.value;
      question = {
        ...question,
        options,
      };
    }
    questions[index] = question;
    setManualQuestions(questions);
  };
  const onAddNewManualQuestion = () => {
    const questions = [...manualQuestions];
    questions.push({});
    setManualQuestions(questions);
  };
  const onTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedTemplate(null);
  };

  const handleSaveQuestion = (questionData) => {
    // Find the index of the question data with the same template as selectedTemplate
    const existingIndex = selectedTemplateQuestions.findIndex((q) => q.type === selectedTemplate);

    // If a question with the same template exists, update its data
    if (existingIndex !== -1) {
      const updatedQuestions = [...selectedTemplateQuestions];
      updatedQuestions[existingIndex] = questionData;
      setSelectedTemplateQuestions(updatedQuestions);
    } else {
      // If no question with the same template exists, add the new question data
      setSelectedTemplateQuestions([...selectedTemplateQuestions, questionData]);
      //setTemplateSaved(templateSaved);
    }
    settemplateQuestions(questionData);
    setTemplateSaved(true);
    setSelectedTemplate(questionData.type);
    setTemplateStates({
      ...templateStates,
      [selectedTemplate]: true,
    });
  };

  const isFormValid = () => {
    if (
      !formData.title ||
      !formData.startDate ||
      !formData.endDate ||
      !manualQuestions.length ||
      manualQuestions.some((ques) => !ques.text || !ques.type) ||
      manualQuestions.some((ques) => ["2", "3", "4"].includes(ques.type) && ques.options && ques.options.length < 2) ||
      !selectedTemplate
    )
      return true;
    return false;
  };

  const onCancel = () => {
    if (preview) showPreview(false);
    else navigate("/survey");
  };

  const viewPreview = () => showPreview(true);

  const onQuestionRemove = (index) => {
    const questions = [...manualQuestions];
    questions.splice(index, 1);
    setManualQuestions(questions);
  };

  // const saveTNA = (published) => {
  //   const payload = { ...formData };
  //   payload.questions = [...manualQuestions];
  //   payload.published = published;
  //   payload.surveyType = params.type.toUpperCase();
  //   loadingRef.current = true;
  //   if (!selectedSurvey?._id) {
  //     dispatch(postSurvey(payload));
  //   } else {
  //     payload._id = selectedSurvey?._id;
  //     dispatch(updateSurvey(payload));
  //   }
  // };
  const saveTNA = (published) => {
    const payload = { ...formData };
    payload.published = published;
    payload.surveyType = params.type.toUpperCase();
    loadingRef.current = true;

    const group = questionGroup || 2;

    const questionsArray = group === 2 && manualQuestions.length > 0 ? manualQuestions : selectedTemplateQuestions;

    payload.questions = [...questionsArray];

    if (!selectedSurvey?._id) {
      dispatch(postSurvey(payload));
    } else {
      payload._id = selectedSurvey?._id;
      dispatch(updateSurvey(payload));
    }
  };

  useEffect(() => {
    if (!isLoading && loadingRef.current) {
      showMessage(true);
      loadingRef.current = false;
      if (!isError) {
        setTimeout(() => navigate("/survey"), 1000);
      }
      setTimeout(() => {
        showMessage(false);
      }, 3000);
    }
  }, [isLoading, isError]);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchSurvey(params.id));
    }
  }, [params]);

  useEffect(() => {
    if (selectedSurvey?._id) {
      const { title, startDate, endDate, surveyType, questions, objective } = selectedSurvey;
      const form = { title, startDate, endDate, surveyType, objective };
      setFormData(form);
      setManualQuestions(questions);
      setSelectedTemplateQuestions(questions);
    }
  }, [selectedSurvey]);

  console.log("sddd", selectedTemplateQuestions);
  console.log("dfdfdf", manualQuestions);

  const breadcrumbs = [
    {
      menu: "Survey Management",
      link: "/survey",
    },
    {
      menu: params.type === "TNA" ? "Add New TNA" : "Add New Feedback",
      link: "/survey",
    },
  ];
  return (
    <div className="survey-container">
      <h2>Survey Management</h2>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div>
        {message && <PopupMessage isError={isError} />}

        {!preview ? (
          <>
            <div className="form-field">
              <label>Title*</label>
              <input type="text" name="title" value={formData.title} onChange={onChangeHandler} />
              {/* <p className='error'>{error && error[0]?.name}</p> */}
            </div>
            <div className="form-fields-in-row">
              <div className="form-field">
                <label>Start Date*</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={onChangeHandler} />
              </div>
              <div className="form-field">
                <label>End Date*</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={onChangeHandler} />
              </div>
            </div>
            <div className="form-field">
              <label>TNA Objectives</label>
              <textarea
                type="text"
                className="objective"
                name="objective"
                value={formData.objective}
                onChange={onChangeHandler}
              />
            </div>
            <div className="question-bank-creator">
              <h3>Select Question Type*</h3>
              {(questionGroup === 2 || selectedSurvey) && (
                <Button variant="secondary" label="Add New" onClick={onAddNewManualQuestion} />
              )}
            </div>
            <div className="question-bank-section">
              {!selectedSurvey && (
                <div className="question-group">
                  <span
                    className={questionGroup === 1 ? "question-group-type selected" : "question-group-type"}
                    onClick={() => {
                      setQuestionGroup(1);
                    }}
                  >
                    <input type="radio" name="questionGroup" id="tempates" defaultChecked={questionGroup === 1} />
                    <label for="tempates">Question Templates</label>
                  </span>
                  <span
                    className={questionGroup === 2 ? "question-group-type selected" : "question-group-type"}
                    onClick={() => setQuestionGroup(2)}
                  >
                    <input type="radio" name="questionGroup" id="manual" defaultChecked={questionGroup === 2} />
                    <label for="manual">Manual - Text Type</label>
                  </span>
                </div>
              )}
              {questionGroup === 1 && (
                <div className="template-cards">
                  {defaultTemplates.map((defaultTemplate) => (
                    <div className="template-card">
                      <div className="template-header">
                        <h3 className="template-title" onClick={() => onTemplateSelect(defaultTemplate.type)}>
                          {defaultTemplate.type} Template
                        </h3>
                        {templateStates[defaultTemplate.type] ? (
                          <TickIcon />
                        ) : (
                          <input type="radio" name="questionTemplate" value={defaultTemplate.text} />
                        )}
                      </div>
                      <p>{defaultTemplate.text}</p>
                    </div>
                  ))}

                  {selectedTemplate && (
                    <QuestionModal
                      type={selectedTemplate}
                      onClose={closeModal}
                      onSave={handleSaveQuestion}
                      selectedTemplate={selectedTemplate}
                      selectedTemplateQuestions={selectedTemplateQuestions}
                    />
                  )}
                </div>
              )}
              {(questionGroup === 2 || selectedSurvey) && (
                <div className="question-section">
                  {manualQuestions.map((question, index) => {
                    return (
                      <React.Fragment key={index}>
                        <p className="question-counter">Question {index + 1}</p>
                        <div className="form-fields-in-row">
                          <div className="form-field">
                            <input
                              type="text"
                              name="text"
                              value={question.text}
                              onChange={(event) => questionChangeHanlder(event, index)}
                              placeholder="Write here"
                            />
                          </div>
                          <div className="form-field question-type">
                            <select
                              name="type"
                              onChange={(event) => questionChangeHanlder(event, index)}
                              value={question.type || ""}
                            >
                              <option value="" disabled>
                                Question Type
                              </option>
                              <option value="1" selected={formData?.type === "1"}>
                                Yes/No Question
                              </option>
                              <option value="2" selected={formData?.type === "2"}>
                                MCQ - 2 Options
                              </option>
                              <option value="3" selected={formData?.type === "3"}>
                                MCQ - 3 Options
                              </option>
                              <option value="4" selected={formData?.type === "4"}>
                                MCQ - 4 Options
                              </option>
                              <option value="5" selected={formData?.type === "5"}>
                                MRQ Question
                              </option>
                            </select>
                          </div>
                          <DeleteIcon onClick={() => onQuestionRemove(index)} />
                        </div>
                        {["2", "3"].includes(question.type) && (
                          <div className="form-fields-in-row">
                            <div className="form-field">
                              <input
                                type="text"
                                name="option"
                                value={question.options[0] || ""}
                                onChange={(event) => questionChangeHanlder(event, index, 0)}
                                placeholder="Write here"
                              />
                            </div>
                            <div className="form-field">
                              <input
                                type="text"
                                name="option"
                                value={question.options[1] || ""}
                                disabled={!question.options[0]}
                                onChange={(event) => questionChangeHanlder(event, index, 1)}
                                placeholder="Write here"
                              />
                            </div>
                            {question.type === "3" && (
                              <div className="form-field">
                                <input
                                  type="text"
                                  name="option"
                                  value={question.options[2] || ""}
                                  disabled={!question.options[1]}
                                  onChange={(event) => questionChangeHanlder(event, index, 2)}
                                  placeholder="Write here"
                                />
                              </div>
                            )}
                          </div>
                        )}
                        {question.type === "4" && (
                          <React.Fragment>
                            <div className="form-fields-in-row">
                              <div className="form-field">
                                <input
                                  type="text"
                                  name="option"
                                  value={question.options[0] || ""}
                                  onChange={(event) => questionChangeHanlder(event, index, 0)}
                                  placeholder="Write here"
                                />
                              </div>
                              <div className="form-field">
                                <input
                                  type="text"
                                  name="option"
                                  value={question.options[1] || ""}
                                  disabled={!question.options[0]}
                                  onChange={(event) => questionChangeHanlder(event, index, 1)}
                                  placeholder="Write here"
                                />
                              </div>
                            </div>
                            <div className="form-fields-in-row">
                              <div className="form-field">
                                <input
                                  type="text"
                                  name="option"
                                  value={question.options[2] || ""}
                                  disabled={!question.options[1]}
                                  onChange={(event) => questionChangeHanlder(event, index, 2)}
                                  placeholder="Write here"
                                />
                              </div>
                              <div className="form-field">
                                <input
                                  type="text"
                                  name="option"
                                  value={question.options[3] || ""}
                                  disabled={!question.options[2]}
                                  onChange={(event) => questionChangeHanlder(event, index, 3)}
                                  placeholder="Write here"
                                />
                              </div>
                            </div>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h3>Preview</h3>
            <div className="question-bank-section preview">
              <p className="title">{formData.title}</p>
              <p>
                {formData.startDate} - {formData.endDate}
              </p>
              <p>{formData.objectives}</p>
            </div>
            <h3>Questions</h3>
            {questionGroup === 2 && (
              <>
                {manualQuestions.map((question, index) => (
                  <div className="question-bank-section preview" key={index}>
                    <p className="question-counter">Question {index + 1}</p>
                    <p className="title">{question.text}</p>
                    <div className="options">
                      {question.type === "1" ? (
                        <>
                          <span>Yes</span>
                          <span>No</span>
                        </>
                      ) : (
                        question.options?.map((option, optionIndex) => <span key={optionIndex}>{option}</span>)
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            {questionGroup === 1 &&
              selectedTemplateQuestions.map((question, index) => {
                return (
                  <div className="question-bank-section preview" key={index}>
                    <p className="question-counter">Question {index + 1}</p>
                    <p className="title">{question.text}</p>
                    <div className="options">
                      {question.type === "yes/no" ? (
                        <>
                          <span>Yes</span>
                          <span>No</span>
                        </>
                      ) : (
                        question.options?.map((option, optionIndex) => <span key={optionIndex}>{option}</span>)
                      )}
                    </div>
                  </div>
                );
              })}

            {/* <SurveyPreview /> */}
          </>
        )}
        <div className="action-bar">
          <input className="secondary-button" type="button" value="Cancel" onClick={onCancel} />
          {preview && (
            <input
              className="secondary-button"
              type="button"
              value="Save as Draft"
              onClick={() => saveTNA(false)}
              disabled={isFormValid()}
            />
          )}
          <input
            className="primary-button"
            type="button"
            value={!preview ? "Preview" : "Save & Publish"}
            onClick={() => (!preview ? viewPreview() : saveTNA(true))}
            // disabled={isFormValid()}
          />
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
