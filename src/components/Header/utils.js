export function ajaxGet(url, callback) {
  if (typeof XDomainRequest !== 'undefined') {
    callback(null);
    return null;
  }

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
  return xhr;
}

export function classNames(classSet) {
  return Object.keys(classSet)
    .filter((key) => classSet[key])
    .join(' ');
}
