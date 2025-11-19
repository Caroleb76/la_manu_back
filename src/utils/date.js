import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

// le format datestring attendu est dd/mm/yyyy
function toIsoDate(dateString) {
  return dayjs(dateString, "DD/MM/YYYY")
    .startOf("day")
    .format("YYYY-MM-DDTHH:mm:ss.SSS");
}

function toStandardDate(dateString) {
  const formats = [
    "DD/MM/YYYY",
    "DD-MM-YYYY",
    "YYYY-MM-DD",
    "YYYY/MM/DD",
    "MM/DD/YYYY",
  ];
  const parsed = dayjs(dateString, formats, true);
  if (!parsed.isValid()) {
    throw new Error("invalid date format");
  }
  return parsed.format("YYYY-MM-DD");
}

export { toIsoDate, toStandardDate };
