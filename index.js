function reverseString(string) {
    var listOfChars = string.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedString = reverseListOfChars.join('');
    return reversedString;
    // return string.split('').reverse().join('');
}


function isPalindrome(string) {
    const reverse = reverseString(string);
    return (string === reverse)
}


function convertDateToString(date) {
    const dateString = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateString.day = "0" + date.day;
    } else {
        dateString.day = date.day.toString();
    }
    if (date.month < 10) {
        dateString.month = "0" + date.month;
    } else {
        dateString.month = date.month.toString();
    }
    dateString.year = date.year.toString();

    return dateString
}

function getAllDateFormats(date) {
    const dateString = convertDateToString(date)

    const ddmmyyyy = dateString.day + dateString.month + dateString.year;
    const mmddyyyy = dateString.month + dateString.day + dateString.year;
    const yyyymmdd = dateString.year + dateString.month + dateString.day;
    const ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    const mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
    const yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    const listOfPalindromes = getAllDateFormats(date)

    var flag = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function leapYear(year) {
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month === 2){
        // check for leap year
        if(leapYear(year)){
            if(day>29){
                day = 1;
                month++;
            }
        }
        else {
            if(day >28){
                day = 1;
                month++;
            }
        }
    } 
    else {
        if(day > daysInMonth[month - 1]){
            day= 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++ 
    }

    return {
        day: day,
        month: month,
        year: year,
      };
}
function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
  
    while(1){
      ctr++;
      var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
  }
  
  var dateInputRef = document.querySelector('#bday-input');
  var showBtnRef = document.querySelector('#output-btn');
  var resultRef = document.querySelector('#output');
  
  function clickHandler(e){
    var bdayString = dateInputRef.value;
    
    if(bdayString !== ''){
      var listOfDate = bdayString.split('-'); // 
  
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };
      
      var isPalindrome = checkPalindromeForAllDateFormats(date);
  
      if(isPalindrome){
         resultRef.innerText = 'Yaaay! Your birthday is a Palindrome!! 🥳🥳';
      }
      else {
        var [ctr, nextDate] = getNextPalindromeDate(date);
  
        resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, Oops!!you missed it by ${ctr} days!`;
      }
    }
  }
  
  showBtnRef.addEventListener('click', clickHandler);