let APIURL = '';

switch (window.location.hostname) {
    case 'localhost':
            APIURL = 'http://localhost:3000'
        break;

    default:
        break;
}
export default APIURL;