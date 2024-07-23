import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { StrictMode } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';

import NotFound from './Component/Registrar/Pages/NotFound';

// Layout
import RegistrarLayout from './Layout/RegistrarLayout';
import DashboardLayout from './Layout/DashboardLayout';

// Registrar
import RAcademicStructure from './Component/Registrar/Pages/AcademicStructure'
import RAdministrator from './Component/Registrar/Pages/Administrator'
import RBlockSchedule from './Component/Registrar/Pages/BlockSchedule'
import RClassroom from './Component/Registrar/Pages/Classroom'
import REnlistment from './Component/Registrar/Pages/Enlistment'
import RPersonnel from './Component/Registrar/Pages/Personnel'
import RReports from './Component/Registrar/Pages/Reports'
import RStudent from './Component/Registrar/Pages/Student'
import RUser from './Component/Registrar/Pages/User'

// Security
import Login from './Component/Security/Login'
import Register from './Component/Security/Register'

// Enlistment Child
import Downpayment from './Component/Registrar/Modal/Enlistment/Downpayment'
import Enlistment from './Component/Registrar/Modal/Enlistment/AddEnlistment'
import DefaultShowEnlistment from './Component/Registrar/Modal/Enlistment/EnlistmentChild/Child/DefaultShowEnlistment'
import AddNewMatriculation from './Component/Registrar/Modal/Enlistment/EnlistmentChild/Child/AddNewMatriculation'

// Child of Show Enlistment
/*
  import DefaultEnlistment from './Component/Registrar/Modal/Enlistment/EnlistmentChild/Child/Show/DefaultEnlistment'
  import EnlistmentDetail from './Component/Registrar/Modal/Enlistment/EnlistmentChild/Child/Show/EnlistmentDetail'
  import FeesBreakdown from './Component/Registrar/Modal/Enlistment/EnlistmentChild/Child/Show/FeesBreakdown'
*/


// Child of Student
import AddStudent from './Component/Registrar/Modal/Student/StudentChild/Child/Student/AddStudent'
import ShiftStudent from './Component/Registrar/Modal/Student/StudentChild/Modal/ShiftStudent'

import ShowStudent from './Component/Registrar/Modal/Student/StudentChild/Child/Student/ShowStudent'
import EditStudent from './Component/Registrar/Modal/Student/StudentChild/Child/Student/EditStudent'

// Student ledger
import ShowStudentLedger from './Component/Registrar/Modal/Student/StudentChild/Child/StudentLedger/ShowStudentLedger'

import AddPayment from './Component/Registrar/Modal/Student/AddPayment'
import AddExamPermit from './Component/Registrar/Modal/Student/AddExamPermit'
import AddChargetoGroup from './Component/Registrar/Modal/Student/AddChargeToGroup'
import ManagePayment from './Component/Registrar/Modal/Student/ManagePayment'

import ManageCharge from './Component/Registrar/Modal/Student/ManageCharge'
import ManageInstallment from './Component/Registrar/Modal/Student/ManageInstallment'

import ManageExamPermit from './Component/Registrar/Modal/Student/ManageExamPermit'
import PCTTransferees from './Component/Registrar/Modal/Student/PCTTransferees'

// Personnel
import AddPersonnel from './Component/Registrar/Modal/Personal/AddPersonnel'
import ShowPersonnel from './Component/Registrar/Modal/Personal/PersonalChild/Child/Personnel/ShowPersonnel'
import UpdatePersonnel from './Component/Registrar/Modal/Personal/PersonalChild/Child/Personnel/UpdatePersonnel'

import ReportFilter from './Component/Registrar/Modal/Personal/ReportFilter'
import BlockScheduleModal from './Component/Registrar/Modal/BlockSchedule/BlockScheduleModal'

// Block Schedule Child
// import AddNewBlockSchedule from './Component/Registrar/Modal/BlockSchedule/BlockScheduleChild/Child/AddBlockSchedule/NewBlockSchedule'
import UpdateBlockScheduleModal from './Component/Registrar/Modal/BlockSchedule/BlockScheduleChild/Child/BlockSchedule/UpdateBlockScheduleModal';

