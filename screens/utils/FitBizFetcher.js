// TODO: Move this to .env file.
const LOGGING_ENABLED = false;

/**
 * This function wraps the 'fetch' function provided in JS. This should be used for making requests
 * from all over the code base. this simplifies logging, and debugging. We can log all our requests in one place
 * this way.
 */
export const fitbizfetcher = async ({
  url,
  method = "GET",
  headers = {},
  body = {},
  cacheRequest = false,
}) => {
  if (LOGGING_ENABLED) {
    console.log(`Fetching with url: ${url}`);
  }

  // We should add some headers for GET requests so that
  // 'fetch' does not cache them.
  if (method == "GET" && !cacheRequest) {
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Pragma"] = "no-cache";
    headers["Expires"] = 0;
  }

  var formBody = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  headers["Content-Type"] = "application/x-www-form-urlencoded;charset-UTF-8";

  let requestDescription = {
    method: method,
    headers: headers,
  };

  // We won't include body for GET and HEAD requests.
  // Else 'fetch' will error.
  if (["GET", "HEAD"].includes(method) == false) {
    requestDescription["body"] = formBody;
  }

  if (LOGGING_ENABLED) {
    console.log(`> Url: ${url}`);
    console.log(`> Request:`);
    console.log(requestDescription);
  }

  let response = await fetch(url, requestDescription);
  if (!response.ok) {
    if (LOGGING_ENABLED) {
      console.log("< Response not OK.");
      console.log(response.status);
    }
    // TODO: Should we throw or not???
    // throw Error(response.statusText);
  }
  let responseJson = {};
  // The "HEAD" does not return a body
  // so we won't do .json() on HEAD.
  if (method != "HEAD") {
    // Try parsing the body if it don't parse
    // return text.
    const responseContent = await response.text();

    try {
      responseJson = { json: JSON.parse(responseContent) };
    } catch {
      responseJson = { raw: responseContent };
    }
  }
  responseJson.statusCode = response.status;
  if (LOGGING_ENABLED) {
    console.log(`< RAW response: `);
    console.log(response);
  }
  return responseJson;
};
