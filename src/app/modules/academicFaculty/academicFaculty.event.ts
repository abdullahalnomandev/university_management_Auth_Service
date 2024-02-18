import { RedisClient } from "../../../shared/redis";
import { EVENT_ACADEMIC_FACULTY_CREATED } from "./academicFaculty.constant";
import { IAcademicFacultyEvent } from "./academicFaculty.interface";
import { AcademicFacultyService } from "./academicFaculty.service";

const initAcademicFacultyEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_CREATED , async (e: string) => {
    const data: IAcademicFacultyEvent = JSON.parse(e);
    await AcademicFacultyService.createFacultyFromEvent(data);
  });


};

export default initAcademicFacultyEvents;
