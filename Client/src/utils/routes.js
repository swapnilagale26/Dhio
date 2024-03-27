import ComingSoon from "../containers/ComingSoon";
import CourseDashboard from "../containers/CourseDashboard/CourseDashboard";
import CourseForm from "../containers/CourseDashboard/CourseForm/CourseForm";
import Home from "../containers/Home/Home";
import ROIDashboard from "../containers/ROIDashboard/ROIDashboard";
import SurveyDashboard from "../containers/SurveyDashboard/SurveyDashboard";
import SurveyForm from "../containers/SurveyDashboard/SurveyForm";
import SurveySubmissionForm from "../containers/SurveyDashboard/SurveySubmissionForm";
import TenancyDashboard from "../containers/Tenancy/TenancyDashboard";
import TenancyForm from "../containers/Tenancy/TenancyForm";
import BulkUpload from "../containers/UserDashboard/BulkUpload";
import UserDashboard from "../containers/UserDashboard/UserDashboard";
import UserForm from "../containers/UserDashboard/UserForm";
import {
  CourseIcon,
  HomeIcon,
  ROIIcon,
  SurveyIcon,
  TenancyIcon,
  UserIcon,
  ReportIcon,
  AssetIcon,
  GroupIcon,
  CommunitiesIcon,
} from "../icons";
import AdminDashboard from "../components/Dashboard/AdminDashboard/AdminDashboard";
import SuperAdminDashboard from "../components/Dashboard/SuperAdminDashboard/SuperAdminDashboard";
import UserDashBoard from "../components/Dashboard/DashboardUi/UserDashboard";
import Courselist from "../components/CourseList/Cousrelist";
import Eventmain from "../components/Events/Eventmain";
import Reports from "../containers/Reports/ReportDashboard";
import CourseDetail from "../components/UserCourseManagement/CourseDetail/CourseDetail";
import AdminAsset from "../containers/Asset/Admin/AdminAsset";
import CourseVideo from "../components/UserCourseManagement/CourseView/CourseVideo/CourseVideo";
import CoursePdf from "../components/UserCourseManagement/CourseView/CoursePdf/CoursePdf";
import GroupAndCommunitiesLandingPage from "../components/UserCourseManagement/GroupAndCommunities/GroupAndCommunitiesLandingPage";
import Feedback from "../components/Survey/Feedback";
import Chat from "../components/UserCourseManagement/GroupAndCommunities/ChatSection/Chat";
import Asset from "../containers/Asset/SuperAdmin/Asset";
import AddEdituser from "../components/UserCourseManagement/GroupAndCommunities/AddUser/AddEdituser";
import ActiveUserReports from "../containers/Reports/ActiveUserReports";
import CourseReports from "../containers/Reports/CourseReports";
import LeaderBoardReports from "../containers/Reports/LeaderBoardReports";
import UserReport from "../containers/Reports/UserReport";
import Formmain from "../containers/Forms/Formmain";

//  Super Admin nevigation bar
export const navRoutes = [
  {
    pathname: "/dashboard",
    label: "Dashboard",
    icon: <HomeIcon />,
    component: <SuperAdminDashboard />,
  },
  {
    pathname: "/tenancy",
    label: "Multi-Tenancy",
    icon: <TenancyIcon />,
    component: <TenancyDashboard />,
  },
  {
    pathname: "/user",
    label: "User Management",
    icon: <UserIcon />,
    component: <UserDashboard />,
  },
  {
    pathname: "/asset",
    label: "Asset",
    icon: <AssetIcon />,
    component: <Asset />,
  },
];

// Admin  side nevigation bar
export const adminNav = [
  {
    pathname: "/dashboard",
    label: "Dashboard",
    icon: <HomeIcon />,
    component: <AdminDashboard />,
  },
  {
    pathname: "/user",
    label: "User Management",
    icon: <UserIcon />,
    component: <UserDashboard />,
  },
  {
    pathname: "/course",
    label: "Course Management",
    icon: <CourseIcon />,
    component: <CourseDashboard />,
  },
  {
    pathname: "/admin_asset",
    label: "Asset",
    icon: <AssetIcon />,
    component: <AdminAsset />,
  },
  {
    pathname: "/roi",
    label: "ROI",
    icon: <ROIIcon />,
    component: <ROIDashboard />,
  },
  {
    pathname: "/survey",
    label: "Survey Management",
    icon: <SurveyIcon />,
    component: <SurveyDashboard />,
  },
  {
    pathname: "/reports",
    label: "Reports",
    icon: <ReportIcon />,
    component: <Reports />,
  },
];

