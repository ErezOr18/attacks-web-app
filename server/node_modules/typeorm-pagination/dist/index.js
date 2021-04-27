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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./helpers/pagination", "typeorm"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPage = exports.getPerPage = exports.pagination = void 0;
    var pagination_1 = require("./helpers/pagination");
    var typeorm_1 = require("typeorm");
    /**
     * Boot the package by patching the SelectQueryBuilder
     *
     */
    function pagination(req, res, next) {
        typeorm_1.SelectQueryBuilder.prototype.paginate = function (per_page) {
            return __awaiter(this, void 0, void 0, function () {
                var current_page;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            current_page = getPage(req);
                            if (!per_page)
                                per_page = getPerPage(req); // If not set, then get from request, default to 15
                            else
                                per_page = getPerPage(req, per_page); // If set, check if the request has per_page (which will override), or fallback to the set default
                            return [4 /*yield*/, pagination_1.paginate(this, current_page, per_page)];
                        case 1: // If set, check if the request has per_page (which will override), or fallback to the set default
                        return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        //console.log("pagination registered");
        next();
    }
    exports.pagination = pagination;
    function getPerPage(req, defaultPerPage) {
        if (defaultPerPage === void 0) { defaultPerPage = 15; }
        return parseInt(req.query.per_page) || defaultPerPage;
    }
    exports.getPerPage = getPerPage;
    function getPage(req, defaultPage) {
        if (defaultPage === void 0) { defaultPage = 1; }
        return parseInt(req.query.page) || defaultPage;
    }
    exports.getPage = getPage;
});
