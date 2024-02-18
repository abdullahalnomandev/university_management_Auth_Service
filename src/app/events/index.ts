import initAcademicDepartmentEvents from "../modules/academicDepartment/academicDepartment.event";
import initAcademicFacultyEvents from "../modules/academicFaculty/academicFaculty.event";
import initAcademicSemesterEvents from "../modules/academicSemester/academicSemester.event";

const subscribeTOEvents = () => {
    initAcademicSemesterEvents()
    initAcademicFacultyEvents()
    initAcademicDepartmentEvents()
}

export default subscribeTOEvents;