const express = require('express');

const app = express();

const users = [
  {
    id: 1,
    name: 'Séverine',
    developer: 'frontend',
  },
  {
    id: 2,
    name: 'Benjamin',
    developer: 'backend',
  },
  {
    id: 3,
    name: 'Johana',
    developer: 'frontend',
  },
  {
    id: 4,
    name: 'Nasreddine',
    developer: 'backend',
  },
  {
    id: 5,
    name: 'Messaoud',
    developer: 'frontend',
  },
  {
    id: 6,
    name: 'Ahmed',
    developer: 'backend',
  },
  {
    id: 7,
    name: 'Sonia',
    developer: 'frontend',
  },
  {
    id: 8,
    name: 'Patrick',
    developer: 'backend',
  },
  {
    id: 9,
    name: 'Baptiste',
    developer: 'frontend',
  },
  {
    id: 10,
    name: 'Guillaume',
    developer: 'fullstack',
  },
  {
    id: 11,
    name: 'William',
    developer: 'fullstack',
  },
  {
    id: 12,
    name: 'Pauline',
    developer: 'frontend',
  },
];

app.get('/users', (req, res) => {
  console.log(req.query);

  const limit = parseInt(req.query.limit, 10);
  const developer = req.query.developer;
 
  let result = users;

  if (limit) {
    result = users.slice(0, limit);
  } else {
    result= users.slice(0,10)
  }

  if (developer) {
    result = users.filter((user) => user.developer === developer)
    
  } else {
     res.status(404)
  }

  res.json(result);

 
});

app.use(express.json());

app.get('/users/:id', (req, res) => { 
  const userId = parseInt(req.params.id, 10);
  
  const user = users.find((user) => user.id === userId);
  
  if (user !== null) {
    res.json(user);
  } else {
    res.status(404);
  }
})

app.post('/users', (req, res) => {
  const name = req.body.name;
  const developer = req.body.developer;
  const id = parseInt(req.body.id, 10);
  console.log(name, developer);
  users.push({ id:users.length+1,name: name, developer: developer });
  console.log(users)
  res.send({
    message:"new user created"
  })
 
})

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const {name,developer}= req.body
  const userToEdit = users.find((user) => user.id === userId);

  if (userToEdit) {
    userToEdit.name = name;
    userToEdit.developer = developer;
    res.send({message:"user edited successfully"})
  } else {
    res.status(404).send({
      message: "user not found"
    })
  }
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  
  users.splice(userId, 1);
  res.json({message: "user deleted successfully"})
});

const serverPort = 3310;

app.listen(serverPort, () => {
  console.info(`Listening on port ${serverPort}`);
});
