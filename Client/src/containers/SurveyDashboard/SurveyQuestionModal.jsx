import React, { useState, useEffect } from "react";

const QuestionModal = ({ type, onClose, onSave, selectedTemplateQuestions }) => {
  const [mrqQuestionText, setMRQQuestionText] = useState("");
  const [yesNoQuestionText, setYesNoQuestionText] = useState("");
  const [mcqQuestionText, setMCQQuestionText] = useState("");
  const [descriptiveQuestionText, setDescriptiveQuestionText] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [templateSaved, setTemplateSaved] = useState(false);

  useEffect(() => {
    // Fetch and set the initial text values based on the selected template questions
    const selectedQuestion = selectedTemplateQuestions.find(question => question.type === type);
    if (selectedQuestion) {
      if (type === "MRQ") {
        setMRQQuestionText(selectedQuestion.text);
      } else if (type === "yes/no") {
        setYesNoQuestionText(selectedQuestion.text);
      } else if (type === "MCQ") {
        setMCQQuestionText(selectedQuestion.text);
        setOptions(selectedQuestion.options || ["", ""]);
      } else if (type === "Descriptive") {
        setDescriptiveQuestionText(selectedQuestion.text);
      }
    }
  }, [type, selectedTemplateQuestions]);

  const handleQuestionTextChange = (event) => {
    if (type === "MRQ") {
      setMRQQuestionText(event.target.value);
    } else if (type === "yes/no") {
      setYesNoQuestionText(event.target.value);
    } else if (type === "MCQ") {
      setMCQQuestionText(event.target.value);
    } else if (type === "Descriptive") {
      setDescriptiveQuestionText(event.target.value);
    }
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleOptionNumberChange = (event) => {
    const number = parseInt(event.target.value);
    if (!isNaN(number)) {
      const newOptions = Array.from({ length: number }, (_, index) => options[index] || "");
      setOptions(newOptions);
    }
  };

  const handleSave = () => {
    let questionData = {};

    if (type === "MRQ") {
      questionData = { type, text: mrqQuestionText };
    } else if (type === "yes/no") {
      questionData = { type, text: yesNoQuestionText };
    } else if (type === "MCQ") {
      questionData = { type, text: mcqQuestionText, options };
    } else if (type === "Descriptive") {
      questionData = { type, text: descriptiveQuestionText };
    }

    onSave(questionData);
    setTemplateSaved(true);
    onClose();
  };

  return (
    <div className="modal-bar">
      <div className="modal-content">
        {type === "MRQ" && (
          <div className="question-container form-field">
            <p>MRQ Question:</p>
            <input
              type="text"
              value={mrqQuestionText}
              onChange={handleQuestionTextChange}
              placeholder="Write here"
            />
          </div>
        )}
        {type === "yes/no" && (
          <div className="question-container form-field">
            <p>Yes/No Question:</p>
            <input
              type="text"
              value={yesNoQuestionText}
              onChange={handleQuestionTextChange}
              placeholder="Write here"
            />
          </div>
        )}
        {type === "MCQ" && (
          <div className="question-container form-field">
            <p>MCQ Question:</p>
            <input
              type="text"
              value={mcqQuestionText}
              onChange={handleQuestionTextChange}
              placeholder="Write here"
            />
            <div className='form-fields-in-row'>
              <div className='form-field question-type'>
                <select name='type' onChange={handleOptionNumberChange} value={options.length} >
                  <option value='2'>MCQ - 2 Options</option>
                  <option value='3'>MCQ - 3 Options</option>
                  <option value='4'>MCQ - 4 Options</option>
                </select>
              </div>
            </div>

            {options.map((option, index) => (
              <div className='form-field' key={index}>
                <input
                  type='text'
                  value={option}
                  onChange={(event) => handleOptionChange(index, event)}
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
        {type === "Descriptive" && (
          <div className="question-container form-field">
            <p>Descriptive Question:</p>
            <input
              type="text"
              value={descriptiveQuestionText}
              onChange={handleQuestionTextChange}
              placeholder="Write here"
            />
          </div>
        )}
        <button onClick={onClose} className="close-button">
          Close
        </button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default QuestionModal;
