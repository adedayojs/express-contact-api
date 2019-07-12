"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (_req, res) {
    res.render('index', { title: 'Express' });
});
exports.default = router;
//# sourceMappingURL=homepage.js.map