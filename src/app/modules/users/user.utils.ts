import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generatedStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let incrementedId = (Number(currentId) + 1).toString().padStart(5, '0');
  // incrementedId = `${academicSemester?.year.substring(2)}${ academicSemester?.code}${incrementedId}`;
  
  incrementedId = `${academicSemester?.year.toString().substring(2) ?? ''}${ academicSemester?.code ?? '' }${incrementedId}`;
  return incrementedId;
};

export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedId = (Number(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (Number(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
