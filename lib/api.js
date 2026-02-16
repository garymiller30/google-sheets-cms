import { google } from "googleapis";
import Day from "../models/Day";
import Lesson from "../models/Lesson";

const SHEET_NAME = "07.11-11.11";

export async function getWhyNextReasons() {
  const returnObj = {
    title: "невідомо",
    days: [],
  };
  try {
    const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      // we need to replace the escaped newline characters
      // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
      process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes,
    );
    const curTab = 5;
    const sheets = google.sheets({ version: "v4", auth: jwt });

    const sheetList = await sheets.spreadsheets.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
    });
    returnObj.title = sheetList.data.sheets[curTab].properties.title;

    // returnObj.title =
    //   sheetList.data.sheets[sheetList.data.sheets.length - 1].properties.title;
    // //console.log(sheetList.data.sheets[0].properties.title);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${returnObj.title}`,
    });

    const rows = response.data.values;

    if (rows.length && rows.length > 3) {
      const days = [];

      let curDay = null;

      let idx = 0;
      //skeep empty rows
      while (!rows[idx][0]) idx++;

      for (let index = idx; index < rows.length; index++) {
        const row = rows[index];
        console.log(row);
        if (row[0]) {
          if (curDay) days.push(curDay);

          curDay = new Day();
          curDay.title = row[0];
        }

        const lesson = new Lesson();
        lesson.subject = row[3] ?? null;
        lesson.time = row[2] ?? null;
        lesson.theme = row[6] ?? null;
        lesson.teacher = row[5] ?? null;
        lesson.link = row[7] ?? null;
        curDay.lessons.push(lesson);
      }
      if (curDay) days.push(curDay);

      returnObj.days = days;

      return JSON.parse(JSON.stringify(returnObj));
    }
  } catch (err) {
    console.log(err);
  }

  return returnObj;
}
