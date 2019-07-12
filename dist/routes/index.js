"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var database = [
    {
        id: 1,
        contacts: [{ name: 'samfeolu', phone: '08066069526' }]
    }
];
/* GET home page. */
router.get('/', function (_req, res) {
    res.render('index', { title: 'Express' });
});
router.get('/contacts', function (_req, res) {
    res.json(database);
    // res.render('index', { title: 'rukee roko' });
});
router.get('/contacts/:id', function (req, res) {
    var contact = database.find(function (contact) { return contact.id === parseInt(req.params.id); });
    if (!contact) {
        res.status(404).send('Requested Contact not found');
    }
    res.json(contact);
    // res.render('index', { title: 'rukee roko' });
});
router.post('/contacts', function (req, res) {
    var contact = __assign({ id: database.length + 1 }, req.body);
    database.push(contact);
    res.send(contact);
    // res.render('index', { title: 'rukee roko' });
});
router.delete('/contacts/:id', function (req, res) {
    var index = database.findIndex(function (contact) { return contact.id === parseInt(req.params.id); });
    if (index > -1) {
        database.splice(index, 1);
        res.send('Contact Deleted');
        return;
    }
    res.status(404).json('Contact Not Found');
});
exports.default = router;
//# sourceMappingURL=index.js.map