import { RedisClient } from '../../../shared/redis';
import {
    EVENT_ACADEMIC_SEMESTER_CREATED,
    EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemester.constant';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const initAcademicSemesterEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await AcademicSemesterService.createSemesterFromEvent(data);
    // console.log(data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    await AcademicSemesterService.updateOneIntoDBFromEvent(data);
    // console.log("updated data",data);
  });
};

export default initAcademicSemesterEvents;
