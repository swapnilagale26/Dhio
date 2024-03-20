import GroupAndComminunitiesFirstSection from "./GroupAndComminunitiesFirstSection";
import GroupAndComminunitiesSecondSection from "./GroupAndComminunitiesSecondSection";
import "./GroupAndCommunitiesLandingPage.css";

function GroupAndCommunitiesLandingPage() {
  return (
    <div className=" InterRegularFamily GroupAndCommunities">
      <div className="CourseDetailTop">
        <div className="CourseFirstSection">
          <GroupAndComminunitiesFirstSection />
        </div>
        <div className="CourseSecondSection">
          <GroupAndComminunitiesSecondSection />
        </div>
      </div>
    </div>
  );
}
export default GroupAndCommunitiesLandingPage;
