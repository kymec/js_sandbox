// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/is-nil/index.js":[function(require,module,exports) {
'use strict';

module.exports = function (obj) {

  return obj == null;
};

},{}],"node_modules/has-symbols/shams.js":[function(require,module,exports) {
'use strict';
/* eslint complexity: [2, 17], max-statements: [2, 33] */

module.exports = function hasSymbols() {
  if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
    return false;
  }

  if (typeof Symbol.iterator === 'symbol') {
    return true;
  }

  var obj = {};
  var sym = Symbol('test');
  var symObj = Object(sym);

  if (typeof sym === 'string') {
    return false;
  }

  if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
    return false;
  }

  if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
    return false;
  } // temp disabled per https://github.com/ljharb/object.assign/issues/17
  // if (sym instanceof Symbol) { return false; }
  // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  // if (!(symObj instanceof Symbol)) { return false; }
  // if (typeof Symbol.prototype.toString !== 'function') { return false; }
  // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }


  var symVal = 42;
  obj[sym] = symVal;

  for (sym in obj) {
    return false;
  } // eslint-disable-line no-restricted-syntax


  if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
    return false;
  }

  if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }

  var syms = Object.getOwnPropertySymbols(obj);

  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }

  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }

  if (typeof Object.getOwnPropertyDescriptor === 'function') {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);

    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }

  return true;
};
},{}],"node_modules/has-symbols/index.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var origSymbol = global.Symbol;