import ScheduleCatalog from './Component/Registrar/Modal/BlockSchedule/ScheduleCatalogModal'
import NewClassroom from './Component/Registrar/Modal/Classroom/NewEditClassroom'

import EditCollege from './Component/Registrar/Modal/AcademicStructure/AcademicStructureChild/Child/College/EditCollege'
import AddCollege from './Component/Registrar/Modal/AcademicStructure/AcademicStructureChild/Child/College/AddCollege'

import College from './Component/Registrar/Modal/AcademicStructure/College'
import Department from './Component/Registrar/Modal/AcademicStructure/Department'

import AddDepartment from './Component/Registrar/Modal/AcademicStructure/AcademicStructureChild/Child/Department/AddDepartment'
import EditDepartment from './Component/Registrar/Modal/AcademicStructure/AcademicStructureChild/Child/Department/EditDepartment'

import Program from './Component/Registrar/Modal/AcademicStructure/Program'
import AddProgram from './Component/Registrar/Modal/AcademicStructure/AcademicStructureChild/Child/Program/AddProgram'
import EditProgram from './Component/Registrar/Modal/AcademicStructure/AcademicStructureChild/Child/Program/EditProgram'

import Course from './Component/Registrar/Modal/AcademicStructure/Course'
import AddCourse from './Component/Registrar/Modal/AcademicStructure/AcademicStructureChild/Child/Course/AddCourse';

import AddCurriculum from './Component/Registrar/Modal/AcademicStructure/AcademicStructureChild/Child/Curriculum/AddCurriculum'
import EditCurriculum from './Component/Registrar/Modal/AcademicStructure/AcademicStructureChild/Child/Curriculum/EditCurriculum'
import AddSubjects from './Component/Registrar/Modal/AcademicStructure/AcademicStructureChild/Child/Curriculum/AddSubjects'
import ShowCurriculum from './Component/Registrar/Modal/AcademicStructure/AcademicStructureChild/Child/Curriculum/ShowCurriculum'

import StaffAccount from './Component/Registrar/Modal/Users/StaffAccount'
import AddStaff from './Component/Registrar/Modal/Users/UsersChild/Child/Staff/AddStaff'
import EditStaff from './Component/Registrar/Modal/Users/UsersChild/Child/Staff/EditStaff'

import EditAdministratorSettings from './Component/Registrar/Modal/Administrator/AdministratorChild/Child/Administrator/EditAdministratorSettings'

import SemesterSettings from './Component/Registrar/Modal/Administrator/SemesterSettings'
import ShowSemester from './Component/Registrar/Modal/Administrator/AdministratorChild/Child/Semester/ShowSemester'

import GradingSystem from './Component/Registrar/Modal/Administrator/GradingSystem'
import EditGradingSystem from './Component/Registrar/Modal/Administrator/AdministratorChild/Child/GradingSystem/EditGradingSystem'

import MiscellaneousFee from './Component/Registrar/Modal/Administrator/MiscellaneousFee'

import OthersFee from './Component/Registrar/Modal/Administrator/OthersFee'
import Dashboard from './Component/Registrar/Pages/Dashboard'
import PrivateRoute from './PrivateRoute';

