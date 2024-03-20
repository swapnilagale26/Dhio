import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { deselectCourse } from '../../../redux/slices/courseSlice';
import { fetchModulesById } from '../../../redux/slices/moduleSlice';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

import './course-form.css';

const CourseForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(Array(4).fill(false)); // Array to track completion status of each step
  const [structure, setStructure] = useState([]);
  
  const dispatch = useDispatch();
  const params = useParams();
  const selectedCourse = useSelector((state) => state.courseReducer?.selectedCourse);

  const nextStep = (structureData) => {
    if(Array.isArray(structureData)) {
      setStructure(structureData);
    }
    if(activeStep < 4) {
      setActiveStep(activeStep + 1);
      setCompletedSteps(prev => {
        const newCompletedSteps = [...prev];
        newCompletedSteps[activeStep - 1] = true; // Mark the previous step as completed
        return newCompletedSteps;
      });
    }
  }

  const backStep = () => {
    if(activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  }

  const steps = [ 'Set', 'Create', 'Structure', 'Review' ];

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const breadcrumbs = [
    {
      menu: 'Course Management',
      link: '/course',
    },
    {
      menu: params?.id ? 'Edit Course Details' : 'Add New Course',
      link: '/course',
    }
  ]

  useEffect(() => {
    if(selectedCourse?._id && selectedCourse?.modules.length) {
      dispatch(fetchModulesById(selectedCourse.modules));
    } else {
      // dispatch(deselectCourse());
    }
  }, [selectedCourse]);

  return (
    <div className="container">
      <h2>{params?.id ? 'Update Course Details' : 'Add New Course'}</h2>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      <div className='course-form'>
        <div className='form-stepper'>
          {steps.map((step, index) => {
            const isActive = activeStep > index;
            const isCompleted = completedSteps[index];
            return (
              <div className={`form-step ${isActive ? 'active-step' : ''}`} key={index}>
                {isCompleted ? <span className="completed-step">✔</span>: <span>{index + 1}</span>}
                {step}
              </div>
            );
          })}
        </div>
        <div className='main-form'>
          {activeStep === 1 && <StepOne options={options} currentCourse={selectedCourse} nextStep={nextStep}/>}
          {activeStep === 2 && <StepTwo formData={selectedCourse} structure={structure} setStructure={setStructure} nextStep={nextStep} backStep={backStep}/>}
          {activeStep === 3 && <StepThree formData={selectedCourse} structure={structure} setStructure={setStructure} nextStep={nextStep} backStep={backStep} />}
          {activeStep === 4 && <StepFour />}
        </div>
      </div>
    </div>
  )
}

export default CourseForm;
