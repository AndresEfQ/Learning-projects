'use strict'

console.log("Hello World!");

/*
Create new Calculator
importance: 5
Create a constructor function Calculator that creates objects with 3 
methods:

read() asks for two values using prompt and remembers them in object 
properties.
sum() returns the sum of these properties.
mul() returns the multiplication product of these properties.
*/
function Calculator() {
  this.read = function() {
    this.val1 = +prompt("First value?","0");
    this.val2 = +prompt("Second value?","0");
  };
  this.sum = function() {
    return this.val1 + this.val2;
  };
  this.mul = function() {
    return this.val2 + this.val3;
  };

}

/* 
Sum numbers from the visitor
importance: 5
Create a script that prompts the visitor to enter two numbers and then 
shows their sum. 
*/
function sumValues() {
  let val1 = +prompt("Val1?","0");
  let val2 = +prompt("Val2?","0");

  return val1 + val2;
}

/*
Repeat until the input is a number
importance: 5
Create a function readNumber which prompts for a number until the visitor
enters a valid numeric value.

The resulting value must be returned as a number.

The visitor can also stop the process by entering an empty line or 
pressing “CANCEL”. In that case, the function should return null.
*/
function readNumber() {
  let number = +prompt("Please insert a number","");
  if (isNaN(number)) readNumber();
  else if (!number) return null;
  return number;
}

/*
A random number from min to max
importance: 2
The built-in function Math.random() creates a random value from 0 to 1 
(not including 1).

Write the function random(min, max) to generate a random floating-point 
number from min to max (not including max).
*/
function random(min, max) {
  return min + Math.random() * (max - min);
}

/*
A random integer from min to max
importance: 2
Create a function randomInteger(min, max) that generates a random integer 
number from min to max including both min and max as possible values.

Any number from the interval min..max must appear with the same 
probability.
*/
function randomInteger(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

/*
Uppercase the first character
importance: 5
Write a function ucFirst(str) that returns the string str with the 
uppercased first character.
*/
function ucFirst(str) {
  if (!str) return str;
  let firstChar = str[0].toUpperCase();
  let ucString = firstChar + str.slice(1);
  return ucString;
}

/*
Check for spam
importance: 5
Write a function checkSpam(str) that returns true if str contains ‘viagra’
or ‘XXX’, otherwise false.

The function must be case-insensitive:
My solution:
*/
function checkSpam(str) {
  if (str.toLowerCase().includes("viagra") || str.toLowerCase().includes("xxx")) return true;
  else return false;
}
// The tutorial's solution:
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

/*
Truncate the text
importance: 5
Create a function truncate(str, maxlength) that checks the length of the str and, if it exceeds maxlength – replaces the end of str with the ellipsis character "…", to make its length equal to maxlength.

The result of the function should be the truncated (if needed) string.
*/
// My solution:
function truncate(str, maxlength) {
  let trunc = ""
  if (maxlength < str.length) {
    trunc = str.slice(0, maxlength - 1) + "\u2026";
  } else {
    trunc = str
  }
  return trunc;
}
// The tutorial's solution:
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}

/* 
Extract the money
importance: 4
We have a cost in the form "$120". That is: the dollar sign goes first, 
and then the number.

Create a function extractCurrencyValue(str) that would extract the numeric 
value from such string and return it.
*/
function extractCurrencyValue(str) {
  if (!str.includes($)) return str;
  return +str.slice(1);
}
// inspired by the coments:
function betterExtractCurrencyValue(str) {
  let length = str.length
  for (let i = 0; i <= length; i++) {
    if (!isNaN(str[i])) return +str.slice(i);
  }
}

/*
Sum input numbers
importance: 4
Write the function sumInput() that:

Asks the user for values using prompt and stores the values in the array.
Finishes asking when the user enters a non-numeric value, an empty string, or presses “Cancel”.
Calculates and returns the sum of array items.
P.S. A zero 0 is a valid number, please don’t stop the input on zero.
*/
function sumInput() {
  let values = [];
  let sum = 0;
  let value = prompt("value?",'');
 
  while (value) {
    values.push(value);
    value = prompt("value?","");
  }
  for (let input of values) {
    sum += +input;
  }
  return ("sum = " + sum + " values: " + values);
}

