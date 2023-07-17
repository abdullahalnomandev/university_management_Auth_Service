'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.adminFilterableFields = exports.bloodGroup = exports.gender = void 0;
exports.gender = ['male', 'female'];
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
// export const facultySearchableFields = [
//   'id',
//   'email',
//   'contactNo',
//   'name.firstName',
//   'name.middleName',
//   'name.lastName',
// ];
exports.adminFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'academicYear',
  'emergencyContactNo',
];
