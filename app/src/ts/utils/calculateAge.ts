import { formatDistanceToNow, isValid } from "date-fns";

const calculateAge = (date: string) => {
  if (isValid(new Date(date))) {
    const birthDate = new Date(date);
    const currentDate = new Date();

    if (birthDate.getFullYear() === currentDate.getFullYear()) {
      return 0;
    }

    const ageString = formatDistanceToNow(birthDate, {
      addSuffix: false,
    }).match(/\d+/)?.[0];

    if (ageString) {
      return parseInt(ageString);
    }
  }
  return 0;
};

export default calculateAge;
