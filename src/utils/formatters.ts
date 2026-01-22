import { formatDistanceToNow, parseISO, format } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return dateString;
  }
};

export const formatFullDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy');
  } catch {
    return dateString;
  }
};

export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const formatSalary = (salary: string | undefined): string => {
  if (!salary) return 'Not specified';
  return salary;
};

export const extractStateFromLocation = (location: string): string | null => {
  const stateMatch = location.match(/,\s*([A-Z]{2})$/);
  return stateMatch ? stateMatch[1] : null;
};