var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
  if (typeof origSymbol !== 'function') {
    return false;
  }

  if (typeof Symbol !== 'function') {
    return false;
  }

  if (typeof origSymbol('foo') !== 'symbol') {
    return false;
  }

  if (typeof Symbol('bar') !== 'symbol') {
    return false;
  }

  return hasSymbolSham();
};
},{"./shams":"node_modules/has-symbols/shams.js"}],"node_modules/is-symbol/index.js":[function(require,module,exports) {
'use strict';

var toStr = Object.prototype.toString;

var hasSymbols = require('has-symbols')();

if (hasSymbols) {
  var symToStr = Symbol.prototype.toString;
  var symStringRegex = /^Symbol\(.*\)$/;

  var isSymbolObject = function isRealSymbolObject(value) {
    if (typeof value.valueOf() !== 'symbol') {
      return false;
    }

    return symStringRegex.test(symToStr.call(value));
  };

  module.exports = function isSymbol(value) {
    if (typeof value === 'symbol') {
      return true;
    }

    if (toStr.call(value) !== '[object Symbol]') {
      return false;
    }

    try {
      return isSymbolObject(value);
    } catch (e) {
      return false;
    }
  };
} else {
  module.exports = function isSymbol(value) {
    // this environment does not support Symbols.
    return false && value;
  };
}
},{"has-symbols":"node_modules/has-symbols/index.js"}],"node_modules/is-object/index.js":[function(require,module,exports) {
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],"node_modules/is-function/index.js":[function(require,module,exports) {
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],"node_modules/to-str/index.js":[function(require,module,exports) {
'use strict';

/* global Symbol */

var isNil      = require('is-nil');
var isSymbol   = require('is-symbol');
var isObject   = require('is-object');
var isFunction = require('is-function');

module.exports = function (value) {

  if (typeof value === 'string') {
    return value;
  }

  if (isNil(value)) {
    return '';
  }

  if (isSymbol(value)) {
    return Symbol.prototype.toString.call(value);
  }

  if (isObject(value) && isFunction(value.toString)) {
    return value.toString();
  }

  var result = '' + value;

  return (result === '0' && (1 / value) === -1 / 0) ? '-0' : result;
};

},{"is-nil":"node_modules/is-nil/index.js","is-symbol":"node_modules/is-symbol/index.js","is-object":"node_modules/is-object/index.js","is-function":"node_modules/is-function/index.js"}],"node_modules/clamp/index.js":[function(require,module,exports) {
module.exports = clamp

function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

},{}],"node_modules/to-integer/index.js":[function(require,module,exports) {
'use strict';

var isNil      = require('is-nil');
var isSymbol   = require('is-symbol');
var isObject   = require('is-object');
var isFunction = require('is-function');

var NAN = 0 / 0;

module.exports = function (value) {

  if (isNil(value)) {
    return 0;
  }

  var type = typeof value;

  if (type === 'number') {
    return value;
  } else if (type === 'boolean') {
    return value ? 1 : 0;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {

    var raw = isFunction(value.valueOf) ? value.valueOf() : value;

    value = isObject(raw) ? (raw + '') : raw;
  }


  type = typeof value;
  if (type !== 'string') {
    return type === 'number' ? value : parseInt(value, 10);
  }


  // trim
  value = value.replace(/^\s+|\s+$/g, '');


  if (/^0b[01]+$/i.test(value)) {
    return parseInt(value.slice(2), 2);
  } else if (/^0o[0-7]+$/i.test(value)) {
    return parseInt(value.slice(2), 8);
  } else if (/^0x[0-9a-f]+$/i.test(value)) {
    return parseInt(value.slice(2), 16);
  }

  if(/^0b/i.test(value)||/^0o/i.test(value)||/^[\+\-]?0x/i.test(value)){
    return NAN;
  }

  return parseInt(value, 10);
};

},{"is-nil":"node_modules/is-nil/index.js","is-symbol":"node_modules/is-symbol/index.js","is-object":"node_modules/is-object/index.js","is-function":"node_modules/is-function/index.js"}],"node_modules/max-safe-int/index.js":[function(require,module,exports) {
'use strict';

module.exports = 9007199254740991;

},{}],"node_modules/random-integral/index.js":[function(require,module,exports) {
'use strict';

var clamp        = require('clamp');
var toInteger    = require('to-integer');
var MAX_SAFE_INT = require('max-safe-int');
var MIN_SAFE_INT = -MAX_SAFE_INT;

function fixme(val, min, max, isMin) {

  if (typeof val !== 'number') {
    val = toInteger(val);
  }

  if (isNaN(val) || !isFinite(val)) {
    return isMin ? min : max;
  }

  return clamp(val, min, max);
}

module.exports = function (options) {

  if (options) {
    // for speed up
    if (!options.inspected) {
      options.min = fixme(options.min, MIN_SAFE_INT, MAX_SAFE_INT, true);
      options.max = fixme(options.max, MIN_SAFE_INT, MAX_SAFE_INT, false);
    }
  } else {
    options = {
      min: MIN_SAFE_INT,
      max: MAX_SAFE_INT
    };
  }

  var min = options.min;
  var max = options.max;

  // swap to variables
  // ref: http://stackoverflow.com/a/16201688
  if (min > max) {
    min = min ^ max;
    max = min ^ max;
    min = min ^ max;
  }

  return Math.round(Math.random() * (max - min)) + min;
};

module.exports.fixme = fixme;

},{"clamp":"node_modules/clamp/index.js","to-integer":"node_modules/to-integer/index.js","max-safe-int":"node_modules/max-safe-int/index.js"}],"node_modules/random-natural/index.js":[function(require,module,exports) {
'use strict';

var randomInt    = require('random-integral');
var MAX_SAFE_INT = require('max-safe-int');

module.exports = function (options) {

  if (options) {
    if (!options.inspected) {
      options.min = randomInt.fixme(options.min, 0, MAX_SAFE_INT, true);
      options.max = randomInt.fixme(options.max, 0, MAX_SAFE_INT, false);
    }
  } else {
    options = {
      min: 0,
      max: MAX_SAFE_INT
    };
  }

  options.inspected = true;

  return randomInt(options);
};

module.exports.fixme = randomInt.fixme;

},{"random-integral":"node_modules/random-integral/index.js","max-safe-int":"node_modules/max-safe-int/index.js"}],"node_modules/random-char/index.js":[function(require,module,exports) {
'use strict';

var isNil         = require('is-nil');
var isObject      = require('is-object');
var toString      = require('to-str');
var randomNatural = require('random-natural');

var pools = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: '~!@#$%^&()*_+-={}[]'
};

pools.alpha  = pools.lower + pools.upper;
pools['all'] = pools.lower + pools.upper + pools.number + pools.symbol;

module.exports = function (options) {

  if (!isObject(options)) {
    if (isNil(options)) {
      options = { pool: pools.all };
    } else {
      options = toString(options);
      options = { pool: pools[options] || options };
    }
  }

  var pool;

  if (options.pool) {
    pool = options.pool;
  } else if (options.lower) {
    pool = pools.lower;
  } else if (options.upper) {
    pool = pools.upper;
  } else if (options.alpha) {
    pool = pools.alpha;
  } else if (options.number) {
    pool = pools.number;
  } else if (options.symbol) {
    pool = pools.symbol;
  } else {
    pool = pools.all;
  }

  pool = toString(pool);

  return pool.charAt(randomNatural({
    min: 0,
    max: pool.length - 1,
    inspected: true
  }));
};

},{"is-nil":"node_modules/is-nil/index.js","is-object":"node_modules/is-object/index.js","to-str":"node_modules/to-str/index.js","random-natural":"node_modules/random-natural/index.js"}],"node_modules/random-syllable/index.js":[function(require,module,exports) {
'use strict';

var clamp         = require('clamp');
var isObject      = require('is-object');
var toInteger     = require('to-integer');
var randomChar    = require('random-char');
var randomNatural = require('random-natural');

module.exports = function (options) {

  var length = isObject(options)
    ? options.length
    : options;

  if (length) {
    length = toInteger(length);
    length = clamp(length, 2, 3);
  } else {
    length = randomNatural({ min: 2, max: 3 });
  }

  var consonants = 'bcdfghjklmnprstvwz'; // consonants except hard to speak ones
  var vowels = 'aeiou';                  // vowels
  var all = consonants + vowels;         // all

  var text = '';
  var char;

  for (var i = 0; i < length; i++) {
    if (i === 0) {
      // First character can be anything
      char = randomChar({ pool: all });
    } else if (consonants.indexOf(char) === -1) {
      // Last character was a vowel, now we want a consonant
      char = randomChar({ pool: consonants });
    } else {
      // Last character was a consonant, now we want a vowel
      char = randomChar({ pool: vowels });
    }

    text += char;
  }

  return text;
};

},{"clamp":"node_modules/clamp/index.js","is-object":"node_modules/is-object/index.js","to-integer":"node_modules/to-integer/index.js","random-char":"node_modules/random-char/index.js","random-natural":"node_modules/random-natural/index.js"}],"node_modules/random-lorem/index.js":[function(require,module,exports) {
'use strict';

var clamp          = require('clamp');
var randomNatural  = require('random-natural');
var randomSyllable = require('random-syllable');

var MIN_LEN = 2;
var MAX_LEN = 18;

module.exports = function (options) {

  options = options || {
      syllables: randomNatural({
        min: 1,
        max: 3,
        inspected: true
      })
    };

  var length    = options.length;
  var syllables = options.syllables;

  var result = '';

  if (syllables) {
    for (var i = 0; i < syllables; i++) {
      result += randomSyllable();
    }

    return result.substring(0, MAX_LEN);
  }


  if (!length && ( options.min || options.max)) {
    length = randomNatural({
      min: options.min || MIN_LEN,
      max: options.max || MAX_LEN
    });
  }

  length = length || randomNatural({
      min: MIN_LEN,
      max: MAX_LEN,
      inspected: true
    });


  length = clamp(length, MIN_LEN, MAX_LEN);


  while (result.length < length) {
    result += randomSyllable();
  }

  return result.substring(0, length);
};

},{"clamp":"node_modules/clamp/index.js","random-natural":"node_modules/random-natural/index.js","random-syllable":"node_modules/random-syllable/index.js"}],"node_modules/tld-list/index.js":[function(require,module,exports) {
module.exports = [
  "aaa",
  "aarp",
  "abarth",
  "abb",
  "abbott",
  "abbvie",
  "abc",
  "able",
  "abogado",
  "abudhabi",
  "ac",
  "academy",
  "accenture",
  "accountant",
  "accountants",
  "aco",
  "actor",
  "ad",
  "adac",
  "ads",
  "adult",
  "ae",
  "aeg",
  "aero",
  "aetna",
  "af",
  "afamilycompany",
  "afl",
  "africa",
  "ag",
  "agakhan",
  "agency",
  "ai",
  "aig",
  "aigo",
  "airbus",
  "airforce",
  "airtel",
  "akdn",
  "al",
  "alfaromeo",
  "alibaba",
  "alipay",
  "allfinanz",
  "allstate",
  "ally",
  "alsace",
  "alstom",
  "am",
  "americanexpress",
  "americanfamily",
  "amex",
  "amfam",
  "amica",
  "amsterdam",
  "analytics",
  "android",
  "anquan",
  "anz",
  "ao",
  "aol",
  "apartments",
  "app",
  "apple",
  "aq",
  "aquarelle",
  "ar",
  "arab",
  "aramco",
  "archi",
  "army",
  "arpa",
  "art",
  "arte",
  "as",
  "asda",
  "asia",
  "associates",
  "at",
  "athleta",
  "attorney",
  "au",
  "auction",
  "audi",
  "audible",
  "audio",
  "auspost",
  "author",
  "auto",
  "autos",
  "avianca",
  "aw",
  "aws",
  "ax",
  "axa",
  "az",
  "azure",
  "ba",
  "baby",
  "baidu",
  "banamex",
  "bananarepublic",
  "band",
  "bank",
  "bar",
  "barcelona",
  "barclaycard",
  "barclays",
  "barefoot",
  "bargains",
  "baseball",
  "basketball",
  "bauhaus",
  "bayern",
  "bb",
  "bbc",
  "bbt",
  "bbva",
  "bcg",
  "bcn",
  "bd",
  "be",
  "beats",
  "beauty",
  "beer",
  "bentley",
  "berlin",
  "best",
  "bestbuy",
  "bet",
  "bf",
  "bg",
  "bh",
  "bharti",
  "bi",
  "bible",
  "bid",
  "bike",
  "bing",
  "bingo",
  "bio",
  "biz",
  "bj",
  "black",
  "blackfriday",
  "blockbuster",
  "blog",
  "bloomberg",
  "blue",
  "bm",
  "bms",
  "bmw",
  "bn",
  "bnl",
  "bnpparibas",
  "bo",
  "boats",
  "boehringer",
  "bofa",
  "bom",
  "bond",
  "boo",
  "book",
  "booking",
  "bosch",
  "bostik",
  "boston",
  "bot",
  "boutique",
  "box",
  "br",
  "bradesco",
  "bridgestone",
  "broadway",
  "broker",
  "brother",
  "brussels",
  "bs",
  "bt",
  "budapest",
  "bugatti",
  "build",
  "builders",
  "business",
  "buy",
  "buzz",
  "bv",
  "bw",
  "by",
  "bz",
  "bzh",
  "ca",
  "cab",
  "cafe",
  "cal",
  "call",
  "calvinklein",
  "cam",
  "camera",
  "camp",
  "cancerresearch",
  "canon",
  "capetown",
  "capital",
  "capitalone",
  "car",
  "caravan",
  "cards",
  "care",
  "career",
  "careers",
  "cars",
  "cartier",
  "casa",
  "case",
  "caseih",
  "cash",
  "casino",
  "cat",
  "catering",
  "catholic",
  "cba",
  "cbn",
  "cbre",
  "cbs",
  "cc",
  "cd",
  "ceb",
  "center",
  "ceo",
  "cern",
  "cf",
  "cfa",
  "cfd",
  "cg",
  "ch",
  "chanel",
  "channel",
  "charity",
  "chase",
  "chat",
  "cheap",
  "chintai",
  "christmas",
  "chrome",
  "chrysler",
  "church",
  "ci",
  "cipriani",
  "circle",
  "cisco",
  "citadel",
  "citi",
  "citic",
  "city",
  "cityeats",
  "ck",
  "cl",
  "claims",
  "cleaning",
  "click",
  "clinic",
  "clinique",
  "clothing",
  "cloud",
  "club",
  "clubmed",
  "cm",
  "cn",
  "co",
  "coach",
  "codes",
  "coffee",
  "college",
  "cologne",
  "com",
  "comcast",
  "commbank",
  "community",
  "company",
  "compare",
  "computer",
  "comsec",
  "condos",
  "construction",
  "consulting",
  "contact",
  "contractors",
  "cooking",
  "cookingchannel",
  "cool",
  "coop",
  "corsica",
  "country",
  "coupon",
  "coupons",
  "courses",
  "cr",
  "credit",
  "creditcard",
  "creditunion",
  "cricket",
  "crown",
  "crs",
  "cruise",
  "cruises",
  "csc",
  "cu",
  "cuisinella",
  "cv",
  "cw",
  "cx",
  "cy",
  "cymru",
  "cyou",
  "cz",
  "dabur",
  "dad",
  "dance",
  "data",
  "date",
  "dating",
  "datsun",
  "day",
  "dclk",
  "dds",
  "de",
  "deal",
  "dealer",
  "deals",
  "degree",
  "delivery",
  "dell",
  "deloitte",
  "delta",
  "democrat",
  "dental",
  "dentist",
  "desi",
  "design",
  "dev",
  "dhl",
  "diamonds",
  "diet",
  "digital",
  "direct",
  "directory",
  "discount",
  "discover",
  "dish",
  "diy",
  "dj",
  "dk",
  "dm",
  "dnp",
  "do",
  "docs",
  "doctor",
  "dodge",
  "dog",
  "domains",
  "dot",
  "download",
  "drive",
  "dtv",
  "dubai",
  "duck",
  "dunlop",
  "duns",
  "dupont",
  "durban",
  "dvag",
  "dvr",
  "dz",
  "earth",
  "eat",
  "ec",
  "eco",
  "edeka",
  "edu",
  "education",
  "ee",
  "eg",
  "email",
  "emerck",
  "energy",
  "engineer",
  "engineering",
  "enterprises",
  "epson",
  "equipment",
  "er",
  "ericsson",
  "erni",
  "es",
  "esq",
  "estate",
  "esurance",
  "et",
  "etisalat",
  "eu",
  "eurovision",
  "eus",
  "events",
  "everbank",
  "exchange",
  "expert",
  "exposed",
  "express",
  "extraspace",
  "fage",
  "fail",
  "fairwinds",
  "faith",
  "family",
  "fan",
  "fans",
  "farm",
  "farmers",
  "fashion",
  "fast",
  "fedex",
  "feedback",
  "ferrari",
  "ferrero",
  "fi",
  "fiat",
  "fidelity",
  "fido",
  "film",
  "final",
  "finance",
  "financial",
  "fire",
  "firestone",
  "firmdale",
  "fish",
  "fishing",
  "fit",
  "fitness",
  "fj",
  "fk",
  "flickr",
  "flights",
  "flir",
  "florist",
  "flowers",
  "fly",
  "fm",
  "fo",
  "foo",
  "food",
  "foodnetwork",
  "football",
  "ford",
  "forex",
  "forsale",
  "forum",
  "foundation",
  "fox",
  "fr",
  "free",
  "fresenius",
  "frl",
  "frogans",
  "frontdoor",
  "frontier",
  "ftr",
  "fujitsu",
  "fujixerox",
  "fun",
  "fund",
  "furniture",
  "futbol",
  "fyi",
  "ga",
  "gal",
  "gallery",
  "gallo",
  "gallup",
  "game",
  "games",
  "gap",
  "garden",
  "gb",
  "gbiz",
  "gd",
  "gdn",
  "ge",
  "gea",
  "gent",
  "genting",
  "george",
  "gf",
  "gg",
  "ggee",
  "gh",
  "gi",
  "gift",
  "gifts",
  "gives",
  "giving",
  "gl",
  "glade",
  "glass",
  "gle",
  "global",
  "globo",
  "gm",
  "gmail",
  "gmbh",
  "gmo",
  "gmx",
  "gn",
  "godaddy",
  "gold",
  "goldpoint",
  "golf",
  "goo",
  "goodyear",
  "goog",
  "google",
  "gop",
  "got",
  "gov",
  "gp",
  "gq",
  "gr",
  "grainger",
  "graphics",
  "gratis",
  "green",
  "gripe",
  "grocery",
  "group",
  "gs",
  "gt",
  "gu",
  "guardian",
  "gucci",
  "guge",
  "guide",
  "guitars",
  "guru",
  "gw",
  "gy",
  "hair",
  "hamburg",
  "hangout",
  "haus",
  "hbo",
  "hdfc",
  "hdfcbank",
  "health",
  "healthcare",
  "help",
  "helsinki",
  "here",
  "hermes",
  "hgtv",
  "hiphop",
  "hisamitsu",
  "hitachi",
  "hiv",
  "hk",
  "hkt",
  "hm",
  "hn",
  "hockey",
  "holdings",
  "holiday",
  "homedepot",
  "homegoods",
  "homes",
  "homesense",
  "honda",
  "honeywell",
  "horse",
  "hospital",
  "host",
  "hosting",
  "hot",
  "hoteles",
  "hotels",
  "hotmail",
  "house",
  "how",
  "hr",
  "hsbc",
  "ht",
  "hu",
  "hughes",
  "hyatt",
  "hyundai",
  "ibm",
  "icbc",
  "ice",
  "icu",
  "id",
  "ie",
  "ieee",
  "ifm",
  "ikano",
  "il",
  "im",
  "imamat",
  "imdb",
  "immo",
  "immobilien",
  "in",
  "inc",
  "industries",
  "infiniti",
  "info",
  "ing",
  "ink",
  "institute",
  "insurance",
  "insure",
  "int",
  "intel",
  "international",
  "intuit",
  "investments",
  "io",
  "ipiranga",
  "iq",
  "ir",
  "irish",
  "is",
  "iselect",
  "ismaili",
  "ist",
  "istanbul",
  "it",
  "itau",
  "itv",
  "iveco",
  "jaguar",
  "java",
  "jcb",
  "jcp",
  "je",
  "jeep",
  "jetzt",
  "jewelry",
  "jio",
  "jll",
  "jm",
  "jmp",
  "jnj",
  "jo",
  "jobs",
  "joburg",
  "jot",
  "joy",
  "jp",
  "jpmorgan",
  "jprs",
  "juegos",
  "juniper",
  "kaufen",
  "kddi",
  "ke",
  "kerryhotels",
  "kerrylogistics",
  "kerryproperties",
  "kfh",
  "kg",
  "kh",
  "ki",
  "kia",
  "kim",
  "kinder",
  "kindle",
  "kitchen",
  "kiwi",
  "km",
  "kn",
  "koeln",
  "komatsu",
  "kosher",
  "kp",
  "kpmg",
  "kpn",
  "kr",
  "krd",
  "kred",
  "kuokgroup",
  "kw",
  "ky",
  "kyoto",
  "kz",
  "la",
  "lacaixa",
  "ladbrokes",
  "lamborghini",
  "lamer",
  "lancaster",
  "lancia",
  "lancome",
  "land",
  "landrover",
  "lanxess",
  "lasalle",
  "lat",
  "latino",
  "latrobe",
  "law",
  "lawyer",
  "lb",
  "lc",
  "lds",
  "lease",
  "leclerc",
  "lefrak",
  "legal",
  "lego",
  "lexus",
  "lgbt",
  "li",
  "liaison",
  "lidl",
  "life",
  "lifeinsurance",
  "lifestyle",
  "lighting",
  "like",
  "lilly",
  "limited",
  "limo",
  "lincoln",
  "linde",
  "link",
  "lipsy",
  "live",
  "living",
  "lixil",
  "lk",
  "llc",
  "loan",
  "loans",
  "locker",
  "locus",
  "loft",
  "lol",
  "london",
  "lotte",
  "lotto",
  "love",
  "lpl",
  "lplfinancial",
  "lr",
  "ls",
  "lt",
  "ltd",
  "ltda",
  "lu",
  "lundbeck",
  "lupin",
  "luxe",
  "luxury",
  "lv",
  "ly",
  "ma",
  "macys",
  "madrid",
  "maif",
  "maison",
  "makeup",
  "man",
  "management",
  "mango",
  "map",
  "market",
  "marketing",
  "markets",
  "marriott",
  "marshalls",
  "maserati",
  "mattel",
  "mba",
  "mc",
  "mckinsey",
  "md",
  "me",
  "med",
  "media",
  "meet",
  "melbourne",
  "meme",
  "memorial",
  "men",
  "menu",
  "merckmsd",
  "metlife",
  "mg",
  "mh",
  "miami",
  "microsoft",
  "mil",
  "mini",
  "mint",
  "mit",
  "mitsubishi",
  "mk",
  "ml",
  "mlb",
  "mls",
  "mm",
  "mma",
  "mn",
  "mo",
  "mobi",
  "mobile",
  "mobily",
  "moda",
  "moe",
  "moi",
  "mom",
  "monash",
  "money",
  "monster",
  "mopar",
  "mormon",
  "mortgage",
  "moscow",
  "moto",
  "motorcycles",
  "mov",
  "movie",
  "movistar",
  "mp",
  "mq",
  "mr",
  "ms",
  "msd",
  "mt",
  "mtn",
  "mtr",
  "mu",
  "museum",
  "mutual",
  "mv",
  "mw",
  "mx",
  "my",
  "mz",
  "na",
  "nab",
  "nadex",
  "nagoya",
  "name",
  "nationwide",
  "natura",
  "navy",
  "nba",
  "nc",
  "ne",
  "nec",
  "net",
  "netbank",
  "netflix",
  "network",
  "neustar",
  "new",
  "newholland",
  "news",
  "next",
  "nextdirect",
  "nexus",
  "nf",
  "nfl",
  "ng",
  "ngo",
  "nhk",
  "ni",
  "nico",
  "nike",
  "nikon",
  "ninja",
  "nissan",
  "nissay",
  "nl",
  "no",
  "nokia",
  "northwesternmutual",
  "norton",
  "now",
  "nowruz",
  "nowtv",
  "np",
  "nr",
  "nra",
  "nrw",
  "ntt",
  "nu",
  "nyc",
  "nz",
  "obi",
  "observer",
  "off",
  "office",
  "okinawa",
  "olayan",
  "olayangroup",
  "oldnavy",
  "ollo",
  "om",
  "omega",
  "one",
  "ong",
  "onl",
  "online",
  "onyourside",
  "ooo",
  "open",
  "oracle",
  "orange",
  "org",
  "organic",
  "origins",
  "osaka",
  "otsuka",
  "ott",
  "ovh",
  "pa",
  "page",
  "panasonic",
  "paris",
  "pars",
  "partners",
  "parts",
  "party",
  "passagens",
  "pay",
  "pccw",
  "pe",
  "pet",
  "pf",
  "pfizer",
  "pg",
  "ph",
  "pharmacy",
  "phd",
  "philips",
  "phone",
  "photo",
  "photography",
  "photos",
  "physio",
  "piaget",
  "pics",
  "pictet",
  "pictures",
  "pid",
  "pin",
  "ping",
  "pink",
  "pioneer",
  "pizza",
  "pk",
  "pl",
  "place",
  "play",
  "playstation",
  "plumbing",
  "plus",
  "pm",
  "pn",
  "pnc",
  "pohl",
  "poker",
  "politie",
  "porn",
  "post",
  "pr",
  "pramerica",
  "praxi",
  "press",
  "prime",
  "pro",
  "prod",
  "productions",
  "prof",
  "progressive",
  "promo",
  "properties",
  "property",
  "protection",
  "pru",
  "prudential",
  "ps",
  "pt",
  "pub",
  "pw",
  "pwc",
  "py",
  "qa",
  "qpon",
  "quebec",
  "quest",
  "qvc",
  "racing",
  "radio",
  "raid",
  "re",
  "read",
  "realestate",
  "realtor",
  "realty",
  "recipes",
  "red",
  "redstone",
  "redumbrella",
  "rehab",
  "reise",
  "reisen",
  "reit",
  "reliance",
  "ren",
  "rent",
  "rentals",
  "repair",
  "report",
  "republican",
  "rest",
  "restaurant",
  "review",
  "reviews",
  "rexroth",
  "rich",
  "richardli",
  "ricoh",
  "rightathome",
  "ril",
  "rio",
  "rip",
  "rmit",
  "ro",
  "rocher",
  "rocks",
  "rodeo",
  "rogers",
  "room",
  "rs",
  "rsvp",
  "ru",
  "rugby",
  "ruhr",
  "run",
  "rw",
  "rwe",
  "ryukyu",
  "sa",
  "saarland",
  "safe",
  "safety",
  "sakura",
  "sale",
  "salon",
  "samsclub",
  "samsung",
  "sandvik",
  "sandvikcoromant",
  "sanofi",
  "sap",
  "sarl",
  "sas",
  "save",
  "saxo",
  "sb",
  "sbi",
  "sbs",
  "sc",
  "sca",
  "scb",
  "schaeffler",
  "schmidt",
  "scholarships",
  "school",
  "schule",
  "schwarz",
  "science",
  "scjohnson",
  "scor",
  "scot",
  "sd",
  "se",
  "search",
  "seat",
  "secure",
  "security",
  "seek",
  "select",
  "sener",
  "services",
  "ses",
  "seven",
  "sew",
  "sex",
  "sexy",
  "sfr",
  "sg",
  "sh",
  "shangrila",
  "sharp",
  "shaw",
  "shell",
  "shia",
  "shiksha",
  "shoes",
  "shop",
  "shopping",
  "shouji",
  "show",
  "showtime",
  "shriram",
  "si",
  "silk",
  "sina",
  "singles",
  "site",
  "sj",
  "sk",
  "ski",
  "skin",
  "sky",
  "skype",
  "sl",
  "sling",
  "sm",
  "smart",
  "smile",
  "sn",
  "sncf",
  "so",
  "soccer",
  "social",
  "softbank",
  "software",
  "sohu",
  "solar",
  "solutions",
  "song",
  "sony",
  "soy",
  "space",
  "sport",
  "spot",
  "spreadbetting",
  "sr",
  "srl",
  "srt",
  "ss",
  "st",
  "stada",
  "staples",
  "star",
  "starhub",
  "statebank",
  "statefarm",
  "stc",
  "stcgroup",
  "stockholm",
  "storage",
  "store",
  "stream",
  "studio",
  "study",
  "style",
  "su",
  "sucks",
  "supplies",
  "supply",
  "support",
  "surf",
  "surgery",
  "suzuki",
  "sv",
  "swatch",
  "swiftcover",
  "swiss",
  "sx",
  "sy",
  "sydney",
  "symantec",
  "systems",
  "sz",
  "tab",
  "taipei",
  "talk",
  "taobao",
  "target",
  "tatamotors",
  "tatar",
  "tattoo",
  "tax",
  "taxi",
  "tc",
  "tci",
  "td",
  "tdk",
  "team",
  "tech",
  "technology",
  "tel",
  "telefonica",
  "temasek",
  "tennis",
  "teva",
  "tf",
  "tg",
  "th",
  "thd",
  "theater",
  "theatre",
  "tiaa",
  "tickets",
  "tienda",
  "tiffany",
  "tips",
  "tires",
  "tirol",
  "tj",
  "tjmaxx",
  "tjx",
  "tk",
  "tkmaxx",
  "tl",
  "tm",
  "tmall",
  "tn",
  "to",
  "today",
  "tokyo",
  "tools",
  "top",
  "toray",
  "toshiba",
  "total",
  "tours",
  "town",
  "toyota",
  "toys",
  "tr",
  "trade",
  "trading",
  "training",
  "travel",
  "travelchannel",
  "travelers",
  "travelersinsurance",
  "trust",
  "trv",
  "tt",
  "tube",
  "tui",
  "tunes",
  "tushu",
  "tv",
  "tvs",
  "tw",
  "tz",
  "ua",
  "ubank",
  "ubs",
  "uconnect",
  "ug",
  "uk",
  "unicom",
  "university",
  "uno",
  "uol",
  "ups",
  "us",
  "uy",
  "uz",
  "va",
  "vacations",
  "vana",
  "vanguard",
  "vc",
  "ve",
  "vegas",
  "ventures",
  "verisign",
  "versicherung",
  "vet",
  "vg",
  "vi",
  "viajes",
  "video",
  "vig",
  "viking",
  "villas",
  "vin",
  "vip",
  "virgin",
  "visa",
  "vision",
  "vistaprint",
  "viva",
  "vivo",
  "vlaanderen",
  "vn",
  "vodka",
  "volkswagen",
  "volvo",
  "vote",
  "voting",
  "voto",
  "voyage",
  "vu",
  "vuelos",
  "wales",
  "walmart",
  "walter",
  "wang",
  "wanggou",
  "warman",
  "watch",
  "watches",
  "weather",
  "weatherchannel",
  "webcam",
  "weber",
  "website",
  "wed",
  "wedding",
  "weibo",
  "weir",
  "wf",
  "whoswho",
  "wien",
  "wiki",
  "williamhill",
  "win",
  "windows",
  "wine",
  "winners",
  "wme",
  "wolterskluwer",
  "woodside",
  "work",
  "works",
  "world",
  "wow",
  "ws",
  "wtc",
  "wtf",
  "xbox",
  "xerox",
  "xfinity",
  "xihuan",
  "xin",
  "कॉम", // xn--11b4c3d
  "セール", // xn--1ck2e1b
  "佛山", // xn--1qqw23a
  "ಭಾರತ", // xn--2scrj9c
  "慈善", // xn--30rr7y
  "集团", // xn--3bst00m
  "在线", // xn--3ds443g
  "한국", // xn--3e0b707e
  "ଭାରତ", // xn--3hcrj9c
  "大众汽车", // xn--3oq18vl8pn36a
  "点看", // xn--3pxu8k
  "คอม", // xn--42c2d9a
  "ভাৰত", // xn--45br5cyl
  "ভারত", // xn--45brj9c
  "八卦", // xn--45q11c
  "موقع", // xn--4gbrim
  "বাংলা", // xn--54b7fta0cc
  "公益", // xn--55qw42g
  "公司", // xn--55qx5d
  "香格里拉", // xn--5su34j936bgsg
  "网站", // xn--5tzm5g
  "移动", // xn--6frz82g
  "我爱你", // xn--6qq986b3xl
  "москва", // xn--80adxhks
  "қаз", // xn--80ao21a
  "католик", // xn--80aqecdr1a
  "онлайн", // xn--80asehdb
  "сайт", // xn--80aswg
  "联通", // xn--8y0a063a
  "срб", // xn--90a3ac
  "бг", // xn--90ae
  "бел", // xn--90ais
  "קום", // xn--9dbq2a
  "时尚", // xn--9et52u
  "微博", // xn--9krt00a
  "淡马锡", // xn--b4w605ferd
  "ファッション", // xn--bck1b9a5dre4c
  "орг", // xn--c1avg
  "नेट", // xn--c2br7g
  "ストア", // xn--cck2b3b
  "삼성", // xn--cg4bki
  "சிங்கப்பூர்", // xn--clchc0ea0b2g2a9gcd
  "商标", // xn--czr694b
  "商店", // xn--czrs0t
  "商城", // xn--czru2d
  "дети", // xn--d1acj3b
  "мкд", // xn--d1alf
  "ею", // xn--e1a4c
  "ポイント", // xn--eckvdtc9d
  "新闻", // xn--efvy88h
  "工行", // xn--estv75g
  "家電", // xn--fct429k
  "كوم", // xn--fhbei
  "中文网", // xn--fiq228c5hs
  "中信", // xn--fiq64b
  "中国", // xn--fiqs8s
  "中國", // xn--fiqz9s
  "娱乐", // xn--fjq720a
  "谷歌", // xn--flw351e
  "భారత్", // xn--fpcrj9c3d
  "ලංකා", // xn--fzc2c9e2c
  "電訊盈科", // xn--fzys8d69uvgm
  "购物", // xn--g2xx48c
  "クラウド", // xn--gckr3f0f
  "ભારત", // xn--gecrj9c
  "通販", // xn--gk3at1e
  "भारतम्", // xn--h2breg3eve
  "भारत", // xn--h2brj9c
  "भारोत", // xn--h2brj9c8c
  "网店", // xn--hxt814e
  "संगठन", // xn--i1b6b1a6a2e
  "餐厅", // xn--imr513n
  "网络", // xn--io0a7i
  "ком", // xn--j1aef
  "укр", // xn--j1amh
  "香港", // xn--j6w193g
  "诺基亚", // xn--jlq61u9w7b
  "食品", // xn--jvr189m
  "飞利浦", // xn--kcrx77d1x4a
  "台湾", // xn--kprw13d
  "台灣", // xn--kpry57d
  "手表", // xn--kpu716f
  "手机", // xn--kput3i
  "мон", // xn--l1acc
  "الجزائر", // xn--lgbbat1ad8j
  "عمان", // xn--mgb9awbf
  "ارامكو", // xn--mgba3a3ejt
  "ایران", // xn--mgba3a4f16a
  "العليان", // xn--mgba7c0bbn0a
  "اتصالات", // xn--mgbaakc7dvf
  "امارات", // xn--mgbaam7a8h
  "بازار", // xn--mgbab2bd
  "موريتانيا", // xn--mgbah1a3hjkrd
  "پاکستان", // xn--mgbai9azgqp6j
  "الاردن", // xn--mgbayh7gpa
  "موبايلي", // xn--mgbb9fbpob
  "بارت", // xn--mgbbh1a
  "بھارت", // xn--mgbbh1a71e
  "المغرب", // xn--mgbc0a9azcg
  "ابوظبي", // xn--mgbca7dzdo
  "السعودية", // xn--mgberp4a5d4ar
  "ڀارت", // xn--mgbgu82a
  "كاثوليك", // xn--mgbi4ecexp
  "سودان", // xn--mgbpl2fh
  "همراه", // xn--mgbt3dhd
  "عراق", // xn--mgbtx2b
  "مليسيا", // xn--mgbx4cd0ab
  "澳門", // xn--mix891f
  "닷컴", // xn--mk1bu44c
  "政府", // xn--mxtq1m
  "شبكة", // xn--ngbc5azd
  "بيتك", // xn--ngbe9e0a
  "عرب", // xn--ngbrx
  "გე", // xn--node
  "机构", // xn--nqv7f
  "组织机构", // xn--nqv7fs00ema
  "健康", // xn--nyqy26a
  "ไทย", // xn--o3cw4h
  "سورية", // xn--ogbpf8fl
  "招聘", // xn--otu796d
  "рус", // xn--p1acf
  "рф", // xn--p1ai
  "珠宝", // xn--pbt977c
  "تونس", // xn--pgbs0dh
  "大拿", // xn--pssy2u
  "みんな", // xn--q9jyb4c
  "グーグル", // xn--qcka1pmc
  "ελ", // xn--qxam
  "世界", // xn--rhqv96g
  "書籍", // xn--rovu88b
  "ഭാരതം", // xn--rvc1e0am3e
  "ਭਾਰਤ", // xn--s9brj9c
  "网址", // xn--ses554g
  "닷넷", // xn--t60b56a
  "コム", // xn--tckwe
  "天主教", // xn--tiq49xqyj
  "游戏", // xn--unup4y
  "vermögensberater", // xn--vermgensberater-ctb
  "vermögensberatung", // xn--vermgensberatung-pwb
  "企业", // xn--vhquv
  "信息", // xn--vuq861b
  "嘉里大酒店", // xn--w4r85el8fhu5dnra
  "嘉里", // xn--w4rs40l
  "مصر", // xn--wgbh1c
  "قطر", // xn--wgbl6a
  "广东", // xn--xhq521b
  "இலங்கை", // xn--xkc2al3hye2a
  "இந்தியா", // xn--xkc2dl3a5ee0h
  "հայ", // xn--y9a3aq
  "新加坡", // xn--yfro4i67o
  "فلسطين", // xn--ygbi2ammx
  "政务", // xn--zfr164b
  "xxx",
  "xyz",
  "yachts",
  "yahoo",
  "yamaxun",
  "yandex",
  "ye",
  "yodobashi",
  "yoga",
  "yokohama",
  "you",
  "youtube",
  "yt",
  "yun",
  "za",
  "zappos",
  "zara",
  "zero",
  "zip",
  "zm",
  "zone",
  "zuerich",
  "zw"
];

},{}],"node_modules/is-array/index.js":[function(require,module,exports) {

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],"node_modules/is-window/index.js":[function(require,module,exports) {
'use strict';

module.exports = function (obj) {

  if (obj == null) {
    return false;
  }

  var o = Object(obj);

  return o === o.window;
};

},{}],"node_modules/is-array-like/index.js":[function(require,module,exports) {
'use strict';

var isArray    = require('is-array');
var isWindow   = require('is-window');
var isFunction = require('is-function');


module.exports = function (obj) {

  if (!obj) {
    return false;
  }

  if (isArray(obj)) {
    return true;
  }

  if (isFunction(obj) || isWindow(obj)) {
    return false;
  }

  obj = Object(obj);

  var length = 'length' in obj && obj.length;

  if (obj.nodeType === 1 && length) {
    return true;
  }

  return length === 0 ||
    typeof length === 'number' && length > 0 && ( length - 1 ) in obj;
};

},{"is-array":"node_modules/is-array/index.js","is-window":"node_modules/is-window/index.js","is-function":"node_modules/is-function/index.js"}],"node_modules/max-array-length/index.js":[function(require,module,exports) {
'use strict';

module.exports = 4294967295;

},{}],"node_modules/random-index/index.js":[function(require,module,exports) {
'use strict';

var randomNatural  = require('random-natural');
var MAX_ARR_LENGTH = require('max-array-length');

var fixme = randomNatural.fixme;

module.exports = function (options) {

  if (options) {
    if (!options.inspected) {
      options.min = fixme(options.min, 0, MAX_ARR_LENGTH, true);
      options.max = fixme(options.max, 0, MAX_ARR_LENGTH, false);
    }
  } else {
    options = {
      min: 0,
      max: MAX_ARR_LENGTH
    };
  }

  options.inspected = true;

  return randomNatural(options);
};

},{"random-natural":"node_modules/random-natural/index.js","max-array-length":"node_modules/max-array-length/index.js"}],"node_modules/pick-item/index.js":[function(require,module,exports) {
'use strict';

var isArrayLike = require('is-array-like');
var randomIndex = require('random-index');

module.exports = function (arr) {

  if (!arr || !isArrayLike(arr)) {
    return arr;
  }

  var length = arr.length;
  if (!length) {
    return undefined;
  }

  return arr[randomIndex({ max: length - 1 })];
};

},{"is-array-like":"node_modules/is-array-like/index.js","random-index":"node_modules/random-index/index.js"}],"node_modules/random-tld/index.js":[function(require,module,exports) {
'use strict';

var tlds     = require('tld-list');
var pickItem = require('pick-item');

module.exports = function () {
  return pickItem(tlds);
};

},{"tld-list":"node_modules/tld-list/index.js","pick-item":"node_modules/pick-item/index.js"}],"node_modules/random-domains/index.js":[function(require,module,exports) {
'use strict';

var clamp       = require('clamp');
var randomTld   = require('random-tld');
var randomLorem = require('random-lorem');

module.exports = function (options) {

  options = options || { level: 1 };

  if (!options.tld) {
    options.tld = randomTld();
  }

  var level = clamp(options.level || 1, 1, 10);
  var parts = [];

  while (level--) {
    parts.push(randomLorem());
  }

  parts.push(options.tld);

  return parts.join('.');
};

},{"clamp":"node_modules/clamp/index.js","random-tld":"node_modules/random-tld/index.js","random-lorem":"node_modules/random-lorem/index.js"}],"node_modules/random-email/index.js":[function(require,module,exports) {
'use strict';

var toString      = require('to-str');
var randomLorem   = require('random-lorem');
var randomDoamins = require('random-domains');


module.exports = function (options) {
  var domain = options && options.domain
    ? toString(options.domain)
    : randomDoamins();

  return randomLorem() + '@' + domain;
};

},{"to-str":"node_modules/to-str/index.js","random-lorem":"node_modules/random-lorem/index.js","random-domains":"node_modules/random-domains/index.js"}],"node_modules/email-validator/index.js":[function(require,module,exports) {
"use strict";

var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/; // Thanks to:
// http://fightingforalostcause.net/misc/2006/compare-email-regex.php
// http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
// http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378

exports.validate = function (email) {
  if (!email) return false;
  if (email.length > 254) return false;
  var valid = tester.test(email);
  if (!valid) return false; // Further checking of some things regex can't handle

  var parts = email.split("@");
  if (parts[0].length > 64) return false;
  var domainParts = parts[1].split(".");
  if (domainParts.some(function (part) {
    return part.length > 63;
  })) return false;
  return true;
};
},{}],"node_modules/format-validator/distrib/format-validator.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function(global,factory){if(typeof define==="function"&&define.amd){define(['exports'],factory);}else if(typeof exports!=="undefined"){factory(exports);}else{var mod={exports:{}};factory(mod.exports);global.validators=mod.exports;}})(this,function(exports){'use strict';function areDigits(input){return /^\d+$/.test(input);}exports.areDigits=areDigits;function areIn(input,options){if(!options||!options.acceptings){return false;}for(var i=0,l=input.length-1;i<=l;i++){var found=false;for(var j=0;j<options.acceptings.length;j++){if(input[i]===options.acceptings[j]){found=true;break;}}if(!found){return false;}}return true;}exports.areIn=areIn;function areLettersOnly(input){return /^[a-z]+$/i.test(input);}exports.areLettersOnly=areLettersOnly;function checkIfTrue(condition,fn){return condition?fn():true;}exports.checkIfTrue=checkIfTrue;function containsHTML(input){return /<[^<]+>/i.test(input);}exports.containsHTML=containsHTML;function containsURL(input){var pattern=new RegExp('.*(https?:\\/\\/)?'+'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+'((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?'+'(\\/[-a-z\\d%@_.~+&:]*)*'+'(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+'(\\#[-a-z\\d_]*)?.*','im');return pattern.test(input);}exports.containsURL=containsURL;function equals(input1,options){return input1===options.value;}exports.equals=equals;function getStrongPassword(input,options){var strength=0;if(input.length<8){return 0;}if(options&&options.acceptings&&!areIn(input,options)){return-1;}if(input.length>8)strength+=1;if(input.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))strength+=1;if(input.match(/([a-zA-Z])/)&&input.match(/([0-9])/))strength+=1;if(input.match(/([!,%,&,@,#,$,^,*,?,_,~])/))strength+=1;if(input.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/))strength+=1;return strength;}exports.getStrongPassword=getStrongPassword;function isBIC(input){return /^([A-Z]{6}[A-Z2-9][A-NP-Z1-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test(input);}exports.isBIC=isBIC;var cardTypes=[{type:"MasterCard",reg:/^(5[12345])/,minLength:16,maxLength:16},{type:"VISA",reg:/^(4)/,minLength:13,maxLength:16},{type:"Amex",reg:/^(3[47])/,minLength:16,maxLength:16},{type:"DinersClub",reg:/^(3(0[012345]|[68]))/,minLength:16,maxLength:16},{type:"enRoute",reg:/^(2(014|149))/,minLength:16,maxLength:16},{type:"Discover",reg:/^(6011)/,minLength:16,maxLength:16},{type:"JCB",reg:/^(3)|^(2131|1800)/,minLength:15,maxLength:16}];function isCreditCard(str,options){var cardTypesAllowed=cardTypes;if(options&&options.cardTypesAllowed){cardTypesAllowed=options.cardTypesAllowed;}var l=str.length;if(l<13||l>16){return false;}if(!isLuhn(str)){return false;}if(cardTypesAllowed!==undefined){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=cardTypesAllowed[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var type=_step.value;var found=cardTypes.filter(function(x){return x.type===type;});if(found!=null&&found.length===1){found=found[0];return l>=found.minLength&&l<=found.maxLength&&found.reg.test(str);}}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}}return true;}exports.isCreditCard=isCreditCard;function isDate(input,options){return toDate(input,options)!=null;}exports.isDate=isDate;function isEAN13(input){var sum=0;var tmp;var multiply=false;if(input.length!==13){return false;}for(var i=input.length-1;i>=0;i--){tmp=parseInt(input.charAt(i),10);if(multiply&&tmp!==0){tmp*=3;}multiply=!multiply;sum+=tmp;}return sum%10===0;}exports.isEAN13=isEAN13;function isEmail(input){return!/@.*@.*/.test(input)&&!/\s/.test(input)&&!/\.@/.test(input)&&!/\.\./.test(input)&&/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/.test(input);}exports.isEmail=isEmail;function isEmpty(input,options){if(!options){options={ignore_spaces:true};}if(options&&options.ignore_spaces){input=input.trim();}return input.length===0;}exports.isEmpty=isEmpty;function isIBAN(str){var iban=str.replace(/ /g,"").toUpperCase();var ibancheckdigits="";var leadingZeroes=true;var cRest="";var cOperator="";var countrycode,ibancheck,charAt,cChar,bbanpattern,bbancountrypatterns,ibanregexp,i,p;var minimalIBANlength=5;if(iban.length<minimalIBANlength){return false;}countrycode=iban.substring(0,2);bbancountrypatterns={"AL":"\\d{8}[\\dA-Z]{16}","AD":"\\d{8}[\\dA-Z]{12}","AT":"\\d{16}","AZ":"[\\dA-Z]{4}\\d{20}","BE":"\\d{12}","BH":"[A-Z]{4}[\\dA-Z]{14}","BA":"\\d{16}","BR":"\\d{23}[A-Z][\\dA-Z]","BG":"[A-Z]{4}\\d{6}[\\dA-Z]{8}","CR":"\\d{17}","HR":"\\d{17}","CY":"\\d{8}[\\dA-Z]{16}","CZ":"\\d{20}","DK":"\\d{14}","DO":"[A-Z]{4}\\d{20}","EE":"\\d{16}","FO":"\\d{14}","FI":"\\d{14}","FR":"\\d{10}[\\dA-Z]{11}\\d{2}","GE":"[\\dA-Z]{2}\\d{16}","DE":"\\d{18}","GI":"[A-Z]{4}[\\dA-Z]{15}","GR":"\\d{7}[\\dA-Z]{16}","GL":"\\d{14}","GT":"[\\dA-Z]{4}[\\dA-Z]{20}","HU":"\\d{24}","IS":"\\d{22}","IE":"[\\dA-Z]{4}\\d{14}","IL":"\\d{19}","IT":"[A-Z]\\d{10}[\\dA-Z]{12}","KZ":"\\d{3}[\\dA-Z]{13}","KW":"[A-Z]{4}[\\dA-Z]{22}","LV":"[A-Z]{4}[\\dA-Z]{13}","LB":"\\d{4}[\\dA-Z]{20}","LI":"\\d{5}[\\dA-Z]{12}","LT":"\\d{16}","LU":"\\d{3}[\\dA-Z]{13}","MK":"\\d{3}[\\dA-Z]{10}\\d{2}","MT":"[A-Z]{4}\\d{5}[\\dA-Z]{18}","MR":"\\d{23}","MU":"[A-Z]{4}\\d{19}[A-Z]{3}","MC":"\\d{10}[\\dA-Z]{11}\\d{2}","MD":"[\\dA-Z]{2}\\d{18}","ME":"\\d{18}","NL":"[A-Z]{4}\\d{10}","NO":"\\d{11}","PK":"[\\dA-Z]{4}\\d{16}","PS":"[\\dA-Z]{4}\\d{21}","PL":"\\d{24}","PT":"\\d{21}","RO":"[A-Z]{4}[\\dA-Z]{16}","SM":"[A-Z]\\d{10}[\\dA-Z]{12}","SA":"\\d{2}[\\dA-Z]{18}","RS":"\\d{18}","SK":"\\d{20}","SI":"\\d{15}","ES":"\\d{20}","SE":"\\d{20}","CH":"\\d{5}[\\dA-Z]{12}","TN":"\\d{20}","TR":"\\d{5}[\\dA-Z]{17}","AE":"\\d{3}\\d{16}","GB":"[A-Z]{4}\\d{14}","VG":"[\\dA-Z]{4}\\d{16}"};bbanpattern=bbancountrypatterns[countrycode];if(typeof bbanpattern!=="undefined"){ibanregexp=new RegExp("^[A-Z]{2}\\d{2}"+bbanpattern+"$","");if(!ibanregexp.test(iban)){return false;}}ibancheck=iban.substring(4,iban.length)+iban.substring(0,4);for(i=0;i<ibancheck.length;i++){charAt=ibancheck.charAt(i);if(charAt!=="0"){leadingZeroes=false;}if(!leadingZeroes){ibancheckdigits+="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);}}for(p=0;p<ibancheckdigits.length;p++){cChar=ibancheckdigits.charAt(p);cOperator=""+cRest+""+cChar;cRest=cOperator%97;}return cRest===1;}exports.isIBAN=isIBAN;function isFloat(input,options){options=options||{};var check=input!==""&&input==+input&&input!==(input|0);return check&&(!options.hasOwnProperty("max")||+input<=options.max)&&(!options.hasOwnProperty("min")||+input>=options.min);}exports.isFloat=isFloat;function isIMEI(input){return input.length===15&&areDigits(input)&&isLuhn(input);}exports.isIMEI=isIMEI;function isInteger(input,options){options=options||{};var intWithoutZero=/^(?:[-+]?(?:0|[1-9][0-9]*))$/;var intWithZero=/^[-+]?[0-9]+$/;var regex=options.hasOwnProperty("allow_leading_zeroes")&&!options.allow_leading_zeroes?intWithoutZero:intWithZero;if(!regex.test(input)){return false;}input=parseInt(input,10);return(!options.hasOwnProperty("min")||input>=options.min)&&(!options.hasOwnProperty("max")||input<=options.max);}exports.isInteger=isInteger;function isIPv4(input){if(!/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(input)){return false;}var tokens=input.split(".");for(var i=0;i<tokens.length;i++){if(parseInt(tokens[i],10)>255){return false;}}return true;}exports.isIPv4=isIPv4;function isISBN10(input){var checksum=0;var i=void 0;if(!/^(?:[0-9]{9}X|[0-9]{10})$/.test(input)){return false;}for(i=0;i<9;i++){checksum+=(i+1)*input.charAt(i);}if(input.charAt(9)==='X'){checksum+=10*10;}else{checksum+=10*input.charAt(9);}if(checksum%11===0){return!!input;}return false;}function isISBN13(input){var checksum=0;var i=void 0;var factor=[1,3];if(!/^(?:[0-9]{13})$/.test(input)){return false;}for(i=0;i<12;i++){checksum+=factor[i%2]*input.charAt(i);}if(input.charAt(12)-(10-checksum%10)%10===0){return!!input;}return false;}function isISBN(input){return isISBN10(input)||isISBN13(input);}exports.isISBN=isISBN;function isISSN(input){var checksum=0;if(input.length===8){input="0"+input;}if(!/^\d{4}\-?\d{3}[\dX]$/.test(input)){return false;}input=input.replace("-","");for(var i=0;i<input.length;i++){var digit=input[i];checksum+=(digit==='X'?10:+digit)*(8-i);}return checksum%11===0;}exports.isISSN=isISSN;function isLuhn(input){var modulo=arguments.length>1&&arguments[1]!==undefined?arguments[1]:10;var sum=0;var tmp;var multiply=false;for(var i=input.length-1;i>=0;i--){tmp=parseInt(input.charAt(i),10);if(multiply&&tmp!==0){tmp*=2;if(tmp>9){tmp-=9;}}multiply=!multiply;sum+=tmp;}return sum%modulo===0;}exports.isLuhn=isLuhn;function isMobilePhoneFr(input){return /^(0)[67]\d{8}$/.test(input);}exports.isMobilePhoneFr=isMobilePhoneFr;function handleSpecialCodes(nirpp){if(nirpp.indexOf('A')!==-1){return{withoutLetters:nirpp.replace("A","0"),offset:1000000};}if(nirpp.indexOf('B')!==-1){return{withoutLetters:nirpp.replace("B","0"),offset:2000000};}return{withoutLetters:nirpp,offset:0};}function parse(nirpp){var _handleSpecialCodes=handleSpecialCodes(nirpp);var withoutLetters=_handleSpecialCodes.withoutLetters;var offset=_handleSpecialCodes.offset;return parseInt(withoutLetters,10)-offset;}function generateControlKey(nirpp){return 97-parse(nirpp)%97;}function decompose(input){return{sexe:parseInt(input.slice(0,1),10),an:parseInt(input.slice(1,3),10),mois:parseInt(input.slice(3,5),10),dept:input.slice(5,7),ville:parseInt(input.slice(7,10),10),ordre:parseInt(input.slice(10,13),10),key:parseInt(input.slice(-2),10)};}function isNIR(input){if(input.length!=15){return false;}try{var dec=decompose(input);if(!(dec.sexe===1||dec.sexe===2||dec.sexe===8)){return false;}var computedKey=generateControlKey(input.slice(0,13));return computedKey===dec.key;}catch(e){return false;}}exports.isNIR=isNIR;function isRIB(str){if(str.length!==23){return false;}var compte=str.slice(10,21);compte=compte.replace(/[A|J]/g,"1").replace(/[B|K|S]/g,"2").replace(/[C|L|T]/g,"3").replace(/[D|M|U]/g,"4").replace(/[E|N|V]/g,"5").replace(/[F|O|W]/g,"6").replace(/[G|P|X]/g,"7").replace(/[H|Q|Y]/g,"8").replace(/[I|R|Z]/g,"9");var key=str.slice(21,23);str=str.slice(0,10)+compte+key;if(!areDigits(str)){return false;}var k=parseInt(key,10);var banque=str.slice(0,5);var guichet=str.slice(5,10);var cp=parseInt(compte,10);var ki=banque%97;ki=ki*100000+parseInt(guichet,10);ki=ki%97;ki=ki*Math.pow(10,11)+cp;ki=ki%97;ki=ki*100;ki=ki%97;ki=97-ki;return ki===k;}exports.isRIB=isRIB;function isSEDOL(text){try{var input=text.substr(0,6);var check_digit=checkKey(input);return text===input+check_digit;}catch(e){return false;}return false;}function checkKey(num){var weight=[1,3,1,7,3,9];if(num.search(/^[0-9BCDFGHJKLMNPQRSTVWXYZ]{6}$/)==-1){throw"Invalid SEDOL number '"+num+"'";}var sum=0;for(var i=0;i<num.length;i++){sum+=weight[i]*parseInt(num.charAt(i),36);}var check=(10-sum%10)%10;return check.toString();}exports.isSEDOL=isSEDOL;function isSIREN(input){return input.length===9&&areDigits(input)&&isLuhn(input,10);}exports.isSIREN=isSIREN;function isSIRET(input){var precheck=input.length===14&&areDigits(input);var siren=input.slice(0,9);return precheck&&(isLuhn(siren,10)||siren==="356000000"&&isLuhn(input,5));}exports.isSIRET=isSIRET;function isTime(input){return /^([01][0-9]|2[0-3])(:[0-5][0-9]){1,2}$/.test(input);}exports.isTime=isTime;var trashEmailsServers=[];function setTrashEmailsServer(array){trashEmailsServers=array;}exports.setTrashEmailsServer=setTrashEmailsServer;function isTrashEmail(input){if(trashEmailsServers.length===0){throw Error("call setTrashEmailsServer with array string before call isTrashEmail");}var toks=input.split("@");if(toks.length!==2){throw Error(input+" is a bad email");}var server=toks[1].toLowerCase();return trashEmailsServers.filter(function(item){return server.indexOf(item)>=0;}).length>0;}exports.isTrashEmail=isTrashEmail;function isURL(str){var pattern=new RegExp('^(https?:\\/\\/)?'+'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+'((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?'+'(\\/[-a-z\\d%@_.~+&:]*)*'+'(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+'(\\#[-a-z\\d_]*)?$','i');return pattern.test(str);}exports.isURL=isURL;var getJSON=function getJSON(url,onSuccess,onError,options){var request=new XMLHttpRequest();if(typeof options!=="undefined"&&options!=null){if(options.forceReload){var rnd=Math.random();url+=url.indexOf("?")===-1?"?":"&";url+="___t="+rnd;}}request.open("GET",url,true);request.onload=function(){if(request.status>=200&&request.status<400){if(onSuccess){var result="";if(request.status===200){if(isDef(request.responseText)&&request.responseText!==""){result=JSON.parse(request.responseText);}else{result="{}";}}onSuccess(result);}}else{console.error("ajax error",request);if(onError){onError(request);}}};request.send();};function isValid(input,options){var url=options.templateUrl.replace("%value%",input);getJSON(url,options.onResponse,options.onError);}exports.isValid=isValid;function maxlength(input,options){return input.length<=options.max;}exports.maxlength=maxlength;function minlength(input,options){return input.length>=options.min;}exports.minlength=minlength;function sanitize(input,options){var safe=input;if(options.keepChars){var i=0;var clean="";var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=input[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var c=_step2.value;if(options.keepChars.indexOf(c)>=0){clean+=c;}}}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return();}}finally{if(_didIteratorError2){throw _iteratorError2;}}}safe=clean;}return safe;}exports.sanitize=sanitize;function decodeFormat(format){if(format==="DD/MM/YYYY"){return{reg:/^\d{1,2}\/\d{1,2}\/\d{4}$/,d:0,m:1,y:2,sp:"/"};}else if(format==="DD-MM-YYYY"){return{reg:/^\d{1,2}-\d{1,2}-\d{4}$/,d:0,m:1,y:2,sp:"-"};}else if(format==="MM/DD/YYYY")return{reg:/^\d{1,2}\/\d{1,2}\/\d{4}$/,d:1,m:0,y:2,sp:"/"};else if(format==="MM-DD-YYYY")return{reg:/^\d{1,2}-\d{1,2}-\d{4}$/,d:1,m:0,y:2,sp:"-"};else if(format==="YYYY-MM-DD")return{reg:/^\d{4}-\d{1,2}-\d{1,2}$/,d:2,m:1,y:0,sp:"-"};}function toDate(input,options){var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=options.formats[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var format=_step3.value;var exp=decodeFormat(format);if(exp.reg.test(input)){var tokens=input.split(exp.sp);var d=+tokens[exp.d];var m=+tokens[exp.m];var y=+tokens[exp.y];var monthLength=[31,28,31,30,31,30,31,31,30,31,30,31];if(y%400===0||y%100!==0&&y%4===0&&m===2){monthLength[1]=29;}if(d>0&&d<=monthLength[m-1]&&m>=1&&m<=12&&y>=0&&y<=9999){var dt=new Date(y,m-1,d);if(options.max&&dt>options.max||options.min&&dt<options.min){return null;}return dt;}}}}catch(err){_didIteratorError3=true;_iteratorError3=err;}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return();}}finally{if(_didIteratorError3){throw _iteratorError3;}}}return null;}exports.toDate=toDate;function validRegex(input,options){return options.regex.test(input);}exports.validRegex=validRegex;});
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _randomEmail = _interopRequireDefault(require("random-email"));