/*
A maximal subarray
importance: 2
The input is an array of numbers, e.g. arr = [1, -2, 3, 4, -9, 6].

The task is: find the contiguous subarray of arr with the maximal sum of items.

Write the function getMaxSubSum(arr) that will return that sum.
*/

// My first solution was to create all possible subarrays and then sum 
// their elements
function getMaxSubSum1(arr) {
  let newArr = [];
  let sum = 0;
  let maxSum = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      for (let k = i; k <= j; k++) {
        newArr.push(arr[k]);
        for (let val of newArr) {
          sum += val;
        }
        if (maxSum < sum) maxSum = sum;
        sum = 0;
      }
      newArr = [];
    }
  }
  return maxSum + ' ' + newArr;
}

// A better solution is to just sum the elements without creating the
// subarrays
function getMaxSubSum2(arr) {
  let maxSum = 0;
  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];
      if (maxSum < sum) maxSum = sum;
    }
  }
  return maxSum;
}

// The last solution: walk the array and keep the subsum, if it becomes
// negative, turn it to 0, return the biggest subsum: (tutorial answer)
function getMaxSubSum3(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // for each item of arr
    partialSum += item; // add it to partialSum
    maxSum = Math.max(maxSum, partialSum); // remember the maximum
    if (partialSum < 0) partialSum = 0; // zero if negative
  }

  return maxSum;
}

/* 
Translate border-left-width to borderLeftWidth
importance: 5
Write the function camelize(str) that changes dash-separated words like
“my-short-string” into camel-cased “myShortString”.

That is: removes all dashes, each word after dash becomes uppercased.
*/
function camelize(str) {
  return str
    .split('-')
    .map((item, index) => index==0 ? item : (item[0].toUpperCase() + item.substring(1)))
    .join('');
}

/*
Filter range
importance: 4
Write a function filterRange(arr, a, b) that gets an array arr, 
looks for elements with values higher or equal to a and lower or equal to 
b and return a result as an array.

The function should not modify the array. It should return the new array.
*/
function filterRange(arr, a, b) {
  let newArr = arr.slice(); // copy array
  return newArr.filter(item => (item >= a && item <= b)); // filter items
}

/*
Filter range "in place"
importance: 4
Write a function filterRangeInPlace(arr, a, b) that gets an array arr and 
removes from it all values except those that are between a and b. The test 
is: a ≤ arr[i] ≤ b.

The function should only modify the array. It should not return anything.
*/
function filterRangeInPlace(arr, a, b) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < a || arr[i] > b) {
      arr.splice(i, 1);
      i--
    }
  }
}

/*
Copy and sort array
importance: 5
We have an array of strings arr. We’d like to have a sorted copy of it, but keep arr unmodified.

Create a function copySorted(arr) that returns such a copy.
*/
function copySorted(arr) {
  let sorted = arr.slice();
  return sorted.sort();
}

/*
Create an extendable calculator
importance: 5
Create a constructor function Calculator that creates “extendable” calculator objects.

The task consists of two parts.

First, implement the method calculate(str) that takes a string like 
"1 + 2" in the format “NUMBER operator NUMBER” (space-delimited) and 
returns the result. Should understand plus + and minus -.

Then add the method addMethod(name, func) that teaches the calculator a 
new operation. It takes the operator name and the two-argument function 
func(a,b) that implements it.

For instance, let’s add the multiplication *, division / and power **:

let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
alert( result ); // 8

No parentheses or complex expressions in this task.
The numbers and the operator are delimited with exactly one space.
There may be error handling if you’d like to add it.
*/
function ExtendableCalculator() {

  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
  };

  this.calculate = function(str) {

    let arr = str.split(' ');
    let a = +arr[0];
    let op = arr[1];
    let b = + arr[2];

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[op](a, b);
  };

  this.addMethod = function(name, funct) {
    this.methods[name] = funct;
  };
}

