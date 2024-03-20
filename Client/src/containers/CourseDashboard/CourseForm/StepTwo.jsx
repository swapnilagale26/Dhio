import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, DragIcon, SelfPacedIcon } from '../../../icons';

const courseTypes = [
  {
    name: 'Self Paced',
    icon: (props) => <SelfPacedIcon {...props}/>,
    path: 'scorms'
  },
  {
    name: 'VILT',
    icon: (props) => <SelfPacedIcon {...props}/>,
    path: '',
  },
  {
    name: 'ILT',
    icon: (props) => <SelfPacedIcon {...props}/>,
    path: '',
  },
  {
    name: 'Video',
    icon: (props) => <SelfPacedIcon {...props}/>,
    path: 'video',
  },
  {
    name: 'Descriptive Question',
    icon: (props) => <SelfPacedIcon {...props}/>
  },
  {
    name: 'Documents',
    icon: (props) => <SelfPacedIcon {...props}/>
  },
  {
    name: 'Assesment',
    icon: (props) => <SelfPacedIcon {...props}/>
  },
  {
    name: 'Upload',
    icon: (props) => <SelfPacedIcon {...props}/>
  }
]
const CourseCard = ({ type, sections, addSection, removeSection }) => {
  const count = sections.filter(section => section.type === type.name).length;
  const Icon = type.icon;
  return (
    <div className={`courses-card ${count ? 'added-card' :''}`}>
      {count ? <Icon className='added-type' />: <Icon />}
      <p>{type.name}</p>
      {count === 0 && (
          <input className='secondary-button' type='button' value='Select' onClick={() => addSection(type)} />
      )}
      {count > 0 && (
        <div className='button-container'>
          <input className='primary-button counter' type='button' value='-' onClick={() => removeSection(type)} />
          {count}
          <input className='primary-button counter' type='button' value='+' onClick={() => addSection(type)} />
        </div>
      )}
    </div>
  )
}
const StepTwo = ({ structure = [], setStructure, backStep, nextStep }) => {
  const draggingPos = useRef(null);
  const dragOverPos = useRef(null);
  const navigate = useNavigate();

  const modulesById = useSelector((state) => state.moduleReducer?.modulesById);
  const selectedCourse = useSelector((state) => state.courseReducer?.selectedCourse);
  console.log("step2",selectedCourse);

  const addSection = (typeToAdd) =>{
    const sectionsToUpdate = [...structure];
    sectionsToUpdate.push({type: typeToAdd.name, order: sectionsToUpdate.length, path: typeToAdd.path});
    setStructure(sectionsToUpdate);
  }
  useEffect(() => {
    if(selectedCourse?._id && modulesById?.length && !structure.length) {
      const structureData = []
      selectedCourse.modules.forEach((module, index) => {
        const matchedModule = modulesById.find(mbi => mbi._id === module);
        const matchedFromMenu = courseTypes.find(courseType => courseType.name === matchedModule.type);
        const structure = { type: matchedModule.type, order: index, path: matchedFromMenu.path, id: matchedModule._id }
        structureData.push(structure);
      });
      setStructure(structureData);
    }
  },[modulesById, selectedCourse]);

  const removeSection = (type) => {
    const lastIndex = structure?.map(section => section.type).lastIndexOf(type.name)
    const sectionsToUpdate = structure?.filter((section, index) => index !== lastIndex);
    setStructure(sectionsToUpdate);
  }
  const handleDragStart = (position) => {
    draggingPos.current = position;
  }
  const handleDragEnter = (position) => {
    dragOverPos.current = position;
    const newItems = [...structure];
    const draggingItem = newItems[draggingPos.current];
    if (!draggingItem) return;

    newItems.splice(draggingPos.current, 1);
    newItems.splice(dragOverPos.current, 0, draggingItem);

    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index
    }));

    draggingPos.current = position;
    dragOverPos.current = null;
    console.log(reorderedItems);
    setStructure([...reorderedItems]);
  }

  const onCancel = () => {
    // dispatch(deselectUser());
    return navigate("/course");
  }
  console.log(structure);
  return ( 
    <div>
      <div className='main-section'>
        <div className='course-structure'>
          {courseTypes.map(type=> <CourseCard type={type} sections={structure} addSection={addSection} removeSection={removeSection}/>)}
        </div>
        <div className='course-tree'>
          <h3>Create Course Structure</h3>
          <div className='course-type-list'>
            {structure?.map((section, index) => {
              return (
                <div 
                  className='course-type'
                  draggable
                  key={index}
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <p className='step-name'>
                    <DragIcon />{section.type}
                  </p>
                  <DeleteIcon onClick={() => removeSection(section)}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>    
      <div className='action-bar'>
        <input className='ternary-button' type='button' value='Cancel' onClick={onCancel}/>
        <input className='secondary-button' type='button' value='Back' onClick={backStep}/>
        <input className='primary-button' type='button' value='Save & Next' onClick={nextStep} />
      </div>
    </div>
  )
}

export default StepTwo