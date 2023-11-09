import { InsurancePolicy } from "@typedefs/policy";
import * as XLSX from "xlsx";

export const parseExcelFile = (file: any): Promise<InsurancePolicy[]> => {
  return new Promise((resolve, reject) => {
    try {
      const workbook = XLSX.readFile(file[0]?.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows: any = XLSX.utils.sheet_to_json(worksheet);
      resolve(rows);
    } catch (error) {
      console.log("error parsing: ", error);
      reject(null);
    }
  });
};
