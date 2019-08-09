import Vue from 'nativescript-vue'
if (TNS_ENV === 'production') {
    var config = {
        BASEURL: "http://ec2-18-223-30-82.us-east-2.compute.amazonaws.com"
    }
} else {
    var config = {
        BASEURL: "http://ec2-18-223-30-82.us-east-2.compute.amazonaws.com"
    }
}
export default config;