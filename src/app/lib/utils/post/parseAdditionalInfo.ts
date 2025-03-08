import { formatPhoneNumber } from '@/app/lib/utils/formatters';
import { departmentValues } from '../../constants/apply/selectValues';
import type { SeminarFormValues } from '../../schemas/seminarFormSchema';

type Department = SeminarFormValues['department'];
type Grade = SeminarFormValues['grade'];

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
