/*
 * You'll eventually be given instructions how to use this file
 * If you want to use it before then, you'll have to figure it out yourself
 */

// You don't actually want to fill *this* value in on line 9, but you'll see
// other places in this file where you'll replace the FILL_ME_IN with a
// different value.
var FILL_ME_IN = 'Fill this value in';

describe('Introduction to Mocha Tests - READ ME FIRST', function() {
  // A Mocha test is just a function!
  // If the function throws an error when run, it fails.
  // If it doesn't throw an error when run, it doesn't fail.
  // To read more about mocha, visit mochajs.org

  // Once you've read and understood this section, please comment it out.
  // You will not be able to proceed with a failing test.

  it('Doesn\'t throw an error, so it doesn\'t fail', function() {
    // This test doesn't really test anything at all! It will pass no matter what.
    var even = function(num){
      return num/2 === 0;
    }
    return even(10) === true;
  });

  // In tests, we want to compare the expected behavior to the actual behavior.
  // A test should only fail if the expected behavior doesn't match the actual.
  it('Throws an error when expected behavior does not match actual behavior', function() {
    var even = function(num){
      return num % 2 === 0;
    }

    if(even(10) !== true) {
      throw new Error('10 should be even!');
    }
  });
});
describe('Diner\'s Club', function() {
  // Be careful, tests can have bugs too...

  it('has a prefix of 38 and a length of 14', function() {
    if (detectNetwork('38345678901234') !== 'Diner\'s Club') {
      throw new Error('Test failed');
    }
  });

  it('has a prefix of 39 and a length of 14', function() {
    if (detectNetwork('39345678901234') !== 'Diner\'s Club') {
      throw new Error('Test failed');
    }

  });
});

describe('American Express', function() {
  // It can get annoying to keep typing the if/throw, so here is a
  // helper function to throw an error if the input statement isn't true.
  var assert = function(isTrue) {
    if(!isTrue) {
      throw new Error('Test failed');
    }
  };

  it('has a prefix of 34 and a length of 15', function() {
    assert(detectNetwork('343456789012345') === 'American Express');
  });

  it('has a prefix of 37 and a length of 15', function() {
    assert(detectNetwork('373456789012345') === 'American Express');
  });
});

describe('Visa', function() {
  // Chai is an entire library of helper functions for tests!
  // Chai provides an assert that acts the same as our previous assert.
  // Search the documentation to figure out how to access it.
  //   http://chaijs.com/
  var assert = chai.assert;


  it('has a prefix of 4 and a length of 13', function() {
    assert(detectNetwork('4123456789012') === 'Visa');
  });

  it('has a prefix of 4 and a length of 16', function() {
    assert(detectNetwork('4123456789012345') === 'Visa');
  });

  it('has a prefix of 4 and a length of 19', function() {
    assert(detectNetwork('4123456789012345678') === 'Visa');
  });
});

describe('MasterCard', function() {
  // Chai lets you write more human-readable tests that throw helpful errors.
  // Expect syntax is one way to do this, but there are others.
  // If you want to know more, check out the documentation.
  //   http://chaijs.com/api/bdd/
  var expect = chai.should();

  it('has a prefix of 51 and length of 16', function() {
    detectNetwork('5112345678901234').should.equal('MasterCard');
  });

  it('has a prefix of 52 and length of 16', function() {
    detectNetwork('5212345678901234').should.equal('MasterCard');
  });

  it('has a prefix of 53 and length of 16', function() {
    detectNetwork('5312345678901234').should.equal('MasterCard');
  });


  // You can also use should instead of expect, which changes the style
  // slightly. It really doesn't matter which one you use - check out
  // http://chaijs.com/guide/styles/ for more info, but it's important
  // to be consistent (unlike in this file, where we use BOTH expect
  // and should, but that's just for learning), so once you've gotten
  // these tests to pass using should syntax, refactor your tests to
  // use either expect or should, but not both.
  var should = chai.should();

  it('has a prefix of 54 and a length of 16', function() {
    detectNetwork('5412345678901234').should.equal('MasterCard');
  });

  it('has a prefix of 55 and a length of 16', function() {
    detectNetwork('5512345678901234').should.equal('MasterCard');
  })

});

