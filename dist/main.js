'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var intelliwaketsfoundation = require('@solidbasisventures/intelliwaketsfoundation');
var React = require('react');
var moment = require('moment');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var faSpinnerThird = require('@fortawesome/pro-solid-svg-icons/faSpinnerThird');
var proRegularSvgIcons = require('@fortawesome/pro-regular-svg-icons');
var ReactDOM = require('react-dom');
var reactRouterDom = require('react-router-dom');
var ReactDatePicker = require('react-datepicker');
var Cleave = require('cleave.js/react');
var Switch = require('react-switch');
var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
var ReactDatePicker__default = /*#__PURE__*/_interopDefaultLegacy(ReactDatePicker);
var Cleave__default = /*#__PURE__*/_interopDefaultLegacy(Cleave);
var Switch__default = /*#__PURE__*/_interopDefaultLegacy(Switch);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

// ----------------------------
//   Cookie Manager
// ----------------------------
function CookieCreate(name, value, days) {
    name = name.replace(/=/g, "");
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
function CookieRead(name, defaultValue = null) {
    name = name.replace(/=/g, "");
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return defaultValue;
}
function CookieErase(name) {
    CookieCreate(name, "", -1);
}

const arrayIDMapsForArrayWithID = (arrayValues, existingArrayIDMaps) => {
    const idName = 'id';
    const originalIDs = existingArrayIDMaps.map((existingArrayIDMap) => existingArrayIDMap.originalID);
    const newArrayIDMaps = [
        ...existingArrayIDMaps,
        ...arrayValues
            .filter((arrayValue) => !originalIDs.includes(arrayValue[idName]))
            .map((arrayValue) => {
            const arrayIDMap = {
                originalID: arrayValue,
                uuid: intelliwaketsfoundation.GenerateUUID()
            };
            return arrayIDMap;
        })
    ];
    const arrayValueIDs = arrayValues.map((arrayValue) => arrayValue[idName]);
    return newArrayIDMaps.filter((arrayIDMap) => arrayValueIDs.includes(arrayIDMap.originalID));
};
const arrayMapWithMapIDIndex = (arrayValues, arrayIDMaps, map) => {
    const idName = 'id';
    return arrayValues.map((arrayValue) => {
        var _a, _b;
        return map(arrayValue, (_b = (_a = arrayIDMaps.find((arrayIDMap) => arrayIDMap.originalID === arrayValue[idName])) === null || _a === void 0 ? void 0 : _a.uuid) !== null && _b !== void 0 ? _b : intelliwaketsfoundation.GenerateUUID());
    });
};

exports.Environments = void 0;
(function (Environments) {
    Environments["ENV_Local"] = "ENV_Local";
    Environments["ENV_Dev"] = "ENV_Dev";
    Environments["ENV_Test"] = "ENV_Test";
    Environments["ENV_QA"] = "ENV_QA";
    Environments["ENV_Demo"] = "ENV_Demo";
    Environments["ENV_ProdSupport"] = "ENV_ProdSupport";
    Environments["ENV_Prod"] = "ENV_Prod";
})(exports.Environments || (exports.Environments = {}));
const IsENV = (environments) => {
    console.log('******* Environments Deprecated... use Stages');
    console.trace();
    let envs;
    if (typeof environments === 'string') {
        envs = [environments];
    }
    else {
        envs = environments;
    }
    for (const env of envs) {
        if (process.env.REACT_APP_ENV === env) {
            return true;
        }
    }
    return false;
};
const IsDevFocused = () => {
    return IsENV([exports.Environments.ENV_Local, exports.Environments.ENV_Dev, exports.Environments.ENV_QA]);
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_SPACE = 32;
const KEY_ENTER = 13;
const KEY_TAB = 9;
const KEY_BACKSPACE = 8;
const KEY_ESCAPE = 27;
const KEY_STRING_ENTER = 'Enter';
const KEY_STRING_DOWN_ARROW = 'ArrowDown';
const KEY_STRING_UP_ARROW = 'ArrowUp';
const KEY_STRING_LEFT_ARROW = 'ArrowLeft';
const KEY_STRING_RIGHT_ARROW = 'ArrowRight';
const KEY_STRING_TAB = 'Tab';
const KEY_STRING_BACKSPACE = 'Backspace';
const KEY_STRING_ESCAPE = 'Escape';
const ElementCustomValue = (e) => {
    const target = e.target;
    if (!!target) {
        const returnValue = target['customValue'] === undefined ? target.value : target.customValue;
        if (target.classList.contains('isNumber')) {
            return intelliwaketsfoundation.CleanNumber(returnValue);
        }
        return returnValue;
    }
    return null;
};
const ClassNames = (classes) => {
    var _a;
    return ((_a = Object.keys(classes).filter((classitem) => classes[classitem])) !== null && _a !== void 0 ? _a : []).join(' ');
};
const HasPathComponent = (search) => {
    let searchCalc = search.toLowerCase();
    if (!searchCalc.startsWith('/')) {
        searchCalc = '/' + searchCalc;
    }
    if (!searchCalc.endsWith('/')) {
        searchCalc += '/';
    }
    let pathName = window.location.pathname.toLowerCase();
    if (!pathName.endsWith('/')) {
        pathName += '/';
    }
    return pathName.indexOf(searchCalc) >= 0;
};
const GetPathComponentAfter = (search) => {
    let searchCalc = search.toLowerCase();
    if (!searchCalc.endsWith('/')) {
        searchCalc += '/';
    }
    const startPos = window.location.pathname.toLowerCase().indexOf(searchCalc);
    if (startPos >= 0) {
        const after = window.location.pathname.substr(startPos + searchCalc.length);
        const slashPos = after.toLowerCase().indexOf('/');
        if (slashPos >= 0) {
            return after.substring(0, slashPos);
        }
        else {
            return after;
        }
    }
    return undefined;
};
const GetPathThrough = (search) => {
    let searchCalc = search.toLowerCase();
    const startPosSlash = window.location.pathname.toLowerCase().lastIndexOf(searchCalc + '/');
    if (startPosSlash >= 0) {
        return window.location.pathname.substr(0, startPosSlash + searchCalc.length);
    }
    const startPosNoSlash = window.location.pathname.toLowerCase().lastIndexOf(searchCalc);
    if (startPosNoSlash >= 0) {
        const possibleComplete = window.location.pathname.substr(0, startPosNoSlash + searchCalc.length);
        if (possibleComplete.length === window.location.pathname.length) {
            return possibleComplete;
        }
    }
    return undefined;
};
const CaptureGPS = () => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                resolve(position);
            }, function () {
                resolve(null);
            });
        }
        else {
            resolve(null);
        }
    }));
};
const DownloadBase64Data = (fileName, base64, type) => {
    if (!!window.navigator.msSaveBlob) {
        // IE
        const byteCharacters = atob(base64.replace(/^[^,]+,/, '').replace(/\r\n/g, ''));
        let byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: type });
        window.navigator.msSaveOrOpenBlob(blob, fileName);
    }
    else {
        const link = document.createElement('a');
        link.href = base64;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    }
};
const CopyRefToClipboard = (ref, tryFormatted = true) => {
    if (ref && ref.current && document.createRange && window.getSelection) {
        let range = document.createRange();
        let sel = window.getSelection();
        if (sel) {
            // unselect any element in the page
            sel.removeAllRanges();
            let ths = ref.current.getElementsByTagName('th');
            for (let i = 0; i < ths.length; i++) {
                ths[i].setAttribute('copyuserselect', ths[i].style.userSelect);
                ths[i].style.userSelect = ths[i].classList.contains('noCopy') ? 'none' : 'auto';
                if (ths[i].classList.contains('onlyCopy')) {
                    ths[i].setAttribute('copyuserdisplay', ths[i].style.display);
                    ths[i].style.display = 'inherit';
                }
            }
            let tds = ref.current.getElementsByTagName('td');
            for (let i = 0; i < tds.length; i++) {
                tds[i].setAttribute('copyuserselect', tds[i].style.userSelect);
                tds[i].style.userSelect = tds[i].classList.contains('noCopy') ? 'none' : 'auto';
                if (tds[i].classList.contains('onlyCopy')) {
                    tds[i].setAttribute('copyuserdisplay', ths[i].style.display);
                    tds[i].style.display = 'inherit';
                }
            }
            let brs = ref.current.getElementsByTagName('br');
            for (let i = 0; i < brs.length; i++) {
                brs[i].setAttribute('copyuserdisplay', brs[i].style.display);
                brs[i].style.display = 'none';
            }
            let hrs = ref.current.getElementsByTagName('hr');
            for (let i = 0; i < hrs.length; i++) {
                hrs[i].setAttribute('copyuserdisplay', hrs[i].style.display);
                hrs[i].style.display = 'none';
            }
            if (tryFormatted) {
                try {
                    range.selectNode(ref.current);
                    sel.addRange(range);
                }
                catch (e) {
                    range.selectNodeContents(ref.current);
                    sel.addRange(range);
                }
            }
            else {
                range.selectNodeContents(ref.current);
                sel.addRange(range);
            }
            document.execCommand('copy');
            sel.removeAllRanges();
            for (let i = 0; i < ths.length; i++) {
                ths[i].style.userSelect = ths[i].getAttribute('copyuserselect');
                ths[i].removeAttribute('copyuserselect');
                if (ths[i].classList.contains('onlyCopy')) {
                    ths[i].style.display = ths[i].getAttribute('display');
                    ths[i].removeAttribute('copyuserdisplay');
                }
            }
            for (let i = 0; i < tds.length; i++) {
                tds[i].style.userSelect = tds[i].getAttribute('copyuserselect');
                tds[i].removeAttribute('copyuserselect');
                if (tds[i].classList.contains('onlyCopy')) {
                    tds[i].style.display = tds[i].getAttribute('display');
                    tds[i].removeAttribute('copyuserdisplay');
                }
            }
            for (let i = 0; i < brs.length; i++) {
                brs[i].style.display = brs[i].getAttribute('display');
                brs[i].removeAttribute('copyuserdisplay');
            }
            for (let i = 0; i < hrs.length; i++) {
                hrs[i].style.display = hrs[i].getAttribute('display');
                hrs[i].removeAttribute('copyuserdisplay');
            }
            return true;
        }
    }
    return false;
};
const TableIDToExcel = (tableID, fileName, appendDateTime = true) => {
    const downloadName = `${fileName !== null && fileName !== void 0 ? fileName : tableID}${appendDateTime ? `-${moment__default['default'](new Date()).format('YYYY-MM-DD_HH-mm-ss')}.xls` : ''}`;
    // const dataType = 'application/vnd.ms-excel'
    const dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const tableSelect = document.getElementById(tableID);
    let tableHTML = tableSelect.outerHTML; //.replace(/ /g, '%20')
    tableHTML = intelliwaketsfoundation.ReplaceAll('<br>', ' ', tableHTML);
    let a = document.createElement('a');
    const blob = new Blob([tableHTML], { type: dataType });
    a.href = URL.createObjectURL(blob);
    a.download = downloadName;
    a.click();
};
const SizeAtMin = (size) => {
    switch (size) {
        case 'xs':
            return 0;
        case 'sm':
            return 576;
        case 'md':
            return 768;
        case 'lg':
            return 992;
        case 'xl':
            return 1200;
        case 'xxl':
            return 1300;
        case 'xxxl':
            return 1400;
    }
};
const SizeAtMax = (size) => {
    switch (size) {
        case 'xs':
            return 575.98;
        case 'sm':
            return 767.98;
        case 'md':
            return 991.98;
        case 'lg':
            return 1199.98;
        case 'xl':
            return 1299.98;
        case 'xxl':
            return 1399.98;
        case 'xxxl':
            return 999999;
    }
};
const useCombinedRefs = (...refs) => {
    const targetRef = React__default['default'].useRef();
    React__default['default'].useEffect(() => {
        refs.forEach((ref) => {
            if (!ref)
                return;
            if (typeof ref === 'function') {
                ref(targetRef.current);
            }
            else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);
    return targetRef;
};

const GetOrientation = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        let oreader = new FileReader();
        oreader.onload = (event) => {
            //@ts-ignore
            let view = new DataView(event.target.result);
            if (view.getUint16(0, false) !== 0xFFD8) {
                resolve(-2);
                return;
            }
            let length = view.byteLength, offset = 2;
            while (offset < length) {
                let marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xFFE1) {
                    if (view.getUint32(offset += 2, false) !== 0x45786966) {
                        resolve(-1);
                        return;
                    }
                    let little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    let tags = view.getUint16(offset, little);
                    offset += 2;
                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                            resolve(view.getUint16(offset + (i * 12) + 8, little));
                            return;
                        }
                    }
                }
                else if ((marker & 0xFF00) !== 0xFF00) {
                    break;
                }
                else
                    offset += view.getUint16(offset, false);
            }
            resolve(-1);
        };
        oreader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    }));
});
const PhotoFileToData = (file, maxSize = 4096) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const srcOrientation = yield GetOrientation(file);
        // Create a file reader
        let reader = new FileReader();
        reader.onload = function (e) {
            let img = document.createElement("img");
            img.onload = function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > maxSize) {
                            height *= maxSize / width;
                            width = maxSize;
                        }
                    }
                    else {
                        if (height > maxSize) {
                            width *= maxSize / height;
                            height = maxSize;
                        }
                    }
                    let canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");
                    if ([5, 6, 7, 8].indexOf(srcOrientation) > -1) {
                        // noinspection JSSuspiciousNameCombination
                        canvas.width = height;
                        // noinspection JSSuspiciousNameCombination
                        canvas.height = width;
                    }
                    else {
                        canvas.width = width;
                        canvas.height = height;
                    }
                    switch (srcOrientation) {
                        case 2:
                            ctx.transform(-1, 0, 0, 1, width, 0);
                            break;
                        case 3:
                            ctx.transform(-1, 0, 0, -1, width, height);
                            break;
                        case 4:
                            ctx.transform(1, 0, 0, -1, 0, height);
                            break;
                        case 5:
                            ctx.transform(0, 1, 1, 0, 0, 0);
                            break;
                        case 6:
                            ctx.transform(0, 1, -1, 0, height, 0);
                            break;
                        case 7:
                            ctx.transform(0, -1, -1, 0, height, width);
                            break;
                        case 8:
                            ctx.transform(0, -1, 1, 0, 0, width);
                            break;
                        default:
                            ctx.transform(1, 0, 0, 1, 0, 0);
                            break;
                    }
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL(file['type']));
                });
            };
            img.onerror = function () {
                resolve(false);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }));
});
const FileToBase64 = (file) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const reader = new FileReader();
        reader.onload = function (e) {
            resolve(e.target.result);
        };
        reader.onerror = function () {
            reject();
        };
        reader.readAsDataURL(file);
    }));
};
// Thumb 128
const ResizeBase64 = (base64Str, maxSize = 4096) => {
    let img = new Image();
    img.src = base64Str;
    let canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;
    if (width > height) {
        if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
        }
    }
    else {
        if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
        }
    }
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL();
};

const Alert = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'div';
    const clearTime = React.useRef(setTimeout(() => {
    }, 100));
    const isMounted = React.useRef(false);
    const [showState, setShowState] = React.useState(null);
    let classes = (_b = showState === null || showState === void 0 ? void 0 : showState.className) !== null && _b !== void 0 ? _b : '';
    classes += !!(showState === null || showState === void 0 ? void 0 : showState.color) ? ` alert-${showState === null || showState === void 0 ? void 0 : showState.color}` : '';
    classes +=
        ' ' +
            ClassNames({
                alert: true,
                'alert-dismissible': !!props.toggle,
                'cursor-pointer': !!props.toggle,
                'fade': true,
                'show': !!props.isOpen
            });
    React.useEffect(() => {
        isMounted.current = true;
        if (!!props.isOpen) {
            setShowState(props);
        }
        else {
            if (showState === null || showState === void 0 ? void 0 : showState.isOpen) {
                clearTimeout(clearTime.current);
                clearTime.current = setTimeout(() => {
                    if (isMounted.current) {
                        setShowState(null);
                    }
                }, 1500);
            }
        }
        return () => {
            isMounted.current = false;
        };
    }, [props.isOpen]);
    return React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'color', 'isOpen', 'toggle', 'className'), { className: classes.trim(), onClick: () => {
            if (!!props.toggle)
                props.toggle();
        } }));
};

const Badge = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'span';
    let classes = (_b = props.className) !== null && _b !== void 0 ? _b : '';
    classes += !!props.color ? ` badge-${props.color}` : '';
    classes +=
        ' ' +
            ClassNames({
                badge: true,
                'badge-pill': !props.notPill
            });
    return React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'color', 'notPill', 'className'), { className: classes.trim() }));
};

const Spinner = (props) => {
    let style = {};
    if (!props.spin && !props.pulse) {
        style.animation = 'fa-spin 0.75s infinite linear';
    }
    return React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, Object.assign({ icon: faSpinnerThird.faSpinnerThird, style: style }, props));
};

// noinspection SuspiciousTypeOfGuard
const BadgeItem = (props) => {
    var _a;
    const showProps = intelliwaketsfoundation.OmitProperty(props, 'badge', 'alwaysShowValue');
    return props.badge === null ? (React__default['default'].createElement(Badge, Object.assign({}, showProps, { color: "light", className: 'text-gray ' + ((_a = props.className) !== null && _a !== void 0 ? _a : '') }),
        React__default['default'].createElement(Spinner, null))) : (props.alwaysShowValue && props.badge !== undefined) || !!props.badge ? (React__default['default'].createElement(Badge, Object.assign({}, showProps), typeof props.badge === 'number' ? intelliwaketsfoundation.ToDigits(props.badge, 0) : props.badge)) : null;
};

const Button = React.forwardRef((props, ref) => {
    var _a, _b, _c, _d, _e;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'button';
    return (React__default['default'].createElement(TagToUse, { className: (_b = props.classNameOverride) !== null && _b !== void 0 ? _b : ((_c = props.className) !== null && _c !== void 0 ? _c : '') +
            ` btn ` +
            (props.color === 'inline'
                ? 'btn btn-link btn-link-inline '
                : `btn-${props.outline ? 'outline-' : ''}${(_d = props.color) !== null && _d !== void 0 ? _d : 'secondary'} `) +
            (props.block
                ? 'btn-block '
                : '') +
            (props.active
                ? 'active '
                : '') +
            `${!!props.size ? `btn-${props.size}` : ''}` // +
        , type: (_e = props.type) !== null && _e !== void 0 ? _e : 'button', onClick: props.onClick, tabIndex: props.tabIndex, ref: ref, to: props.to, onKeyDown: props.onKeyDown, onKeyPress: props.onKeyPress, autoFocus: props.autoFocus, hidden: props.hidden, disabled: props.disabled, style: props.style, title: props.title, children: props.children }));
});

const ButtonGroup = (props) => {
    var _a;
    let classes = (_a = props.className) !== null && _a !== void 0 ? _a : '';
    classes +=
        ' btn-group' +
            (!!props.vertical ? '-vertical' : '');
    return React__default['default'].createElement("div", Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'vertical', 'className'), { className: classes.trim() }));
};

const ButtonToolbar = (props) => {
    var _a;
    let classes = (_a = props.className) !== null && _a !== void 0 ? _a : '';
    classes +=
        ' ' +
            ClassNames({
                'btn-toolbar': true
            });
    return React__default['default'].createElement("div", Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'className'), { className: classes.trim() }));
};

const BreadCrumb = (props) => {
    var _a, _b;
    let classes = (_a = props.className) !== null && _a !== void 0 ? _a : '';
    classes +=
        ' breadcrumb';
    let classesLI = (_b = props.classNameLI) !== null && _b !== void 0 ? _b : '';
    classesLI +=
        ' breadcrumb';
    return React__default['default'].createElement("nav", Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'classNameLI', 'className', 'children'), { className: classes.trim() }),
        React__default['default'].createElement("ol", { className: classesLI.trim(), children: props.children }));
};

const BreadCrumbItem = (props) => {
    var _a;
    let classes = (_a = props.className) !== null && _a !== void 0 ? _a : '';
    classes +=
        ' breadcrumb-item'
            + (props.active ? ' active' : '');
    return React__default['default'].createElement("li", Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'className', 'active'), { className: classes.trim() }));
};

