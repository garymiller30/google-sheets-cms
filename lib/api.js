import { google } from "googleapis";
import Day from "../models/Day";
import Lesson from "../models/Lesson";

const SHEET_NAME = "10.10-14.10";

export async function getWhyNextReasons() {
  try {
    const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      // we need to replace the escaped newline characters
      // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
      process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: SHEET_NAME,
    });

    const rows = response.data.values;

    if (rows.length && rows.length > 3) {
      const days = [];

      let curDay = null;
      for (let index = 3; index < rows.length; index++) {
        const row = rows[index];
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

      return JSON.parse(JSON.stringify(days));
    }
  } catch (err) {
    console.log(err);
  }

  return [];
}