describe('Discover', function() {
  // Tests without a function will be marked as "pending" and not run
  // Implement these tests (and others) and make them pass!
  // Discover prefix: 6011, 644-649, or 65, and a length of 16 or 19.

  it('has a prefix of 6011 and a length of 16', function() {
    detectNetwork('6011567890123456').should.equal('Discover');
  })

  it('has a prefix of 6011 and a length of 19', function() {
    detectNetwork('6011567890123456789').should.equal('Discover');
  })

  for (var prefix = 644; prefix <= 649; prefix++) {
    (function (prefix) {
      var firstFour = prefix.toString();
      it('has a prefix of ' + prefix + ' and a length of 16', function() {
        detectNetwork(firstFour + '4567890123456').should.equal('Discover');
      });

      it('has a prefix of ' + prefix + ' and a length of 19', function() {
        detectNetwork(firstFour + '4567890123456789').should.equal('Discover');
      })
    }) (prefix);
  }

  it('has a prefix of 65 and a length of 16', function() {
    detectNetwork('6534567890123456').should.equal('Discover');
  })

  it('has a prefix of 65 and a length of 19', function() {
    detectNetwork('6534567890123456789').should.equal('Discover');
  })

});

//Maestro always has a length of 12-19 and a prefix of 5018, 5020, 5038, or 6304
describe('Maestro', function() {
  //empty digits after the prefix
  var accumulator = '0000000';
  //iterate through the possible lengths
  for(var l = 12; l <= 19; l++) {
    //increase the length of the accumulator
    accumulator += '0';
    (function (l, accumulator) {
      //add another empty digit so that accumulator is the correct length
      it('has a prefix of ' + 5018 + ' and a length of ' + l, function() {
        var cardNum1 = '5018' + accumulator;
        //console.log(l, accumulator, accumulator.length, cardNum1, cardNum1.length);
        detectNetwork('5018' + accumulator).should.equal('Maestro');
      });

      it('has a prefix of ' + 5020 + ' and a length of ' + l, function() {
        var cardNum2 = '5020' + accumulator;
        //console.log(l, accumulator, accumulator.length, cardNum2, cardNum2.length);
        detectNetwork('5020' + accumulator).should.equal('Maestro');
      });

      it('has a prefix of ' + 5038 + ' and a length of ' + l, function() {
        var cardNum3 = '5038' + accumulator;
        //console.log(l, accumulator, accumulator.length, cardNum3, cardNum3.length);
        detectNetwork('5038' + accumulator).should.equal('Maestro');
      });

      it('has a prefix of ' + 6304 + ' and a length of ' + l, function() {
        var cardNum4 = '6304' + accumulator;
        //console.log(l, accumulator, accumulator.length, cardNum4, cardNum4.length);
        detectNetwork('6304' + accumulator).should.equal('Maestro');
      });
    })(l, accumulator)
  }

  //tests for China UnionPay
  //length of 16-19 and prefix of 624-626, 6282-6288 or 622126-622925
  describe('China UnionPay', function(){
    var cardName = 'China UnionPay';
    //empty digits after the prefix
    var emptyDigits = '000000000';
    //iterate through the possible lengths
    for(var l = 16; l <= 19; l++) {
      //increase the length of the empty digits
      emptyDigits += 0;
          //loop through the 624 prefixes
          for (var prefix1 = 624; prefix1 <= 626; prefix1++) {
            //wrap function
            (function (l, prefix1, emptyDigits) {
              //call it() on prefix1 add an additional 3 digits + emptyDigits
              it('has a prefix of ' + prefix1 + ' and a length of ' + l, function() {
                //TODO delete console.log
                console.log(prefix1.toString() + '000' + emptyDigits);
                detectNetwork(prefix1.toString() + '000' + emptyDigits).should.equal(cardName);
              });
            }) (l, prefix1, emptyDigits);
          }
          //loop through 6282 prefixes
            //wrap function
              //for 6282 add an additional 2 digits + emptyDigits
          //loop through 622126
            //wrap function
              //for 622126 add emptyDigits

    }
  });

});

