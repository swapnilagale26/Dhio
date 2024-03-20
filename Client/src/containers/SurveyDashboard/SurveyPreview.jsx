import React from "react";
import { DataFilterIcon, CourseDurationIcon } from "../../icons";
import { Rating } from "react-simple-star-rating";
import "./survey-dashboard.css";

const SurveyPreview = () => {
  const formData = {
    title: "3 people go onto a bus, 3 more people come off, 6 people com on. 3 more people come on.",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    objectives: "3 people go onto a bus, 3 more people come off, 6 people com on. 3 more people come on.",
  };

  // Sample data with correct answers
  const manualQuestions = [
    {
      text: "Think Of your favorite animal, place, and color now say one of them! What Did you say?",
      type: "MCQ",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Option 2",
    },
    {
      text: "3 people go onto a bus, 3 more people come off, 6 people com on. 3 more people come on",
      type: "Descriptive",
      answer: {
        text: "Sample answer",
        rating: 3
      }
    },

    {
      text: "3 people go onto a bus, 3 more people come off, 6 people com on. 3 more people come on",
      type: "Yes/No",
      correctAnswer: "Yes",
    },
   
    {
      text: "Think Of your favorite animal, place, and color now say one of them! What Did you say?",
      type: "MRQ",
      options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
      correctAnswer: ["Option 1", "Option 4"],
    },
   
    // Add more sample questions as needed
  ];

  return (
    <div>
      <h3>Preview</h3>
      <div className="question-bank-section preview">
        <p className="title">{formData.title}</p>
        <p>
          <CourseDurationIcon className="frame-icon1" /> {formData.startDate} - {formData.endDate}
        </p>
        <p>{formData.objectives}</p>
      </div>

      <h3>Questions</h3>
      {manualQuestions.map((question, index) => (
        <div className="question-bank-section preview" key={index}>
          <p className="question-counter">Question {index + 1}</p>
          <p className="title">{question.text}</p>
          {question.type === "MCQ" && (
            <div className="options">
              {question.options?.map((option, optionIndex) => (
                <span
                  key={optionIndex}
                  className={`optionC ${option === question.correctAnswer ? "correct-answer" : ""}`}
                >
                  {option}
                </span>
              ))}
            </div>
          )}
          {question.type === "Yes/No" && (
            <div className="options">
              <p className={`optionC ${question.correctAnswer === "Yes" ? "correct-answer" : ""}`}>Yes</p>
              <p className={`optionC ${question.correctAnswer === "No" ? "correct-answer" : ""}`}>No</p>
            </div>
          )}

          {question.type === "MRQ" && (
            <div className="options">
              {question.options?.map((option, optionIndex) => (
                <span
                  key={optionIndex}
                  className={`optionC ${question.correctAnswer.includes(option) ? "correct-answer" : ""}`}
                >
                  {option}
                </span>
              ))}
            </div>
          )}
         {question.type === "Descriptive" && (
      <div className="descriptive-answer">
        <div className="disabled-rating">
         
             <Rating initialValue={question.answer.rating} size={25} fillColor="#5CB85C" />
         
        </div>
      </div>
    )}
        </div>
      ))}
    </div>
  );
};

export default SurveyPreview;
