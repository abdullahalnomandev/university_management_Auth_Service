'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManagementDepartment = void 0;
const mongoose_1 = require('mongoose');
const managementDepartmentSchema = new mongoose_1.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
exports.ManagementDepartment = (0, mongoose_1.model)(
  'ManagementDepartment',
  managementDepartmentSchema
);
