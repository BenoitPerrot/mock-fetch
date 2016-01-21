(function install(global) {
  'use strict';

  if (global._fetch === undefined) {

    // Save original fetch
    global._fetch = global.fetch;

    class Response {
      constructor(expectedResponse) {
        this.expectedJson = expectedResponse.json || JSON.parse(expectedResponse.text);
        this.expectedText = expectedResponse.text || JSON.stringify(expectedResponse.json);
      }

      json() {
        return Promise.resolve(this.expectedJson);
      }

      text() {
        return Promise.resolve(this.expectedText);
      }
    }

    class MockFetch {
      constructor() {
        this.expectations = [];
      }

      expect(urlPattern, expectedResponse) {
        this.expectations.push({
          urlPattern: urlPattern,
          initPattern: {},
          response: new Response(expectedResponse)
        });
        return this;
      }

      fetch(input, init) {
        const matchingExpectation = this.expectations.find(expectation => {
          // TODO: support other format of "input"
          if (input.match(expectation.urlPattern)) {
            // TODO: match init against initPattern
            return true;
          }
          return false;
        });

        if (matchingExpectation === undefined)
          // "input" was unexpected: let the original fetch handle it
          return global._fetch(input, init);

        return Promise.resolve(matchingExpectation.response);
      }
    }

    // Inject a mock fetch in place of origin one
    global.fetch = (function () {
      const unique = new MockFetch();

      function fetch(input, init) {
        return unique.fetch(input, init)
      }
      fetch.expect = (urlPattern, expectedResponse) => unique.expect(urlPattern, expectedResponse);

      return fetch;
    } ());
  }
}) (window);
