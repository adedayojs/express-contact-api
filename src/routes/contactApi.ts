import { Router } from 'express';

const router = Router();
//
const database: Array<{
  firstname: string;
  lastname: string;
  phone: string;
  id: number;
  blocked: string;
  [key: string]: any;
}> = [
  {
    firstname: 'adedayo',
    lastname: 'adedunye',
    phone: '08066069526',
    id: 1,
    blocked: 'false'
  },
  {
    firstname: 'node',
    lastname: 'py',
    phone: '08066069526',
    id: 2,
    blocked: 'true'
  },
  {
    firstname: 'node',
    lastname: 'sammy',
    phone: '08066069526',
    id: 3,
    blocked: 'false'
  },
  {
    firstname: 'mon',
    lastname: 'py',
    phone: '08066069526',
    id: 4,
    blocked: 'true'
  }
];

let databaseLength: number = database.length;

/* Contact Api Get Methods. */

router.get('/', function({ query }, res) { 
  console.log(query);

  //  This takes my query parameters which are stored as an object and runs a comparison
  //  algorithm against each object in my database of array of objects
  //  Returns any object that meets the query parameters
  const queryKeys = Object.keys(query);
  console.log(queryKeys);
  if (queryKeys.length > 0) {
    const queryAnswer = database.filter(contact => {
      let result: boolean;
      for (let ask in query) {
        if (!(query[ask] == contact[ask])) {
          result = false;
          return result;
        }
      }
      result = true;
      return result;
    });
    if (queryAnswer.length > 0) {
      res.json(queryAnswer);
      return;
    }
    res
      .status(404)
      .send('Contact Not Found')
      .end();
    return;
  }

  //  if there is no query parameter then all contacts has been requested
  if (queryKeys.length < 1) {
    res.json(database);
    res.end();
    return;
  }
});

router.get('/:firstname/:lastname', function(req, res) {
  const contact = database.find(
    contact => contact.firstname === req.params.firstname && contact.lastname === req.params.lastname
  );
  if (!contact) {
    res.status(404).send('Requested Contact not found');
  }

  res.json(contact);
});

router.get('/:id', (req, res) => {
  const contact = database.filter(contact => contact.id === parseInt(req.params.id));
  if (contact.length < 1) {
    res.status(404).send('Contact With Specified Id Not Found');
    return;
  }
  res.json(contact);
  res.end();
});

/* Contact Api Post Methods */
router.post('/', function({ body }, res) {
  if (!(body.firstname && body.lastname && body.phone)) {
    res.status(400).send('Invalid Parameters, Firstname, lastname and phone number is compulsory');
    return;
  }
  const contact = { id: databaseLength + 1, blocked: 'false', address: 'null', ...body };
  database.push(contact);
  databaseLength++;
  res.send(contact);
});

/* Contact Api Patch Methods */
router.patch('/:firstname/:lastname', (req, res) => {
  let index: number = database.findIndex(
    cont => cont.firstname === req.params.firstname && cont.lastname === req.params.lastname
  );
  if (index > -1) {
    database[index] = { ...database[index], ...req.body };
    res.json(database[index]).end('Done');

    return;
  }
  res.sendStatus(404);
});

/* Contact Api PUT Methods */
router.put('/:firstname/:lastname', (req, res) => {
  let index: number = database.findIndex(
    cont => cont.firstname === req.params.firstname && cont.lastname === req.params.lastname
  );
  if (index > -1) {
    database[index] = { ...database[index], ...req.body };
    res.json(database[index]).end('Done');

    return;
  }
  res.sendStatus(404);
});

/* Contact Api Delete Methods */
router.delete('/:firstname/:lastname', (req, res) => {
  const index = database.findIndex(
    contact => contact.firstname === req.params.firstname && contact.lastname === req.params.lastname
  );
  if (index > -1) {
    database.splice(index, 1);
    res.send('Contact Deleted');
    return;
  }
  res.status(404).json('Contact Not Found');
});

router.delete('/:id', (req, res) => {
  const index = database.findIndex(contact => contact.id === req.params.id);
  if (index > -1) {
    database.splice(index, 1);
    res.send('Contact Deleted');
    return;
  }
  res.status(404).json('Contact Not Found');
});

export default router;
