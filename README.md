# SimplePipes

Simple flow library based on pipes.

## Installation

Via npm using (Node.js)[http://nodejs.org]:
```
npm install simplepipes
```

## Usage

Reference in your program:
```js
var simplepipes = require('simplepipes');
```

Define and use a flow
```js
var flow = simplepipes.createFlow(
    "pipe1",
    function (val) {
        console.log(val);
        this.pipe2.send(val + 1);
    },
    "pipe2",
    function (val) {
        console.log(val);
        test.done();
    }
);

flow.start();
flow.pipe1.send(1);
```
The output:
```
1
2
```

The strings define the pipes to be used. Each function is preceded by a list of pipe names defined in the flow.
Each function fires when they associated pipes have values. The values are given to the function as arguments.

You can define initial functions without associated pipes. They are fired once after starting the flow.

```js
var flow = simplepipes.createFlow(
    function() { this.pipe1.send(1);
    "pipe1",
    function (val) {
        console.log(val);
        this.pipe2.send(val + 1);
    },
    "pipe2",
    function (val) {
        console.log(val);
        test.done();
    }
);
```
with the same output.

## Development

```
git clone git://github.com/ajlopez/SimplePipes.git
cd SimplePipes
npm install
npm test
```

## Samples

[Collatz sample](https://github.com/ajlopez/SimplePipes/tree/master/samples/collatz) Collatz problem sample.

## Inception

This work was inspired by [Circuit](https://github.com/tatumizer/circuit) by [Tatumizer](https://github.com/tatumizer), but
also it was based on my past years research and experiments about Go Channels and distributed applications. I had implemented in other technologies (see
[Channels And GoRoutines In AjSharp](http://ajlopez.wordpress.com/2009/12/30/channels-and-goroutines-in-ajsharp-part-2/),
[GoRoutines And Channels In C#](http://ajlopez.wordpress.com/2010/01/02/goroutines-and-channels-in-c/),
[Queue Channels In AjSharp](http://ajlopez.wordpress.com/2010/01/27/queue-channels-in-ajsharp/), and now, it's time
to implement something in JavaScript/Node.js.

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimplePipes) and submit
[pull requests](https://github.com/ajlopez/SimplePipes/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