const Card = React.forwardRef((props, ref) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'div';
    return React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `card ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim(), ref: ref }));
});

const CardBody = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'div';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `card-body ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const CardColumns = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'div';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `card-columns ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const CardDeck = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'div';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `card-deck ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const CardFooter = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'div';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `card-footer ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const CardGroup = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'div';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `card-group ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const CardHeader = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'div';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `card-header ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const CardText = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'p';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `card-text ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const CardTitle = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'h5';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `card-title ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const ApplyColumnProp = (size, columnProps) => {
    if (!columnProps)
        return '';
    let application = ` col`;
    // if (size !== 'xs' || typeof columnProps === 'object') {
    if (size !== 'xs') {
        application += `-${size}`;
    }
    if (columnProps === true)
        return application;
    if (typeof columnProps === 'number' || typeof columnProps === 'string')
        return `${application}-${columnProps}`;
    if (typeof columnProps.size === 'number' || typeof columnProps.size === 'string') {
        if (columnProps.size !== 'xs') {
            application += `-${columnProps.size}`;
        }
    }
    if (columnProps.offset !== undefined) {
        if (size === 'xs') {
            application += ` offset-${columnProps.offset}`;
        }
        else {
            application += ` offset-${size}-${columnProps.offset}`;
        }
    }
    if (columnProps.order !== undefined)
        application += ` order-${columnProps.order}`;
    return application;
};

const Col = (props) => {
    var _a;
    let classes = `${(_a = props.className) !== null && _a !== void 0 ? _a : ''}`.trim();
    if (!props.xs && !props.sm && !props.md && !props.lg && !props.xl) {
        classes += ' col';
    }
    classes += ApplyColumnProp('xs', props.xs);
    classes += ApplyColumnProp('sm', props.sm);
    classes += ApplyColumnProp('md', props.md);
    classes += ApplyColumnProp('lg', props.lg);
    classes += ApplyColumnProp('xl', props.xl);
    return (React__default['default'].createElement("div", Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'xs', 'sm', 'md', 'lg', 'xl', 'children'), { className: classes.trim() }), props.children));
};

const Collapse = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'div';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'isOpen', 'tag', 'navbar', 'className'), { className: ((_b = props.className) !== null && _b !== void 0 ? _b : '') +
            ' collapse' +
            (!!props.navbar ? ' navbar-collapse' : '') +
            (!!props.isOpen ? ' show' : '') })));
};

const Container = (props) => {
    var _a;
    return (React__default['default'].createElement("div", Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'fluid', 'className', 'children'), { className: `${(_a = props.className) !== null && _a !== void 0 ? _a : ''} ${ClassNames({
            container: !props.fluid,
            'container-fluid': !!props.fluid
        })}`.trim() }), props.children));
};

const DropdownItem = (props) => {
    var _a, _b, _c;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : (!!props.href ? 'a' : 'div');
    let classes = (_b = props.className) !== null && _b !== void 0 ? _b : '';
    classes +=
        ' ' +
            ClassNames({
                'dropdown-item': !props.header && !props.divider,
                'dropdown-header': !!props.header,
                'dropdown-divider': !!props.divider,
                'active': !!props.active,
                disabled: !!props.disabled
            });
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'disabled', 'divider', 'header', 'active', 'className', 'size', 'type', 'children', 'loading'), { className: classes, style: { cursor: !props.disabled && (!!props.href || !!props.onClick) ? 'pointer' : undefined } }), (_c = props.children) !== null && _c !== void 0 ? _c : (!!props.loading && (React__default['default'].createElement("i", { className: "text-muted" },
        React__default['default'].createElement(Spinner, { fixedWidth: true }),
        " Loading...")))));
};

const Dropdown = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const hasOpened = React.useRef(false);
    const [isOpen, setIsOpen] = React.useState((_a = props.isOpen) !== null && _a !== void 0 ? _a : false);
    const visibleDDActions = React.useMemo(() => !props.ddActions
        ? []
        : (typeof props.ddActions === 'function' ? props.ddActions() : props.ddActions).filter((ddAction) => !ddAction.hidden), [props.ddActions]);
    const showFAProps = React.useMemo(() => !!visibleDDActions.find((ddAction) => !!ddAction.faProps), [visibleDDActions]);
    const TagToUse = ((_b = props.tag) !== null && _b !== void 0 ? _b : !!props.inNavbar) ? 'li' : 'div';
    const isControlled = props.isOpen !== undefined;
    const actualIsOpen = isControlled ? !!props.isOpen : isOpen;
    // console.log('DD', isControlled, actualIsOpen)
    const externalClick = (e) => {
        if (actualIsOpen) {
            e.stopPropagation();
            if (!!props.toggle) {
                props.toggle(e);
            }
            if (!isControlled) {
                setIsOpen(false);
            }
        }
    };
    const externalEsc = (e) => {
        if (e.keyCode === KEY_ESCAPE && actualIsOpen) {
            e.stopPropagation();
            if (!!props.toggle) {
                props.toggle(e);
            }
            if (!isControlled) {
                setIsOpen(false);
            }
        }
    };
    React.useEffect(() => {
        // if (menuRef.current) {
        // 	console.log(1)
        // 	menuRef.current.addEventListener('resize', onResize)
        // }
        // if (actualIsOpen) {
        // 	setOffset((buttonRef?.current?.offsetWidth ?? 0) - (menuRef?.current?.offsetWidth ?? 0))
        // }
        window.addEventListener('click', externalClick);
        window.addEventListener('keydown', externalEsc);
        return () => {
            // menuRef.current.removeEventListener('resize', onResize)
            window.removeEventListener('click', externalClick);
            window.removeEventListener('keydown', externalEsc);
        };
    });
    let classes = (_c = props.className) !== null && _c !== void 0 ? _c : '';
    if (!!props.direction)
        classes += ` drop${props.direction}`;
    classes +=
        ' ' +
            ClassNames({
                dropdown: true,
                show: actualIsOpen,
                'd-inline-block': !props.block,
                'navbar-nav': !!props.inNavbar,
                'nav-item': !!props.nav
            });
    if (actualIsOpen)
        hasOpened.current = true;
    // console.log('Here', buttonRef?.current?.offsetWidth, menuRef?.current?.offsetWidth)
    // console.log('buttonRef', buttonRef?.current)
    // console.log('menuRef', menuRef?.current)
    // console.log('Offset', offset)
    //onClick={(e: any) => e.stopPropagation()}
    if (!props.children && visibleDDActions.length === 0)
        return null;
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'disabled', 'direction', 'ddActions', 'block', 'isOpen', 'nav', 'toggle', 'inNavbar', 'right', 'buttonLabel', 'buttonFAProps', 'buttonClassName', 'menuClassName', 'noCaret', 'size', 'color', 'className', 'menuStyle'), { className: classes }),
        React__default['default'].createElement(Button, { color: (_d = props.color) !== null && _d !== void 0 ? _d : (!!props.ddActions && !props.nav && !props.inNavbar ? 'secondary' : undefined), block: props.block, size: props.size, className: !!props.nav || !!props.inNavbar
                ? undefined
                : `${(_e = props.buttonClassName) !== null && _e !== void 0 ? _e : ''} ${props.noCaret ? '' : 'dropdown-toggle'}`.trim(), classNameOverride: !!props.nav || !!props.inNavbar
                ? `text-left nav-link ${(_f = props.buttonClassName) !== null && _f !== void 0 ? _f : ''} ${props.noCaret ? '' : 'dropdown-toggle'}`.trim()
                : undefined, onClick: (e) => {
                // e.stopPropagation()
                if (!!props.toggle) {
                    props.toggle(e);
                }
                if (!isControlled) {
                    setIsOpen((prevState) => !prevState);
                }
            }, style: !!props.nav || !!props.inNavbar ? { background: 'none', border: 'none' } : undefined }, (_g = props.buttonLabel) !== null && _g !== void 0 ? _g : React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, { icon: proRegularSvgIcons.faCog })),
        React__default['default'].createElement("div", { tabIndex: -1, className: `${ClassNames({
                show: actualIsOpen,
                'dropdown-menu-right': !!props.right
            })} dropdown-menu ${(_h = props.menuClassName) !== null && _h !== void 0 ? _h : ''}`.trim(), onClick: (e) => {
                e.stopPropagation();
                if (!!props.toggle) {
                    props.toggle(e);
                }
                if (!isControlled) {
                    setIsOpen((prevState) => !prevState);
                }
            }, style: props.menuStyle }, hasOpened.current && (React__default['default'].createElement(React__default['default'].Fragment, null,
            props.children,
            visibleDDActions.map((ddAction, idx) => {
                var _a;
                return (React__default['default'].createElement(DropdownItem, { className: ((_a = ddAction.className) !== null && _a !== void 0 ? _a : '') + (!!ddAction.color ? ` text-${ddAction.color}` : ''), key: idx, active: ddAction.active, disabled: !!ddAction.disabled || !ddAction.action, divider: !!ddAction.divider, header: !!ddAction.header, onClick: () => (!!ddAction.action ? ddAction.action() : () => { }) },
                    showFAProps && (React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, Object.assign({ icon: proRegularSvgIcons.faCog }, ddAction.faProps, { className: !ddAction.faProps || ddAction.faPropHidden ? 'invisible' : '', fixedWidth: true }))),
                    ddAction.title));
            }))))));
};

const Form = (props) => {
    var _a;
    return (React__default['default'].createElement("form", Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'innerRef', 'inline', 'children'), { className: `${(_a = props.className) !== null && _a !== void 0 ? _a : ''} ${ClassNames({
            form: true,
            'form-inline': !!props.inline
        })}`.trim(), ref: props.innerRef }), props.children));
};

const FormFeedback = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'label';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'valid', 'tag'), { className: `${(_b = props.className) !== null && _b !== void 0 ? _b : ''} ${ClassNames({
            'invalid-feedback': true,
            'd-none': !!props.valid
        })}`.trim() })));
};

const FormGroup = (props) => {
    var _a;
    return (React__default['default'].createElement("div", Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'children'), { className: `${(_a = props.className) !== null && _a !== void 0 ? _a : ''} ${ClassNames({
            'form-group': true
        })}`.trim() }), props.children));
};

const InputGroup = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'div';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `input-group ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const InputGroupAddon = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'div';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className', 'addonType'), { className: `input-group-${props.addonType} ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const InputGroupText = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'div';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `input-group-text ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const Label = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'label';
    let classes = `${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim();
    classes += ' col-form-label';
    if (props.check)
        classes += ' form-check-label';
    classes += ApplyColumnProp('xs', props.xs);
    classes += ApplyColumnProp('sm', props.sm);
    classes += ApplyColumnProp('md', props.md);
    classes += ApplyColumnProp('lg', props.lg);
    classes += ApplyColumnProp('xl', props.xl);
    return React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'xs', 'sm', 'md', 'lg', 'xl', 'className'), { className: classes.trim() }));
};

const ListGroup = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'ul';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className', 'flush'), { className: `${ClassNames({ 'list-group-flush': !!props.flush })} list-group ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const ListGroupItem = (props) => {
    var _a, _b, _c;
    const TagToUse = ((_a = props.tag) !== null && _a !== void 0 ? _a : !!props.href)
        ? 'a'
        : 'li';
    return (React__default['default'].createElement(TagToUse, Object.assign({ type: !!props.onClick ? 'button' : undefined }, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className', 'active', 'disabled', 'color', 'badgeColor', 'action', 'children', 'badgeClass'), { className: `${ClassNames({
            active: !!props.active,
            disabled: !!props.disabled,
            'list-group-item-action': !!props.action || (!!props.onClick && props.action !== false)
            // 'd-flex justify-content-between align-items-center': props.badge === null || !!props.badge
        })} list-group-item${!!props.color ? ` list-group-item-${props.color}` : ''} ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim(), disabled: !!props.onClick && props.disabled ? true : undefined }),
        props.children,
        React__default['default'].createElement(BadgeItem, { badge: props.badge, color: props.badgeColor, className: 'float-right ' + ((_c = props.badgeClass) !== null && _c !== void 0 ? _c : ''), style: { marginTop: '0.2rem' } })));
};

const ListGroupItemHeading = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'h5';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `list-group-item-heading ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

const ListGroupItemText = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'p';
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: `list-group-item-text ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim() })));
};

class Portal extends React__default['default'].Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.style.display = 'contents';
        // The <div> is a necessary container for our
        // content, but it should not affect our layout.
        // Only works in some browsers, but generally
        // doesn't matter since this is at
        // the end anyway. Feel free to delete this line.
    }
    componentDidMount() {
        document.body.appendChild(this.el);
    }
    componentWillUnmount() {
        document.body.removeChild(this.el);
    }
    render() {
        return ReactDOM__default['default'].createPortal(this.props.children, this.el);
    }
}

const Modal = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const divRef = React.useRef();
    const toggle = React.useCallback((e) => {
        if (!!props.toggle && !props.noCancel) {
            props.toggle(e);
        }
    }, [props]);
    const okAction = React.useCallback((e) => {
        if (!!props.okAction) {
            const okResult = props.okAction();
            if (okResult === undefined || okResult !== false) {
                if (!!props.toggle) {
                    props.toggle(e);
                }
            }
        }
    }, [props]);
    const keyDown = (e) => {
        if (props.isOpen) {
            e.stopPropagation();
            switch (e.keyCode) {
                case KEY_ESCAPE:
                    toggle(e);
                    break;
                case KEY_ENTER:
                    okAction(e);
                    break;
            }
        }
    };
    React.useEffect(() => {
        window.addEventListener('keydown', keyDown);
        return () => {
            window.removeEventListener('keydown', keyDown);
        };
    });
    React.useEffect(() => {
        var _a;
        if (props.isOpen) {
            if (!!((_a = props.autoFocusElement) === null || _a === void 0 ? void 0 : _a.current)) {
                props.autoFocusElement.current.focus();
            }
            else if (divRef === null || divRef === void 0 ? void 0 : divRef.current) {
                divRef.current.focus();
            }
        }
    }, [props.isOpen, props.autoFocusElement]);
    return (React__default['default'].createElement(Portal, null,
        React__default['default'].createElement("div", { className: 'modal fade' + (props.isOpen ? ' show' : ''), role: "dialog", style: {
                display: props.isOpen ? 'block' : 'none',
                pointerEvents: props.isOpen ? undefined : 'none'
            }, onClick: (e) => {
                if (props.isOpen) {
                    e.stopPropagation();
                    toggle(e);
                }
            }, onKeyDown: keyDown },
            React__default['default'].createElement("div", { className: ('modal-dialog' +
                    (!props.size ? ' ' : ` modal-${props.size} `) +
                    ((_a = props.dialogClassName) !== null && _a !== void 0 ? _a : '')).trim(), role: "document", style: props.dialogStyle },
                React__default['default'].createElement("div", { className: "modal-content", onClick: (e) => e.stopPropagation() }, props.title !== undefined ? (React__default['default'].createElement(React__default['default'].Fragment, null,
                    !!props.title && (React__default['default'].createElement("div", { className: `alert-${(_b = props.color) !== null && _b !== void 0 ? _b : 'primary'} modal-header` },
                        React__default['default'].createElement("h5", { className: "modal-title" }, props.title),
                        !props.noCancel && (React__default['default'].createElement("button", { className: "close", onClick: toggle },
                            "\u00D7",
                            ' ')))),
                    React__default['default'].createElement("div", { className: 'modal-body ' + ((_c = props.bodyClassName) !== null && _c !== void 0 ? _c : ''), style: props.bodyStyle }, !!props.bodyContainerFormSubmit ? (React__default['default'].createElement(Form, { className: `container ${typeof props.bodyContainerFormSubmit === 'string' ? props.bodyContainerFormSubmit : ''}`.trim(), onSubmitCapture: (e) => {
                            e.preventDefault();
                            if (!props.okDisabled) {
                                okAction(e);
                            }
                        }, onKeyDown: (e) => {
                            if (e.keyCode === KEY_ENTER) {
                                e.stopPropagation();
                            }
                        } },
                        props.body,
                        props.children,
                        React__default['default'].createElement(Button, { className: "d-none", type: "submit" }))) : (React__default['default'].createElement(React__default['default'].Fragment, null,
                        props.body,
                        props.children))),
                    (!!props.okAction || !props.noCancelButton || !!props.footerLeft || !!props.footerRight) && (React__default['default'].createElement("div", { className: "modal-footer" },
                        React__default['default'].createElement("div", { className: "mr-auto" },
                            (!props.noCancel || !props.noCancelButton) && (React__default['default'].createElement("button", { className: " btn btn-link  ", type: "button", onClick: toggle }, (_d = props.cancelLabel) !== null && _d !== void 0 ? _d : 'Cancel')),
                            ((_e = props.leftButtons) !== null && _e !== void 0 ? _e : []).map((leftButton) => (React__default['default'].createElement(Button, Object.assign({}, leftButton)))),
                            props.footerLeft),
                        React__default['default'].createElement("div", { className: "text-right" },
                            props.footerRight,
                            ((_f = props.rightButtons) !== null && _f !== void 0 ? _f : []).map((rightButton) => (React__default['default'].createElement(Button, Object.assign({}, rightButton)))),
                            !!props.okAction && (React__default['default'].createElement("button", { className: `ml-1 btn btn-${(_g = props.color) !== null && _g !== void 0 ? _g : 'primary'}`, type: "button", disabled: props.okDisabled, onClick: (e) => {
                                    e.stopPropagation();
                                    okAction(e);
                                }, ref: divRef }, (_h = props.okLabel) !== null && _h !== void 0 ? _h : 'OK'))))))) : (props.children)))),
        React__default['default'].createElement("div", { className: 'modal-backdrop fade' + (props.isOpen ? ' show' : ''), style: { pointerEvents: props.isOpen ? undefined : 'none' }, onClick: toggle })));
};

const ModalHeader = (props) => {
    var _a;
    return (React__default['default'].createElement("div", Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'className'), { className: 'modal-header ' + (!!props.color ? `alert-${props.color} ` : '') + ((_a = props.className) !== null && _a !== void 0 ? _a : '') })));
};

const ModalBody = (props) => {
    var _a;
    return React__default['default'].createElement("div", Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'className'), { className: 'modal-body ' + ((_a = props.className) !== null && _a !== void 0 ? _a : '') }));
};

const ModalFooter = (props) => {
    var _a;
    return React__default['default'].createElement("div", Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'className'), { className: 'modal-footer ' + ((_a = props.className) !== null && _a !== void 0 ? _a : '') }));
};

const Nav = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'ul';
    let classes = `${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`.trim();
    classes +=
        ' ' +
            ClassNames({
                nav: !props.navbar,
                'navbar-nav': !!props.navbar,
                'nav-tabs': !!props.tabs,
                'nav-pills': !!props.pills,
                'nav-fill': !!props.fill,
                'nav-justified': !!props.justified,
                'flex-column': !!props.vertical,
                'justify-content-center': !!props.horizontal
            });
    return (React__default['default'].createElement(TagToUse, Object.assign({ role: !!props.tabs ? 'tablist' : undefined }, intelliwaketsfoundation.OmitProperty(props, 'tabs', 'pills', 'vertical', 'horizontal', 'justified', 'fill', 'navbar', 'card', 'tag', 'className'), { className: classes.trim() })));
};

const Navbar = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'nav';
    let classes = `${(_b = props.className) !== null && _b !== void 0 ? _b : ''} navbar`.trim();
    classes += !!props.color ? ` bg-${props.color}` : '';
    classes += !!props.expand ? ` navbar-expand${typeof props.expand === 'string' ? `-${props.expand}` : ''} ` : '';
    classes +=
        ' ' +
            ClassNames({
                'navbar-light': !!props.light,
                'navbar-dark': !!props.dark,
                'fixed-top': !!props.fixed,
                'sticky-top': !!props.sticky
            });
    return (React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'light', 'dark', 'fixed', 'sticky', 'color', 'tag', 'expand', 'className'), { className: classes.trim() })));
};

const NavItem = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'li';
    return React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: 'nav-item ' + ((_b = props.className) !== null && _b !== void 0 ? _b : '') }));
};

const NavLink = (props) => {
    var _a, _b;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'a';
    return React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag', 'className'), { className: 'nav-link ' + ((_b = props.className) !== null && _b !== void 0 ? _b : '') }));
};

const NavbarBrand = (props) => {
    var _a;
    const TagToUse = (_a = props.tag) !== null && _a !== void 0 ? _a : 'a';
    return React__default['default'].createElement(TagToUse, Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'tag')));
};

const NavbarToggler = (props) => {
    var _a;
    return (React__default['default'].createElement("button", Object.assign({}, props, { type: "button", "aria-label": "Toggle navigation", className: ((_a = props.className) !== null && _a !== void 0 ? _a : '') + ' navbar-toggler' }),
        React__default['default'].createElement("span", { className: "navbar-toggler-icon" })));
};

const Row = (props) => {
    var _a;
    return (React__default['default'].createElement("div", Object.assign({}, intelliwaketsfoundation.OmitProperty(props, 'noGutters', 'className', 'children'), { className: `${(_a = props.className) !== null && _a !== void 0 ? _a : ''} ${ClassNames({
            row: true,
            'no-gutters': !!props.noGutters
        })}`.trim() }), props.children));
};

const setStorage = (key, newValue, remember, defaultValue) => {
    if (!!key) {
        switch (remember) {
            case 'local':
                if (newValue === defaultValue) {
                    window.localStorage.removeItem(key);
                }
                else {
                    if (typeof newValue === 'string') {
                        window.localStorage.setItem(key, newValue);
                    }
                    else {
                        window.localStorage.setItem(key, intelliwaketsfoundation.ObjectToJSONString(newValue));
                    }
                }
                break;
            case 'session':
                if (newValue === defaultValue) {
                    window.sessionStorage.removeItem(key);
                }
                else {
                    if (typeof newValue === 'string') {
                        window.sessionStorage.setItem(key, newValue);
                    }
                    else {
                        window.sessionStorage.setItem(key, intelliwaketsfoundation.ObjectToJSONString(newValue));
                    }
                }
                break;
        }
    }
};
const getStorage = (key, remember, defaultValue) => {
    var _a, _b, _c;
    if (!key)
        return defaultValue;
    let newValue = (remember === 'local'
        ? (_a = window.localStorage.getItem(key)) !== null && _a !== void 0 ? _a : defaultValue
        : remember === 'session'
            ? (_b = window.sessionStorage.getItem(key)) !== null && _b !== void 0 ? _b : defaultValue
            : defaultValue);
    if (!!newValue && typeof newValue === 'string' && newValue.startsWith('json:')) {
        return (_c = intelliwaketsfoundation.JSONStringToObject(newValue)) !== null && _c !== void 0 ? _c : newValue;
    }
    return newValue;
};
const useStorage = (key, defaultValue, remember = 'local') => {
    var _a, _b;
    const [value, setValue] = React.useState((_a = getStorage(key, remember, defaultValue)) !== null && _a !== void 0 ? _a : defaultValue);
    const saveValue = React.useCallback((val) => {
        if (typeof val === 'function') {
            setValue((prevState) => {
                if (!!key) {
                    const newValue = val(getStorage(key, remember, prevState !== null && prevState !== void 0 ? prevState : defaultValue));
                    setStorage(key, newValue, remember, defaultValue);
                    return newValue;
                }
                else {
                    return val(prevState);
                }
            });
        }
        else {
            if (!!key) {
                setStorage(key, val, remember, defaultValue);
            }
            setValue(val);
        }
    }, []);
    const currentValue = !!key ? (_b = getStorage(key, remember, defaultValue)) !== null && _b !== void 0 ? _b : value : value;
    return [currentValue, saveValue, () => saveValue(defaultValue)];
};

