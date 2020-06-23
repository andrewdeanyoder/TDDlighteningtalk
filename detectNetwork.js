// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)



var detectNetwork = function(cardNumber) {
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  //helper function for an American Express card
  var isAmExpress = function (prefix, length) {
    return (prefix === '34' || prefix === '37') && length === 15;
  }

  //test for American Express
  if(isAmExpress(cardNumber.substring(0, 2), cardNumber.length)) {
    return 'American Express';
  }

  //helper function for Visa
  var isVisa = function (prefix, length) {
    return (length === 13 || length === 16 || length === 19) && prefix === '4';
  }

  if(isVisa(cardNumber[0], cardNumber.length)) {
    return 'Visa';
  }

  //get first four digits for Discover & Maestro prefix
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
    return 'Discover';
  }

  //modify prefix to be first six digits for Union Pay
  prefix = parseInt(cardNumber.substring(0, 6));

  //helper function for China UnionPay
    //prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
  var isUnionPay = function (prefix, length) {
    //first test for length
    if (length >= 16 && length <= 19) {

      //test prefixes
      if((prefix >= 622126 && prefix <= 622925) || (prefix >= 624000 && prefix <= 626999) || (prefix >= 628200 && prefix <= 628899)) {
        return true;
      }
    }
  }

  if(isUnionPay(prefix, cardNumber.length)) {
    return 'China UnionPay';
  } else {
    return 'No Network';
  }
};