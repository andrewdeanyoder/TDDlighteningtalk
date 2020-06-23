
/*
describe('Introduction to Mocha Tests - READ ME FIRST', function() {
  // A Mocha test is just a function!
  // If the function throws an error when run, it fails.
  // If it doesn't throw an error when run, it doesn't fail.
  // To read more about mocha, visit mochajs.org
*/

describe('American Express', function() {
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

describe('Visa with assert', function() {
  var assert = chai.assert;

  it('is a string', function () {
    assert.typeOf(detectNetwork('4123456789012345'), 'string');
  });

  it('has a length of 4', function () {
    assert.lengthOf(detectNetwork('4123456789012345'), 4);
  });

  it('has a prefix of 4 and a length of 13', function() {
    assert.equal(detectNetwork('4123456789012'), 'Visa');
  });

  it('has a prefix of 4 and a length of 16', function() {
    assert.equal(detectNetwork('4123456789012345'), 'Visa');
  });

  it('has a prefix of 4 and a length of 19', function() {
    assert.equal(detectNetwork('4123456789012345678'), 'Visa');
  });
});

describe('Visa with should', function() {
  var should = chai.should();

  it('is a string', function () {
    detectNetwork('4123456789012345').should.be.a('string');
  });

  it('has a length of 4', function () {
    detectNetwork('4123456789012345').should.have.a.lengthOf(4);
  });

  it('has a prefix of 4 and a length of 13', function() {
    detectNetwork('4123456789012').should.equal('Visa');
  });

  it('has a prefix of 4 and a length of 16', function() {
    detectNetwork('4123456789012345').should.equal('Visa');
  });

  it('has a prefix of 4 and a length of 19', function() {
    detectNetwork('4123456789012345678').should.equal('Visa');
  });
});

describe('Visa with expect', function() {
  var expect = chai.expect;

  it('is a string', function () {
    expect(detectNetwork('4123456789012345')).to.be.a('string');
  });

  it('has a length of 4', function () {
    expect(detectNetwork('4123456789012345')).to.have.a.lengthOf(4);
  });

  it('has a prefix of 4 and a length of 13', function() {
    expect(detectNetwork('4123456789012')).to.equal('Visa');
  });

  it('has a prefix of 4 and a length of 16', function() {
    expect(detectNetwork('4123456789012345')).to.equal('Visa');
  });

  it('has a prefix of 4 and a length of 19', function() {
    expect(detectNetwork('4123456789012345678')).to.equal('Visa');
  });

});

describe('Discover', function() {
  // Discover prefix: 6011, 644-649, or 65, and a length of 16 or 19.

  var should = chai.should();

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


//Maestro tests
//length of 12-19 and a prefix of 5018, 5020, 5038, or 6304
describe('Maestro', function() {
  //empty digits after the prefix
  var accumulator = '0000000';
  //iterate through the possible lengths
  for(var l = 12; l <= 19; l++) {
    //add another empty digit so that accumulator is the correct length
    accumulator += '0';
    (function (l, accumulator) {
      //test all prefixes
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
});


//length of 16-19 and prefix of 624-626, 6282-6288 or 622126-622925
describe('China UnionPay', function() {
  var cardName1 = 'China UnionPay';
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
          detectNetwork(prefix1.toString() + '000' + emptyDigits).should.equal(cardName1);
        });
      }) (l, prefix1, emptyDigits);
    }

    //loop through 6282 prefixes
    for (var prefix2 = 6282; prefix2 <= 6288; prefix2++) {
      //wrap function
      (function (l, prefix2, emptyDigits) {
        //call it() on prefix2 add an additional 2 digits + emptyDigits
        it('has a prefix of ' + prefix2 + ' and a length of ' + l, function() {
          detectNetwork(prefix2.toString() + '00' + emptyDigits).should.equal(cardName1);
        });
      }) (l, prefix2, emptyDigits);
    }

    //loop through 622126 prefixes
    for (var prefix3 = 622126; prefix3 <= 622925; prefix3++) {
      //wrap function
      (function (l, prefix3, emptyDigits) {
        //call it() on prefix3 add emptyDigits
        it('has a prefix of ' + prefix3 + ' and a length of ' + l, function() {
          detectNetwork(prefix3.toString() + emptyDigits).should.equal(cardName1);
        });
      }) (l, prefix3, emptyDigits);
    }
  }
});
