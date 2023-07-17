'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Student = exports.studentSchema = void 0;
const mongoose_1 = require('mongoose');
const student_constant_1 = require('./student.constant');
const { ObjectId } = mongoose_1.Schema.Types;
exports.studentSchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: student_constant_1.gender,
    },
    bloodGroup: {
      type: String,
      enum: student_constant_1.bloodGroup,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      required: true,
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherOccupation: {
          type: String,
          required: true,
        },
        fatherContactNo: {
          type: String,
          unique: true,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherOccupation: {
          type: String,
          required: true,
        },
        motherContactNo: {
          type: String,
          unique: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    profileImage: {
      type: String,
      // required: true,
    },
    localGuardian: {
      required: true,
      type: {
        name: {
          type: String,
          required: true,
        },
        occupation: {
          type: String,
          required: true,
        },
        contactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    academicSemester: {
      type: ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: ObjectId,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
exports.Student = (0, mongoose_1.model)('Student', exports.studentSchema);
