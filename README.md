# Mock Fetch

Javascript mocking library for [Fetch](https://fetch.spec.whatwg.org/)

## Installation

mock-fetch is available as a bower component; use the following
command to get it:

```
bower install mock-fetch
```

## Prerequisites

- *An ES6-enabled web browser*: mock-fetch is written in ECMAScript 6,
  leveraging notably classes and arrow functions.

- *A Fetch-enabled web brower*: mock-fetch falls back to the fetch
  implementation initially provided for unexpected URLs.

## Usage

Assuming that the bower configuration being used obtains components in
the "bower_components" directory, and it is being served at the root
of your web site: include the following script tag in your HTML page,
at a location preceding the use of the mock:

```html
<script src="/bower_components/mock-fetch/mock-fetch.js"></script>
```
