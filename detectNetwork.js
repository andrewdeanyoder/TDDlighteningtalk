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

  //set card names at beginning, for easy access
  var cardnames = ['', 'American Express', 'MasterCard', 'Discover', 'Maestro', 'China UnionPay', 'Switch', 'Visa'];

  //helper function for an American Express card
  var isAmExpress = function (prefix, length) {
    return (prefix === '34' || prefix === '37') && length === 15;
  }

  //test for American Express
  if(isAmExpress(cardNumber.substring(0, 2), cardNumber.length)) {
    return cardnames[1];
  }

  //helper function for Visa
  var isVisa = function (prefix, length) {
    return (length === 13 || length === 16 || length === 19) && prefix === '4';
  }

  if(isVisa(cardNumber[0], cardNumber.length)) {
    return cardnames[7];
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
    return cardnames[3];
  }

  //helper function for a Maestro
    //prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
  var isMaestro = function (prefix, length) {
    //first test for length
    if (length >= 12 && length <= 19) {
      return prefix === '5018' || prefix === '5020' || prefix === '5038' || prefix === '6304';
    } else {
      return false;
    }
  }

  //test for Maestro, reminder: prefix was already set around line 64
  if(isMaestro(prefix, cardNumber.length)) {
    return cardnames[4];
  }

  //modify prefix to be first six digits for Union Pay
  prefix = parseInt(cardNumber.substring(0, 6));

  //helper function for China UnionPay
    //prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
    //622126-622925, 624000-626999, 628200-628899
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
    return cardnames[5];
  } else {
    return 'No Network';
  }
};