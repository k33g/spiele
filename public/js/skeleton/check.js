/**
 * Created by k33g_org on 01/11/14.
 */

let check = (condition, message) => {
  if (!condition) {
    message = message || "Assertion failed";
    throw new Error(message);
  }
}

export default check;