/**
 * A wrapper for Bootstrap's Modal that handles all the actions.
 *
 * @example
 * const [modalPromptProps, setModalPromptProps] = useState<null | IModalPromptProps>(null)
 *
 * setModalPromptProps({
 * 	title: 'Do action?',
 * 	color: 'danger',
 * 	messageBody: 'Are you sure you want to do the action?',
 * 	okLabel: 'Do',
 * 	okAction: () => {doAction()}
 * 	})
 *
 * <ModalPrompt {...modalPromptProps} dismiss={setModalPromptProps} />
 */
const ModalPrompt = (props) => {
    var _a, _b, _c, _d, _e;
    const promptResponsesAsArray = React.useMemo(() => {
        if (props.promptResponses === null || props.promptResponses === undefined)
            return [];
        if (props.promptResponses.constructor === Array) {
            return props.promptResponses;
        }
        else {
            return [props.promptResponses];
        }
    }, [props.promptResponses]);
    const title = React.useMemo(() => {
        if (typeof props.title !== 'string' || !props.variables)
            return props.title;
        return intelliwaketsfoundation.EvaluateString(props.title, props.variables);
    }, [props.title, props.variables]);
    const messageBody = React.useMemo(() => {
        if (typeof props.messageBody !== 'string' || !props.variables)
            return props.messageBody;
        return intelliwaketsfoundation.EvaluateString(props.messageBody, props.variables);
    }, [props.messageBody, props.variables]);
    const isOpen = React.useMemo(() => (!!props.promptOnly ||
        (props.promptResponses !== null && props.promptResponses !== undefined) ||
        (!!props.okLabel && !!props.okAction)) &&
        !props.hidden, [props.title, props.messageBody, props.promptResponses, props.okLabel, props.okAction, props.hidden]);
    const dismiss = React.useCallback((canceled) => {
        if (!!props.dismiss)
            props.dismiss(null, canceled);
        if (canceled && !!props.cancelAction)
            props.cancelAction();
    }, [props.dismiss, props.cancelAction]);
    const okAction = () => {
        !!props.okAction && props.okAction();
        dismiss(false);
    };
    return (React__default['default'].createElement(Modal, { isOpen: isOpen, toggle: () => dismiss(true) },
        React__default['default'].createElement(ModalHeader, { className: 'alert-' + ((_a = props.color) !== null && _a !== void 0 ? _a : 'primary') }, title),
        !!messageBody && React__default['default'].createElement(ModalBody, null, messageBody),
        React__default['default'].createElement(ModalFooter, null,
            React__default['default'].createElement(Button, { type: "button", onClick: () => dismiss(true), outline: props.cancelOutline, color: (_b = props.cancelColor) !== null && _b !== void 0 ? _b : (promptResponsesAsArray.length === 0 && (!props.okLabel || !props.okAction)
                    ? (_c = props.color) !== null && _c !== void 0 ? _c : 'primary'
                    : 'link') }, (_d = props.cancelLabel) !== null && _d !== void 0 ? _d : (promptResponsesAsArray.length === 0 && (!props.okLabel || !props.okAction) ? 'OK' : 'Cancel')),
            promptResponsesAsArray.map((promptResponse, idx) => {
                var _a, _b;
                return (React__default['default'].createElement(Button, { key: idx, onClick: () => {
                        promptResponse.action();
                        dismiss(false);
                    }, outline: promptResponse.outline, color: (_b = (_a = promptResponse.color) !== null && _a !== void 0 ? _a : props.color) !== null && _b !== void 0 ? _b : 'primary', className: "ml-1" }, promptResponse.label));
            }),
            !!props.okLabel && !!props.okAction && (React__default['default'].createElement(Button, { onClick: okAction, color: (_e = props.color) !== null && _e !== void 0 ? _e : 'primary', className: "ml-1", 
                // onKeyPress={okKeyPress}
                autoFocus: true, tabIndex: 0 }, props.okLabel)))));
};

const Tab = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const isChanging = React.useRef(false);
    const loadedTabs = React.useRef([]);
    const showTabs = props.tabs.filter((tab) => !tab.hide);
    const defaultTab = (_a = showTabs.find((tab) => !tab.disabled && (!props.openTab || tab.title === props.openTab))) === null || _a === void 0 ? void 0 : _a.title;
    const [openTab, setOpenTab] = useStorage(props.rememberKey, defaultTab !== null && defaultTab !== void 0 ? defaultTab : '', (_b = props.rememberType) !== null && _b !== void 0 ? _b : 'session');
    const [modalPromptProps, setModalPromptProps] = React.useState(null);
    const actualOpenTab = (_c = showTabs.find((tab) => !tab.disabled && tab.title === (!!props.setOpenTab ? props.openTab : openTab))) === null || _c === void 0 ? void 0 : _c.title;
    const setActualOpenTab = React.useCallback((_d = props.setOpenTab) !== null && _d !== void 0 ? _d : setOpenTab, [props, setOpenTab]);
    const openTabChanged = React.useCallback((_e = props.openTabChanged) !== null && _e !== void 0 ? _e : (() => { }), [props]);
    const changeOpenTab = React.useCallback((tabTitle) => {
        if (actualOpenTab !== tabTitle) {
            if (!props.isDirty) {
                setActualOpenTab(tabTitle);
                openTabChanged(tabTitle);
            }
            else {
                setModalPromptProps({
                    title: 'Abandon Changes?',
                    messageBody: 'Are you sure you want to abandon changes?',
                    color: 'danger',
                    okLabel: 'Abandon',
                    okAction: () => {
                        setActualOpenTab(tabTitle);
                        openTabChanged(tabTitle);
                    }
                });
            }
        }
    }, [actualOpenTab, props.isDirty, setActualOpenTab, openTabChanged]);
    React.useEffect(() => {
        var _a;
        if (!actualOpenTab) {
            if (!isChanging.current) {
                const gotoTab = (_a = showTabs.find((tab) => !tab.disabled)) === null || _a === void 0 ? void 0 : _a.title;
                if (gotoTab) {
                    isChanging.current = true;
                    setActualOpenTab(gotoTab);
                    openTabChanged(gotoTab);
                }
            }
        }
        else {
            isChanging.current = false;
            if (!loadedTabs.current.includes(actualOpenTab))
                loadedTabs.current = [...loadedTabs.current, actualOpenTab];
        }
    }, [actualOpenTab, openTabChanged, setActualOpenTab, showTabs]);
    if (!actualOpenTab)
        return null;
    // "px-4 mt-3 mx-0 gray-tabs"
    // p-2 background-gray overflow-hidden
    return (React__default['default'].createElement("div", { className: `${props.className} tabControlParent ${ClassNames({ 'fill-height': !!((_f = props.fillHeight) !== null && _f !== void 0 ? _f : true) })}`.trim() },
        React__default['default'].createElement(ModalPrompt, Object.assign({}, modalPromptProps, { dismiss: setModalPromptProps })),
        React__default['default'].createElement("ul", { className: `nav px-4 mt-3 mx-0 nav-${(_g = props.tabType) !== null && _g !== void 0 ? _g : 'tabs'}` }, showTabs.map((tab) => (React__default['default'].createElement("li", { key: tab.title, className: "nav-item" },
            React__default['default'].createElement(Button, { color: "link", className: ClassNames({
                    'nav-link': true,
                    desktopOnly: true,
                    active: actualOpenTab === tab.title
                }), disabled: !!tab.disabled, onClick: () => {
                    if (!tab.hide && !tab.disabled) {
                        changeOpenTab(tab.title);
                    }
                } },
                !!tab.faProps && React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, Object.assign({}, tab.faProps, { fixedWidth: !!tab.title, className: !!tab.title ? "fa-fw-desktop" : '' })),
                React__default['default'].createElement("span", { className: "desktopOnly" }, tab.title)))))),
        React__default['default'].createElement("div", { className: ClassNames({
                'tab-content': true,
                'fill-height': !!((_h = props.fillHeight) !== null && _h !== void 0 ? _h : true),
                'border-left': !props.noPaneBorder,
                'border-right': !props.noPaneBorder,
                'border-bottom': !props.noPaneBorder
            }) }, showTabs
            .filter((tab) => !tab.hide &&
            (!tab.loadedOnlyWhenActive || tab.title === actualOpenTab) &&
            (!props.paneLoading ||
                props.paneLoading === 'All' ||
                tab.title === actualOpenTab ||
                (props.paneLoading === 'KeepOnceLoaded' &&
                    loadedTabs.current.some((loadedTab) => tab.title === loadedTab))))
            .map((tab) => {
            var _a, _b, _c, _d, _e;
            return (React__default['default'].createElement("div", { key: tab.title, className: ((_a = props.classNamePanes) !== null && _a !== void 0 ? _a : '') +
                    ' ' +
                    (tab.title === actualOpenTab ? (_b = props.classNamePaneActive) !== null && _b !== void 0 ? _b : '' : '') +
                    ' ' +
                    ClassNames({
                        show: tab.title === actualOpenTab,
                        active: tab.title === actualOpenTab,
                        'fill-height': ((_c = tab.fillHeight) !== null && _c !== void 0 ? _c : props.fillHeight) === 'noScroll',
                        'fill-height-scroll': ((_e = (_d = tab.fillHeight) !== null && _d !== void 0 ? _d : props.fillHeight) !== null && _e !== void 0 ? _e : true) === true,
                        'p-2': !props.noPanePadding
                    }) +
                    ' tab-pane fade ' }, tab.pane));
        }))));
};

const Table = React.forwardRef((props, ref) => {
    var _a;
    return (React__default['default'].createElement("table", Object.assign({ className: ((_a = props.className) !== null && _a !== void 0 ? _a : '') +
            ' ' +
            ClassNames({
                table: true,
                'table-bordered': !!props.bordered,
                'table-borderless': !!props.borderless,
                'table-striped': !!props.striped,
                'table-dark': !!props.dark,
                'table-hover': !!props.hover,
                'table-responsive': !!props.responsive,
                'table-sortable': !!props.sortable,
                'table-sm': props.size !== 'lg',
                small: !!props.textSmall,
                'table-sticky': !!props.sticky
            }), ref: ref }, intelliwaketsfoundation.OmitProperty(props, 'bordered', 'borderless', 'striped', 'hover', 'size', 'responsive', 'dark', 'caption', 'textSmall', 'sticky', 'sortable', 'className')),
        !!props.caption && React__default['default'].createElement("caption", null, props.caption),
        props.children));
});

function checkDeps(deps, name) {
    const reactHookName = `React.${name.replace(/DeepCompare/, '')}`;
    if (!deps || deps.length === 0) {
        throw new Error(`${name} should not be used with no dependencies. Use ${reactHookName} instead.`);
    }
}
function useDeepCompareMemoize(value) {
    const ref = React__default['default'].useRef([]);
    if (!intelliwaketsfoundation.DeepEqual(value, ref.current)) {
        ref.current = Object.assign({}, value);
    }
    return ref.current;
}

/**
 * `useDeepCompareEffect` will return a memoized version of the callback that
 * only changes if one of the `deps` has changed.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use React.useEffect.
 *
 */
function useDeepCompareCallback(callback, dependencies) {
    if (process.env.NODE_ENV !== 'production') {
        checkDeps(dependencies, 'useDeepCompareCallback');
    }
    return React__default['default'].useCallback(callback, useDeepCompareMemoize(dependencies));
}

/**
 * `useDeepCompareEffect` Accepts a function that contains imperative, possibly
 * effectful code.
 *
 * @param effect Imperative function that can return a cleanup function
 * @param dependencies
 * change.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use React.useEffect.
 *
 */
function useDeepCompareEffect(effect, dependencies) {
    if (process.env.NODE_ENV !== 'production') {
        checkDeps(dependencies, 'useDeepCompareEffect');
    }
    React__default['default'].useEffect(effect, useDeepCompareMemoize(dependencies));
}

/**
 * `useDeepCompareMemo` will only recompute the memoized value when one of the
 * `deps` has changed.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use React.useMemo.
 *
 */
function useDeepCompareMemo(factory, dependencies) {
    if (process.env.NODE_ENV !== 'production') {
        checkDeps(dependencies, 'useDeepCompareMemo');
    }
    return React__default['default'].useMemo(factory, useDeepCompareMemoize(dependencies));
}

const initialActivityOverlayState = {
    nestedCount: 0,
    lastStart: undefined
};
const AddActivityOverlay = (prevState) => {
    return {
        nestedCount: prevState.nestedCount + 1,
        lastStart: moment__default['default']()
    };
};
const RemoveActivityOverlay = (prevState) => {
    if (prevState.nestedCount < 1) {
        console.log('WARNING: Additional RemoveActivityOverlay called');
        return initialActivityOverlayState;
    }
    return {
        nestedCount: prevState.nestedCount - 1,
        lastStart: moment__default['default']()
    };
};
/**
 * An overlay with a black background and a spinner that covers the entire screen.
 */
const ActivityOverlay = (props) => {
    var _a;
    function resetActivityOverlay() {
        var _a;
        if (props.activityOverlayState.nestedCount > 0) {
            const seconds = 5;
            if (moment__default['default']().diff((_a = props.activityOverlayState.lastStart) !== null && _a !== void 0 ? _a : 0, 'seconds') >= seconds) {
                props.resetActivityOverlay();
            }
        }
    }
    if (props.activityOverlayState.nestedCount > 0) {
        return (React__default['default'].createElement("div", { className: "System_ActivityOverlay", onClick: resetActivityOverlay, color: "primary" },
            React__default['default'].createElement(Spinner, { size: (_a = props.size) !== null && _a !== void 0 ? _a : '3x' })));
    }
    return null;
};

/**
 * An overlay with a white background and a spinner that covers the entire surface of it's parent component.
 */
const ActivityOverlayControl = (props) => {
    var _a;
    return props.show ? (React__default['default'].createElement("div", { className: "System_ActivityOverlay_Control" },
        React__default['default'].createElement(Spinner, { size: (_a = props.size) !== null && _a !== void 0 ? _a : '2x' }))) : null;
};

const initialSortProperties = {
    sort_column: null,
    sort_ascending: true,
    empty_to_bottom: true,
    sort_column_2: null,
    sort_ascending_2: true,
    empty_to_bottom_2: true
};
const SetSort = (currentProperties, columnName, emptyToBottom = true, forceDirection = null) => {
    if (columnName === currentProperties.sort_column) {
        return Object.assign(Object.assign({}, currentProperties), { sort_ascending: !currentProperties.sort_ascending });
    }
    else {
        return Object.assign(Object.assign({}, currentProperties), { sort_column_2: currentProperties.sort_column, sort_ascending_2: currentProperties.sort_ascending, empty_to_bottom_2: currentProperties.empty_to_bottom, sort_column: columnName, sort_ascending: forceDirection === null ? true : forceDirection, empty_to_bottom: emptyToBottom });
    }
};
const SortObjects = (objects, sortProperties) => {
    if (sortProperties.sort_column !== null) {
        return objects.sort((object_a, object_b) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
            const emptyToBottom_1 = sortProperties.empty_to_bottom
                ? !!object_a[(_a = sortProperties.sort_column) !== null && _a !== void 0 ? _a : ''] && !object_b[(_b = sortProperties.sort_column) !== null && _b !== void 0 ? _b : '']
                    ? -1
                    : !object_a[(_c = sortProperties.sort_column) !== null && _c !== void 0 ? _c : ''] && !!object_b[(_d = sortProperties.sort_column) !== null && _d !== void 0 ? _d : '']
                        ? 1
                        : 0
                : 0;
            const comparison_1 = (isNaN(object_a[(_e = sortProperties.sort_column) !== null && _e !== void 0 ? _e : ''])
                ? ((_g = object_a[(_f = sortProperties.sort_column) !== null && _f !== void 0 ? _f : '']) !== null && _g !== void 0 ? _g : '').localeCompare((_j = object_b[(_h = sortProperties.sort_column) !== null && _h !== void 0 ? _h : '']) !== null && _j !== void 0 ? _j : '', undefined, { sensitivity: 'base' })
                : object_a[(_k = sortProperties.sort_column) !== null && _k !== void 0 ? _k : ''] - object_b[(_l = sortProperties.sort_column) !== null && _l !== void 0 ? _l : '']) *
                (sortProperties.sort_ascending ? 1 : -1);
            if (sortProperties.sort_column_2 === null) {
                return emptyToBottom_1 || comparison_1;
            }
            else {
                const emptyToBottom_2 = sortProperties.empty_to_bottom_2
                    ? !!object_a[(_m = sortProperties.sort_column_2) !== null && _m !== void 0 ? _m : ''] && !object_b[(_o = sortProperties.sort_column_2) !== null && _o !== void 0 ? _o : '']
                        ? -1
                        : !object_a[(_p = sortProperties.sort_column_2) !== null && _p !== void 0 ? _p : ''] && !!object_b[(_q = sortProperties.sort_column_2) !== null && _q !== void 0 ? _q : '']
                            ? 1
                            : 0
                    : 0;
                const comparison_2 = (isNaN(object_a[(_r = sortProperties.sort_column_2) !== null && _r !== void 0 ? _r : ''])
                    ? ((_t = object_a[(_s = sortProperties.sort_column_2) !== null && _s !== void 0 ? _s : '']) !== null && _t !== void 0 ? _t : '').localeCompare((_v = object_b[(_u = sortProperties.sort_column_2) !== null && _u !== void 0 ? _u : '']) !== null && _v !== void 0 ? _v : '', undefined, { sensitivity: 'base' })
                    : object_a[(_w = sortProperties.sort_column_2) !== null && _w !== void 0 ? _w : ''] - object_b[(_x = sortProperties.sort_column_2) !== null && _x !== void 0 ? _x : '']) *
                    (sortProperties.sort_ascending_2 ? 1 : -1);
                return emptyToBottom_1 || comparison_1 || emptyToBottom_2 || comparison_2;
            }
        });
    }
    else {
        return objects;
    }
};
const FilterObjects = (objects, filter) => {
    if (!filter)
        return objects;
    const filterItems = filter
        .split(' ')
        .filter((filterItem) => !!filterItem)
        .map((filterItem) => filterItem.toString().toLowerCase());
    return objects.filter((object) => {
        const values = Object.values(object).join('}{').toLowerCase();
        return filterItems.length === filterItems.filter((filterItem) => values.includes(filterItem)).length;
    });
};

