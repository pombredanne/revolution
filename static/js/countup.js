function CountUp(msg, initDate, id){
  this.msg = msg;
  this.initDate = initDate;
  this.currentDate = initDate;
  this.beginDate = new Date(initDate);
  this.numOfDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
  this.hours = 0, this.minutes = 0, this.seconds = 0;
  this.updateNumOfDays();
  this.calculate(id, 3*59*60*1000);
}
CountUp.prototype.updateNumOfDays=function(){
  var dateNow = new Date();
  var currYear = dateNow.getFullYear();
  if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
    this.numOfDays[1] = 29;
  }
  var self = this;
  setTimeout(function(){self.updateNumOfDays();}, (new Date((currYear+1), 1, 1) - dateNow));
}
 
CountUp.prototype.datePartDiff=function(then, now, MAX){
  var diff = now - then - this.borrowed;
  this.borrowed = 0;
  if ( diff > -1 ) return diff;
  this.borrowed = 1;
  return (MAX + diff);
}
 
CountUp.prototype.formatTime=function(){
  this.seconds = this.addLeadingZero(this.seconds);
  this.minutes = this.addLeadingZero(this.minutes);
  this.hours = this.addLeadingZero(this.hours);
}
 
CountUp.prototype.addLeadingZero=function(value){
  return value < 10 ? ("0" + value) : value;
}
 
CountUp.prototype.calculate=function(id, time){
  this.prevDays = this.days;
  var prevDate = this.beginDate;
  this.currentDate += time;
  var currDate = new Date(this.currentDate);
  this.seconds = this.datePartDiff(prevDate.getSeconds(), currDate.getSeconds(), 60);
  this.minutes = this.datePartDiff(prevDate.getMinutes(), currDate.getMinutes(), 60);
  this.hours = this.datePartDiff(prevDate.getHours(), currDate.getHours(), 24);
  var dayBUG = currDate.getMonth()-1;
  if (-1 == dayBUG) dayBUG = 11;
  this.days = this.datePartDiff(prevDate.getDate(), currDate.getDate(), this.numOfDays[dayBUG]);
  this.months = this.datePartDiff(prevDate.getMonth(), currDate.getMonth(), 12);
  this.years = this.datePartDiff(prevDate.getFullYear(), currDate.getFullYear(),0);
  this.formatTime();
  var countainer = document.getElementById(id);

  if ( this.months == 1) {
    this.days = 0;
    this.hours = 0;
    this.minutes = 0;
  }

  var html = this.msg+"<br/>";
  if (this.years > 0) html += "<div class='number'><div class='num'>" + this.years + "</div><div class='desc'>" + (this.years == 1? "year" : "years") + "</div></div>";
  if (this.months > 0) html += "<div class='number'><div class='num'>" + this.months + "</div><div class='desc'>" + (this.months == 1? "month" : "months") + "</div></div>";
  html += "<div class='number'><div class='num'>" + this.days + "</div><div class='desc'>" + (this.days == 1? "day" : "days") + "</div></div>";
  html += "<div class='number'><div class='num'>" + this.hours + "</div><div class='desc'>" + (this.hours == 1? "hour" : "hours") + "</div></div>";
  html += "<div class='number'><div class='num'>" + this.minutes + "</div><div class='desc'>" + (this.minutes == 1? "minute" : "minutes") + "</div></div>";
  // html += "<div class='number'><div class='num'>" + this.seconds + "</div><div class='desc'>" + (this.seconds == 1? "second" : "seconds") + "</div></div>";
  countainer.innerHTML = html;
  var self = this;
  if ( this.months != 1) {setTimeout(function(){
    self.calculate(id, time);}, 100);
    if (this.prevDays != this.day) {
      console.log("YEEEEE");
      theline.attr("d", line(Pro.slice(0, this.days)));
      theline1.attr("d", line1(Against.slice(0, this.days)));
    }
    if (this.months == 1) {
      theline.attr("d", line(Pro));
      theline1.attr("d", line1(Against));
    }
  }
  else { countainer.className = "finished"; }
}