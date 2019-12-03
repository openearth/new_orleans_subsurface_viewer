import convert from 'xml-js';

export default async function getLocalXml(url) {
  return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            const res = this.response;
            const parsed = convert.xml2js(res, {
              compact: true,
              spaces: 2
            });
            resolve(parsed);
          } else {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
          }
      };
      xhr.onerror = function () {
          reject({
              status: this.status,
              statusText: xhr.statusText
          });
      };
      xhr.send();
  });
}
