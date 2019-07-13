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
//
var database = [
    {
        firstname: 'adedayo',
        lastname: 'adedunye',
        phone: '08066069526',
        id: 1,
        isBlocked: false
    },
    {
        firstname: 'node',
        lastname: 'py',
        phone: '08066069526',
        id: 2,
        isBlocked: true
    },
    {
        firstname: 'node',
        lastname: 'sammy',
        phone: '08066069526',
        id: 3,
        isBlocked: false
    },
    {
        firstname: 'mon',
        lastname: 'py',
        phone: '08066069526',
        id: 4,
        isBlocked: true
    }
];
var databaseLength = database.length;
/* Contact Api Get Methods. */
router.get('/', function (_a, res) {
    var query = _a.query;
    var queryKeys = Object.keys(query);
    if (queryKeys.length > 0) {
        var queryAnswer = database.filter(function (contact) {
            var result = false;
            for (var ask in query) {
                if (!(query[ask] == contact[ask])) {
                    result = false;
                    return result;
                }
                else {
                    result = true;
                }
            }
            return result;
        });
        res.json(queryAnswer).end('Done');
        return;
    }
    //  if there is no query parameter then all contacts has been requested
    if (queryKeys.length < 1) {
        res.json(database);
        res.end();
        return;
    }
    //  There is a query parameter so our code gets here
    //  if there is a "blocked" query send the approprate response
    if ('blocked' in query) {
        var contact_1 = database.filter(function (contact) { return contact.isBlocked === (query.blocked === 'true' ? true : false); });
        if (contact_1.length < 1) {
            res.status(404).end('No Contact Found');
        }
        res.json(contact_1).end();
        return;
    }
    //  There is no blocked query so our code gets here
    var contact = database.filter(function (contact) { return contact.firstname === query.firstname; });
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
/* Contact Api Post Methods */
router.post('/', function (_a, res) {
    var body = _a.body;
    if (!(body.firstname && body.lastname && body.phone)) {
        res.status(400).send('Invalid Parameters, Firstname, lastname and phone number is compulsory');
        return;
    }
    var contact = __assign({ id: databaseLength + 1, isBlocked: false, address: null }, body);
    database.push(contact);
    databaseLength++;
    res.send(contact);
});
/* Contact Api Patch Methods */
router.patch('/:firstname/:lastname', function (req, res) {
    var index = database.findIndex(function (cont) { return cont.firstname === req.params.firstname && cont.lastname === req.params.lastname; });
    if (index > -1) {
        database[index] = __assign({}, database[index], req.body);
        res.json(database[index]).end('Done');
        return;
    }
    res.sendStatus(404);
});
/* Contact Api PUT Methods */
router.put('/:firstname/:lastname', function (req, res) {
    var index = database.findIndex(function (cont) { return cont.firstname === req.params.firstname && cont.lastname === req.params.lastname; });
    if (index > -1) {
        database[index] = __assign({}, database[index], req.body);
        res.json(database[index]).end('Done');
        return;
    }
    res.sendStatus(404);
});
/* Contact Api Delete Methods */
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