/*
Map to names
importance: 5
You have an array of user objects, each one has user.name. Write the code 
that converts it into an array of names.

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let usersA = [ john, pete, mary ];

let names = usersA.map(item => item['name']);

/*
Map to objects
importance: 5
You have an array of user objects, each one has name, surname and id.

Write the code to create another array from it, of objects with id and 
fullName, where fullName is generated from name and surname.
*/
let alice = { name: "Alice", surname: "Smith", id: 1 };
let bob = { name: "Bob", surname: "Hunt", id: 2 };
let charlie = { name: "Charlie", surname: "Key", id: 3 };

let usersB = [ alice, bob, charlie ];

let usersMapped = usersB.map(user => ({
  fullName: `${user.name} ${user.surname}`, 
  id: user.id
}));

/*
Sort users by age
importance: 5
Write the function sortByAge(users) that gets an array of objects with 
the age property and sorts them by age.

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];
*/
function sortByAge(arr) {
  return arr.sort((a, b) => a.age - b.age);
}

/*
Shuffle an array
importance: 3
Write the function shuffle(array) that shuffles (randomly reorders) 
elements of the array.

Multiple runs of shuffle may lead to different orders of elements
*/
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const posts = [{
  id: 1,
  title: 'Mi primer post',
  image: 'https://img.com/1',
  tags: ['javascript', 'webdevelopment'],
}, {
  id: 2,
  title: 'Mi experiencia con React',
  image: 'hhtp://img.com/2',
  tags: ['javascript', 'webdevelopment', 'react'],
}, {
  id: 3,
  title: 'Por qué dejé Angular',
  image: 'https://img.com/3',
  tags: ['javascript', 'webdevelopment', 'angular'],
}]

let posts1 = posts.find(posts => posts.title == 'Por qué dejé Angular');
let posts2 = posts.find(posts => posts.id == 2);

let posts3 = posts.some(post => post.id == 4);
let posts4 = posts.some(post => post.id == 1);
let posts5 = posts.some(post => post.tags.includes('react'));

let posts6 = posts.every(post => post.tags.includes('react'));
let posts7 = posts.every(post => post.tags.includes('javascript'));

let posts8 = posts.map(post => post.title);

let posts9 = posts.filter(post => post.tags.includes('angular'));

/*
Get average age
importance: 4
Write the function getAverageAge(users) that gets an array of objects with property age and returns the average age.

The formula for the average is (age1 + age2 + ... + ageN) / N.
*/
function getAverageAge1(users) {

  let sum = users
    .map(user => user.age)
    .reduce((sum, current) => sum + current, 0);
  return sum / users.length;
}
// there's no need to map the array because reduce could use the user.age
function getAverageAge2(users) {

  let sum = users
    .reduce((sum, user) => sum + user.age, 0);
  return sum / users.length;
}

/*
Filter unique array members
importance: 4
Let arr be an array.

Create a function unique(arr) that should return an array with unique 
items of arr.
*/
function unique1(arr) {
  let uniqueArr = [];
  for (let item of arr) {
    if (!uniqueArr.includes(item)) uniqueArr.push(item);
  }
  return uniqueArr;
}
 //answer from the comments
function unique2(names) {
  return names.filter((name,ind) => names.indexOf(name, ind + 1) == -1);
  } // only filter the words which aren't found from the next index and
    // forwards

/*
Create keyed object from array
importance: 4
Let’s say we received an array of users in the form {id:..., name:..., 
age:... }.

Create a function groupById(arr) that creates an object from it, with id 
as the key, and array items as values.
*/
function groupById(arr) {
  return arr.reduce((obj, value) => {obj[value.id] = value;
  return obj;
  }, {})
} // the accumulator is an object and the initializer is an empty object

/*
Filter unique array members
importance: 5
Let arr be an array.

Create a function unique(arr) that should return an array with unique 
items of arr.
*/
function unique3(arr) {
  let set = new Set();
  for (let value of arr) {
    set.add(value);
  }
  return set;
}