// USer  side nevigation bar
export const userNav = [
  {
    pathname: "/dashboard",
    label: "Dashboard",
    icon: <HomeIcon />,
    component: <UserDashboard />,
  },
  {
    pathname: "/course",
    label: "Course Management",
    icon: <CourseIcon />,
    component: <CourseDashboard />,
  },
  {
    pathname: "/group",
    label: "Group",
    icon: <GroupIcon />,
    component: <GroupAndCommunitiesLandingPage />,
  },
  {
    pathname: "/communities",
    label: "Community",
    icon: <CommunitiesIcon />,
    component: <GroupAndCommunitiesLandingPage />,
  },
];

// Super Admin Routes
export const routes = [
  {
    pathname: "/:id/:token",
    component: <Home />,
  },
  {
    pathname: "/dashboard",
    component: <SuperAdminDashboard />,
  },
  {
    pathname: "/tenancy/edit/:id",
    component: <TenancyForm />,
  },
  {
    pathname: "/tenancy/add",
    component: <TenancyForm />,
  },
  {
    pathname: "/tenancy",
    component: <TenancyDashboard />,
  },
  {
    pathname: "/user/edit/:id",
    component: <UserForm />,
  },
  {
    pathname: "/user/add",
    component: <UserForm />,
  },
  {
    pathname: "/user",
    component: <Formmain />,
  },
  {
    pathname: "/asset",
    component: <Asset />,
  },
  {
    pathname: "/survey/submit/:id",
    component: <SurveySubmissionForm />,
  },
];

// User Routes
export const UserRoutes = [
  {
    pathname: "/:id/:token",
    component: <Home />,
  },
  {
    pathname: "/dashboard",
    component: <UserDashBoard />,
  },
  {
    pathname: "/tenancy/edit/:id",
    component: <TenancyForm />,
  },
  {
    pathname: "/tenancy/add",
    component: <TenancyForm />,
  },
  {
    pathname: "/tenancy",
    component: <TenancyDashboard />,
  },
  {
    pathname: "/user/edit/:id",
    component: <UserForm />,
  },
  {
    pathname: "/user/add",
    component: <UserForm />,
  },
  {
    pathname: "/user",
    component: <UserDashboard />,
  },
  {
    pathname: "/course",
    // component: <Courselist/>,
    // component: <Eventmain/>
    // component: <Survey/>,
    // component: <Feedback />,
    component: <AddEdituser />,
  },
  {
    pathname: "/course/:id",
    component: <CourseDetail />,
  },
  {
    pathname: "/course/:id/video/:id",
    component: <CourseVideo />,
  },
  {
    pathname: "/course/:id/file/:id",
    component: <CoursePdf />,
  },
  {
    pathname: "/course/:id/pdf/:id",
    component: <CoursePdf />,
  },
  {
    pathname: "/group",
    component: <GroupAndCommunitiesLandingPage />,
  },
  {
    pathname: "/communities",
    component: <GroupAndCommunitiesLandingPage />,
  },
  {
    pathname: "/Groups&Communities/Chats",
    component: <Chat />,
  },
  {
    pathname: "/survey/submit/:id",
    component: <SurveySubmissionForm />,
  },
];

// Admin Dashboard
export const adminRoutes = [
  {
    pathname: "/:id/:token",
    component: <Home />,
  },
  {
    pathname: "/dashboard",
    component: <AdminDashboard />,
  },
  {
    pathname: "/user/edit/:id",
    component: <UserForm />,
  },
  {
    pathname: "/user/add",
    component: <UserForm />,
  },
  {
    pathname: "/user/bulk-upload",
    component: <BulkUpload />,
  },
  {
    pathname: "/user",
    component: <UserDashboard />,
  },
  {
    pathname: "/course",
    component: <CourseDashboard />,
  },
  {
    pathname: "/course/add",
    component: <CourseForm />,
  },
  {
    pathname: "/course/edit/:id",
    component: <CourseForm />,
  },
  {
    pathname: "/admin_asset",
    component: <AdminAsset />,
  },
  {
    pathname: "/roi",
    component: <ROIDashboard />,
  },
  {
    pathname: "/survey",
    component: <SurveyDashboard />,
  },
  {
    pathname: "/survey/:type",
    component: <SurveyForm />,
  },
  {
    pathname: "/survey/:type/:id",
    component: <SurveyForm />,
  },
  {
    pathname: "/reports",
    component: <Reports />,
  },
  {
    pathname: "/reports/activeUesr-report",
    component: <ActiveUserReports />,
  },
  {
    pathname: "/reports/user-report",
    component: <UserReport />,
  },
  {
    pathname: "/reports/course-report",
    component: <CourseReports />,
  },
  {
    pathname: "/reports/leardBoard-report",
    component: <LeaderBoardReports />,
  },
];
