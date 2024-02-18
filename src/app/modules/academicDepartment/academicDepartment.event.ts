import { RedisClient } from '../../../shared/redis';
import { EVENT_ACADEMIC_DEPARTMENT_CREATED } from './academicDepartment.constant';
import { IAcademicDepartmentEvent } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';


const initAcademicDepartmentEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_DEPARTMENT_CREATED, async (e: string) => {
    const data: IAcademicDepartmentEvent = JSON.parse(e);
    await AcademicDepartmentService.createDepartmentFromEvent(data)
    console.log('data: :', data);
  });
};

export default initAcademicDepartmentEvents;