function unique4(arr) {
  let set = new Set(arr);
  return set;
}

function unique5(arr) {
  return Array.from(new Set(arr));
}

/*
Filter anagrams
importance: 4
Anagrams are words that have the same number of same letters, but in 
different order.

For instance:

nap - pan
ear - are - era
cheaters - hectares - teachers
Write a function aclean(arr) that returns an array cleaned from anagrams.

For instance:

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
From every anagram group should remain only one word, no matter which one.
*/
let anagrams = ["nap", "apn", "pan", "anp", "pna", "npa"];
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

function aclean(arr) { //My solution
  let splitted = [];
  let joined = [];
  let set = new Set();
  for (let word of arr) {
    splitted.push(word.toLowerCase().split('').sort());
  }
  for (let array of splitted) {
    joined.push(array.join(''));
  }
  for (let word2 of joined) {
    set.add(word2);
  }
  return Array.from(set);
}

function aclean2(arr) { // the tutorial's solution
  let map = new Map();
  for (let word of arr) {
    let sorted = word.toLowerCase().split('').sort().join('');
    map.set(sorted, word);
  }
  return Array.from(map.values());
} /* the tutorial's solution is better because it returns one of the 
words from the original array instead of the lower case sorted version of
the word my solution returns */

/*
Sum the properties
importance: 5
There is a salaries object with arbitrary number of salaries.

Write the function sumSalaries(salaries) that returns the sum of all salaries using Object.values and the for..of loop.

If salaries is empty, then the result must be 0.
*/
function sumSalaries(salaries) {
  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }
  return sum;
}

/*
Count properties
importance: 5
Write a function count(obj) that returns the number of properties in the 
object:
Try to make the code as short as possible.
P.S. Ignore symbolic properties, count only “regular” ones.
*/
function count(obj) { //my solution
  return Object.keys(obj).reduce((a,b) => a + 1, 0);
}

function countT(obj) { // The tutorial's solution. it's shorter (╯︵╰,)
  return Object.keys(obj).length;
}

/*
The maximal salary
importance: 5
There is a salaries object:
*/
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};/*
Create the function topSalary(salaries) that returns the name of the 
top-paid person.

If salaries is empty, it should return null.
If there are multiple top-paid persons, return any of them.
P.S. Use Object.entries and destructuring to iterate over key/value pairs.
*/
function topSalary(salaries) {
  let topSalary = 0;
  let topPaidPerson = null;
  for (let [name, salary] of Object.entries(salaries)) {
    if (salary > topSalary) {
      topSalary = salary
      topPaidPerson = name;
    }
  }
  return topPaidPerson;
}

/*
Show a weekday
importance: 5
Write a function getWeekDay(date) to show the weekday in short format: 
‘MO’, ‘TU’, ‘WE’, ‘TH’, ‘FR’, ‘SA’, ‘SU’.
*/
function getWeekDay(date) {
  let weekDays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  return weekDays[date.getDay()];
}

/*
European weekday
importance: 5
European countries have days of week starting with Monday (number 1), 
then Tuesday (number 2) and till Sunday (number 7). Write a function 
getLocalDay(date) that returns the “European” day of week for date.
*/
function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { // weekday 0 (sunday) is 7 in european
    day = 7;
  }

  return day;
}

/*
Which day of month was many days ago?
importance: 4
Create a function getDateAgo(date, days) to return the day of month days 
ago from the date.

For instance, if today is 20th, then getDateAgo(new Date(), 1) should be 
19th and getDateAgo(new Date(), 2) should be 18th.

Should work reliably for days=365 or more:
*/
function getDateAgo(date, days) { // My solution
  return (new Date(date.getFullYear(), date.getMonth(), (date.getDate() - days)).getDate())
}

