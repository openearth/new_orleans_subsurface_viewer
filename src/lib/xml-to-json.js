export default function xmlToJson (xml) {
    const document = new window.DOMParser().parseFromString(xml, 'text/xml');
    const element = document.getElementsByTagName('wps:ComplexData');
    return JSON.parse(element[0].textContent);
}