const ComputeValue = (value, column, rowData, sumsInFooter) => {
    var _a, _b;
    const computedValue = !!column.customWriter
        ? column.customWriter(value)
        : !!column.customWriterFromRow
            ? column.customWriterFromRow(rowData)
            : value;
    if (column.sumInFooter) {
        sumsInFooter[column.fieldName] = (_a = sumsInFooter[column.fieldName]) !== null && _a !== void 0 ? _a : 0.0;
        if (computedValue) {
            sumsInFooter[column.fieldName] += (_b = parseFloat(computedValue)) !== null && _b !== void 0 ? _b : 0.0;
        }
    }
    return computedValue;
};
const FormatValue = (value, column) => {
    if (column.momentTSFormat) {
        if (value) {
            if (!isNaN(parseInt(value))) {
                value = moment__default['default'].unix(value / 1000).format(column.momentTSFormat);
            }
        }
        else {
            value = null;
        }
    }
    return value;
};
const IsColumnEmpty = (arrayData, fieldName) => {
    if (!arrayData)
        return true;
    return !arrayData.find((item) => { var _a; return !!((_a = item[fieldName]) !== null && _a !== void 0 ? _a : null); });
};
const ValidColumns = (arrayData, arrayStructure) => {
    var _a;
    return ((_a = arrayStructure.columns.filter((column) => (!column.hideOnEmpty || !IsColumnEmpty(arrayData, column.fieldName)) &&
        (!column.hideOnFunction || column.hideOnFunction(arrayData)))) !== null && _a !== void 0 ? _a : []);
};
const StructuredArray = (arrayData, arrayStructure) => {
    let structuredArray = [];
    const sumsInFooter = {};
    const validColumns = ValidColumns(arrayData, arrayStructure);
    structuredArray.push(validColumns.map((column) => column.title));
    for (const row of arrayData !== null && arrayData !== void 0 ? arrayData : []) {
        structuredArray.push(validColumns.map((column) => { var _a; return FormatValue(ComputeValue((_a = row[column.fieldName]) !== null && _a !== void 0 ? _a : null, column, row, sumsInFooter), column); }));
    }
    if (Object.keys(sumsInFooter).length > 0) {
        structuredArray.push(validColumns.map((column) => { var _a; return FormatValue((_a = sumsInFooter[column.fieldName]) !== null && _a !== void 0 ? _a : null, column); }));
    }
    return structuredArray;
};
const ScreenFormatValue = (value, column) => {
    if (column.toDigitsPrecision !== undefined) {
        if (column.dashIfBlank) {
            value = intelliwaketsfoundation.ToDigitsDash(value, column.toDigitsPrecision);
        }
        else if (column.blankIfBlank) {
            value = intelliwaketsfoundation.ToDigitsBlank(value, column.toDigitsPrecision);
        }
        else {
            value = intelliwaketsfoundation.ToDigits(value, column.toDigitsPrecision);
        }
    }
    else if (column.toCurrencyPrecision !== undefined) {
        if (column.dashIfBlank) {
            value = intelliwaketsfoundation.ToCurrencyDash(value, column.toDigitsPrecision);
        }
        else if (column.blankIfBlank) {
            value = intelliwaketsfoundation.ToCurrencyBlank(value, column.toDigitsPrecision);
        }
        else {
            value = intelliwaketsfoundation.ToCurrency(value, column.toDigitsPrecision);
        }
    }
    else {
        value = FormatValue(value, column);
    }
    return value;
};
const ColumnHeadClassNames = (column, arrayStructure, otherClasses = {}) => {
    return ColumnClassNames(column, Object.assign({ hoverAction: !!arrayStructure.sortable && !column.doNotSort }, otherClasses));
};
const ColumnBodyClassNames = (column, otherClasses = {}) => {
    return ColumnClassNames(column, Object.assign({ small: !!column.bodySmall }, otherClasses));
};
const ColumnClassNames = (column, otherClasses = {}) => {
    var _a;
    return ClassNames(Object.assign({ 'text-right': column.toDigitsPrecision !== undefined ||
            column.toCurrencyPrecision !== undefined ||
            column.momentTSFormat !== undefined, ['td-' + ((_a = column.size) !== null && _a !== void 0 ? _a : '')]: !!column.size }, otherClasses));
};
const ColumnHeaderClick = (column, arrayStructure, sorter, setSorter) => {
    if (!!arrayStructure.sortable && !column.doNotSort) {
        const newSort = SetSort(sorter, column.fieldName);
        setSorter(newSort);
    }
};
const WriteHeadTR = (arrayStructure, validColumns, hideCosts, sorter, setSorter) => {
    return (React__default['default'].createElement("tr", { className: "table-secondary" }, validColumns.map((column, idx) => !hideCosts || !column.isACost ? (React__default['default'].createElement("th", { key: idx, className: ColumnHeadClassNames(column, arrayStructure), onClick: () => {
            ColumnHeaderClick(column, arrayStructure, sorter, setSorter);
        } }, column.title)) : null)));
};
const WriteBodyTR = (rowData, idx, arrayStructure, validColumns, hideCosts, sumsInFooter) => {
    return (React__default['default'].createElement("tr", { key: idx, onClick: () => {
            if (!!arrayStructure.rowClick)
                arrayStructure.rowClick(rowData);
        } }, validColumns.map((column, idx) => { var _a; return WriteBodyTD((_a = rowData[column.fieldName]) !== null && _a !== void 0 ? _a : undefined, column, hideCosts, rowData, sumsInFooter, idx); })));
};
const WriteBodyTD = (columnValue, column, hideCosts, rowData, sumsInFooter, idx) => {
    if (!hideCosts || !column.isACost) {
        const computedValue = ComputeValue(columnValue, column, rowData, sumsInFooter);
        const formattedValue = ScreenFormatValue(computedValue, column);
        return (React__default['default'].createElement("td", { key: idx, className: ColumnBodyClassNames(column) }, formattedValue));
    }
    else {
        return null;
    }
};
const WriteFootTR = (validColumns, sums, hideCosts) => {
    return (React__default['default'].createElement("tr", { className: "border-top" }, validColumns.map((column, idx) => !hideCosts || !column.isACost ? (React__default['default'].createElement("th", { key: idx, className: ColumnClassNames(column, {
            'border-0': true
        }) }, sums[column.fieldName] === undefined ? null : ScreenFormatValue(sums[column.fieldName], column))) : null)));
};

const ArrayTable = (props) => {
    var _a, _b, _c;
    const [sorter, setSorter] = React.useState(Object.assign(Object.assign({}, initialSortProperties), { sort_column: (_a = props.arrayStructure.defaultSortColumn) !== null && _a !== void 0 ? _a : null }));
    const sumsInFooter = {};
    const validColumns = ValidColumns(props.arrayData, props.arrayStructure);
    let styleSettings = {};
    if (props.minWidth) {
        styleSettings.minWidth = props.minWidth;
    }
    return (React__default['default'].createElement(Table, { size: "sm", bordered: props.bordered, className: ClassNames({
            'table-scrollable': !!props.scrollable,
            [(_b = 'table-col-min-' + props.arrayStructure.minColSize) !== null && _b !== void 0 ? _b : '']: !!props.arrayStructure.minColSize
        }), style: styleSettings, hover: !!props.arrayStructure.rowClick },
        React__default['default'].createElement("thead", null, WriteHeadTR(props.arrayStructure, validColumns, !!props.hideCosts, sorter, setSorter)),
        React__default['default'].createElement("tbody", null, SortObjects((_c = props.arrayData) !== null && _c !== void 0 ? _c : [], sorter).map((row, idx) => WriteBodyTR(row, idx, props.arrayStructure, validColumns, !!props.hideCosts, sumsInFooter))),
        Object.keys(sumsInFooter).length > 0 ? (React__default['default'].createElement("tfoot", null, WriteFootTR(validColumns, sumsInFooter, !!props.hideCosts))) : null));
};

const BRAfter = (props) => {
    if (props.hidden || !props.text)
        return null;
    return (React__default['default'].createElement("span", { className: props.className },
        props.prefix,
        props.text,
        props.suffix,
        " ",
        React__default['default'].createElement("br", null)));
};

const BRBefore = (props) => {
    if (props.hidden || !props.text)
        return null;
    return (React__default['default'].createElement("span", { className: props.className },
        ' ',
        React__default['default'].createElement("br", null),
        props.prefix,
        props.text,
        props.suffix));
};

const customRangeName = 'Custom Range';
const CreateCustomDateRange = (dateStart, dateEnd) => {
    return {
        name: customRangeName,
        start: DateRangeDateMomentToString(dateStart),
        end: DateRangeDateMomentToString(dateEnd)
    };
};
const DateRangeDateMomentToString = (date) => { var _a; return typeof date === 'string' ? date : (_a = intelliwaketsfoundation.MomentDateString(date.startOf('day'))) !== null && _a !== void 0 ? _a : moment__default['default']().format('YYYY-MM-DD'); };
const DateRangeDateStringToMoment = (date) => { var _a; return typeof date === 'string' ? (_a = intelliwaketsfoundation.MomentFromString(date)) !== null && _a !== void 0 ? _a : moment__default['default']() : date; };
const DateRangeToMoment = (dateRange) => ({
    name: dateRange.name,
    start: DateRangeDateStringToMoment(dateRange.start),
    end: DateRangeDateStringToMoment(dateRange.end)
});
const DateRangeToString = (dateRange) => ({
    name: dateRange.name,
    start: DateRangeDateMomentToString(dateRange.start),
    end: DateRangeDateMomentToString(dateRange.end)
});
const initialDateRange = {
    name: customRangeName,
    start: moment__default['default'](),
    end: moment__default['default']()
};
const initialDateRangeString = DateRangeToString(initialDateRange);
const DateRangeCalendar = (props) => {
    let moments = [];
    let firstDay = props.month.clone().startOf('month');
    let currentDay = firstDay.clone().startOf('week');
    let lastDay = props.month.clone().endOf('month');
    while (currentDay.isBefore(lastDay)) {
        let week = [];
        do {
            week.push(currentDay.clone());
            currentDay.add(1, 'day');
        } while (currentDay.weekday() > 0);
        moments.push(week);
    }
    const prev = () => {
        if (props.prevMonth) {
            props.prevMonth();
        }
    };
    const next = () => {
        if (props.nextMonth) {
            props.nextMonth();
        }
    };
    return (React__default['default'].createElement("table", null,
        React__default['default'].createElement("thead", null,
            React__default['default'].createElement("tr", null,
                props.prevMonth !== undefined
                    ?
                        React__default['default'].createElement("th", { className: "prev available", onClick: prev },
                            React__default['default'].createElement("span", null, " "))
                    :
                        React__default['default'].createElement("th", null),
                React__default['default'].createElement("th", { colSpan: 5, className: "month" }, firstDay.format('MMM YYYY')),
                props.nextMonth !== undefined
                    ?
                        React__default['default'].createElement("th", { className: "next available", onClick: next },
                            React__default['default'].createElement("span", null, " "))
                    :
                        React__default['default'].createElement("th", null)),
            React__default['default'].createElement("tr", null,
                React__default['default'].createElement("th", null, "Su"),
                React__default['default'].createElement("th", null, "Mo"),
                React__default['default'].createElement("th", null, "Tu"),
                React__default['default'].createElement("th", null, "We"),
                React__default['default'].createElement("th", null, "Th"),
                React__default['default'].createElement("th", null, "Fr"),
                React__default['default'].createElement("th", null, "Sa"))),
        React__default['default'].createElement("tbody", null, moments.map((week, idx) => React__default['default'].createElement("tr", { key: idx }, week.map((day) => React__default['default'].createElement("td", { className: (day.format('dd') === 'Sa' || day.format('dd') === 'Su' ? 'weekend ' : '') +
                ((day.isBefore(firstDay, 'day') || day.isAfter(lastDay, 'day')) && !day.isBetween(props.startSelected, props.endSelected, 'day', '[]') ? 'off ends ' : '') +
                (day.isSame(props.startSelected, 'day') ? 'active start-date ' : '') +
                (day.isBetween(props.startSelected, props.endSelected, 'day') ? 'in-range ' : '') +
                (day.isSame(props.endSelected, 'day') ? 'active end-date ' : '') +
                'available ', key: day.format(), onClick: () => props.dateClick(day) }, day.format('D'))))))));
};
const DateRange = (props) => {
    var _a;
    const nodeParent = React.useRef();
    const nodeBody = React.useRef();
    const getStartRange = () => {
        if (props.defaultRange && props.defaultRange.name) {
            if (props.defaultRange.name === customRangeName) {
                return DateRangeToMoment(props.defaultRange);
            }
            if (!!props.presetRanges) {
                const presetRanges = props.presetRanges.map(range => DateRangeToMoment(range));
                if (presetRanges.length > 0) {
                    const foundItem = presetRanges.find((item) => props.defaultRange.name === item.name);
                    if (foundItem) {
                        return foundItem;
                    }
                    const foundItemStartsWith = presetRanges.find((item) => item.name.startsWith(props.defaultRange.name));
                    if (foundItemStartsWith) {
                        return foundItemStartsWith;
                    }
                }
            }
        }
        if (props.presetRanges && props.presetRanges.length > 0)
            return DateRangeToMoment(props.presetRanges[0]);
        return initialDateRange;
    };
    const [state, setState] = React.useState({
        isOpen: false,
        selectedRange: getStartRange(),
        selectedText: '',
        prevPreset: null,
        customRange: initialDateRange,
        monthToShow: getStartRange().start,
        applyToFirst: true
    });
    const getCurrentRange = () => {
        if (state.selectedRange)
            return state.selectedRange;
        return getStartRange();
    };
    const currentRange = getCurrentRange();
    const rangeDescription = (range) => {
        return (range.name === customRangeName ? (moment__default['default'](range.start).format('L') + ' - ' + moment__default['default'](range.end).format('L')) : range.name);
    };
    const setOpen = (e) => {
        if (!nodeBody.current.contains(e.target)) {
            setState(Object.assign(Object.assign({}, state), { isOpen: true }));
        }
    };
    const handleClick = (e) => {
        if (!nodeParent.current.contains(e.target)) {
            setState(Object.assign(Object.assign({}, state), { isOpen: false }));
        }
    };
    const handlePresetClick = (range) => {
        setState(Object.assign(Object.assign({}, state), { isOpen: false, selectedRange: range }));
        if (!!props.selectRange)
            props.selectRange(range);
        if (!!props.selectRangeString)
            props.selectRangeString(DateRangeToString(range));
    };
    const handleCustomApplyClick = () => {
        setState(Object.assign(Object.assign({}, state), { isOpen: false, selectedRange: state.customRange }));
        if (!!props.selectRange)
            props.selectRange(state.customRange);
        if (!!props.selectRangeString)
            props.selectRangeString(DateRangeToString(state.customRange));
    };
    const handleCustomClick = () => {
        const customRange = Object.assign(Object.assign({}, getCurrentRange()), { name: customRangeName });
        setState(Object.assign(Object.assign({}, state), { prevPreset: currentRange, customRange: customRange }));
    };
    const handleUnCustomClick = () => {
        const customRange = Object.assign(Object.assign({}, getCurrentRange()), { name: customRangeName });
        setState(Object.assign(Object.assign({}, state), { prevPreset: null, customRange: customRange }));
    };
    const handleDateClick = (day) => {
        let newState = Object.assign({}, state);
        if (newState.applyToFirst) {
            newState.customRange.start = day;
        }
        else {
            newState.customRange.end = day;
        }
        if (newState.customRange.start.isAfter(newState.customRange.end)) {
            [newState.customRange.start, newState.customRange.end] = [newState.customRange.end, newState.customRange.start];
        }
        newState.applyToFirst = !newState.applyToFirst;
        setState(newState);
    };
    const prevMonth = () => {
        const prev = state.monthToShow.clone().subtract(1, 'month');
        setState(Object.assign(Object.assign({}, state), { monthToShow: prev }));
    };
    const nextMonth = () => {
        const next = state.monthToShow.clone().add(1, 'month');
        setState(Object.assign(Object.assign({}, state), { monthToShow: next }));
    };
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    });
    React.useEffect(() => {
        if (!!props.defaultRange) {
            setState(Object.assign(Object.assign({}, state), { selectedRange: DateRangeToMoment(props.defaultRange) }));
        }
    }, [props.defaultRange]);
    return (React__default['default'].createElement("div", { className: 'DateRangeDD ' + ((_a = props.className) !== null && _a !== void 0 ? _a : '') + (props.borderless ? '' : ' border') + (props.showCaret ? ' dropdown-toggle' : ''), onClick: setOpen, ref: nodeParent, color: props.color },
        props.faIcon !== null &&
            React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, { icon: props.faIcon ? props.faIcon : proRegularSvgIcons.faCalendarAlt, fixedWidth: true }),
        " ",
        rangeDescription(state.selectedRange),
        React__default['default'].createElement("div", { className: ClassNames({ DateRangeLB: true, OpensRight: !props.rightAlign, 'd-none': !state.isOpen }), ref: nodeBody },
            React__default['default'].createElement("div", { className: 'ranges' + (state.prevPreset ? ' d-none' : '') },
                React__default['default'].createElement("ul", null,
                    props.presetRanges.map((preset, idx) => React__default['default'].createElement("li", { key: idx, onClick: () => handlePresetClick(preset), className: (preset.name === currentRange.name ? 'active' : '') }, preset.name)),
                    React__default['default'].createElement("li", { onClick: handleCustomClick },
                        customRangeName,
                        React__default['default'].createElement("span", { className: "float-right" }, ">")))),
            React__default['default'].createElement("div", { className: 'drp-headers' + (!state.prevPreset ? ' d-none' : ''), onClick: handleUnCustomClick },
                React__default['default'].createElement("span", null, "< Presets")),
            React__default['default'].createElement("div", { className: 'drp-calendar left' + (!state.prevPreset ? ' d-none' : '') },
                React__default['default'].createElement("div", { className: "calendar-table" },
                    React__default['default'].createElement(DateRangeCalendar, { month: state.monthToShow, startSelected: state.customRange.start, endSelected: state.customRange.end, prevMonth: prevMonth, nextMonth: nextMonth, dateClick: handleDateClick }))),
            React__default['default'].createElement("div", { className: 'drp-buttons' + (!state.prevPreset ? ' d-none' : '') },
                React__default['default'].createElement("span", { className: "drp-selected" }, rangeDescription(state.customRange)),
                React__default['default'].createElement("button", { className: "btn btn-sm btn-primary", type: "button", onClick: handleCustomApplyClick }, "Apply")))));
};
const defaultRanges = [
    {
        name: 'This Week #' + moment__default['default']().format('w'),
        start: moment__default['default']().startOf('week'),
        end: moment__default['default']().endOf('week')
    },
    {
        name: 'Last Week #' + moment__default['default']().subtract(1, 'week').format('w'),
        start: moment__default['default']().subtract(1, 'week').startOf('week'),
        end: moment__default['default']().subtract(1, 'week').endOf('week')
    },
    {
        name: 'Previous 4 Weeks',
        start: moment__default['default']().subtract(4, 'week').startOf('week'),
        end: moment__default['default']().subtract(1, 'week').endOf('week')
    },
    {
        name: 'This Month',
        start: moment__default['default']().startOf('month'),
        end: moment__default['default']().endOf('month')
    },
    {
        name: 'Last Month',
        start: moment__default['default']().subtract(1, 'month').startOf('month'),
        end: moment__default['default']().subtract(1, 'month').endOf('month')
    },
    {
        name: 'Last 7 Days',
        start: moment__default['default']().subtract(6, 'days').startOf('day'),
        end: moment__default['default']().endOf('day')
    },
    {
        name: 'Last 30 Days',
        start: moment__default['default']().subtract(29, 'days').startOf('day'),
        end: moment__default['default']().endOf('day')
    }
];
const defaultRangeStrings = defaultRanges.map(range => DateRangeToString(range));
const defaultRangesReport = [
    {
        name: 'This Week',
        start: moment__default['default']().startOf('week'),
        end: moment__default['default']().endOf('week')
    },
    {
        name: 'Last Week',
        start: moment__default['default']().subtract(1, 'week').startOf('week'),
        end: moment__default['default']().subtract(1, 'week').endOf('week')
    },
    {
        name: 'This Month',
        start: moment__default['default']().startOf('month'),
        end: moment__default['default']().endOf('month')
    },
    {
        name: 'Last Month',
        start: moment__default['default']().subtract(1, 'month').startOf('month'),
        end: moment__default['default']().subtract(1, 'month').endOf('month')
    },
    {
        name: 'Year-to-Date',
        start: moment__default['default']().startOf('year'),
        end: moment__default['default']().endOf('year')
    },
    {
        name: 'Last Year',
        start: moment__default['default']().subtract(1, 'year').startOf('year'),
        end: moment__default['default']().subtract(1, 'year').endOf('year')
    }
];
const defaultRangeStringsReport = defaultRangesReport.map(range => DateRangeToString(range));
const defaultRangesReportQuarterly = [
    {
        name: 'This Month',
        start: moment__default['default']().startOf('month'),
        end: moment__default['default']().endOf('month')
    },
    {
        name: 'Last Month',
        start: moment__default['default']().subtract(1, 'month').startOf('month'),
        end: moment__default['default']().subtract(1, 'month').endOf('month')
    },
    {
        name: 'This Quarter',
        start: moment__default['default']().startOf('quarter'),
        end: moment__default['default']().endOf('quarter')
    },
    {
        name: 'Last Quarter',
        start: moment__default['default']().subtract(1, 'quarter').startOf('quarter'),
        end: moment__default['default']().subtract(1, 'quarter').endOf('quarter')
    },
    {
        name: '2 Quarters ago',
        start: moment__default['default']().subtract(2, 'quarter').startOf('quarter'),
        end: moment__default['default']().subtract(2, 'quarter').endOf('quarter')
    },
    {
        name: '3 Quarters ago',
        start: moment__default['default']().subtract(3, 'quarter').startOf('quarter'),
        end: moment__default['default']().subtract(3, 'quarter').endOf('quarter')
    },
    {
        name: '4 Quarters ago',
        start: moment__default['default']().subtract(4, 'quarter').startOf('quarter'),
        end: moment__default['default']().subtract(4, 'quarter').endOf('quarter')
    },
    {
        name: 'Year to Date',
        start: moment__default['default']().startOf('year'),
        end: moment__default['default']()
    },
    {
        name: 'This Year',
        start: moment__default['default']().startOf('year'),
        end: moment__default['default']().endOf('year')
    },
    {
        name: 'Last Year',
        start: moment__default['default']().subtract(1, 'year').startOf('year'),
        end: moment__default['default']().subtract(1, 'year').endOf('year')
    }
];
const defaultRangeStringsReportQuarterly = defaultRangesReportQuarterly.map(range => DateRangeToString(range));
/**
 * Default to this month
 *
 * Use DateRangeToString(defaultRange) to get a string of it
 */
const defaultRange = {
    name: 'This Month',
    start: moment__default['default']().startOf('month'),
    end: moment__default['default']().endOf('month')
};
/**
 * Default to this week
 *
 * Use DateRangeToString(defaultRangeWeek) to get a string of it
 */
const defaultRangeWeek = {
    name: 'This Week',
    start: moment__default['default']().startOf('week'),
    end: moment__default['default']().endOf('week')
};
/**
 * Default to last 4 weeks
 *
 * Use DateRangeToString(defaultRangeLast4Weeks) to get a string of it
 */
const defaultRangeLast4Weeks = {
    name: 'Last 4 Weeks',
    start: moment__default['default']().subtract(3, 'week').startOf('week'),
    end: moment__default['default']().endOf('week')
};
/**
 * Default to this year
 *
 * Use DateRangeToString(defaultRangeYear) to get a string of it
 */