function getDateAgoT(date, days) { // The tutorial's solution
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

/*
Last day of month?
importance: 5
Write a function getLastDayOfMonth(year, month) that returns the last day 
of month. Sometimes it is 30th, 31st or even 28/29th for Feb.

Parameters:

year – four-digits year, for instance 2012.
month – month, from 0 to 11.
For instance, getLastDayOfMonth(2012, 1) = 29 (leap year, Feb).
*/
function getLastDayOfMonth (year, month) { // My solution
  let currMonth = new Date(year, month, 1);
  let nextMont = new Date (year, month + 1, 1);

  return (new Date(nextMont - currMonth)).getDate();
}

function getLastDayOfMonthT(year, month) { // The tutorial's solution
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

/*
How many seconds have passed today?
importance: 5
Write a function getSecondsToday() that returns the number of seconds 
from the beginning of today.

For instance, if now were 10:00 am, and there was no daylight savings 
shift, then:

getSecondsToday() == 36000 // (3600 * 10)
The function should work in any day. That is, it should not have a 
hard-coded value of “today”.
*/
function getSecondsToday() {
  let now = new Date();
  let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((now - startOfDay) / 1000);
}

/*
How many seconds till tomorrow?
importance: 5
Create a function getSecondsToTomorrow() that returns the number of 
seconds till tomorrow.
*/
function getSecondsToTomorrow() {
  let now = new Date();
  let endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return Math.round((endOfDay - now) / 1000);
}

/*
Format the relative date
importance: 4
Write a function formatDate(date) that should format date as follows:

If since date passed less than 1 second, then "right now".
Otherwise, if since date passed less than 1 minute, then "n sec. ago".
Otherwise, if less than an hour, then "m min. ago".
Otherwise, the full date in the format "DD.MM.YY HH:mm". That is: 
"day.month.year hours:minutes", all in 2-digit format, e.g. 
31.12.16 10:00.
*/
function formatDate(date) {
  let diff = new Date() - date;
  let sec = Math.floor(diff / 1000);
  let min = Math.floor(sec / 60);

  if (diff < 1000) {
    return 'right now'

  } else if (sec < 60) {
    return sec + ' sec. ago'

  } else if (min < 60) {
    return min + ' min ago'

  } else {
    let parseDate = [
      '0' + date.getDate(),
      '0' + (date.getMonth() + 1),
      '' + date.getFullYear(),
      '0' + date.getHours(),
      '0' + date.getMinutes()
    ].map(component => component.slice(-2));

    return parseDate.slice(0, 3).join('.') + ' ' + parseDate.slice(3).join(':');
  }
}

/*
Turn the object into JSON and back
importance: 5
Turn the user into JSON and then read it back into another variable.

let user = {
  name: "John Smith",
  age: 35
};

let json = JSON.stringify(user);
let string = JSON.parse(json);
*/

/*
Exclude backreferences
importance: 5
In simple cases of circular references, we can exclude an offending property from serialization by its name.

But sometimes we can’t just use the name, as it may be used both in circular references and normal properties. So we can check the property by its value.

Write replacer function to stringify everything, but remove properties that reference meetup:
*/
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

// circular references
room.occupiedBy = meetup;
meetup.self = meetup;
/*
alert( JSON.stringify(meetup, function replacer(key, value) {
   //your code 
}));
/*
 result should be:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}

alert( JSON.stringify(meetup, function replacer(key, value) {
  return (key != "" && value == meetup) ? undefined : value;
}));
*/

/*
Sum all numbers till the given one
importance: 5
Write a function sumTo(n) that calculates the sum of numbers 1 + 2 + ... + n.

For instance:

sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
Make 3 solution variants:

Using a for loop.
Using a recursion, cause sumTo(n) = n + sumTo(n-1) for n > 1.
Using the arithmetic progression formula.
*/

function sumToFor(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

function sumToRec(n) {
  return (n == 1) ? 1 : (n + sumToRec(n-1));
}

function sumToProp(n) {
  return (n * (1 + n)) / 2;
}

/*
Calculate factorial
importance: 4
The factorial of a natural number is a number multiplied by "number minus 
one", then by "number minus two", and so on till 1. The factorial of n is 
denoted as n!

We can write a definition of factorial like this:

n! = n * (n - 1) * (n - 2) * ...*1
Values of factorials for different n:

1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
The task is to write a function factorial(n) that calculates n! using 
recursive calls.
*/
function factorial(n) {
  return (n == 1) ? 1 : n * factorial(n-1);
}

/*
Fibonacci numbers
importance: 5
The sequence of Fibonacci numbers has the formula Fn = Fn-1 + Fn-2. In other words, the next number is a sum of the two preceding ones.

First two numbers are 1, then 2(1+1), then 3(1+2), 5(2+3) and so on: 1, 1, 2, 3, 5, 8, 13, 21....

Fibonacci numbers are related to the Golden ratio and many natural phenomena around us.

Write a function fib(n) that returns the n-th Fibonacci number.

An example of work:

function fib(n) { // your code }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
P.S. The function should be fast. The call to fib(77) should take no more than a fraction of a second.
*/
function fibIt(n) {
  if (n == 0) return 0;
  let fibPrev = 0;
  let fibCurr = 1;
  let temporal = 0;
  for (let i = 2; i <= n; i++) {
    temporal = fibPrev
    fibPrev = fibCurr
    fibCurr = fibCurr + temporal;
  }
  return fibCurr;
}

function fibRec(n) { // Extremadamente lento porque se calculan varias veces los mismos valores
  if (n == 0) { 
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fibRec(n - 1) + fibRec(n - 2);
  }
}

/*
Output a single-linked list
importance: 5
Let’s say we have a single-linked list (as described in the chapter Recursion and stack):

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
Write a function printList(list) that outputs list items one-by-one.

Make two variants of the solution: using a loop and using recursion.

What’s better: with recursion or without it?
*/

function printListRec(list) { // My solution, but I was going of printing a list instead of alerts
  let print = '';
  if (!list.next) {
    print += list.value;
  } else {
    print = print + list.value + printListRec(list.next);
  }
  return print;
}

function printListRecT(list) {
  alert(list.value); // output the current item

  if (list.next) {
    printList(list.next); // do the same for the rest of the list
  }
}

function printListIt(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }
}

/*
Output a single-linked list in the reverse order
importance: 5
Output a single-linked list from the previous task Output a single-linked list in the reverse order.

Make two solutions: using a loop and using a recursion.
*/
function printReListRec(list) {
  if (!list.next) {
    alert(list.value);
  } else {
    printReListRec(list.next);
    alert(list.value);
  }
}

function printReverseListRec(list) { // Tutorial's solution

  if (list.next) {
    printReverseListRec(list.next);
  }

  alert(list.value);
}

function printReListIt(list) {
  let tmp = list;

  while (tmp) {
    tmp = tmp.next;
    alert(tmp.value);
  }
}

function printReverseListIt(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

/*
Sum with closures
importance: 4
Write function sum that works like this: sum(a)(b) = a+b.

Yes, exactly this way, using double parentheses (not a mistype).

For instance:

sum(1)(2) = 3
sum(5)(-1) = 4
*/
function sum(n) {
  return function(m) {
    return +n + +m;
  }
}

/*
Filter through function
importance: 5
We have a built-in method arr.filter(f) for arrays. It filters all elements through the function f. If it returns true, then that element is returned in the resulting array.

Make a set of “ready to use” filters:

inBetween(a, b) – between a and b or equal to them (inclusively).
inArray([...]) – in the given array.
The usage must be like this:

arr.filter(inBetween(3,6)) – selects only values between 3 and 6.
arr.filter(inArray([1,2,3])) – selects only elements matching with one of the members of [1,2,3].
For instance:

// .. your code for inBetween and inArray
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
*/

function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}

function inArray(arr) {
  return function(x) {
    return arr.includes(x);
  };
}

function byField(fieldName){
  return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}

/*
Set and decrease for counter
importance: 5
Modify the code of makeCounter() so that the counter can also decrease 
and set the number:

counter() should return the next number (as before).
counter.set(value) should set the counter to value.
counter.decrease() should decrease the counter by 1.
See the sandbox code for the complete usage example.

P.S. You can use either a closure or the function 
property to keep the current count. Or write both variants.*/