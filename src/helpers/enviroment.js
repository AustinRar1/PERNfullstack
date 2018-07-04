let APIURL = '';

switch (window.location.hostname) {
    case 'localhost':
        APIURL = 'http://localhost:3001'
        break;
    case 'ajr-voidstartclient.herokuapp.com':
        APIURL = 'https://ajr-voidstart.herokuapp.com/'
        break;
    default:
        break;
}
export default APIURL;