import PaymentCollection from './Component/Registrar/Modal/Reports/PaymentCollection';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<DashboardLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='create-account' element={<Register />} />
          <Route path='forgot-password' />npm start
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="registrar" element={<RegistrarLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='academicstructure' element={<RAcademicStructure />}>
              <Route path='course' element={<Course />}>
                <Route path='add-course/:success' element={<AddCourse />} />
              </Route>
              <Route path='program' element={<Program />}>
                <Route path='add-program' element={<AddProgram />}/>
                <Route path='edit-program/:id' element={<EditProgram />} />
              </Route>
              <Route path='department' element={<Department />}>
                <Route path='add-department' element={<AddDepartment />} />
                <Route path='edit-department/:id' element={<EditDepartment />} />
              </Route>
              <Route path='add-curriculum' element={<AddCurriculum />} />
              <Route path='show-curriculum/:id' element={<ShowCurriculum />}>

              </Route>
              <Route path='edit-curriculum/:curno' element={<EditCurriculum />} />
              <Route path='college' element={<College />}>
                <Route path='edit-college/:collegeno' element={<EditCollege />} />
                <Route path='add-college' element={<AddCollege />} />
              </Route>
            </Route>
            <Route path='administrator' element={<RAdministrator />} >
              <Route path='edit-administrator-settings' element={<EditAdministratorSettings />}>

              </Route>
              <Route path='semester-settings' element={<SemesterSettings />} />
              <Route path='grading-system' element={<GradingSystem />}>
                <Route path='edit-grading-system' element={<EditGradingSystem />}></Route>
              </Route>
              <Route path='miscellaneous-fee' element={<MiscellaneousFee />} />
              <Route path='others-fee' element={<OthersFee />} />
            </Route>
            <Route path='block-schedule' element={<RBlockSchedule />} >
              <Route path='add-block-schedule' element={<BlockScheduleModal />} />
              <Route path='update-block-schedule/:BlockID' element={<UpdateBlockScheduleModal />} />
              <Route path='schedule-category' element={<ScheduleCatalog />}/>
            </Route> 
            <Route path='classroom' element={<RClassroom />} >
              <Route path='classroom-new-edit' element={<NewClassroom />} />
            </Route>
            <Route path='enlistment' element={<REnlistment />} >
              <Route path='adddownpayment' element={<Downpayment />} /> 
              <Route path='addenlistment' element={<Enlistment />} />
              <Route path='matriculationchange/:registrationno' element={<AddNewMatriculation />}/>
              <Route path='showenlistment/:registrationno' element={<DefaultShowEnlistment />} >
                <Route path='show-student-ledger/:studentid' element={<ShowStudentLedger />} />
              </Route>
            </Route>
            <Route path='personnel' element={<RPersonnel />} >
              <Route path='add-personnel' element={<AddPersonnel />} />
                {
                  /*
                    <Route path='personnel-information' element={<PersonnelInformation />}/>
                    <Route path='professional-license/:personneldetails?/:personnelbackground?/:personnellicense?/:teachingassignment?' element={<ProfessionalLicense />} />
                    <Route path='educational-background/:personneldetails?/:personnelbackground?/:personnellicense?/:teachingassignment?' element={<EducationalBackground />} />
                    <Route path='teaching-assignment/:personneldetails?/:personnelbackground?/:personnellicense?/:teachingassignment?'  element={<TeachingAssignment />}/>
                  */
                }
              <Route path='show-personnel/:id' element={<ShowPersonnel />} />
              <Route path='update-personnel/:id' element={<UpdatePersonnel />} />
              <Route path='report-filter' element={<ReportFilter />} ></Route>
            </Route>
            <Route path='reports' element={<RReports />} >
              <Route path='payment-collection' element={<PaymentCollection />} />
            </Route>
            <Route path='student' element={<RStudent />}>
              <Route path='manage-payment' element={<ManagePayment />} />
              <Route path='payment' element={<AddPayment />} />
              <Route path='add-student' element={<AddStudent />}/>
              <Route path='show-student/:studentid' element={<ShowStudent />} />
              <Route path='edit-student/:studentid' element={<EditStudent />} />
              <Route path='show-student-ledger/:studentid' element={<ShowStudentLedger />} />
              <Route path='shift-student' element={<ShiftStudent />} />
              <Route path='add-exam-permit' element={<AddExamPermit />} />
              <Route path='add-charge-to-group' element={<AddChargetoGroup />} />
              <Route path='manage-charge' element={<ManageCharge />} />
              <Route path='manage-installment' element={<ManageInstallment />} />
              <Route path='manage-exam-permit' element={<ManageExamPermit />} />
              <Route path='pct-tranferees' element={<PCTTransferees />} />
            </Route>
            <Route path='user' element={<RUser />} >
              <Route path='user-staff-account' element={<StaffAccount />}>
                <Route path='new-staff' element={<AddStaff />}/>
                <Route path='edit-staff' element={<EditStaff />}/>
              </Route>
              <Route path='user-faculty-account' >

              </Route>
            </Route>
            <Route component={NotFound} />
          </Route>
        </Route>
      </>
    )
  )
  
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

  export default App;
