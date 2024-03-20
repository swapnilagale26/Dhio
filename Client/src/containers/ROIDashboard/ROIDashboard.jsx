import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { DeleteIcon, ROIAddIcon } from '../../icons';
import { fetchCourses } from '../../redux/slices/courseSlice';
import './roi-dashboard.css';

const ROIDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [constInvestmentForm, setConstInvestmentForm] = useState({});
  const [outcomeForm, setOutcomeForm] = useState({});
  const [externalCosts, setExternalCosts] = useState([{}]);
  const [costSaved, setCostSaved] = useState([{}]);
  const [showTotal, setShowTotal] = useState(false);
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.courseReducer?.data);

  const onCourseChangeHandler = (event) => {
    setSelectedCourse(event.target.value)
  }

  const onCostInvestmentChangeHandler = (event) => {
    const constInvestment = {...constInvestmentForm };
    const outcome = {...outcomeForm};
    constInvestment[event.target.name] = event.target.value;
    if(event.target.name === 'learnerPerHrCost') {
      outcome.learnerPerHrCost = event.target.value;
    }
    if(event.target.name === 'lndPerHrCost') {
      outcome.lndPerHrCost = event.target.value;
    }
    constInvestment.learnerTotalCost = constInvestment.investedTime && constInvestment.learnerPerHrCost ? parseInt(constInvestment.investedTime) * parseInt(constInvestment.learnerPerHrCost) : 0;
    constInvestment.lndTotalCost = constInvestment.lndEfforts && constInvestment.lndPerHrCost ? parseInt(constInvestment.lndEfforts) * parseInt(constInvestment.lndPerHrCost) : 0;
    
    outcome.learnerTotalCost = outcome.investedTime && outcome.learnerPerHrCost ? parseInt(outcome.investedTime) * parseInt(outcome.learnerPerHrCost) : 0;
    outcome.lndTotalCost = outcome.lndEfforts && outcome.lndPerHrCost ? parseInt(outcome.lndEfforts) * parseInt(outcome.lndPerHrCost) : 0;
    let totalCostInvested = 0;
    let totalSavedCost = 0;
    if(constInvestment.learnerTotalCost) {
      totalCostInvested+=constInvestment.learnerTotalCost;
    }
    if(constInvestment.lndTotalCost) {
      totalCostInvested+=constInvestment.lndTotalCost
    }
    if(outcome.learnerTotalCost) {
      totalSavedCost+=outcome.learnerTotalCost;
    }
    if(outcome.lndTotalCost) {
      totalSavedCost+=outcome.lndTotalCost;
    }
    externalCosts.forEach(externalCost => {
        if(externalCost.amt) {
          totalCostInvested+= parseInt(externalCost.amt)
        }
    })
    constInvestment.totalCostInvested = totalCostInvested;
    outcome.totalCostInvested = totalSavedCost;
    setConstInvestmentForm(constInvestment);
    setOutcomeForm(outcome);
  }
  const onOutcomeChangeHandler = (event) => {
    const outcome = {...outcomeForm};

    outcome[event.target.name] = event.target.value;
    outcome.learnerTotalCost = outcome.investedTime && outcome.learnerPerHrCost ? parseInt(outcome.investedTime) * parseInt(outcome.learnerPerHrCost) : 0;
    outcome.lndTotalCost = outcome.lndEfforts && outcome.lndPerHrCost ? parseInt(outcome.lndEfforts) * parseInt(outcome.lndPerHrCost) : 0;
    let totalCostInvested = 0;
    if(outcome.learnerTotalCost) {
      totalCostInvested+=outcome.learnerTotalCost
    }
    if(outcome.lndTotalCost) {
      totalCostInvested+=outcome.lndTotalCost
    }
    externalCosts.forEach(externalCost => {
        if(externalCost.amt) {
          totalCostInvested+= parseInt(externalCost.amt)
        }
    })

    outcome.totalCostInvested = totalCostInvested;
    setOutcomeForm(outcome);
  }
  const setExternalCost = (event, index) => {
    const externalCostData = [...externalCosts];
    externalCostData[index] = {
      ...externalCostData[index],
      [event.target.name]: event.target.value
    }
    if(externalCostData.length) {
      const form = {...constInvestmentForm};
      let totalCostInvested = 0;
      if(form.learnerTotalCost) {
        totalCostInvested+=form.learnerTotalCost
      }
      if(form.lndTotalCost) {
        totalCostInvested+=form.lndTotalCost
      }
      externalCostData.forEach(externalCost => {
        if(externalCost.amt) {
          totalCostInvested+= parseInt(externalCost.amt)
        }
      })
      form.totalCostInvested = totalCostInvested;
      setConstInvestmentForm(form);
    }
    setExternalCosts(externalCostData);
  }
  const setSavedCost = (event, index) => {
    const externalCostData = [...costSaved];
    externalCostData[index] = {
      ...externalCostData[index],
      [event.target.name]: event.target.value
    }
    if(externalCostData.length) {
      const form = {...outcomeForm};
      let totalCostInvested = 0;
      if(form.learnerTotalCost) {
        totalCostInvested+=form.learnerTotalCost
      }
      if(form.lndTotalCost) {
        totalCostInvested+=form.lndTotalCost
      }
      externalCostData.forEach(externalCost => {
        if(externalCost.amt) {
          totalCostInvested+= parseInt(externalCost.amt)
        }
      })
      form.totalCostInvested = totalCostInvested;
      setOutcomeForm(form);
    }
    setCostSaved(externalCostData);
  }

  useEffect(() => {
    dispatch(fetchCourses())
    setConstInvestmentForm({
      ...constInvestmentForm,
      investedTime: Math.floor( Math.random()*999 ) + 100
    })
  }, [])
  useEffect(() => {
    if(courses.length) {
      setSelectedCourse(courses[0]._id)
    }
  }, [courses])
  
  // const deleteExternalCost = (index) => {
  //   const externalCostData = [...externalCosts];
  //   externalCostData.splice(index, 1);
  //   setExternalCosts(externalCostData);
  // }

  const deleteExternalCost = (index) => {
    const externalCostData = [...externalCosts];
    const deletedCost = externalCostData.splice(index, 1)[0]; 
    setExternalCosts(externalCostData);
  
    // Subtract the deleted cost from the total cost invested
    const form = { ...constInvestmentForm };
    if (deletedCost.amt) {
      form.totalCostInvested -= parseInt(deletedCost.amt);
    }
    setConstInvestmentForm(form);
  }
  
  const addExternalCost = () => {
    const externalCostData = [...externalCosts, {}];
    setExternalCosts(externalCostData);
  }

  // const deleteSavedCost = (index) => {
  //   const externalCostData = [...costSaved];
  //   externalCostData.splice(index, 1);
  //   setCostSaved(externalCostData);
  // }

  const deleteSavedCost = (index) => {
    const savedCostData = [...costSaved];
    const deletedCost = savedCostData.splice(index, 1)[0]; 
    setCostSaved(savedCostData);
  
    // Subtract the deleted cost from the total cost invested
    const form = { ...outcomeForm };
    if (deletedCost.amt) {
      form.totalCostInvested -= parseInt(deletedCost.amt);
    }
    setOutcomeForm(form);
  }
  
  const addSavedCost = () => {
    const externalCostData = [...costSaved, {}];
    setCostSaved(externalCostData);
  }

  const grandTotal = outcomeForm?.totalCostInvested + constInvestmentForm?.totalCostInvested;
  const breadcrumbs = [
    {
      menu: 'ROI',
      link: '/roi',
    }
  ]
  return (
    <div className="container">
      <h2 className='page-header'>Rate of Investment</h2>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      <div className="roi-container">
        <div className='form-field'>
          <label>Select Course</label>
          <select name='courseName' onChange={onCourseChangeHandler} value={selectedCourse || ''}>
            {courses.map(course => <option value={course._id} selected={selectedCourse === course._id}>{course.name}</option>)}
          </select>
        </div>
        <h3 className='page-header'>Cost Investment</h3>
        <div className="cost-investment-section">
          <div className='form-fields-in-row'>
            <div className='form-field'>
              <label>Time investment by learners</label>
              <input type='text' name='investedTime' value={constInvestmentForm?.investedTime} disabled placeholder='Enter Numbers Only'/>
            </div>
            <div className='form-field'>
              <label>Average per hour cost by learner</label>
              <input type='text' name='learnerPerHrCost'onChange={onCostInvestmentChangeHandler} value={constInvestmentForm?.learnerPerHrCost} placeholder='Numberics Only'/>
            </div>
            <div className='form-field'>
              <label>Total</label>
              <input type='text' name='learnerTotalCost' value={constInvestmentForm?.learnerTotalCost} disabled/>
            </div>
          </div>
          <div className='form-fields-in-row'>
            <div className='form-field'>
              <label>L&D Effort Investment</label>
              <input type='text' name='lndEfforts' onChange={onCostInvestmentChangeHandler} value={constInvestmentForm?.lndEfforts} placeholder='Enter Numbers Only'/>
            </div>
            <div className='form-field'>
              <label>Average per hour cost by L&D</label>
              <input type='text' name='lndPerHrCost'onChange={onCostInvestmentChangeHandler} value={constInvestmentForm?.lndPerHrCost} placeholder='Numberics Only'/>
            </div>
            <div className='form-field'>
              <label>Total</label>
              <input type='text' name='lndTotalCost' value={constInvestmentForm?.lndTotalCost} disabled/>
            </div>
          </div>

          <div className="cost-investment-section">
            {externalCosts.map((external, index) => (
              <div className='external-cost' key={index}>
                <div className='form-fields-in-row'>
                  <div className='form-field'>
                    <label>External Cost name</label>
                    <input type='text' name='externalCost' value={external?.externalCost || ''} placeholder='Write here' onChange={(event) => setExternalCost(event, index)}/>
                  </div>
                  <div className='form-field'>
                    <label>Description</label>
                    <input type='text' name='desc' value={external?.desc || ''} placeholder='Write here' onChange={(event) => setExternalCost(event, index)}/>
                  </div>
                  <div className='form-field'>
                    <label>Amount</label>
                    <input type='text' name='amt' value={external?.amt || ''} placeholder='Enter Numbers only' onChange={(event) => setExternalCost(event, index)}/>
                  </div>
                </div>
                {index < externalCosts.length - 1 ? (
                  <DeleteIcon onClick={() => deleteExternalCost(index)}/>
                ) : (
                  <ROIAddIcon onClick={addExternalCost} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="cost-investment-total">
          Sub Total: {`${constInvestmentForm?.totalCostInvested || 0}`}
        </div>
      </div>
      <div className="roi-container">
        <h3 className='page-header'>Outcome</h3>
        <div className="cost-investment-section">
          <div className='form-fields-in-row'>
            <div className='form-field'>
              <label>No of hrs saved by learner</label>
              <input type='text' name='investedTime' onChange={onOutcomeChangeHandler} value={outcomeForm?.investedTime} placeholder='Enter Numbers Only'/>
            </div>
            <div className='form-field'>
              <label>Average Cost</label>
              <input type='text' name='learnerPerHrCost' value={outcomeForm?.learnerPerHrCost} disabled placeholder='Numberics Only'/>
            </div>
            <div className='form-field'>
              <label>Amount</label>
              <input type='text' name='learnerTotalCost' value={outcomeForm?.learnerTotalCost} disabled/>
            </div>
          </div>
          <div className='form-fields-in-row'>
            <div className='form-field'>
              <label>No of Hrs Saved L&D</label>
              <input type='text' name='lndEfforts' onChange={onOutcomeChangeHandler} value={outcomeForm?.lndEfforts} placeholder='Enter Numbers Only'/>
            </div>
            <div className='form-field'>
              <label>Average Cost of L&D</label>
              <input type='text' name='lndPerHrCost' value={outcomeForm?.lndPerHrCost} disabled placeholder='Numberics Only'/>
            </div>
            <div className='form-field'>
              <label>Amount</label>
              <input type='text' name='lndTotalCost' value={outcomeForm?.lndTotalCost} disabled/>
            </div>
          </div>

          <div className="cost-investment-section">
            {costSaved?.map((costsave, index) => (
              <div className='external-cost' key={index}>
                <div className='form-fields-in-row'>
                  <div className='form-field'>
                    <label>Cost Saved(If any)</label>
                    <input type='text' name='externalCost' value={costsave?.externalCost || ''} placeholder='Write here' onChange={(event) => setSavedCost(event, index)}/>
                  </div>
                  <div className='form-field'>
                    <label>Description</label>
                    <input type='text' name='desc' value={costsave?.desc || ''} placeholder='Write here' onChange={(event) => setSavedCost(event, index)}/>
                  </div>
                  <div className='form-field'>
                    <label>Amount</label>
                    <input type='text' name='amt' value={costsave?.amt || ''} placeholder='Enter Numbers only' onChange={(event) => setSavedCost(event, index)}/>
                  </div>
                </div>
                {index < costSaved.length - 1 ? (
                  <DeleteIcon onClick={() => deleteSavedCost(index)}/>
                ) : (
                  <ROIAddIcon onClick={addSavedCost} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="cost-investment-total">
        Sub Total: {`${outcomeForm?.totalCostInvested || 0}`}
        </div>
      </div>
      <div>
           <div className="grand-total">
           {showTotal ? (
           <span>
          Grand Total: {grandTotal}
           </span>
      ) : (
        <button className="primary-button" onClick={() => setShowTotal(true)}>Show Report Total</button>
      )}
    </div>
    </div>
    <div class="button-box">
      <button class='module-button'>Email Report</button>
       <div>
        <button class='module-button'>Download Report</button>
        <button class='primary-button'>Save</button>
       </div>
    </div>

    </div>
  )
}

export default ROIDashboard