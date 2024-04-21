export default function capitalizeFirstLetter(string) {
  if (!string) return string;
  if (typeof string !== "string") {
    // console.log("Can't do capitalization because passed value is not", string);
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
