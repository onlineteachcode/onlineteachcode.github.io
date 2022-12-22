(function(){
  
  // Declare global variable
  var elem = document.getElementById('dob'),
      age  = document.getElementById('age');
  
  // Step to step
  // Step 01: declare input events (change)
  elem.addEventListener("change", function(){
    if (checkInput(elem.value)){
      var ageCount = calculateAge(parseDate(elem.value), new Date());
      elem.style.borderColor = '#44b2f8';
      elem.style.boxShadow = '0px 0px 4px green';
      age.innerHTML = ageCount[0] + ' years old and ' + ageCount[1] + ' days';
      age.classList.remove('wrong');
      age.classList.add('success');
    } else {
      elem.style.borderColor = 'red';
      elem.style.boxShadow = '0px 0px 4px red';
      age.innerHTML = 'Please enter the correct syntax';
      age.classList.remove('success');
      age.classList.add('wrong');
    } 
  }, false);
  
  // Step 02: Check input is not undifined & correct syntax
  function checkInput(textDate){
    var getTextDate = textDate;
    if(getTextDate == '') {
      // If input when change is empty => result return true (NaN)
      return true;
    } else {
      
      // Declare regular expression 
      var regularDate = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
      // Search regular expression and return Array
      // it's return every elem ( ex: 27/12/1992 => array [27/12/1992,27,/,12,/,1992] )
      var matchArray = getTextDate.match(regularDate); // is format OK?
      if (matchArray == null) {
        // When input center is Alpha return false -Please enter the correct syntax-
        return false;
      } else {
        
        // Checks for dd/mm/yyyy format.
        var matchDay = matchArray[1];
        var matchMonth = matchArray[3];
        var matchYear = matchArray[5];
        
        // Check input year large year now3
        if(new Date(matchYear).getFullYear() >= new Date().getFullYear()) {
          return false;
        }
        
        if (matchDay > 31 || matchDay < 1) {
          return false;
        } else if (matchMonth > 12 || matchMonth < 1) {
          return false;
        } else if ((matchMonth == 2 || matchMonth == 4 || matchMonth == 6 || matchMonth == 9 || matchMonth == 11) && matchDay == 31) {
          return false;
        } else if (matchMonth == 2) {
          var isleap = (matchYear % 4 == 0 && (matchYear % 100 != 0 || matchYear % 400 == 0));
          if (matchDay > 29 || (matchDay == 29 && !isleap)) {
           return false; 
          } else {}
        }
        
      }
      
    }
    
    return true;
    
  }
  
  // Step 03: convert value from input(string) to format date dd/mm/yyyy
  function parseDate(stringText){
    var formatText = stringText.split('/');
    return new Date(formatText[2], (formatText[1] - 1), formatText[0]);
  }
  
  // Step 04: call function calculate (result how old years & date)
  function calculateAge(DateFromInput, DateNow){
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var age = Math.round(Math.abs((DateFromInput.getTime() - DateNow.getTime())/(oneDay)));
    var resultYear = Math.ceil(age / 365) - 1;
    var resultDay = age - (resultYear*365);
    var resultage = [];
    resultage.push(resultYear, resultDay);
    return resultage;
    
  }
  
})();