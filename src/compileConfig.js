"use strict";
exports.__esModule = true;
exports.compileConfig = void 0;
function compileConfig(config) {
    var compiled = {};
    Object.keys(config).forEach(function (key, index, array) {
        var _a, _b, _c;
        var typedKey = key;
        if (typeof config[key] === "string") {
            compiled[key] = config[key];
        }
        else if (typeof config[key] === "boolean") {
            compiled[key] = (_a = config[key]) === null || _a === void 0 ? void 0 : _a.toString();
        }
        else if (typeof config[key] === "number") {
            compiled[key] = (_b = config[key]) === null || _b === void 0 ? void 0 : _b.toString();
        }
        else if (typeof config[key] === "object") {
            compiled[key] = (_c = Object.values(config[key])) === null || _c === void 0 ? void 0 : _c.join(',');
        }
    });
    return compiled;
}
exports.compileConfig = compileConfig;