const defaultRangeYear = {
    name: 'Year-to-Date',
    start: moment__default['default']().startOf('year'),
    end: moment__default['default']().endOf('year')
};
const defaultRangeString = DateRangeToString(defaultRange);
// DateRange.defaultProps = {
// 	presetRanges: defaultRanges,
// 	showCaret: true,
// 	borderless: false
// } as Partial<IPropsDateRange>

const EllipsesTruncate = (props) => {
    var _a;
    if (props.hidden || !props.text)
        return null;
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        props.prefix,
        React__default['default'].createElement("div", { className: 'w-100 ' + (!!props.noTruncate ? '' : 'ellipses-truncate ') + ((_a = props.className) !== null && _a !== void 0 ? _a : ''), title: !!props.noTruncate ? undefined : props.text }, props.text),
        props.suffix));
};

function InputCheckBox(props) {
    var _a;
    const handleInputChange = (e) => {
        e.target.value = e.target.checked.toString();
        e.target.customValue = e.target.checked;
        if (!!props.onChange) {
            props.onChange(e);
        }
        if (!!props.changeValue) {
            props.changeValue(e.target.checked, e.target.name, e.nativeEvent.shiftKey, e.nativeEvent.ctrlKey, e.nativeEvent.altKey);
        }
    };
    return (React__default['default'].createElement("label", { className: !props.plainText ? 'cursor-pointer' : '' },
        React__default['default'].createElement("input", { type: 'checkbox', name: props.name, className: 'inputCheckbox mr-1 ' + ((_a = props.className) !== null && _a !== void 0 ? _a : '') + (props.plainText ? ' plainText' : ''), hidden: props.hidden, checked: props.checked, onChange: !props.plainText ? handleInputChange : () => {
            }, disabled: props.plainText, onClick: props.onClick }),
        props.label));
}

const ReduceInputProps = (props, classNameAdd) => {
    var _a, _b, _c;
    const subset = intelliwaketsfoundation.OmitProperty(props, 'plainText', 'plainTextURL', 'plainTextProps', 'changeValue', 'changeValueLate', 'autoCompleteOn', 'append', 'prepend', 'invalid', 'innerRef');
    if (!!classNameAdd) {
        if (typeof classNameAdd === 'string') {
            subset.className = `${(_a = subset.className) !== null && _a !== void 0 ? _a : ''} ${classNameAdd}`.trim();
        }
        else if (Array.isArray(classNameAdd)) {
            subset.className = `${(_b = subset.className) !== null && _b !== void 0 ? _b : ''} ${classNameAdd.join(' ')}`.trim();
        }
        else {
            subset.className = `${(_c = subset.className) !== null && _c !== void 0 ? _c : ''} ${ClassNames(classNameAdd)}`.trim();
        }
    }
    return subset;
};
const ReduceToInputAddProps = (props) => {
    return {
        plainText: props.plainText,
        plainTextURL: props.plainTextURL,
        plainTextProps: props.plainTextProps,
        changeValue: props.changeValue,
        changeValueLate: props.changeValueLate,
        autoCompleteOn: props.autoCompleteOn,
        prepend: props.prepend,
        append: props.append,
        invalid: props.invalid
    };
};
const HandleChangeValue = (e, changeValue, onChange) => {
    if (!!changeValue) {
        changeValue(ElementCustomValue(e), e.target.name);
    }
    if (!!onChange) {
        onChange(e);
    }
};
//  onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}

function InputColor(props) {
    var _a, _b, _c;
    const inputProps = React.useMemo(() => {
        const subset = ReduceInputProps(intelliwaketsfoundation.OmitProperty(props, 'className'));
        if (subset.autoComplete === undefined) {
            subset.autoComplete = 'off';
        }
        return subset;
    }, [props]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (!!props.plainTextURL ? (React__default['default'].createElement(reactRouterDom.Link, { to: props.plainTextURL },
        React__default['default'].createElement("div", Object.assign({ className: "form-control-plaintext" }, props.plainTextProps),
            React__default['default'].createElement("input", Object.assign({ type: "color", className: (_a = 'inputText ' + props.className) !== null && _a !== void 0 ? _a : '' }, inputProps, { disabled: true })),
            props.value))) : (React__default['default'].createElement("div", Object.assign({ className: "form-control-plaintext" }, props.plainTextProps),
        React__default['default'].createElement("input", Object.assign({ type: "color", className: (_b = 'inputText ' + props.className) !== null && _b !== void 0 ? _b : '' }, inputProps, { disabled: true })),
        props.value))) : (React__default['default'].createElement("input", Object.assign({ type: "color", className: (_c = 'inputText ' + props.className) !== null && _c !== void 0 ? _c : '' }, inputProps, { onChange: (e) => HandleChangeValue(e, props.changeValue, props.onChange) })))));
}

const originalValue$1 = ' ';
function InputDate(props) {
    var _a;
    const lastDateValue = React.useRef(originalValue$1);
    const nextDateValue = React.useRef(originalValue$1);
    const [overrideValue, setOverrideValue] = React.useState(originalValue$1);
    const inputProps = React.useMemo(() => ReduceInputProps(intelliwaketsfoundation.OmitProperty(props, 'value', 'onChange')), [props]);
    React.useEffect(() => {
        var _a, _b, _c, _d, _e;
        if (![lastDateValue.current, nextDateValue.current].includes((_a = intelliwaketsfoundation.MomentDateString(props.value)) !== null && _a !== void 0 ? _a : '')) {
            lastDateValue.current = (_c = intelliwaketsfoundation.MomentDateString(((_b = props.value) !== null && _b !== void 0 ? _b : ''))) !== null && _c !== void 0 ? _c : '';
            nextDateValue.current = lastDateValue.current;
            setOverrideValue(lastDateValue.current);
        }
        else {
            lastDateValue.current = (_e = intelliwaketsfoundation.MomentDateString(((_d = props.value) !== null && _d !== void 0 ? _d : ''))) !== null && _e !== void 0 ? _e : '';
        }
    }, [props.value]);
    const handleInputChange = (e) => {
        var _a, _b;
        nextDateValue.current = (_a = intelliwaketsfoundation.MomentDateString(e.target.value)) !== null && _a !== void 0 ? _a : '';
        setOverrideValue(e.target.value);
        const customValue = (nextDateValue.current + ' ' + ((_b = intelliwaketsfoundation.MomentTimeString(props.value)) !== null && _b !== void 0 ? _b : '')).trim();
        if (!!props.onChange) {
            e.target.customValue = customValue;
            props.onChange(e);
        }
        if (!!props.changeValue) {
            props.changeValue(customValue, e.target.name, e.nativeEvent.shiftKey, e.nativeEvent.ctrlKey, e.nativeEvent.altKey);
        }
    };
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (React__default['default'].createElement("div", Object.assign({ className: 'form-control-plaintext' }, props.plainTextProps), !!props.showTime && !!intelliwaketsfoundation.MomentTimeString(props.value)
        ? intelliwaketsfoundation.MomentDisplayDayDateTime(props.value)
        : intelliwaketsfoundation.MomentDisplayDayDate(props.value))) : (React__default['default'].createElement("input", Object.assign({ type: 'date', className: 'inputDate form-control' }, inputProps, { placeholder: 'yyyy-mm-dd', value: overrideValue !== null && overrideValue !== void 0 ? overrideValue : '', onChange: handleInputChange, autoComplete: props.autoCompleteOn ? 'on' : `AC_${(_a = props.name) !== null && _a !== void 0 ? _a : ''}_${intelliwaketsfoundation.RandomString(5)}` })))));
}

/**
 * A react datetime picker wrapper. Can also be used as a plain text to display the date/time values.
 */
function InputDatePicker(props) {
    var _a, _b;
    const setValue = (date) => {
        var _a, _b, _c;
        if (!!props.changeValue) {
            if (!date) {
                props.changeValue(intelliwaketsfoundation.MomentTimeString((_a = props.value) !== null && _a !== void 0 ? _a : ''), props.name);
            }
            else {
                if (!Array.isArray(date)) {
                    const dateValueString = moment__default['default'](date).format(intelliwaketsfoundation.MOMENT_FORMAT_DATE);
                    const timeValueString = (_c = intelliwaketsfoundation.MomentTimeString((_b = props.value) !== null && _b !== void 0 ? _b : '')) !== null && _c !== void 0 ? _c : '';
                    props.changeValue(`${dateValueString} ${timeValueString}`.trim(), props.name);
                }
            }
        }
    };
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (React__default['default'].createElement("div", Object.assign({ className: "form-control-plaintext" }, props.plainTextProps), !!props.showTime && !!intelliwaketsfoundation.MomentTimeString(props.value)
        ? intelliwaketsfoundation.MomentDisplayDayDateTime(props.value)
        : intelliwaketsfoundation.MomentDisplayDayDate(props.value))) : (React__default['default'].createElement(ReactDatePicker__default['default'], { value: (_b = intelliwaketsfoundation.MomentDateString((_a = props.value) !== null && _a !== void 0 ? _a : '')) !== null && _b !== void 0 ? _b : '', onChange: setValue, className: "form-control inputDate", placeholderText: props.placeholder, todayButton: !props.noTodayButton ? 'Today' : undefined }))));
}

function ViewEmail(props) {
    var _a, _b;
    return React__default['default'].createElement(React__default['default'].Fragment, null, !!props.email ? React__default['default'].createElement("a", { href: 'mailto:' + props.email }, (_a = props.label) !== null && _a !== void 0 ? _a : props.email) : (_b = props.label) !== null && _b !== void 0 ? _b : null);
}

const InputGroupWrapper = (props) => {
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.prepend || !!props.append ? (React__default['default'].createElement(InputGroup, null,
        !!props.prepend && (React__default['default'].createElement(InputGroupAddon, { addonType: "prepend" },
            React__default['default'].createElement(InputGroupText, null, props.prepend))),
        props.children,
        !!props.append && (React__default['default'].createElement(InputGroupAddon, { addonType: "append" },
            React__default['default'].createElement(InputGroupText, null, props.append))))) : (React__default['default'].createElement(React__default['default'].Fragment, null, props.children))));
};

const AppendPrependWrapper = (props) => {
    if (!props.children)
        return null;
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        !!props.prepend && props.prepend,
        !!props.prepend && ' ',
        props.children,
        !!props.append && ' ',
        !!props.append && props.append));
};

const InputWrapper = (props) => {
    var _a, _b, _c, _d, _e;
    const isMounted = React.useRef(false);
    const lateTrigger = React.useRef(setTimeout(() => { }, 100));
    const lateState = React.useRef(undefined);
    const [internalState, setInternalState] = React.useState(props.children.props.value);
    const isManagingDirtyState = React.useRef(false);
    const verbose = props.consoleVerbose;
    if (props.consoleVerbose) {
        console.log('IntState', props.children.props.name, ' = ', internalState);
    }
    React.useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    });
    React.useEffect(() => {
        lateState.current = undefined;
        if (!isManagingDirtyState.current &&
            (!!props.isEqual
                ? !props.isEqual(internalState, props.children.props.value)
                : internalState !== props.children.props.value) &&
            (!props.invalid ||
                (!!props.valueOnInvalid && props.children.props.value !== props.valueOnInvalid(internalState)))) {
            if (verbose) {
                console.log('UE Val', props.children.props.value);
            }
            setInternalState(props.children.props.value);
        }
    }, [props.children.props.value]);
    // noinspection PointlessBooleanExpressionJS
    return (React__default['default'].createElement(React__default['default'].Fragment, null, props.plainText ? (!!props.plainTextURL ? (React__default['default'].createElement(reactRouterDom.Link, { to: props.plainTextURL },
        React__default['default'].createElement("div", Object.assign({ className: "form-control-plaintext " }, props.plainTextProps),
            React__default['default'].createElement(AppendPrependWrapper, { append: props.append, prepend: props.prepend }, (_a = props.plainTextControl) !== null && _a !== void 0 ? _a : props.children.props.value)))) : (React__default['default'].createElement("div", Object.assign({ className: 'form-control-plaintext' + (!!props.plainOnClick ? ' cursor-pointer' : '') }, props.plainTextProps, { onClick: () => {
            if (!!props.plainOnClick)
                props.plainOnClick();
        } }),
        React__default['default'].createElement(AppendPrependWrapper, { append: props.append, prepend: props.prepend }, (_b = props.plainTextControl) !== null && _b !== void 0 ? _b : props.children.props.value)))) : (React__default['default'].createElement(InputGroupWrapper, { append: props.append, prepend: props.prepend }, React__default['default'].cloneElement(props.children, ReduceInputProps(Object.assign(Object.assign({}, props.children.props), { className: (((_c = props.children.props.className) !== null && _c !== void 0 ? _c : '') +
            ' ' +
            ((_d = props.className) !== null && _d !== void 0 ? _d : '') +
            (props.invalid ? ' is-invalid' : '') +
            (props.invalid === false ? ' is-valid' : '') +
            (props.children.props.required ? ' is-required' : '')).trim(), onFocus: (e) => {
            if (!props.doNotSelectOnFocus && 'select' in e.target)
                e.target.select();
            if (props.children.props.onFocus)
                props.children.props.onFocus(e);
        }, onBlur: (e) => {
            clearTimeout(lateTrigger.current);
            if (!!props.changeValueLate &&
                lateState.current !== undefined &&
                lateState.current.value !== props.children.props.value) {
                props.changeValueLate(lateState.current.value, !lateState.current.name ? undefined : lateState.current.name, lateState.current.shiftKey, lateState.current.ctrlKey, lateState.current.altKey);
                lateState.current = undefined;
            }
            if (props.children.props.onBlur)
                props.children.props.onBlur(e);
        }, onChange: (e) => {
            var _a;
            clearTimeout(lateTrigger.current);
            if (!props.children.props.plainText && !props.children.props.disabled) {
                const isValid = !props.inputIsValid || props.inputIsValid(e.target.value);
                isManagingDirtyState.current = !isValid;
                let customValue = (!isValid
                    ? !!props.valueOnInvalid
                        ? props.valueOnInvalid(e.target.value)
                        : ''
                    : (!props.transformToValid ? e.target.value : props.transformToValid(e.target.value, e)));
                if (verbose) {
                    console.log('targetValue', e.target.value);
                    console.log('isValid', isValid);
                    console.log('valueOnInvalid', !!props.valueOnInvalid);
                    console.log('props.transformToValid', !!props.transformToValid);
                    console.log('customValue', customValue);
                }
                e.target.customValue = customValue;
                const newState = {
                    value: customValue,
                    name: e.target.name,
                    shiftKey: e.nativeEvent.shiftKey,
                    ctrlKey: e.nativeEvent.ctrlKey,
                    altKey: e.nativeEvent.altKey
                };
                if (!!props.children.props.onChange) {
                    props.children.props.onChange(e);
                }
                if (!!props.changeValue) {
                    props.changeValue(newState.value, !newState.name ? undefined : newState.name, newState.shiftKey, newState.ctrlKey, newState.altKey);
                }
                if (!!props.changeValueLate) {
                    if (isValid) {
                        lateState.current = newState;
                    }
                    lateTrigger.current = setTimeout(() => {
                        if (!!props.changeValueLate &&
                            isMounted.current &&
                            lateState.current !== undefined &&
                            lateState.current.value !== props.children.props.value) {
                            props.changeValueLate(lateState.current.value, !lateState.current.name ? undefined : lateState.current.name, lateState.current.shiftKey, lateState.current.ctrlKey, lateState.current.altKey);
                            lateState.current = undefined;
                        }
                    }, (_a = props.lateDelayMS) !== null && _a !== void 0 ? _a : 500);
                    if (!props.children.props.onChange && !props.changeValue && !props.changeValueLate) {
                        if (verbose) {
                            console.log('oC Val ISV?', !!props.internalStateValue, e.target.value);
                            if (!!props.internalStateValue)
                                console.log('oC Val ISV', props.internalStateValue(e.target.value, e));
                        }
                        setInternalState(!!props.internalStateValue ? props.internalStateValue(e.target.value, e) : e.target.value);
                    }
                }
                else {
                    if (verbose) {
                        console.log('Else Val ISV?', !!props.internalStateValue, e.target.value);
                        if (!!props.internalStateValue)
                            console.log('Else Val ISV', props.internalStateValue(e.target.value, e));
                    }
                    setInternalState(!!props.internalStateValue ? props.internalStateValue(e.target.value, e) : e.target.value);
                }
            }
        }, autoComplete: props.autoCompleteOn ? 'on' : `AC_${(_e = props.children.props.name) !== null && _e !== void 0 ? _e : ''}_${intelliwaketsfoundation.RandomString(5)}`, value: internalState })))))));
};

function InputEmail(props) {
    const inputProps = React.useMemo(() => {
        const subset = ReduceInputProps(intelliwaketsfoundation.OmitProperty(props, 'plainText'));
        if (subset.autoComplete === undefined) {
            subset.autoComplete = 'off';
        }
        return subset;
    }, [props]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (!!props.value && (React__default['default'].createElement("div", Object.assign({ className: "form-control-plaintext" }, props.plainTextProps),
        React__default['default'].createElement(ViewEmail, { email: props.value, label: props.plainTextLabel })))) : (React__default['default'].createElement(InputWrapper, Object.assign({}, ReduceToInputAddProps(props), { className: "inputEmail form-control" }),
        React__default['default'].createElement("input", Object.assign({ type: "email", inputMode: "email" }, inputProps))))));
}

function InputSelect(props) {
    var _a;
    const inputProps = React.useMemo(() => ReduceInputProps(intelliwaketsfoundation.OmitProperty(props, 'isNumeric', 'isNumericOrNull', 'plainOnClick', 'isStringOrNull')), [props]);
    const wrapperProps = React.useMemo(() => ReduceToInputAddProps(intelliwaketsfoundation.OmitProperty(props, 'plainTextURL', 'plainText', 'plainTextProps')), [props]);
    return (React__default['default'].createElement(InputWrapper, Object.assign({}, wrapperProps, { className: 'inputSelect form-control' + (props.plainText ? ' disabledLink' : ''), transformToValid: (val, e) => {
            if (!!props.multiple) {
                if (!!props.isNumeric) {
                    return Array.from(e.target.children)
                        .filter((child) => child.selected)
                        .map((child) => intelliwaketsfoundation.CleanNumber(child.value));
                }
                else {
                    return Array.from(e.target.children)
                        .filter((child) => child.selected)
                        .map((child) => child.value);
                }
            }
            else if (!!props.isNumeric || !!props.isNumericOrNull) {
                const value = intelliwaketsfoundation.CleanNumber(val);
                if (!!props.isNumericOrNull && value === 0) {
                    return null;
                }
                else {
                    return value;
                }
            }
            else if (!!props.isStringOrNull && !val) {
                return null;
            }
            return val;
        }, internalStateValue: (val, e) => {
            if (!!props.multiple) {
                if (!!props.isNumeric) {
                    return Array.from(e.target.children)
                        .filter((child) => child.selected)
                        .map((child) => intelliwaketsfoundation.CleanNumber(child.value));
                }
                else {
                    return Array.from(e.target.children)
                        .filter((child) => child.selected)
                        .map((child) => child.value);
                }
            }
            return val;
        } }),
        React__default['default'].createElement("select", Object.assign({}, inputProps, { value: (_a = inputProps.value) !== null && _a !== void 0 ? _a : '', style: Object.assign(Object.assign({}, props.style), { pointerEvents: !!props.plainText ? 'none' : undefined }), tabIndex: !!props.plainText ? -1 : undefined }), props.children)));
}

function InputGender(props) {
    const inputProps = React.useMemo(() => {
        var _a;
        const subset = ReduceInputProps(props);
        subset.value = (_a = subset.value) !== null && _a !== void 0 ? _a : '';
        if (subset.autoComplete === undefined) {
            subset.autoComplete = 'off';
        }
        return subset;
    }, [props]);
    return (React__default['default'].createElement(InputWrapper, Object.assign({}, ReduceToInputAddProps(props), { className: "inputGender" }),
        React__default['default'].createElement(InputSelect, Object.assign({}, inputProps, { isStringOrNull: true }),
            React__default['default'].createElement("option", null),
            React__default['default'].createElement("option", { value: "Male" }, "Male"),
            React__default['default'].createElement("option", { value: "Female" }, "Female"))));
}

