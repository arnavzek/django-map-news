export default function getUrlParams(theRoute) {
  let searchPath = theRoute.split("?")[1];

  const urlParams = new URLSearchParams("?" + searchPath);

  return urlParams;
}
