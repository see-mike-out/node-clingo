"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.ClingoStore = void 0;
var python_shell_1 = require("python-shell");
var configDefault_1 = require("./configDefault");
var compileConfig_1 = require("./compileConfig");
// from: https://decipher.dev/30-seconds-of-typescript/docs/promisify/
var promisify = function (func) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        return func.apply(void 0, __spreadArray(__spreadArray([], args, false), [function (err, result) {
                return err ? reject(err) : resolve(result);
            }], false));
    });
}; };
var pyshellRun = promisify(python_shell_1.PythonShell.run);
var ClingoStore = /** @class */ (function () {
    function ClingoStore(_config) {
        this.statements = [];
        this.config = {
            // see config.ts for description
            base_url: _config.base_url || configDefault_1.DefaultNcConfig.base_url,
            solve_limit: _config.solve_limit || configDefault_1.DefaultNcConfig.solve_limit,
            parallel_mode: _config.parallel_mode || configDefault_1.DefaultNcConfig.parallel_mode,
            global_restarts: _config.global_restarts || configDefault_1.DefaultNcConfig.global_restarts,
            distribute: _config.distribute || configDefault_1.DefaultNcConfig.distribute,
            integrate: _config.integrate || configDefault_1.DefaultNcConfig.integrate,
            enum_mode: _config.enum_mode || configDefault_1.DefaultNcConfig.enum_mode,
            project: _config.project || configDefault_1.DefaultNcConfig.project,
            models: _config.models || configDefault_1.DefaultNcConfig.models,
            opt_mode: _config.opt_mode || configDefault_1.DefaultNcConfig.opt_mode
        };
        this.files = [];
    }
    ClingoStore.prototype.addStatements = function (newStatements) {
        if (typeof newStatements === 'string') {
            this.statements.push(newStatements);
        }
        else if (typeof newStatements === 'object') {
            for (var _i = 0, newStatements_1 = newStatements; _i < newStatements_1.length; _i++) {
                var newStatement = newStatements_1[_i];
                this.statements.push(newStatement);
            }
        }
    };
    ClingoStore.prototype.addFiles = function (newFiles) {
        if (typeof newFiles === 'string') {
            this.files.push(newFiles);
        }
        else if (typeof newFiles === 'object') {
            for (var _i = 0, newFiles_1 = newFiles; _i < newFiles_1.length; _i++) {
                var newFile = newFiles_1[_i];
                this.files.push(newFile);
            }
        }
    };
    ClingoStore.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, statements, files, is_debug, pythonShellOptions, outcome, parsedOutcome;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = JSON.stringify((0, compileConfig_1.compileConfig)(this.config) || {});
                        statements = JSON.stringify(this.statements || []);
                        files = JSON.stringify(this.files || []);
                        is_debug = this.config.is_debug;
                        pythonShellOptions = {
                            mode: 'text',
                            pythonOptions: ['-u'],
                            args: [statements, files, config]
                        };
                        return [4 /*yield*/, pyshellRun('./src/runClingo.py', pythonShellOptions)];
                    case 1:
                        outcome = _a.sent();
                        parsedOutcome = JSON.parse(outcome[(is_debug ? 3 : 0)] || "");
                        return [2 /*return*/, parsedOutcome];
                }
            });
        });
    };
    return ClingoStore;
}());
exports.ClingoStore = ClingoStore;
