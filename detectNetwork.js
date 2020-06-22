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
  var cardnames = ["Diner's Club", 'American Express', 'MasterCard', 'Discover', 'Maestro', 'China UnionPay', 'Switch', 'Visa'];

  //check if input is a string
  if(typeof cardNumber !== 'string'){
    return 'Please input a string';
  }

  //check if input converts to a number
  if(Number.isNaN(Number(cardNumber))) {
    return 'not a number formatted as a string';
  }

  //helper function for Diner's Club card
  var isDinersClub = function (prefix, length) {
    return (prefix === '38' || prefix === '39') && length === 14;
  }

  //test for Diner's club
  if(isDinersClub(cardNumber.substring(0, 2), cardNumber.length)) {
    return cardnames[0];
  }

  //helper function for an American Express card
  var isAmExpress = function (prefix, length) {
    return (prefix === '34' || prefix === '37') && length === 15;
  }

  //test for American Express
  if(isAmExpress(cardNumber.substring(0, 2), cardNumber.length)) {
    return cardnames[1];
  }

  //helper function for MasterCard
  var isMasterCard = function (prefix, length) {
    return prefix >= 51 && prefix <= 55 && length === 16;
  }

  //convert first two digits to a number
  var prefix = parseInt(cardNumber.substring(0, 2), 10);

  //Test for Mastercard
  if(isMasterCard(prefix, cardNumber.length)) {
    return cardnames[2];
  }


  //get first four digits for Discover prefix
  var prefix = cardNumber.substring(0, 4);

  //helper function for a Discover Card
    //prefix: 6011, 644-649, or 65, and a length of 16 or 19.
  var isDiscover = function (prefix, length) {
    //test the length
    if (length === 16 || length === 19) {

      //isolate certain digits of the prefix
      var firstTwoDigits = prefix.substring(0,2);
      var firstThreeDigits = parseInt(prefix.substring(0,3), 10);

      //test the prefix
      if(prefix === '6011' || (firstThreeDigits >= 644 && firstThreeDigits <= 649) || firstTwoDigits === '65') {
        return true;
      }
    } else {
      return false;
    }
  }

  //test for Discover
  if(isDiscover(prefix, cardNumber.length)) {
    return cardnames[3];
  }

  //test for a Maestro
    //prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
  //first test for length
  if (cardNumber.length >= 12 && cardNumber.length <= 19) {
    //then test for prefixes
    var firstFourDigitsMaestro = cardNumber.substring(0,4);
    if (firstFourDigitsMaestro === '5018' || firstFourDigitsMaestro === '5020' || firstFourDigitsMaestro === '5038' || firstFourDigitsMaestro === '6304') {
      return cardnames[4];
    }
  }

  //test for China UnionPay
    //prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
  //first test for length
  if (cardNumber.length >= 16 && cardNumber.length <= 19) {
    var firstSixDigitsUnion = parseInt(cardNumber.substring(0,6), 10);
    var firstThreeDigitsUnion = parseInt(cardNumber.substring(0,3), 10);
    var firstFourDigitsUnion = parseInt(cardNumber.substring(0,4), 10);
    //then test prefixes
    if ((firstSixDigitsUnion >= 622126 && firstSixDigitsUnion <= 622925) || (firstThreeDigitsUnion >= 624 && firstThreeDigitsUnion <= 626) || (firstFourDigitsUnion >= 6282 && firstFourDigitsUnion <= 6288)) {
      return cardnames[5];
    }
  }

  //test for Switch
    //length of 16, 18, or 19
    //prefix of 4903, 4905, 4911, 4936, 6333, 6759, 564182, 633110
  //test the length
  if (cardNumber.length === 16 || cardNumber.length === 18 || cardNumber.length === 19) {
    //find first four digits and first six digits
    var firstFourDigitsSwitch = cardNumber.substring(0,4);
    var firstSixDigitsSwitch = cardNumber.substring(0,6);
    //test the digits
    if(firstFourDigitsSwitch === '4903' || firstFourDigitsSwitch === '4905' || firstFourDigitsSwitch === '4911' || firstFourDigitsSwitch === '4936' ||firstFourDigitsSwitch === '6333' || firstFourDigitsSwitch === '6759' || firstSixDigitsSwitch === '564182' || firstSixDigitsSwitch === '633110') {
      return cardnames[6];
    }
  }

  //test for Visa
  if((cardNumber.length === 13 || cardNumber.length === 16 || cardNumber.length === 19) && cardNumber[0] === '4') {
    return cardnames[7];
  }
  else {
    return 'No Network';
  }
};