var _emailValidator = _interopRequireDefault(require("email-validator"));

var _formatValidator = _interopRequireDefault(require("format-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generate = document.getElementById('generate');
var popup = document.getElementById('popup');
var popupEmail = document.getElementById('popupEmail');
var close = document.getElementById('close');
generate.addEventListener("click", function (event) {
  popup.style.display = "block";
  popupEmail.innerHTML = "".concat((0, _randomEmail.default)({
    domain: 'alevel.com'
  }));
  generate.style.display = "none";
});
close.addEventListener("click", function (event) {
  generate.style.display = "block";
  popup.style.display = "none";
});
var input = document.getElementById('input');
input.addEventListener("change", function (event) {
  if (input.value === "") {
    input.style.border = "2px solid grey";
  } else if (_emailValidator.default.validate(input.value) === true) {
    input.style.border = "2px solid green";
  } else if (_emailValidator.default.validate(input.value) === false) {
    input.style.border = "2px solid red";
  }
}); //Задание 3

var check = document.getElementById('check');
var popupCheck = document.getElementById('popupCheck');
var popupTypes = document.getElementById('popupTypes');
var closeCheck = document.getElementById('closeCheck');
var inputFormat = document.getElementById('inputFormat');
var format = [];
var str = "";

for (var key in _formatValidator.default) {
  if (key[0] === "i" && key[1] === "s") {
    format.push(key);
  }
}

check.addEventListener("click", function (event) {
  for (var i = 0; i < format.length; i += 1) {
    if (format[i] !== "isDate" && format[i] !== "isTrashEmail" && format[i] !== "isValid") {
      if (_formatValidator.default[format[i]](inputFormat.value)) {
        for (var j = 2; j < format[i].length; j += 1) {
          str += format[i].charAt(j);
        }

        str += ", ";
      }
    }
  }

  str = str.slice(0, str.length - 2);
  popupCheck.style.display = "block";
  popupTypes.innerHTML = str;
  check.style.display = "none";
});
closeCheck.addEventListener("click", function (event) {
  check.style.display = "block";
  popupCheck.style.display = "none";
  str = "";
});
},{"random-email":"node_modules/random-email/index.js","email-validator":"node_modules/email-validator/index.js","format-validator":"node_modules/format-validator/distrib/format-validator.min.js"}],"../../../Users/Деня/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65343" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/Деня/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/lesson_6.e31bb0bc.js.map