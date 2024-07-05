"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.db = exports.collectionInitializer = void 0;
var collectionInitializer_1 = require("./collectionInitializer");
Object.defineProperty(exports, "collectionInitializer", { enumerable: true, get: function () { return collectionInitializer_1.collectionInitializer; } });
var connect_1 = require("./connect");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return connect_1.db; } });
Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return connect_1.connect; } });
Object.defineProperty(exports, "close", { enumerable: true, get: function () { return connect_1.close; } });