function InputNumber(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const inputProps = React.useMemo(() => ReduceInputProps(intelliwaketsfoundation.OmitProperty(props, 'decimalScale', 'integerScale', 'allowNegative', 'lowerBound', 'upperBound', 'currency', 'hideZero', 'invalid', 'decimalScaleDisplay', 'name')), [props]);
    const handleKeyDown = (e) => {
        if (e.key === '-') {
            if (!(props.lowerBound !== undefined && props.lowerBound < 0)) {
                if (!props.allowNegative || (props.lowerBound !== undefined && props.lowerBound >= 0)) {
                    e.preventDefault();
                }
            }
        }
        if (e.key === '.' && props.decimalScale === 0) {
            e.preventDefault();
        }
        if (!!props.onKeyDown)
            props.onKeyDown(e);
    };
    let options = {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    };
    options.numeralDecimalScale = (_b = (_a = props.decimalScale) !== null && _a !== void 0 ? _a : options.numeralDecimalScale) !== null && _b !== void 0 ? _b : undefined;
    options.numeralIntegerScale = (_d = (_c = props.integerScale) !== null && _c !== void 0 ? _c : options.numeralIntegerScale) !== null && _d !== void 0 ? _d : undefined;
    if (!!props.currency) {
        options.prefix = '$ ';
        options.numeralDecimalScale = props.decimalScale === undefined ? 2 : (_e = props.decimalScale) !== null && _e !== void 0 ? _e : undefined;
    }
    const hasDecimals = ((_f = props.decimalScale) !== null && _f !== void 0 ? _f : 0) > 0;
    return (React__default['default'].createElement(InputWrapper, Object.assign({}, ReduceToInputAddProps(props), { inputIsValid: (val) => !isNaN(intelliwaketsfoundation.CleanNumber(val, undefined, true)), valueOnInvalid: () => 0, transformToValid: (val) => {
            const cleanNumber = intelliwaketsfoundation.CleanNumber(val);
            if (props.lowerBound !== undefined && cleanNumber < props.lowerBound)
                return props.lowerBound;
            if (props.upperBound !== undefined && cleanNumber > props.upperBound)
                return props.upperBound;
            return cleanNumber;
        }, className: ClassNames({
            'inputNumber form-control': true,
            numerics: hasDecimals,
            integers: !hasDecimals
        }), plainTextControl: !!props.currency
            ? intelliwaketsfoundation.ToCurrency(props.value, (_g = props.decimalScaleDisplay) !== null && _g !== void 0 ? _g : options.numeralDecimalScale)
            : intelliwaketsfoundation.ToDigits(props.value, (_h = props.decimalScaleDisplay) !== null && _h !== void 0 ? _h : options.numeralDecimalScale), plainTextProps: Object.assign(Object.assign({}, props.plainTextProps), { className: `form-control-plaintext text-right ${(_j = props.plainTextProps.className) !== null && _j !== void 0 ? _j : ''}`.trim() }), invalid: props.invalid, isEqual: (internal, props) => intelliwaketsfoundation.CleanNumber(internal) === intelliwaketsfoundation.CleanNumber(props) }),
        React__default['default'].createElement(Cleave__default['default'], Object.assign({ options: options, htmlRef: props.htmlRef, inputMode: hasDecimals ? 'decimal' : 'numeric', onKeyDown: handleKeyDown }, inputProps, { name: props.name }))));
}

function InputPassword(props) {
    var _a;
    return (React__default['default'].createElement(InputWrapper, Object.assign({}, ReduceToInputAddProps(props), { className: "inputPassword form-control" }),
        React__default['default'].createElement("input", Object.assign({ type: "password" }, ReduceInputProps(props), { placeholder: (_a = props.placeholder) !== null && _a !== void 0 ? _a : '******' }))));
}

function InputRadio(props) {
    var _a;
    return !!props.plainText ? (props.checked ? (props.label) : null) : (React__default['default'].createElement("label", { className: "cursor-pointer" },
        React__default['default'].createElement("input", { type: "radio", value: props.value, checked: props.checked, className: 'inputRadio ' + ((_a = props.className) !== null && _a !== void 0 ? _a : ''), name: props.name, onChange: (e) => HandleChangeValue(e, props.changeValue, props.onChange), onClick: props.onClick }),
        ' ',
        props.label));
}

/**
 * A search input with an option to have a trigger delay or not.
 */
const InputSearch = React.forwardRef((props, ref) => {
    var _a, _b, _c;
    const triggeredText = React.useRef((_a = props.initialValue) !== null && _a !== void 0 ? _a : '');
    const searchTimeout = React.useRef(setTimeout(() => { }, 100));
    const [currentText, setCurrentText] = React.useState('');
    const innerRef = React__default['default'].useRef(null);
    const combinedRef = useCombinedRefs(ref, innerRef);
    const handleInputChange = (e) => {
        var _a;
        const value = (_a = e.target.value) !== null && _a !== void 0 ? _a : '';
        setCurrentText(value);
        if (!!props.triggerDelayAmount) {
            clearTimeout(searchTimeout.current);
            searchTimeout.current = setTimeout(() => {
                triggerChange(value);
            }, props.triggerDelayAmount);
        }
        else if (!props.triggerOnEnter) {
            props.triggerSearchText(value);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            clearTimeout(searchTimeout.current);
            triggerChange(currentText, true);
        }
        if (!!props.onKeyDown) {
            props.onKeyDown(e);
        }
    };
    const handleOnBlur = () => {
        clearTimeout(searchTimeout.current);
        triggerChange();
    };
    const triggerChange = (searchText, force) => {
        const textToSearch = searchText !== null && searchText !== void 0 ? searchText : currentText;
        if (!!force || textToSearch !== triggeredText.current) {
            triggeredText.current = textToSearch;
            props.triggerSearchText(textToSearch);
        }
    };
    React.useEffect(() => {
        var _a;
        setCurrentText((_a = props.initialValue) !== null && _a !== void 0 ? _a : '');
    }, [props.initialValue]);
    const handleOnFocus = (e) => {
        if (!!props.onFocus) {
            props.onFocus(e);
        }
        if (!props.noSelectOnFocus) {
            setTimeout(() => {
                var _a;
                if (!!((_a = combinedRef === null || combinedRef === void 0 ? void 0 : combinedRef.current) === null || _a === void 0 ? void 0 : _a.select)) {
                    combinedRef.current.select();
                }
            }, 250);
        }
    };
    const inputProps = {
        type: 'search',
        inputMode: 'search',
        className: `form-control inputSearch ${(_b = props.className) !== null && _b !== void 0 ? _b : ''} ${!!props.bordered ? '' : 'bg-transparent border-0'}`,
        value: currentText,
        onChange: handleInputChange,
        onBlur: handleOnBlur,
        ref: combinedRef,
        // innerRef: props.innerRef,
        // innerRef: (ref: any) => {
        // 	if (!!props.innerRef) {
        // 		// console.log(typeof props.innerRef)
        // 		if (typeof props.innerRef === 'function') {
        // 			props.innerRef(ref)
        // 		}
        // 	}
        //
        // 	inputRef.current = ref
        // },
        style: props.style,
        placeholder: props.placeholder,
        onKeyDown: handleKeyDown,
        id: props.id,
        autoFocus: props.autoFocus,
        onFocus: handleOnFocus,
        autoComplete: props.autoCompleteOn ? 'on' : `AC_${intelliwaketsfoundation.RandomString(12)}`
    };
    return !!props.iconPrefix || !!props.reactPrefix ? (React__default['default'].createElement(InputGroup, { className: `searchGroup ${(_c = props.inputGroupClass) !== null && _c !== void 0 ? _c : ''} ${props.bordered ? '' : 'transparent'}` },
        (!!props.iconPrefix || !!props.reactPrefix) && (React__default['default'].createElement(InputGroupText, { onClick: () => {
                var _a;
                const innerRef = ref;
                if (!!((_a = innerRef === null || innerRef === void 0 ? void 0 : innerRef.current) === null || _a === void 0 ? void 0 : _a.focus))
                    innerRef.current.focus();
            } }, props.iconPrefix !== undefined ? (typeof props.iconPrefix === 'boolean' ? (React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, { icon: proRegularSvgIcons.faSearch })) : (React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, Object.assign({}, props.iconPrefix)))) : (props.reactPrefix))),
        React__default['default'].createElement("input", Object.assign({}, inputProps)))) : (React__default['default'].createElement("input", Object.assign({}, inputProps)));
});

const OptionsActive = [
    { key: true, description: 'Active' },
    { key: false, description: 'Inactive' }
];
const OptionsActiveAll = [...OptionsActive, { key: null, description: 'All' }];
/**
 * A input select that lets you update a state when selecting an option.
 */
const InputSelectStep = (props) => {
    var _a, _b, _c, _d;
    let classNames = !!props.inline
        ? 'd-inline-block outline-none '
        : 'form-control ' + (!!props.borderless ? ' bg-transparent border-0 ' : '');
    if (!props.plainText) {
        classNames += 'cursor-pointer ';
        if (!!props.inline)
            classNames += ' hoverUnderline ' + (props.color === '' ? '' : `text-${(_a = props.color) !== null && _a !== void 0 ? _a : 'primary'} `);
    }
    classNames += (_b = ' ' + props.className) !== null && _b !== void 0 ? _b : '';
    const currentOptionIDX = React.useMemo(() => props.options.findIndex((option) => option.key === props.value), [
        props.options,
        props.value
    ]);
    const click = (e) => {
        var _a;
        let newValue = (_a = props.options.find(() => true)) === null || _a === void 0 ? void 0 : _a.key;
        if (currentOptionIDX < props.options.length - 1 && currentOptionIDX >= 0) {
            newValue = props.options[currentOptionIDX + 1].key;
        }
        if (!!props.changeValue) {
            props.changeValue(newValue, props.name, e.nativeEvent.shiftKey, e.nativeEvent.ctrlKey, e.nativeEvent.altKey);
        }
    };
    return (React__default['default'].createElement("div", { className: classNames, onClick: click, onKeyPress: click, tabIndex: 0 }, (_d = (_c = props.options[currentOptionIDX]) === null || _c === void 0 ? void 0 : _c.description) !== null && _d !== void 0 ? _d : ''));
};

function InputSSN(props) {
    var _a;
    const inputProps = React.useMemo(() => {
        const subset = ReduceInputProps(intelliwaketsfoundation.OmitProperty(props, 'plainTextLast4Only'));
        if (subset.autoComplete === undefined) {
            subset.autoComplete = 'off';
        }
        return subset;
    }, [props]);
    return (React__default['default'].createElement(InputWrapper, Object.assign({}, ReduceToInputAddProps(props), { className: "inputSSN form-control", plainTextControl: !!props.plainTextLast4Only ? '...-' + ((_a = props.value) !== null && _a !== void 0 ? _a : '').toString().substr(-4) : props.value }),
        React__default['default'].createElement("input", Object.assign({ type: "text" }, inputProps, { pattern: "\\d{3}-?\\d{2}-?\\d{4}" }))));
}

function InputState(props) {
    return (React__default['default'].createElement(InputWrapper, Object.assign({}, ReduceToInputAddProps(props), { className: "inputText inputState", transformToValid: (val) => val.toUpperCase() }),
        React__default['default'].createElement("input", Object.assign({ type: "text" }, ReduceInputProps(props, 'form-control')))));
}

function InputSwitch(props) {
    var _a, _b, _c, _d, _e, _f;
    const handleInputChange = (checked, e) => {
        // if (!!props.onChange) {
        // 	props.onChange(e)
        // }
        if (!!props.changeValue) {
            props.changeValue(checked, props.name, !!e.shiftKey, !!e.ctrlKey, !!e.altKey);
        }
    };
    const height = ((_a = props.height) !== null && _a !== void 0 ? _a : props.size === 'sm') ? 12 : props.size === 'lg' ? 18 : 14;
    const width = ((_b = props.width) !== null && _b !== void 0 ? _b : props.size === 'sm') ? 22 : props.size === 'lg' ? 30 : 26;
    return (React__default['default'].createElement("label", { className: 'inputSwitch ' + (props.noFormControlPlainText ? '' : 'form-control-plaintext ') + (props.plainText ? `plainText ${(_c = props.plainTextProps) !== null && _c !== void 0 ? _c : ''} ` : '') + ((_d = props.className) !== null && _d !== void 0 ? _d : ''), hidden: props.hidden || (props.plainText && !props.checked && props.plainTextLabelOnly) },
        (!props.plainText || !props.plainTextLabelOnly) &&
            React__default['default'].createElement(Switch__default['default'], { onChange: (checked, e) => {
                    if (!props.plainText) {
                        handleInputChange(checked, e);
                    }
                }, name: props.name, className: 'react-switch ' + (props.noPadding ? '' : ' mr-2'), checked: props.checked, disabled: props.plainText, onColor: props.onColor, offColor: props.offColor, checkedIcon: (_e = props.checkedIcon) !== null && _e !== void 0 ? _e : false, uncheckedIcon: (_f = props.uncheckedIcon) !== null && _f !== void 0 ? _f : false, height: height, width: width }),
        props.label));
}

function InputTel(props) {
    const inputProps = React.useMemo(() => ReduceInputProps(intelliwaketsfoundation.OmitProperty(props, 'showFAIcon'), 'form-control'), [props]);
    const faIconToShow = React.useMemo(() => {
        if (!props.showFAIcon)
            return null;
        if (props.showFAIcon === true)
            return proRegularSvgIcons.faPhone;
        return props.showFAIcon;
    }, [props.showFAIcon]);
    return (React__default['default'].createElement(InputWrapper, Object.assign({}, ReduceToInputAddProps(props), { className: "inputTel", append: !!faIconToShow && React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, { icon: faIconToShow }), plainTextControl: intelliwaketsfoundation.FormatPhoneNumber(props.value) }),
        React__default['default'].createElement("input", Object.assign({ type: "tel", inputMode: "tel" }, inputProps))));
}

const InputText = (props) => {
    return (React__default['default'].createElement(InputWrapper, Object.assign({}, ReduceToInputAddProps(props), { className: "inputText" }),
        React__default['default'].createElement("input", Object.assign({ type: "text" }, ReduceInputProps(props, 'form-control'), { required: props.required, ref: props.innerRef }))));
};

function InputTextArea(props) {
    const inputProps = React.useMemo(() => {
        var _a;
        let subset = ReduceInputProps(intelliwaketsfoundation.OmitProperty(props, 'bordered'));
        subset.value = ((_a = props.value) !== null && _a !== void 0 ? _a : '');
        return subset;
    }, [props]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(InputWrapper, Object.assign({ doNotSelectOnFocus: true }, ReduceToInputAddProps(props), { className: "inputTextArea form-control", plainTextControl: React__default['default'].createElement("div", Object.assign({ className: 'form-control-plaintext vertical-scroll horizontal-scroll' + (!!props.bordered ? ' border' : '') }, props.plainTextProps, { dangerouslySetInnerHTML: { __html: intelliwaketsfoundation.ReplaceLinks(intelliwaketsfoundation.CleanScripts('' + props.value)) }, style: {
                    maxHeight: !!props.rows ? props.rows + 'em' : '5em',
                    overflowY: 'scroll'
                } })) }),
            React__default['default'].createElement("textarea", Object.assign({}, inputProps)))));
}

const originalValue = ' ';
function InputTime(props) {
    const lastTimeValue = React.useRef(originalValue);
    const nextTimeValue = React.useRef(originalValue);
    const [overrideValue, setOverrideValue] = React.useState(originalValue);
    const inputProps = React.useMemo(() => ReduceInputProps(intelliwaketsfoundation.OmitProperty(props, 'value', 'onChange', 'editSeconds')), [props]);
    React.useEffect(() => {
        var _a, _b, _c, _d, _e, _f;
        if (![lastTimeValue.current, nextTimeValue.current].includes((_a = intelliwaketsfoundation.MomentTimeString(props.value)) !== null && _a !== void 0 ? _a : '')) {
            lastTimeValue.current = (_c = intelliwaketsfoundation.MomentTimeString(((_b = props.value) !== null && _b !== void 0 ? _b : ''))) !== null && _c !== void 0 ? _c : '';
            nextTimeValue.current = lastTimeValue.current;
            setOverrideValue((_d = intelliwaketsfoundation.MomentFormatString(lastTimeValue.current, !!props.editSeconds ? intelliwaketsfoundation.MOMENT_FORMAT_TIME_SECONDS : intelliwaketsfoundation.MOMENT_FORMAT_TIME_NO_SECONDS)) !== null && _d !== void 0 ? _d : '');
        }
        else {
            lastTimeValue.current = (_f = intelliwaketsfoundation.MomentTimeString(((_e = props.value) !== null && _e !== void 0 ? _e : ''))) !== null && _f !== void 0 ? _f : '';
        }
    }, [props.value, props.editSeconds]);
    const handleInputChange = (e) => {
        var _a, _b;
        nextTimeValue.current = (_a = intelliwaketsfoundation.MomentTimeString(e.target.value)) !== null && _a !== void 0 ? _a : '';
        setOverrideValue(e.target.value);
        const customValue = (((_b = intelliwaketsfoundation.MomentDateString(props.value)) !== null && _b !== void 0 ? _b : '') + ' ' + nextTimeValue.current).trim();
        if (!!props.onChange) {
            e.target.customValue = customValue;
            props.onChange(e);
        }
        if (!!props.changeValue) {
            props.changeValue(customValue, e.target.name, e.nativeEvent.shiftKey, e.nativeEvent.ctrlKey, e.nativeEvent.altKey);
        }
    };
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (React__default['default'].createElement("div", Object.assign({ className: "form-control-plaintext" }, props.plainTextProps), intelliwaketsfoundation.MomentDisplayTime(props.value))) : (React__default['default'].createElement("input", Object.assign({ type: "time", className: "inputTime form-control" }, inputProps, { value: overrideValue, onChange: handleInputChange, step: !!props.editSeconds ? 1 : 60 })))));
}

function InputTimeZone(props) {
    const inputProps = React.useMemo(() => {
        var _a;
        const subset = ReduceInputProps(props);
        subset.value = (_a = subset.value) !== null && _a !== void 0 ? _a : '';
        if (subset.autoComplete === undefined) {
            subset.autoComplete = 'off';
        }
        return subset;
    }, [props]);
    const timeZonesList = React.useMemo(() => {
        let tzItems = intelliwaketsfoundation.TimeZoneOlsons();
        if (!!props.value && !tzItems.map((tzItem) => tzItem.olson).includes(props.value)) {
            tzItems.push({ zone: '', olson: props.value, hours: '' });
        }
        return tzItems;
    }, []);
    const valueTZ = React.useMemo(() => (!props.value ? '' : intelliwaketsfoundation.IANAZoneAbbr(props.value)), [props.value]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (!!props.plainTextURL ? (React__default['default'].createElement(reactRouterDom.Link, { to: props.plainTextURL },
        React__default['default'].createElement("div", Object.assign({ className: "form-control-plaintext" }, props.plainTextProps), !!props.value ? (React__default['default'].createElement(React__default['default'].Fragment, null,
            valueTZ,
            ":",
            React__default['default'].createElement("span", { className: "text-muted" },
                " ",
                props.value))) : (React__default['default'].createElement("span", { className: "text-danger" }, "No Timezone set"))))) : (React__default['default'].createElement("div", Object.assign({ className: "form-control-plaintext" }, props.plainTextProps), !!props.value ? (React__default['default'].createElement(React__default['default'].Fragment, null,
        valueTZ,
        ":",
        React__default['default'].createElement("span", { className: "text-muted" },
            " ",
            props.value))) : (React__default['default'].createElement("span", { className: "text-danger" }, "No Timezone set"))))) : (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(InputSelect, Object.assign({}, inputProps, { isStringOrNull: true, onChange: (e) => HandleChangeValue(e, props.changeValue, props.onChange) }),
            React__default['default'].createElement("option", null),
            timeZonesList.map((tzItem) => (React__default['default'].createElement("option", { key: tzItem.olson, value: tzItem.olson },
                tzItem.zone,
                ": ",
                tzItem.olson))))))));
}

function InputUrl(props) {
    const href = React.useMemo(() => {
        if (!('' + props.value).toString().toLowerCase().startsWith('http')) {
            return 'http://' + props.value;
        }
        return '' + props.value;
    }, [props.value]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(InputWrapper, Object.assign({}, ReduceToInputAddProps(props), { className: "inputUrl form-control", plainTextControl: React__default['default'].createElement("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "d-block w-100" },
                React__default['default'].createElement(EllipsesTruncate, { text: props.value })) }),
            React__default['default'].createElement("input", Object.assign({ type: "url", pattern: "https://.*", inputMode: "url", className: "inputText" }, ReduceInputProps(props))))));
}

function InputZip(props) {
    var _a;
    const inputProps = React.useMemo(() => ReduceInputProps(intelliwaketsfoundation.OmitProperty(props, 'withNine')), [props]);
    return (React__default['default'].createElement(InputWrapper, Object.assign({}, ReduceToInputAddProps(props), { className: "inputZip form-control", plainTextControl: intelliwaketsfoundation.FormatZip(((_a = props.value) !== null && _a !== void 0 ? _a : '').toString()) }),
        React__default['default'].createElement("input", Object.assign({ type: "text" }, inputProps))));
}

/**
 * The IWServerData control is a React control that calls API's to a server and manages the state of the data in its control.
 *
 * The below example assumes that a higher-order-component called ServerData has been created.
 *
 * @example
 * const [serverDataUpdateProps, setServerDataUpdateProps] = useState<TServerDataUpdatedState>(null)
 *
 * setServerDataUpdateProps({
 *   item: 'Employee',
 *   updateVerb: 'Update',
 *   updateRequest: {
 *     id: 1,
 *     name: 'Bob Smith'
 *   },
 *   updatedAction: (response) => {
 *   		console.log(response)
 *   }
 * } as TServerDataUpdatedStateLocal<API_Employee_Update_Request, API_Employee_Update_Response>)
 *
 * <ServerData {...serverDataUpdateProps} setUpdateResponse={setServerDataUpdateProps} />
 *
 * @example
 * const apiEmployeeGetRequest: API_Employee_Get_Request = useMemo(() => {
 * 	return {id: props.id}
 * }, [props.id])
 *
 * const [apiEmployeeGetResponse, setAPIEmployeeGetResponse] = useState(undefined as TServerData<API_Employee_Get_Response>)
 *
 * <ServerData<API_Employee_Get_Request, API_Employee_Get_Response>
 *   item="Employee"
 *   verb="Get"
 *   request={apiEmployeeGetRequest}
 *   response={apiEmployeeGetResponse}
 *   setResponse={setAPIEmployeeGetResponse}>
 *   	{!!apiEmployeeGetResponse && (
 *   		<span>Employee: {apiEmployeeGetResponse.name}</span>
 *   	)}
 * </ServerData>
 *
 */
