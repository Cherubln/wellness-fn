"use client";

import ExcelJS from "exceljs";
import Papa from "papaparse";

export const extractEmailsFromFile = async (file: File): Promise<string[]> => {
  if (!file) return [];

  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  let emails: string[] = [];

  if (fileExtension === "csv") {
    emails = await readCSVFile(file);
  } else if (fileExtension === "xlsx") {
    emails = await readExcelFile(file);
  } else {
    throw new Error(
      "Unsupported file type. Please upload an Excel (.xlsx) or CSV (.csv) file."
    );
  }

  return Array.from(new Set(emails)); // Remove duplicates
};

// Extract emails using regex
const extractEmails = (data: any[]): string[] => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
  return data
    .flatMap((item) =>
      typeof item === "string" ? item.match(emailRegex) ?? [] : []
    )
    .map((email) => email as string);
};

// Read CSV file
const readCSVFile = (file: File): Promise<string[]> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      complete: (result) => resolve(extractEmails(result.data.flat())),
      header: false,
    });
  });
};

// Read Excel file
const readExcelFile = async (file: File): Promise<string[]> => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(await file.arrayBuffer());
  const worksheet = workbook.worksheets[0];

  let emails: string[] = [];
  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      if (typeof cell.value === "string" && cell.value.includes("@")) {
        emails.push(cell.value);
      }
    });
  });

  return emails;
};
