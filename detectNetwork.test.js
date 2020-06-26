
/*
describe('Introduction to Mocha Tests - READ ME FIRST', function() {
  // A Mocha test is just a function!
  // If the function throws an error when run, it fails.
  // If it doesn't throw an error when run, it doesn't fail.
  // To read more about mocha, visit mochajs.org
*/

describe('American Express', function() {
  var assert = chai.assert;

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

//generates a credit card number based on a prefix and a length
var numberGenerator = function (prefix, targetLength) {
	if(typeof prefix !== 'string') {
		throw new Error('prefix must be a string');
	}

	//check if input converts to a number
  if(Number.isNaN(Number(targetLength))) {
		throw new Error('Length not a number');
  }

  //adds an 9 until target length is reached
  for (var i = prefix.length; i < targetLength; i++) {
    prefix += 9;
  }
  return prefix;
}


// Discover prefix: 6011, 644-649, or 65, and a length of 16 or 19.
describe('Discover', function() {

  var should = chai.should();

  //arrays of possible prefixes
  var prefixes = ['6011', '65', '644', '645', '646', '647', '648', '649'];
  var lengths = [16, 19];

  //loop through both prefixes & lengths
  for (let i = 0; i < prefixes.length; i++) {
    for (let j = 0; j < lengths.length; j++) {

      //Immediately-invoked function expression to handle scope issues
      (function (currentPrefix, currentLength) {

        //generate a new cardnumber to test
        var cardNumber = numberGenerator(currentPrefix, currentLength);

        //test the cardnumber
        it('has a prefix of ' + currentPrefix + ' and a length of ' + currentLength, function () {
          detectNetwork(cardNumber).should.equal('Discover');
        });

      }) (prefixes[i], lengths[j]);
    }
  }
});


//pushes a range of numbers to an array
var addToArray = function (array, min, max) {

  if (!Array.isArray(array)) {
    throw new Error('input is not an array');
  }

  if (typeof min !== 'number' || typeof max !== 'number'){
    throw new Error('min/max is not a number');
  }

  for (min; min <= max; min++) {
    array.push(min.toString());
  }

}

//length of 16-19 and prefix of 624-626, 6282-6288 or 622126-622925
describe('China UnionPay', function() {

  var should = chai.should();

  //arrays of possible prefixes and lengths
  var prefixes = ['624', '625', '626'];
  var lengths = [16, 17, 18, 19];

  //add prefixes 6282-6288
  addToArray(prefixes, 6282, 6288);

  //add prefixes 622126-622925
  addToArray(prefixes, 622126, 622925);

  //loop through both prefixes & lengths
  for (let i = 0; i < prefixes.length; i++) {
    for (let j = 0; j < lengths.length; j++) {

      //Immediately-invoked function expression to handle scope issues
      (function (currentPrefix, currentLength) {

        //generate a new cardnumber to test
        var cardNumber = numberGenerator(currentPrefix, currentLength);

        //test the cardnumber
        it('has a prefix of ' + currentPrefix + ' and a length of ' + currentLength, function () {
          detectNetwork(cardNumber).should.equal('China UnionPay');
        });

      }) (prefixes[i], lengths[j]);
    }
  }
});
