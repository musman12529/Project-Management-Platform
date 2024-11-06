# Project  Part II (due Nov 7, 2024)

Implement a server for your project that implements an HTTP/API for the 7 required server-side features and two additional server-side features of your own choice.

A server-side feature is a feature requiring at least one additional HTTP request/service to be implemented. THis means the feature cannot be merely GUI styling or presentation, but should involve some manipulation of information by the server.

Create unit tests to exercise and test all your server-side HTTP/API request/services. Put the unit tests in a folder called tests.

In your README.md file, provide the following:

* a short explanation of the layout of your repo files
* a short description of the architecture of your javascript code files
* for each of the seven required features,
    * identify the HTTP/API request/services required to implement the feature
        * for each new API/HTTP request/service, 
            * the request syntax, as with Part 1 instructions (HTTP command verb, service spec, and any query or other parameters needed)
            * a short (one or two sentence) description of the service, 
            * which unit tests or tests belong to that request/service
        * note typically a feature will only need a single HTTP call to support the feature, but a feature may require more than one HTTP request; or it may share an HTTP request that is also used by another feature
* for each of the two additional features,
    * the HTTP/API request/services required to implement the feature
        * for each API/HTTP request/service, 
            * the request syntax,
            * a short (one or two sentence) description of the service, 
            * which unit tests or tests belong to that request/service
        * note that a feature may require more than one HTTP request; or it may share an HTTP request that is also used by another feature
* a description of how to set up and run your server for testing, including any database or other services or features needed. Usually your repo would include the npm package.json file to indicate the packages needed.
* how to run the unit tests, and which ones are working or not working properly.

An attributions table is required in a separate attributions.md document.

## Evaluation

Only aspects of the submission the marker can reasonably understand from your README will be credited.

Credit will be equally divided among 9 features, portioned as follows:

* 2 points: sufficient HTTP syntax and structure for feature
* 4 points: code structure and implementation
* 2 points: unit tests correctly exercise HTTP/API
* 4 points: unit test demonstrates server-side implementation working

To exercise each HTTP request, there should a minimum of two unit tests per request: one test to exercise the correct use of the HTTP call and response, and one unit test to test an error condition.  

* 12 x 8 = 96 points total






