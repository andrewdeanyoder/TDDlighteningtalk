// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  // Once you've read this, go ahead and try to implement this function, then return to the console.

  //set card names at beginning, for easy access
  var dcName = "Diner's Club";
  var aeName = 'American Express';
  var vName = 'Visa';
  var mcName = 'MasterCard';
  var disName = 'Discover';
  var maeName = 'Maestro';

  //check if input is a string
  if(typeof cardNumber !== 'string'){
    return 'Please input a string';
  }

  //check if input converts to a number
  if(Number.isNaN(Number(cardNumber))) {
    return 'not a number formatted as a string';
  }

  //test for a Diner's Club card
  if(cardNumber.length === 14 && cardNumber[0] === '3' && (cardNumber[1] === '8' || cardNumber[1] === '9')) {
    return dcName;
  }
  //test for an American Express card
  else if (cardNumber.length === 15 && cardNumber[0] === '3' && (cardNumber[1] === '4' || cardNumber[1] === '7')) {
    return aeName;
  }
  //test for a Visa
  else if((cardNumber.length === 13 || cardNumber.length === 16 || cardNumber.length === 19) && cardNumber[0] === '4') {
    return vName;
  }
  //test for a MasterCard
  else if(cardNumber.length === 16 && cardNumber[0] === '5' && parseInt(cardNumber[1],10) >= 1 && parseInt(cardNumber[1],10) <= 5) {
    return mcName;
  }
  //test for a Discover Card
  //6011, 644-649, or 65, and a length of 16 or 19.
  //if card length is 16 or 19 and first digit is 6
  else if ((cardNumber.length === 16 || cardNumber.length === 19) && cardNumber[0] === '6') {

    //isolate indices 1 & 2 or 1, 2 & 3
    var nextTwoDigits = cardNumber.substring(1,3);
    var nextThreeDigits = cardNumber.substring(1,4);
    //test if these are 011, 44-49, or 5
    if(nextThreeDigits === '011' || (parseInt(nextTwoDigits, 10) >= 44 && parseInt(nextTwoDigits, 10) <= 49) || cardNumber[1] === '5')
    {
      return disName;
    }
  }
  //test for a Maestro
    //prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
  //first test for length
  if (cardNumber.length >= 12 && cardNumber.length <= 19) {
    //then test for prefixes
    var firstFourDigits = cardNumber.substring(0,4);
    if (firstFourDigits === '5018' || firstFourDigits === '5020' || firstFourDigits === '5038' || firstFourDigits === '6304') {
      return maeName;
    }
  }
  else {
    return 'No Network';
  }
};