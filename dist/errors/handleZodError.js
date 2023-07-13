"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    var _a;
    const errors = (_a = error === null || error === void 0 ? void 0 : error.issues) === null || _a === void 0 ? void 0 : _a.map(({ message, path }) => ({
        path: path[(path === null || path === void 0 ? void 0 : path.length) - 1],
        message,
    }));
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
};
exports.default = handleZodError;