const IWServerData = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const isMounted = React.useRef(true);
    const delayTimeout = React.useRef(setTimeout(() => { }, 100));
    const forceRefreshRef = React.useRef(props.forceRefresh);
    const lastRequest = React.useRef(props.request);
    // const cancelTokenSource = useRef(null as CancelTokenSource | null)
    const inProgress = React.useRef(false);
    const lastTS = React.useRef(0);
    const attemptingGet = React.useRef(false);
    const attemptingUpdate = React.useRef(false);
    const [showInProgressControl, setShowInProgressControl] = React.useState(false);
    const setResponse = React.useCallback((_a = props.setResponse) !== null && _a !== void 0 ? _a : (() => { }), [props.setResponse]);
    const setUpdateResponse = React.useCallback((_b = props.setUpdateResponse) !== null && _b !== void 0 ? _b : (() => { }), [props.setUpdateResponse]);
    const startingAction = React.useCallback((_c = props.startingAction) !== null && _c !== void 0 ? _c : (() => { }), [props.startingAction]);
    const axiosResponseAction = React.useCallback((_d = props.axiosResponseAction) !== null && _d !== void 0 ? _d : (() => { }), [props.axiosResponseAction]);
    const handleServerData = React.useCallback((_e = props.handleServerData) !== null && _e !== void 0 ? _e : (() => { }), [props.handleServerData]);
    const updatedAction = React.useCallback((_f = props.updatedAction) !== null && _f !== void 0 ? _f : (() => { }), [props.updatedAction]);
    const catchAction = React.useCallback((_g = props.catchAction) !== null && _g !== void 0 ? _g : (() => { }), [props.catchAction]);
    const finallyAction = React.useCallback((_h = props.finallyAction) !== null && _h !== void 0 ? _h : (() => { }), [props.finallyAction]);
    const showUserMessage = React.useCallback((_j = props.showUserMessage) !== null && _j !== void 0 ? _j : (() => { }), [props.showUserMessage]);
    const failedAction = React.useCallback((_k = props.failedAction) !== null && _k !== void 0 ? _k : (() => { }), [props.failedAction]);
    const isGet = React.useMemo(() => !props.noExecution &&
        !!props.item &&
        !!props.verb &&
        props.request !== null &&
        !!setResponse &&
        (props.response === undefined ||
            forceRefreshRef.current !== props.forceRefresh ||
            attemptingGet.current ||
            (!props.noRefreshOnRequestChange && !intelliwaketsfoundation.DeepEqual(props.request, lastRequest.current))), [
        props.noExecution,
        props.item,
        props.verb,
        setResponse,
        props.response,
        props.request,
        props.forceRefresh,
        attemptingGet.current
    ]);
    const isUpdate = React.useMemo(() => !props.noExecution && !!props.updateVerb && !!props.updateRequest && !!setUpdateResponse, [props.noExecution, props.updateVerb, props.updateRequest, setUpdateResponse, attemptingUpdate.current]);
    if (props.verboseConsole && (props.superVerboseConsole || ((isGet || isUpdate) && !inProgress.current)))
        console.log('IWServerData-Local', props.item, props.verb, props.updateVerb, 'isGet', isGet, attemptingGet.current, 'isUpdate', isUpdate, attemptingUpdate.current, 'inProgress', inProgress.current, 'refresh', props.forceRefresh, forceRefreshRef.current, 'starting', (isGet || isUpdate) && !inProgress.current);
    React.useEffect(() => {
        var _a;
        clearTimeout(delayTimeout.current);
        isMounted.current = true;
        if (!inProgress.current && (isGet || isUpdate)) {
            attemptingGet.current = isGet;
            attemptingUpdate.current = isUpdate;
            delayTimeout.current = setTimeout(() => {
                var _a, _b, _c;
                if (isMounted.current) {
                    inProgress.current = true;
                    attemptingGet.current = false;
                    attemptingUpdate.current = false;
                    const currentTS = moment__default['default']().valueOf();
                    if (lastTS.current > currentTS - 1000) {
                        console.log('!WARNING!', props.item, props.verb, 'processed less than a second ago!');
                        if (props.response === undefined)
                            console.log('Get re-run due to undefined response');
                        if (forceRefreshRef.current !== props.forceRefresh)
                            console.log('Get re-run due to forceRefresh flag');
                        if (!props.noRefreshOnRequestChange && !intelliwaketsfoundation.DeepEqual(props.request, lastRequest.current))
                            console.log('Get re-run due to request change');
                        if (isUpdate)
                            console.log('Update re-run');
                    }
                    if (isGet) {
                        lastRequest.current = props.request;
                    }
                    lastTS.current = currentTS;
                    forceRefreshRef.current = props.forceRefresh;
                    // cancelTokenSource.current = axios.CancelToken.source()
                    setShowInProgressControl(true);
                    const authorizationHeader = Object.assign({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null, localtime: moment__default['default']().format(intelliwaketsfoundation.MOMENT_FORMAT_DATE_TIME), locationhref: window.location.href }, props.authorizationHeader);
                    if (!!props.superVerboseConsole)
                        console.log('aH', authorizationHeader);
                    let headers = {
                        Authorization: JSON.stringify(authorizationHeader)
                    };
                    let config = {
                        headers: headers
                    };
                    // if (!!cancelTokenSource.current) {
                    // 	config.cancelToken = cancelTokenSource.current.token
                    // }
                    !!startingAction && startingAction();
                    const verb = isUpdate ? props.updateVerb : props.verb;
                    const request = isUpdate ? props.updateRequest : (_a = props.request) !== null && _a !== void 0 ? _a : {};
                    // if (!props.noCredentials) axios.defaults.withCredentials = true
                    if (!props.noCredentials)
                        config.withCredentials = true;
                    // if (!props.noCrossDomain) {
                    // 	config.baseURL = `${window.location.origin ?? ''}`
                    // }
                    if (!!props.verboseConsole) {
                        console.log(`API Request for ${(_b = props.urlPrefix) !== null && _b !== void 0 ? _b : ''}/${props.item}/${verb}`, request, config);
                    }
                    axios__default['default']
                        .post(`${(_c = props.urlPrefix) !== null && _c !== void 0 ? _c : ''}/${props.item}/${verb}`, request, config)
                        .then((response) => {
                        var _a, _b, _c, _d;
                        if (isMounted.current) {
                            if (!!props.verboseConsole)
                                console.log(`API Response for ${(_a = props.urlPrefix) !== null && _a !== void 0 ? _a : ''}/${props.item}/${verb}`, response);
                            if (!!props.superVerboseConsole)
                                console.log('headers', response.headers);
                            !!axiosResponseAction && axiosResponseAction(response);
                            if (!!handleServerData && !!response.headers.serverdata) {
                                if (!handleServerData(intelliwaketsfoundation.JSONParse((_b = response.headers.serverdata) !== null && _b !== void 0 ? _b : '{}'))) {
                                    if (isUpdate) {
                                        !!setUpdateResponse && setUpdateResponse(null);
                                    }
                                    else {
                                        !!setResponse && setResponse(null);
                                    }
                                    return;
                                }
                            }
                            const serverStatus = intelliwaketsfoundation.JSONParse((_c = response.headers.serverstatus) !== null && _c !== void 0 ? _c : '{}');
                            const resultsData = ((_d = response.data) !== null && _d !== void 0 ? _d : {});
                            if (isMounted.current) {
                                if (!!serverStatus) {
                                    if (intelliwaketsfoundation.IsStageDevFocused() && serverStatus.dev_message) {
                                        console.log(serverStatus.dev_message);
                                    }
                                    if (serverStatus.success) {
                                        if (isUpdate) {
                                            !!setUpdateResponse && setUpdateResponse(null);
                                            !!props.updateMessage && !!showUserMessage && showUserMessage(props.updateMessage);
                                            !!updatedAction && updatedAction(resultsData);
                                        }
                                        else {
                                            !!props.responseMessage && !!showUserMessage && showUserMessage(props.responseMessage);
                                            !!setResponse && setResponse(resultsData);
                                        }
                                        !!serverStatus.message && !!showUserMessage && showUserMessage(serverStatus.message);
                                    }
                                    else {
                                        !!failedAction && failedAction(serverStatus);
                                        if (isUpdate) {
                                            !!setUpdateResponse && setUpdateResponse(null);
                                        }
                                        else {
                                            !!setResponse && setResponse(null);
                                        }
                                    }
                                }
                                else {
                                    if (intelliwaketsfoundation.IsStageDevFocused()) {
                                        console.warn(props.item, verb, 'API: Response Empty', response);
                                    }
                                    !!showUserMessage && showUserMessage('Could not connect to server', true);
                                    if (isUpdate) {
                                        !!setUpdateResponse && setUpdateResponse(null);
                                    }
                                    else {
                                        !!setResponse && setResponse(null);
                                    }
                                }
                            }
                        }
                    })
                        .catch((error) => {
                        var _a;
                        if (isMounted.current) {
                            if (intelliwaketsfoundation.IsStageDevFocused()) {
                                console.warn(`API Error for ${(_a = props.urlPrefix) !== null && _a !== void 0 ? _a : ''}/${props.item}/${verb}`, error);
                            }
                            // axios.isCancel(error)
                            !!showUserMessage && showUserMessage('Could not connect to server', true);
                            if (isUpdate) {
                                !!setUpdateResponse && setUpdateResponse(null);
                            }
                            else {
                                !!setResponse && setResponse(null);
                            }
                            !!catchAction && catchAction(error);
                        }
                    })
                        .finally(() => {
                        // if (isMounted.current) {
                        // cancelTokenSource.current = null
                        // }
                        !!finallyAction && finallyAction();
                        inProgress.current = false;
                        if (isMounted.current) {
                            setShowInProgressControl(false);
                        }
                    });
                }
            }, (_a = props.delayMS) !== null && _a !== void 0 ? _a : 50);
        }
        return () => {
            isMounted.current = false;
            // if (cancelTokenSource.current) {
            // 	cancelTokenSource.current.cancel()
            // 	cancelTokenSource.current = null
            // }
        };
    }, [
        props.item,
        props.verb,
        props.request,
        props.response,
        props.responseMessage,
        props.forceRefresh,
        props.updateVerb,
        props.updateRequest,
        props.updateMessage,
        setResponse,
        setUpdateResponse,
        startingAction,
        axiosResponseAction,
        handleServerData,
        catchAction,
        updatedAction,
        finallyAction,
        failedAction,
        showUserMessage,
        props.authorizationHeader,
        props.urlPrefix,
        isGet,
        isUpdate,
        props.verboseConsole,
        props.superVerboseConsole,
        props.noCredentials
    ]);
    return props.children === undefined ? null : (React__default['default'].createElement(React__default['default'].Fragment, null,
        props.children,
        showInProgressControl &&
            !props.noActivityOverlay &&
            !props.globalActivityOverlay &&
            props.loadingReactNodes !== null &&
            ((_l = props.loadingReactNodes) !== null && _l !== void 0 ? _l : React__default['default'].createElement(ActivityOverlayControl, { show: true }))));
};

function StyleControl(props) {
    return !props.css ? React__default['default'].createElement(React__default['default'].Fragment, null) : React__default['default'].createElement("style", { dangerouslySetInnerHTML: { __html: props.css } });
}

const initialMenuBackItem = {
    menuBackActive: false,
    menuBackButtonTitle: '',
    menuBackButtonURL: '',
    menuPageTitle: '',
    menuDisplaySize: undefined
};
const initialMDContext = {
    breakAt: 'lg',
    mdPath: '',
    baseFullPath: '',
    isOpen: false,
    setMenuBackItemState: () => { }
};
const MDContext = React__default['default'].createContext(initialMDContext);
const MasterDetail = (props) => {
    var _a, _b, _c;
    const mdContextParent_RAW = React.useContext(MDContext);
    const mdContextParent = mdContextParent_RAW.baseFullPath ? mdContextParent_RAW : undefined;
    // const basePath = mdContextParent_RAW.baseFullPath ?
    //     mdContextParent_RAW.baseFullPath + props.mdPath
    //     :
    //     window.location.pathname.substr(0, window.location.pathname.indexOf(props.mdPath)) + props.mdPath;
    const basePath = (_a = GetPathThrough(props.mdPath)) !== null && _a !== void 0 ? _a : window.location.pathname + '/' + props.mdPath;
    const isOpen = window.location.pathname.length > basePath.length && GetPathComponentAfter(basePath) !== '~';
    const mdContext = {
        breakAt: props.breakAt,
        mdPath: props.mdPath,
        baseFullPath: basePath,
        backText: (_b = props.backText) !== null && _b !== void 0 ? _b : 'Back',
        isOpen: isOpen,
        parentMDContext: mdContextParent,
        setMenuBackItemState: props.setMenuBackItemState
    };
    const previousDashboardLastURL = window.sessionStorage.getItem(basePath + '-LastURL');
    if (props.rememberLast &&
        !GetPathComponentAfter(basePath) &&
        previousDashboardLastURL &&
        previousDashboardLastURL !== window.location.pathname) {
        return React__default['default'].createElement(reactRouterDom.Redirect, { to: previousDashboardLastURL });
    }
    else {
        if (props.rememberLast) {
            window.sessionStorage.setItem(basePath + '-LastURL', window.location.pathname);
        }
        return (React__default['default'].createElement(MDContext.Provider, { value: mdContext },
            React__default['default'].createElement("div", { className: ((_c = props.className) !== null && _c !== void 0 ? _c : '') + ' masterDetail masterDetail-' + props.breakAt }, props.children)));
    }
};
const MDMaster = (props) => {
    const mdContext = React.useContext(MDContext);
    const id = React.useMemo(() => `mdm-id-${intelliwaketsfoundation.RandomString(5)}`.toLowerCase(), []);
    let css = null;
    if (props.width) {
        css = `@media (min-width: ${SizeAtMin(mdContext.breakAt)}px) { #${id} {width: ${props.width}; min-width: ${props.width};}}`;
    }
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(StyleControl, { css: css }),
        React__default['default'].createElement("div", { className: (!!props.includePrint ? '' : 'd-print-none ') +
                props.className +
                ' masterDetailMaster' +
                (mdContext.isOpen ? ' isOpen' : ''), id: id }, props.children)));
};
const panelClean = (panel) => intelliwaketsfoundation.ReplaceAll('/', '', (panel !== null && panel !== void 0 ? panel : '').replace(/\s+/g, ''));
const MDLink = (props) => {
    var _a, _b, _c, _d;
    const history = reactRouterDom.useHistory();
    const mdContext = React.useContext(MDContext);
    const selectedRow = React.useRef(null);
    const panelURLAddOn = mdContext.baseFullPath +
        (props.panel ? '/' + panelClean(props.panel) : '') +
        (props.id ? '/' + props.id : '') +
        (!!props.postPath ? '/' + props.postPath : '');
    const linkActive = (!props.blockActivate &&
        props.panel &&
        (window.location.pathname.startsWith(panelURLAddOn + '/') || window.location.pathname === panelURLAddOn)) ||
        (!props.panel && window.location.pathname === panelURLAddOn);
    let displayProps = Object.assign({}, props);
    let classNames = ['cursor-pointer'];
    if (displayProps.className)
        classNames.push(displayProps.className);
    if (linkActive)
        classNames.push('active');
    if (linkActive && props.activeClassName)
        classNames.push(props.activeClassName);
    // if (!!props.badge || props.badge === null) classNames.push('d-flex justify-content-between align-items-center')
    displayProps.className = classNames.join(' ');
    delete displayProps.postPath;
    delete displayProps.id;
    delete displayProps.blockActivate;
    delete displayProps.badge;
    delete displayProps.badgeColor;
    delete displayProps.badgeClass;
    delete displayProps.color;
    const selectItem = () => {
        if (!props.blockActivate) {
            window.sessionStorage.removeItem(mdContext.baseFullPath + '-LastURL');
            history.push(linkActive ? mdContext.baseFullPath : panelURLAddOn);
        }
    };
    React.useEffect(() => {
        var _a;
        if (!!selectedRow.current) {
            (_a = selectedRow.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ block: 'nearest' });
            selectedRow.current = null;
        }
    }, [props.children]);
    switch (props.tag) {
        case 'li':
            return (React__default['default'].createElement("li", Object.assign({}, displayProps, { onClick: () => {
                    if (!!props.onClick) {
                        if (props.onClick() === true)
                            selectItem();
                    }
                    else {
                        selectItem();
                    }
                }, onDoubleClick: props.onDoubleClick, style: props.style, title: props.title, ref: !props.noAutoScroll && linkActive ? selectedRow : null }),
                props.children,
                React__default['default'].createElement(BadgeItem, { badge: props.badge, color: props.badgeColor, className: 'float-right ' + ((_a = props.badgeClass) !== null && _a !== void 0 ? _a : ''), style: { marginTop: '0.2rem' } })));
        case 'tr':
            return (React__default['default'].createElement("tr", Object.assign({}, displayProps, { onClick: (_b = props.onClick) !== null && _b !== void 0 ? _b : selectItem, onDoubleClick: props.onDoubleClick, style: props.style, title: props.title, ref: !props.noAutoScroll && linkActive ? selectedRow : null }), props.children));
        case 'div':
            return (React__default['default'].createElement("div", Object.assign({}, displayProps, { onClick: (_c = props.onClick) !== null && _c !== void 0 ? _c : selectItem, onDoubleClick: props.onDoubleClick, style: props.style, title: props.title, ref: !props.noAutoScroll && linkActive ? selectedRow : null }), props.children));
        default:
            return (React__default['default'].createElement("span", Object.assign({}, displayProps, { onClick: (_d = props.onClick) !== null && _d !== void 0 ? _d : selectItem, onDoubleClick: props.onDoubleClick, style: props.style, title: props.title, ref: !props.noAutoScroll && linkActive ? selectedRow : null }), props.children));
    }
};
const MDDetail = (props) => {
    var _a;
    // const dispatch = useDispatch();
    const mdContext = React.useContext(MDContext);
    const checkPath = mdContext.baseFullPath + '/' + panelClean(props.panel);
    const activated = (props.panel &&
        !props.hidden &&
        (window.location.pathname.startsWith(checkPath + '/') || window.location.pathname === checkPath)) ||
        (!props.panel && window.location.pathname === mdContext.baseFullPath);
    React.useEffect(() => {
        if (activated) {
            if (props.panel) {
                if (!props.titleText) {
                    console.log('titleText not set on MDDetail!');
                }
                mdContext.setMenuBackItemState((prevState) => {
                    var _a, _b;
                    const location = window.location.pathname;
                    const newMenuBackItem = {
                        menuBackActive: activated,
                        menuBackButtonTitle: (_b = (_a = props.backText) !== null && _a !== void 0 ? _a : mdContext.backText) !== null && _b !== void 0 ? _b : 'Back',
                        menuBackButtonURL: mdContext.baseFullPath,
                        menuPageTitle: props.titleText,
                        menuDisplaySize: mdContext.breakAt
                    };
                    return [...prevState, newMenuBackItem].filter((item) => {
                        return item.menuBackButtonURL.length < location.length;
                    });
                });
                // AddMenuBackItem(menuBackItem)(dispatch)
            }
        }
        return () => {
            mdContext.setMenuBackItemState((prevState) => {
                const location = window.location.pathname;
                return [...prevState].filter((item) => {
                    return item.menuBackButtonURL.length < location.length;
                });
            });
            // CleanMenuBackItem()(dispatch)
        };
    }, [
        /*dispatch, */ activated,
        props.titleText,
        props.panel,
        props.backText,
        mdContext.backText,
        mdContext.baseFullPath,
        mdContext.breakAt
    ]);
    if (activated) {
        return (React__default['default'].createElement("div", { className: ((_a = props.className) !== null && _a !== void 0 ? _a : '') +
                ' masterDetailDetail' +
                (window.location.pathname === mdContext.baseFullPath ? ' hideWhenSmall' : ''), hidden: props.hidden }, props.children));
    }
    else {
        return null;
    }
};

