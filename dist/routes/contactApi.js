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
        firstname: 'adedayo',
        lastname: 'adedunye',
        phone: '08066069526',
        id: 1
    }
];
var databaseLength = database.length;
/* Contact Api Methods. */
router.get('/', function (req, res) {
    var queryKeys = Object.keys(req.query);
    var queryValues = Object.values(req.query);
    console.log(queryKeys);
    console.log(queryValues);
    if (queryKeys.length < 1) {
        res.json(database);
        res.end();
        return;
    }
    var contact = database.filter(function (contact) { return contact.firstname === req.query.firstname; });
    console.log(contact);
    if (contact.length > 0) {
        res.json(contact);
        return;
    }
    res.status(404).send('Requested Contact not found');
    res.end();
});
router.get('/:firstname/:lastname', function (req, res) {
    var contact = database.find(function (contact) { return contact.firstname === req.params.firstname && contact.lastname === req.params.lastname; });
    if (!contact) {
        res.status(404).send('Requested Contact not found');
    }
    res.json(contact);
});
router.get('/:id', function (req, res) {
    var contact = database.filter(function (contact) { return contact.id === parseInt(req.params.id); });
    if (contact.length < 1) {
        res.status(404).send('Contact With Specified Id Not Found');
        return;
    }
    res.json(contact);
    res.end();
});
router.post('/', function (_a, res) {
    var body = _a.body;
    if (!(body.firstname && body.lastname && body.phone)) {
        res.status(400).send('Invalid Parameters');
        return;
    }
    var contact = __assign({ id: databaseLength + 1, isBlocked: false, address: null }, body);
    database.push(contact);
    databaseLength++;
    res.send(contact);
});
router.delete('/:firstname/:lastname', function (req, res) {
    var index = database.findIndex(function (contact) { return contact.firstname === req.params.firstname && contact.lastname === req.params.lastname; });
    if (index > -1) {
        database.splice(index, 1);
        res.send('Contact Deleted');
        return;
    }
    res.status(404).json('Contact Not Found');
});
router.delete('/:id', function (req, res) {
    var index = database.findIndex(function (contact) { return contact.id === req.params.id; });
    if (index > -1) {
        database.splice(index, 1);
        res.send('Contact Deleted');
        return;
    }
    res.status(404).json('Contact Not Found');
});
exports.default = router;
//# sourceMappingURL=contactApi.js.map