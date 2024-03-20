import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IVLTModuleCreator from "../../../components/modules/IVLTModuleCreator";
import SelfPacedModuleCreator from "../../../components/modules/SelfPacedModuleCreator";
import { DeleteIcon } from "../../../icons";
import { updateCourse } from "../../../redux/slices/courseSlice";
import { createModule, updateModule } from "../../../redux/slices/moduleSlice";
import AssesmentModuleCreator from "../../../components/modules/AssesmentModuleCreator";
import DescriptiveModuleCreator from "../../../components/modules/DescriptiveModuleCreator";
import DocumentModuleCreator from "../../../components/modules/DocumentModuleCreator";
import UploadModuleCreator from "../../../components/modules/UploadModuleCreator";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";

const StepThree = ({ backStep, nextStep, structure, setStructure }) => {
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const [currentAssetForm, setCurrentAssetForm] = useState({});
  const [changesSaved, setChangesSaved] = useState(false);
  const [message, showMessage] = useState(false);
  const [visitedSections, setVisitedSections] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.userReducer?.currentUser);
  const modulesById = useSelector((state) => state.moduleReducer?.modulesById);
  const selectedCourse = useSelector((state) => state.courseReducer?.selectedCourse);
  const isError = useSelector((state) => state.courseReducer.isError);
  const isLoading = useSelector((state) => state.courseReducer.isLoading);
  console.log("selec", selectedCourse);

  // useEffect(() => {
  //   if(!selectedSectionIdx && structure.length) {
  //     setSelectedSectionIdx(0);

  //   }
  // }, [selectedSectionIdx, structure]);

  useEffect(() => {
    if (!selectedSectionIdx && structure.length) {
      setSelectedSectionIdx(0);
    }

    if (structure[selectedSectionIdx]?.type === "Self Paced") {
      setCurrentAssetForm({ title: "", file: null });
    } else if (structure[selectedSectionIdx]?.type === "VILT") {
      setCurrentAssetForm({ title: "", date: "", description: "" });
    } else if (structure[selectedSectionIdx]?.type === "ILT") {
      setCurrentAssetForm({ title: "", date: "", description: "", location: "" });
    } else if (structure[selectedSectionIdx]?.type === "Descriptive Question") {
      setCurrentAssetForm({ title: "", description: "" });
    } else if (structure[selectedSectionIdx]?.type === "Documents") {
      setCurrentAssetForm({ title: "", document: null });
    } else if (structure[selectedSectionIdx]?.type === "Assessment") {
      setCurrentAssetForm({ title: "", questions: [], duration: 0 });
    }
  }, [selectedSectionIdx, structure]);

  useEffect(() => {
    if (modulesById) {
      const matchedStructureIdx = selectedCourse.modules?.find((mod) => mod === structure[selectedSectionIdx].id);
      const matchedModule = modulesById.find((module) => module._id === matchedStructureIdx);
      setCurrentAssetForm({ ...matchedModule });
      console.log("modu", modulesById);
    }
  }, [selectedSectionIdx, selectedCourse, modulesById]);

  const removeSection = (type) => {
    const lastIndex = structure?.map((section) => section.type).lastIndexOf(type.type);
    const sectionsToUpdate = structure?.filter((section, index) => index !== lastIndex);
    setStructure(sectionsToUpdate);
  };
  const onSectionSelect = (index) => {
    setSelectedSectionIdx(index);
    setVisitedSections([...visitedSections, index]);
  };
  const onCancel = () => {
    // dispatch(deselectUser());
    return navigate("/course");
  };

  const saveModule = async () => {
    const currentStepType = structure[selectedSectionIdx].type;
    const moduleIds = structure.map((st) => st?.id).filter((id) => id);

    // if(!currentAssetForm._id) {
    //   dispatch(createModule({ ...currentAssetForm, orgId: currentUser.orgId, courseId: selectedCourse._id, type: currentStepType, moduleIds, currentModuleIndex: selectedSectionIdx }));
    // } else  {
    //   dispatch(updateModule({ ...currentAssetForm, orgId: currentUser.orgId, courseId: selectedCourse._id, type: currentStepType, moduleIds }));
    // }
    if (currentAssetForm?._id) {
      dispatch(
        updateModule({
          ...currentAssetForm,
          orgId: currentUser?.orgId,
          courseId: selectedCourse?._id,
          type: currentStepType,
          moduleIds,
        })
      );
      showMessage(true);
      setTimeout(() => {
        showMessage(false);
      }, 3000);
    } else {
      // dispatch(createModule({...currentAssetForm, orgId: currentUser?.orgId, courseId: selectedCourse?._id, type: currentStepType, moduleIds, currentModuleIndex: selectedSectionIdx }));
      showMessage(true);
      setTimeout(() => {
        showMessage(false);
      }, 3000);
    }
    setChangesSaved(true);
  };

  const saveAndNext = () => {
    const courseToUpdate = { ...selectedCourse };
    const moduleIds = structure.map((st) => st?.id).filter((id) => id);
    dispatch(updateCourse({ ...courseToUpdate, modules: moduleIds }));
    nextStep();
  };

  return (
    <div>
      {message && <PopupMessage isError={isError} />}
      <div className="main-section">
        <div className="course-tree">
          <h3>Create Course Structure</h3>
          <div className="course-type-list structure">
            {structure?.map((section, index) => {
              return (
                <div
                  key={index}
                  className={`course-type ${visitedSections.includes(index) ? "selected-section" : ""}`}
                  onClick={() => onSectionSelect(index)}
                >
                  <p className="step-name">{section.type}</p>
                  <DeleteIcon
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      removeSection(section);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="course-tree">
          <h3>Edit/Arrage</h3>
          <div>
            {["Self Paced", "Video"].includes(structure[selectedSectionIdx]?.type) && (
              <SelfPacedModuleCreator
                formData={currentAssetForm}
                setFormData={setCurrentAssetForm}
                saveModule={saveModule}
                changeLabel={structure[selectedSectionIdx]?.type === "Video"}
              />
            )}

            {["VILT", "ILT"].includes(structure[selectedSectionIdx]?.type) && (
              <IVLTModuleCreator
                formData={currentAssetForm}
                setFormData={setCurrentAssetForm}
                saveModule={saveModule}
                haveVenue={structure[selectedSectionIdx]?.type === "ILT"}
              />
            )}

            {["Descriptive Question"].includes(structure[selectedSectionIdx]?.type) && (
              <DescriptiveModuleCreator
                formData={currentAssetForm}
                setFormData={setCurrentAssetForm}
                saveModule={saveModule}
              />
            )}
            {["Documents"].includes(structure[selectedSectionIdx]?.type) && (
              <DocumentModuleCreator
                formData={currentAssetForm}
                setFormData={setCurrentAssetForm}
                saveModule={saveModule}
              />
            )}
            {["Assesment"].includes(structure[selectedSectionIdx]?.type) && (
              <AssesmentModuleCreator
                formData={currentAssetForm}
                setFormData={setCurrentAssetForm}
                saveModule={saveModule}
              />
            )}
            {["Upload"].includes(structure[selectedSectionIdx]?.type) && (
              <UploadModuleCreator
                formData={currentAssetForm}
                setFormData={setCurrentAssetForm}
                saveModule={saveModule}
              />
            )}
          </div>
        </div>
      </div>
      <div className="action-bar">
        <input className="ternary-button" type="button" value="Cancel" onClick={onCancel} />
        <input className="secondary-button" type="button" value="Back" onClick={backStep} />
        <input className="primary-button" type="button" value="Save & Next" onClick={saveAndNext} />
      </div>
    </div>
  );
};

export default StepThree;
