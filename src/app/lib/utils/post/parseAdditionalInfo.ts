import { formatPhoneNumber } from '@/app/lib/utils/formatters';
import { getDateForWeekday } from '@/app/lib/utils/dateUtils';
import { departmentValues } from '../../constants/apply/selectValues';
import type { SeminarFormValues } from '../../schemas/seminarFormSchema';

type Department = SeminarFormValues['department'];
type Grade = SeminarFormValues['grade'];

type AdditionalInfo = {
  department: string;
  studentId: number;
  grade: number;
  phoneNumber: string;
};

const GRADE_VALUES = new Set(['1', '2', '3', '4']);

const parseDepartment = (department: string): Department => {
  if (!departmentValues.includes(department as Department)) {
    return departmentValues[0];
  }

  return department as Department;
};

const parseGrade = (grade: number): Grade => {
  const gradeStr = String(grade);

  if (!GRADE_VALUES.has(gradeStr)) {
    return '1';
  }

  return gradeStr as Grade;
};

const parsePhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber.includes('-')) {
    return formatPhoneNumber(phoneNumber);
  }

  return phoneNumber;
};

export const getInitFormValues = ({
  department,
  studentId,
  grade,
  phoneNumber,
}: AdditionalInfo) => {
  const initFormValues = {
    department: parseDepartment(department),
    studentId: String(studentId),
    grade: parseGrade(grade),
    phoneNumber: parsePhoneNumber(phoneNumber),
    preferredDate: getDateForWeekday(4),
  };

  return initFormValues;
};
