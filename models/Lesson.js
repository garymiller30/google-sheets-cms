export default class Lesson {
  _time = "00.00-00.00";

  timeStart = null;
  timeEnd = null;
  subject = null;
  teacher = null;
  theme = null;
  link = null;
  homeWord = null;
  checkDate = null;
  get time() {
    return this._time;
  }
  set time(value) {
    if (!value) return;

    [this.timeStart, this.timeEnd] = value.split("-");
  }
}