const MasterDetailListGroup = (props) => {
    var _a;
    const listGroupItems = React.useMemo(() => props.listGroupItems
        .filter((listGroupItem) => !listGroupItem.hidden)
        .map((listGroupItem, idx) => {
        var _a, _b, _c, _d, _e, _f, _g;
        return (Object.assign(Object.assign({}, listGroupItem), { key: ((_b = (_a = listGroupItem.panelTitle) !== null && _a !== void 0 ? _a : listGroupItem.linkNode) !== null && _b !== void 0 ? _b : idx).toString() + ((_c = listGroupItem.id) !== null && _c !== void 0 ? _c : '') + idx, panelURLCalc: (_d = listGroupItem.panelURL) !== null && _d !== void 0 ? _d : intelliwaketsfoundation.ToPascalCase((_e = listGroupItem.panelTitle) !== null && _e !== void 0 ? _e : ((_f = listGroupItem.linkNode) !== null && _f !== void 0 ? _f : idx).toString()), collapsed: !!listGroupItem.section && ((_g = props.collapsedSections) !== null && _g !== void 0 ? _g : []).includes(listGroupItem.section) }));
    }), [props.listGroupItems, props.collapsedSections]);
    let prevListGroupItem = null;
    return (React__default['default'].createElement(MasterDetail, { setMenuBackItemState: props.setMenuBackItemState, mdPath: props.mdPath, breakAt: props.breakAt, backText: props.backText, rememberLast: props.rememberLast, className: props.className },
        React__default['default'].createElement(MDMaster, { width: props.mdMasterWidth, className: props.mdMasterClassName },
            props.mdMasterTopNode,
            React__default['default'].createElement(ListGroup, { flush: true, className: `fill-height-scroll ${props.noTextLargeSmaller ? '' : `text-large-${props.breakAt}-smaller`}` },
                listGroupItems.map((listGroupItem, idx) => {
                    var _a, _b, _c, _d;
                    let prefix = null;
                    if (!!listGroupItem.section) {
                        if (!prevListGroupItem || prevListGroupItem.section !== listGroupItem.section) {
                            switch (props.sectionBreak) {
                                case 'HR':
                                    prefix = idx > 0 ? React__default['default'].createElement("hr", null) : null;
                                    break;
                                case 'Gap':
                                    prefix = idx > 0 ? '' : null;
                                    break;
                                default:
                                    prefix = (React__default['default'].createElement(ListGroupItemHeading, { onClick: () => {
                                            if (!!props.setCollapsedSections && !!listGroupItem.section) {
                                                props.setCollapsedSections((prevState) => {
                                                    if (!listGroupItem.section)
                                                        return prevState;
                                                    if (prevState.includes(listGroupItem.section)) {
                                                        return prevState.filter((pS) => pS !== listGroupItem.section);
                                                    }
                                                    return [...prevState, listGroupItem.section];
                                                });
                                            }
                                        }, className: ClassNames({
                                            'cursor-pointer': !!props.setCollapsedSections && !!listGroupItem.section
                                        }) }, (_a = listGroupItem.sectionNode) !== null && _a !== void 0 ? _a : listGroupItem.section));
                                    break;
                            }
                        }
                    }
                    else if (!!listGroupItem.sectionNode) {
                        console.warn(`MasterDetail ${props.mdPath} Item ${listGroupItem.panelTitle}:${(_b = listGroupItem.id) !== null && _b !== void 0 ? _b : ''} has a sectionNode, but no section`);
                    }
                    prevListGroupItem = listGroupItem;
                    return (React__default['default'].createElement(React__default['default'].Fragment, { key: listGroupItem.key },
                        prefix,
                        React__default['default'].createElement(MDLink, { hidden: listGroupItem.collapsed, tag: "li", id: listGroupItem.id, panel: listGroupItem.panelURLCalc, onClick: (_c = listGroupItem.linkClick) !== null && _c !== void 0 ? _c : undefined, className: ClassNames({
                                'list-group-item': true,
                                'list-group-item-action': !!listGroupItem.mdDetail || !!listGroupItem.linkClick,
                                'mt-4': prefix === ''
                            }) +
                                ' ' +
                                ((_d = listGroupItem.className) !== null && _d !== void 0 ? _d : '') },
                            !!listGroupItem.faProps && React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, Object.assign({ fixedWidth: true }, listGroupItem.faProps)),
                            listGroupItem.linkNode,
                            React__default['default'].createElement(BadgeItem, { badge: listGroupItem.badge, color: listGroupItem.badgeColor }),
                            listGroupItem.counter !== undefined && (React__default['default'].createElement(Badge, { color: listGroupItem.counterColor, className: "float-right small text-white border-round ml-2" }, listGroupItem.counter !== null ? intelliwaketsfoundation.ToDigits(listGroupItem.counter, 0) : React__default['default'].createElement(Spinner, { size: "xs" }))))));
                }),
                props.mdMasterBottomNode),
            props.mdMasterBottomOutsideNode),
        listGroupItems.map((listGroupItem) => {
            var _a;
            return !listGroupItem.collapsed &&
                !!listGroupItem.mdDetail && (React__default['default'].createElement(MDDetail, { key: listGroupItem.key, panel: listGroupItem.panelURLCalc, titleText: (_a = listGroupItem.panelTitle) !== null && _a !== void 0 ? _a : listGroupItem.linkNode }, listGroupItem.mdDetail));
        }),
        ((_a = props.mdDetails) !== null && _a !== void 0 ? _a : []).map((mdDetail, idx) => {
            var _a, _b;
            return (React__default['default'].createElement(MDDetail, { key: ((_a = mdDetail.panelURL) !== null && _a !== void 0 ? _a : mdDetail.panelTitle).toString() + idx, panel: (_b = mdDetail.panelURL) !== null && _b !== void 0 ? _b : intelliwaketsfoundation.ToPascalCase(mdDetail.panelTitle), titleText: mdDetail.panelTitle }, mdDetail.mdDetail));
        })));
};

const initialMessageBoxState = {
    message: null
};
/**
 * An alert box that appears when a message is passed as a prop,and dismisses after three seconds.
 */
const MessageBox = (props) => {
    var _a, _b;
    // noinspection SuspiciousTypeOfGuard
    const propsMessageBoxState = (typeof props.messageBoxState === 'string' || props.messageBoxState instanceof String) ? Object.assign(Object.assign({}, initialMessageBoxState), { message: props.messageBoxState }) : props.messageBoxState;
    const dismissTimeout = React.useRef(setTimeout(() => {
    }, 1));
    const messageBoxHTML = intelliwaketsfoundation.TextToHTML((_a = propsMessageBoxState.messageBody) !== null && _a !== void 0 ? _a : '');
    const dismissMessageBox = React.useCallback(props.dismissMessageBox, [props.dismissMessageBox]);
    React.useEffect(() => {
        clearTimeout(dismissTimeout.current);
        if (!!propsMessageBoxState.message && !propsMessageBoxState.noDismiss) {
            dismissTimeout.current = setTimeout(dismissMessageBox, 3000);
        }
    }, [propsMessageBoxState.message, propsMessageBoxState.noDismiss, dismissMessageBox]);
    return (React__default['default'].createElement(Alert, { className: 'System_MessageBox', color: (_b = propsMessageBoxState.color) !== null && _b !== void 0 ? _b : 'primary', isOpen: !!propsMessageBoxState.message, toggle: props.dismissMessageBox },
        propsMessageBoxState.message,
        !!propsMessageBoxState.messageBody ?
            React__default['default'].createElement("small", null,
                React__default['default'].createElement("hr", null),
                React__default['default'].createElement("span", { dangerouslySetInnerHTML: { __html: messageBoxHTML } }))
            : null));
};

function NumberFormat(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    return (React__default['default'].createElement("span", { className: ((_a = props.className) !== null && _a !== void 0 ? _a : '') + ' ' + (((_b = props.value) !== null && _b !== void 0 ? _b : 0) < 0 ? (_c = props.classNameAddOnNegative) !== null && _c !== void 0 ? _c : 'text-danger' : '') }, props.percent
        ? props.blank
            ? intelliwaketsfoundation.ToPercentBlank((_d = props.value) !== null && _d !== void 0 ? _d : 0, (_e = props.decimals) !== null && _e !== void 0 ? _e : 0)
            : props.dash
                ? intelliwaketsfoundation.ToPercentDash((_f = props.value) !== null && _f !== void 0 ? _f : 0, (_g = props.decimals) !== null && _g !== void 0 ? _g : 0)
                : intelliwaketsfoundation.ToPercent((_h = props.value) !== null && _h !== void 0 ? _h : 0, (_j = props.decimals) !== null && _j !== void 0 ? _j : 0)
        : props.currency
            ? props.blank
                ? intelliwaketsfoundation.ToCurrencyBlank((_k = props.value) !== null && _k !== void 0 ? _k : 0, (_l = props.decimals) !== null && _l !== void 0 ? _l : 2)
                : props.dash
                    ? intelliwaketsfoundation.ToCurrencyDash((_m = props.value) !== null && _m !== void 0 ? _m : 0, (_o = props.decimals) !== null && _o !== void 0 ? _o : 2)
                    : intelliwaketsfoundation.ToCurrency((_p = props.value) !== null && _p !== void 0 ? _p : 0, (_q = props.decimals) !== null && _q !== void 0 ? _q : 2)
            : props.blank
                ? intelliwaketsfoundation.ToDigitsBlank((_r = props.value) !== null && _r !== void 0 ? _r : 0, (_s = props.decimals) !== null && _s !== void 0 ? _s : 0)
                : props.dash
                    ? intelliwaketsfoundation.ToDigitsDash((_t = props.value) !== null && _t !== void 0 ? _t : 0, (_u = props.decimals) !== null && _u !== void 0 ? _u : 0)
                    : intelliwaketsfoundation.ToDigits((_v = props.value) !== null && _v !== void 0 ? _v : 0, (_w = props.decimals) !== null && _w !== void 0 ? _w : 0)));
}

const SelectDD = (props) => {
    var _a, _b, _c, _d;
    const [selectedItem, setSelectedItem] = React.useState((_a = props.items.find((item) => props.selectedID === undefined || item.id === props.selectedID)) !== null && _a !== void 0 ? _a : undefined);
    const handleSelect = (item) => {
        var _a, _b;
        setSelectedItem(item);
        if (!!props.handleSelectItem) {
            props.handleSelectItem(item);
        }
        if (!!props.handleSelectData) {
            props.handleSelectData((_a = item === null || item === void 0 ? void 0 : item.data) !== null && _a !== void 0 ? _a : null);
        }
        if (!!props.handleSelectID) {
            props.handleSelectID((_b = item === null || item === void 0 ? void 0 : item.id) !== null && _b !== void 0 ? _b : null);
        }
    };
    React.useEffect(() => {
        var _a;
        setSelectedItem((_a = props.items.find((item) => props.selectedID === undefined || item.id === props.selectedID)) !== null && _a !== void 0 ? _a : undefined);
    }, [props.selectedID, props.items]);
    return (React__default['default'].createElement(Dropdown, { size: props.size, className: ((_b = props.className) !== null && _b !== void 0 ? _b : '') + (!!props.likeSelect ? ' input-dd' : '') + (!!props.inline ? ' d-inline-block' : ''), color: (_c = props.color) !== null && _c !== void 0 ? _c : (!!props.inline ? 'primary-outline' : 'primary'), noCaret: !props.caret, buttonClassName: (!!props.classNameBtn ? props.classNameBtn : '') + ' ' + (!!props.inline ? ' btn-link-inline' : ''), buttonFAProps: props.faIcon, buttonLabel: (_d = (selectedItem !== null && selectedItem !== void 0 ? selectedItem : {}).name) !== null && _d !== void 0 ? _d : 'No Selection' }, (props !== null && props !== void 0 ? props : {}).items.map((item) => {
        var _a, _b;
        return (React__default['default'].createElement(DropdownItem, { key: ((_a = item.id) !== null && _a !== void 0 ? _a : -1).toString(), onClick: () => handleSelect(item) },
            item.faIcon && (React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, { icon: item.faIcon, fixedWidth: true, className: ClassNames({ [(_b = 'text-' + item.faIconColor) !== null && _b !== void 0 ? _b : '']: !!item.faIconColor }) })),
            item.name));
    })));
};

const initialTextStatusState = {
    message: null
};
const TextStatus = (props) => {
    const dismissTimeout = React.useRef(setTimeout(() => { }, 1));
    const dismissTextStatus = React.useCallback(props.clearTextStatus, [props.clearTextStatus]);
    const textStatus = React.useMemo(() => {
        if (props.textStatus === null)
            return Object.assign({}, initialTextStatusState);
        if (typeof props.textStatus === 'string') {
            return Object.assign(Object.assign({}, initialTextStatusState), { message: props.textStatus });
        }
        return props.textStatus;
    }, [props.textStatus]);
    React.useEffect(() => {
        clearTimeout(dismissTimeout.current);
        if (!!textStatus.message && !textStatus.noDismiss) {
            dismissTimeout.current = setTimeout(dismissTextStatus, 1500);
        }
    }, [textStatus.message, textStatus.noDismiss, dismissTextStatus]);
    return !!textStatus.message ?
        React__default['default'].createElement("span", { className: (!!textStatus.className ? textStatus.className : '') + (!!textStatus.color ? ` text-${textStatus.color}` : '') }, textStatus.message)
        : !!props.children ?
            React__default['default'].createElement(React__default['default'].Fragment, null, props.children)
            :
                null;
};

exports.ActivityOverlay = ActivityOverlay;
exports.ActivityOverlayControl = ActivityOverlayControl;
exports.AddActivityOverlay = AddActivityOverlay;
exports.Alert = Alert;
exports.ApplyColumnProp = ApplyColumnProp;
exports.ArrayTable = ArrayTable;
exports.BRAfter = BRAfter;
exports.BRBefore = BRBefore;
exports.Badge = Badge;
exports.BadgeItem = BadgeItem;
exports.BreadCrumb = BreadCrumb;
exports.BreadCrumbItem = BreadCrumbItem;
exports.Button = Button;
exports.ButtonGroup = ButtonGroup;
exports.ButtonToolbar = ButtonToolbar;
exports.CaptureGPS = CaptureGPS;
exports.Card = Card;
exports.CardBody = CardBody;
exports.CardColumns = CardColumns;
exports.CardDeck = CardDeck;
exports.CardFooter = CardFooter;
exports.CardGroup = CardGroup;
exports.CardHeader = CardHeader;
exports.CardText = CardText;
exports.CardTitle = CardTitle;
exports.ClassNames = ClassNames;
exports.Col = Col;
exports.Collapse = Collapse;
exports.ColumnBodyClassNames = ColumnBodyClassNames;
exports.ColumnClassNames = ColumnClassNames;
exports.ColumnHeadClassNames = ColumnHeadClassNames;
exports.ColumnHeaderClick = ColumnHeaderClick;
exports.ComputeValue = ComputeValue;
exports.Container = Container;
exports.CookieCreate = CookieCreate;
exports.CookieErase = CookieErase;
exports.CookieRead = CookieRead;
exports.CopyRefToClipboard = CopyRefToClipboard;
exports.CreateCustomDateRange = CreateCustomDateRange;
exports.DateRange = DateRange;
exports.DateRangeCalendar = DateRangeCalendar;
exports.DateRangeDateMomentToString = DateRangeDateMomentToString;
exports.DateRangeDateStringToMoment = DateRangeDateStringToMoment;
exports.DateRangeToMoment = DateRangeToMoment;
exports.DateRangeToString = DateRangeToString;
exports.DownloadBase64Data = DownloadBase64Data;
exports.Dropdown = Dropdown;
exports.DropdownItem = DropdownItem;
exports.ElementCustomValue = ElementCustomValue;
exports.EllipsesTruncate = EllipsesTruncate;
exports.FileToBase64 = FileToBase64;
exports.FilterObjects = FilterObjects;
exports.Form = Form;
exports.FormFeedback = FormFeedback;
exports.FormGroup = FormGroup;
exports.FormatValue = FormatValue;
exports.GetOrientation = GetOrientation;
exports.GetPathComponentAfter = GetPathComponentAfter;
exports.GetPathThrough = GetPathThrough;
exports.HandleChangeValue = HandleChangeValue;
exports.HasPathComponent = HasPathComponent;
exports.IWServerData = IWServerData;
exports.InputCheckBox = InputCheckBox;
exports.InputColor = InputColor;
exports.InputDate = InputDate;
exports.InputDatePicker = InputDatePicker;
exports.InputEmail = InputEmail;
exports.InputGender = InputGender;
exports.InputGroup = InputGroup;
exports.InputGroupAddon = InputGroupAddon;
exports.InputGroupText = InputGroupText;
exports.InputGroupWrapper = InputGroupWrapper;
exports.InputNumber = InputNumber;
exports.InputPassword = InputPassword;
exports.InputRadio = InputRadio;
exports.InputSSN = InputSSN;
exports.InputSearch = InputSearch;
exports.InputSelect = InputSelect;
exports.InputSelectStep = InputSelectStep;
exports.InputState = InputState;
exports.InputSwitch = InputSwitch;
exports.InputTel = InputTel;
exports.InputText = InputText;
exports.InputTextArea = InputTextArea;
exports.InputTime = InputTime;
exports.InputTimeZone = InputTimeZone;
exports.InputUrl = InputUrl;
exports.InputWrapper = InputWrapper;
exports.InputZip = InputZip;
exports.IsColumnEmpty = IsColumnEmpty;
exports.IsDevFocused = IsDevFocused;
exports.IsENV = IsENV;
exports.KEY_BACKSPACE = KEY_BACKSPACE;
exports.KEY_DOWN_ARROW = KEY_DOWN_ARROW;
exports.KEY_ENTER = KEY_ENTER;
exports.KEY_ESCAPE = KEY_ESCAPE;
exports.KEY_LEFT_ARROW = KEY_LEFT_ARROW;
exports.KEY_RIGHT_ARROW = KEY_RIGHT_ARROW;
exports.KEY_SPACE = KEY_SPACE;
exports.KEY_STRING_BACKSPACE = KEY_STRING_BACKSPACE;
exports.KEY_STRING_DOWN_ARROW = KEY_STRING_DOWN_ARROW;
exports.KEY_STRING_ENTER = KEY_STRING_ENTER;
exports.KEY_STRING_ESCAPE = KEY_STRING_ESCAPE;
exports.KEY_STRING_LEFT_ARROW = KEY_STRING_LEFT_ARROW;
exports.KEY_STRING_RIGHT_ARROW = KEY_STRING_RIGHT_ARROW;
exports.KEY_STRING_TAB = KEY_STRING_TAB;
exports.KEY_STRING_UP_ARROW = KEY_STRING_UP_ARROW;
exports.KEY_TAB = KEY_TAB;
exports.KEY_UP_ARROW = KEY_UP_ARROW;
exports.Label = Label;
exports.ListGroup = ListGroup;
exports.ListGroupItem = ListGroupItem;
exports.ListGroupItemHeading = ListGroupItemHeading;
exports.ListGroupItemText = ListGroupItemText;
exports.MDDetail = MDDetail;
exports.MDLink = MDLink;
exports.MDMaster = MDMaster;
exports.MasterDetail = MasterDetail;
exports.MasterDetailListGroup = MasterDetailListGroup;
exports.MessageBox = MessageBox;
exports.Modal = Modal;
exports.ModalBody = ModalBody;
exports.ModalFooter = ModalFooter;
exports.ModalHeader = ModalHeader;
exports.ModalPrompt = ModalPrompt;
exports.Nav = Nav;
exports.NavItem = NavItem;
exports.NavLink = NavLink;
exports.Navbar = Navbar;
exports.NavbarBrand = NavbarBrand;
exports.NavbarToggler = NavbarToggler;
exports.NumberFormat = NumberFormat;
exports.OptionsActive = OptionsActive;
exports.OptionsActiveAll = OptionsActiveAll;
exports.PhotoFileToData = PhotoFileToData;
exports.ReduceInputProps = ReduceInputProps;
exports.ReduceToInputAddProps = ReduceToInputAddProps;
exports.RemoveActivityOverlay = RemoveActivityOverlay;
exports.ResizeBase64 = ResizeBase64;
exports.Row = Row;
exports.ScreenFormatValue = ScreenFormatValue;
exports.SelectDD = SelectDD;
exports.SetSort = SetSort;
exports.SizeAtMax = SizeAtMax;
exports.SizeAtMin = SizeAtMin;
exports.SortObjects = SortObjects;
exports.Spinner = Spinner;
exports.StructuredArray = StructuredArray;
exports.StyleControl = StyleControl;
exports.Tab = Tab;
exports.Table = Table;
exports.TableIDToExcel = TableIDToExcel;
exports.TextStatus = TextStatus;
exports.ValidColumns = ValidColumns;
exports.ViewEmail = ViewEmail;
exports.WriteBodyTD = WriteBodyTD;
exports.WriteBodyTR = WriteBodyTR;
exports.WriteFootTR = WriteFootTR;
exports.WriteHeadTR = WriteHeadTR;
exports.arrayIDMapsForArrayWithID = arrayIDMapsForArrayWithID;
exports.arrayMapWithMapIDIndex = arrayMapWithMapIDIndex;
exports.checkDeps = checkDeps;
exports.customRangeName = customRangeName;
exports.defaultRange = defaultRange;
exports.defaultRangeLast4Weeks = defaultRangeLast4Weeks;
exports.defaultRangeString = defaultRangeString;
exports.defaultRangeStrings = defaultRangeStrings;
exports.defaultRangeStringsReport = defaultRangeStringsReport;
exports.defaultRangeStringsReportQuarterly = defaultRangeStringsReportQuarterly;
exports.defaultRangeWeek = defaultRangeWeek;
exports.defaultRangeYear = defaultRangeYear;
exports.defaultRanges = defaultRanges;
exports.defaultRangesReport = defaultRangesReport;
exports.defaultRangesReportQuarterly = defaultRangesReportQuarterly;
exports.getStorage = getStorage;
exports.initialActivityOverlayState = initialActivityOverlayState;
exports.initialDateRange = initialDateRange;
exports.initialDateRangeString = initialDateRangeString;
exports.initialMenuBackItem = initialMenuBackItem;
exports.initialMessageBoxState = initialMessageBoxState;
exports.initialSortProperties = initialSortProperties;
exports.initialTextStatusState = initialTextStatusState;
exports.panelClean = panelClean;
exports.setStorage = setStorage;
exports.useCombinedRefs = useCombinedRefs;
exports.useDeepCompareCallback = useDeepCompareCallback;
exports.useDeepCompareEffect = useDeepCompareEffect;
exports.useDeepCompareMemo = useDeepCompareMemo;
exports.useDeepCompareMemoize = useDeepCompareMemoize;
exports.useStorage = useStorage;
