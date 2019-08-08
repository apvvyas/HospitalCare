import Vue from 'nativescript-vue'
import Route from "@/routes";
import * as utils from "tns-core-modules/utils/utils";
import * as application from "tns-core-modules/application";
import moment from "moment";
import {
    isIOS,
    isAndroid
} from "tns-core-modules/platform";
let route = new Route();
const Helpers = {
    mergeObject: function (fullObj, replaceObj) {
        Object.keys(replaceObj).forEach(function (key) {
            if (replaceObj[key] != null && typeof replaceObj[key] === 'object') {
                Object.keys(replaceObj[key]).forEach(function (k) {
                    fullObj[key][k] = replaceObj[key][k];
                });
            } else {
                fullObj[key] = replaceObj[key];
            }
        });
        return fullObj;
    },
    navigateTo: function (routeName, propObj, frame = 'default', clearHistory = false) {
        Vue.prototype.$navigateTo(route.getRoute(routeName), {
            frame: frame,
            animated: true,
            transition: {
                name: 'slide',
                duration: 500
            },
            props: propObj,
            clearHistory: clearHistory
        });
    },
    truncate: function (string, maxlenth) {
        if (string && string.length > maxlenth)
            return string.substring(0, maxlenth) + '...';
        else
            return string;
    },
    currencyText: function (string) {
        if (string && string.length > 0)
            return '£ ' + string;
        else
            return string;
    },
    getFirstLetter: function (string) {
        if (string && string.length > 0)
            return string.charAt(0).toUpperCase();
        else
            return string;
    },
    dismissSoftKeybaord: function () {
        if (isIOS) {
            utils.ios.getter(UIApplication, UIApplication.sharedApplication)
                .keyWindow
                .endEditing(true);
        } else if (isAndroid) {
            const dialogFragment = application.android
                .foregroundActivity
                .getFragmentManager()
                .findFragmentByTag("dialog");
            if (dialogFragment) {
                utils.ad.dismissSoftInput(dialogFragment.getDialog().getCurrentFocus());
            } else {
                utils.ad.dismissSoftInput();
            }
        }
    },
    removeUnderScore: function (str) {
        if (str && str.length > 0)
            return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');
        else
            return str;
    },
    getPositionClass: function (pos) {
        if (pos == 'GK') {
            return 'bgorangewhite';
        } else if (pos == 'FB' || pos == 'CB' || pos == 'DF') {
            return 'bgbluewhite';
        } else if (pos == 'DM' || pos == 'MF') {
            return 'bggreenwhite';
        } else {
            return 'bgredwhite';
        }
    },
    getStatusImageUrl: function (status) {
        if (status == 'Late Fitness Test') {
            return "~/assets/images/LateFitnessTest.png";
        } else {
            return "~/assets/images/" + status + ".png";
        }
    },
    getStatusText: function (status) {
        if (status.status == 'Injured' || status.status == 'Suspended' || status.status == 'International') {
            return status.description + ' until ' + status.end_date;
        } else {
            return status.description;
        }
    },
    dateFormat: function (d) {
        if (d)
            return moment(d).format('DD-MMM');
        else
            return null;
    },
    dateTimeFormat: function (dt) {
        if (dt)
            return moment(dt).format('DD-MMM HH:MM');
        else
            return null;
    },
    longDateTimeFormat: function (dt) {
        if (dt)
            return moment(dt).format('dddd Do MMMM - HH:MM');
        else
            return null;
    },
    sortBy: function (array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    },
    orderBy: function (arr, keys, orders) {
        var defaultOrder = 'asc',
            newArr,
            length,
            i,
            commonOrder;
        if ('length' in arr && typeof arr == 'object') {
            if (!(orders instanceof Array)) {
                commonOrder = orders || defaultOrder;
            }
            length = arr.length;
            newArr = Array(length);
            for (i = 0; i < length; i++) {
                newArr[i] = arr[i];
            }
            if (!keys) return newArr;
            keys = keys instanceof Array ? keys : [keys];
            return newArr.sort(function (a, b) {
                var length = keys.length,
                    i,
                    order,
                    key;
                if (a && b) {
                    for (i = 0; i < length; i++) {
                        key = keys[i];
                        order = (commonOrder || orders[i] || defaultOrder) == 'asc' ? -1 : 1;

                        if (a[key] > b[key]) {
                            return -order;
                        } else if (a[key] < b[key]) {
                            return order;
                        }
                    }
                }
                return 0;
            });
        } else {
            return [];
        }
    },
    deepClone: function (obj) {
        return JSON.parse(JSON.stringify(obj))
    }
};

export default Helpers

export {
    Helpers
}