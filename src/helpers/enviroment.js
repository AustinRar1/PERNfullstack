let APIURL = '';

switch (window.location.hostname) {
    case 'localhost':
            APIURL = 'http://localhost:3000'
        break;
    case 'ajr-voidstartclient.herokuapp.com':
    APIURL = 'https://ajr-voidstart.herokuapp.com/'
    default:
        break;
}
export default APIURL;