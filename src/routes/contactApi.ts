import { Router } from 'express';

const router = Router();

const database: Array<{ firstname: string; lastname: string; phone: string; id: number }> = [
  {
    firstname: 'adedayo',
    lastname: 'adedunye',
    phone: '08066069526',
    id: 1
  }
];

let databaseLength: number = database.length;

/* Contact Api Methods. */

router.get('/', function(req, res) {
  const queryKeys = Object.keys(req.query);
  const queryValues = Object.values(req.query);
  console.log(queryKeys);
  console.log(queryValues);
  if (queryKeys.length < 1) {
    res.json(database);
    res.end();
    return;
  }
  const contact = database.filter(contact => contact.firstname === req.query.firstname);
  console.log(contact);
  if (contact.length > 0) {
    res.json(contact);
    return;
  }
  res.status(404).send('Requested Contact not found');
  res.end();
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

router.post('/', function({ body }, res) {
  if (!(body.firstname && body.lastname && body.phone)) {
    res.status(400).send('Invalid Parameters');
    return;
  }
  const contact = { id: databaseLength + 1, isBlocked: false, address: null, ...body };
  database.push(contact);
  databaseLength++;
  res.send(contact);
});

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
