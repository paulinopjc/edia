import moment from "moment";

export const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement> | any, data: any, setData: React.Dispatch<React.SetStateAction<any>>, isChildForm?: boolean, isOther?: boolean, values?: any) => {
  const { name, value } = event.target;
  let parsedValue: any = value;
  const parsedDate = Date.parse(value);
  if (isValidDateFormat(value) && !isNaN(parsedDate)) {
    parsedValue = new Date(parsedDate);
    return setData({ ...data, [name]: parsedValue });
  }
};

export const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any, data: any, setData: React.Dispatch<React.SetStateAction<any>>, isChildForm?: boolean, isOther?: boolean, values?: any) => {
  const { name, value } = event.target;

  if (isOther) {
    if (values) {
      return setData({ ...data, motor: { ...data?.motor, other: { ...data?.motor?.other, [name]: values?.floatValue } } });
    }
    return setData({ ...data, motor: { ...data?.motor, other: { ...data?.motor?.other, [name]: value } } });
  }

  if (isChildForm) return setData({ ...data, [data?.type.toLowerCase()]: { ...data[data?.type?.toLowerCase()], [name]: value } });
  return setData({ ...data, [name]: value?.toUpperCase() });
};

export const arrayToObject = (arr: []) => {
  return arr.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {});
};

export const objectToArray = (obj: any) => {
  const { fields } = obj;
  return Object.entries(fields).map(([key, value]) => ({
    key,
    value,
  }));
};

function isValidDateFormat(value: any) {
  return moment(value, moment.ISO_8601, true).isValid();
}
