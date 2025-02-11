const path = require('path');
const fs = require('fs');



const indexController = {
    index : async (req, res) => {
        const usersFilePath = path.join(__dirname, '../database/users.json');

        try {
            
            const response = await fetch ('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error('Error al obtener los datos de la API externa');
    
            const externalUsers = await response.json();
    
            let localUsers = [];
            if (fs.existsSync(usersFilePath)) {
                const data = fs.readFileSync(usersFilePath, 'utf8');
                localUsers = data ? JSON.parse(data) : [];
            }
    
            const users = [...externalUsers, ...localUsers];
    
            res.render ('index', { users });
        } catch (error) {
            res.status(500).send('Error al obtener los datos');
        }
    },

    search : async (req, res) => {
        const usersFilePath = path.join(__dirname, '../database/users.json');

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error('Error al obtener los datos de la API externa');
    
            const externalUsers = await response.json();
    
            let localUsers = [];
            if (fs.existsSync(usersFilePath)) {
                const data = fs.readFileSync(usersFilePath, 'utf8');
                localUsers = data ? JSON.parse(data) : [];
            }
    
            const users = [...externalUsers, ...localUsers];
    
            const searchTerm = req.query.q?.toLowerCase() || '';
    
            const filteredUsers = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                user.address.city.toLowerCase().includes(searchTerm)
            );
    
            res.json(filteredUsers);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los datos' });
        }
    },

    create : (req, res) =>{
        const usersFilePath = path.join(__dirname, '../database/users.json');

          return res.render('add');
      },
    
      
    save : async (req, res) => {
        const usersFilePath = path.join(__dirname, '../database/users.json');

        try {
            
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error('Error al obtener los datos de la API externa');
    
            const externalUsers = await response.json();
    
            
            let localUsers = [];
            if (fs.existsSync(usersFilePath)) {
                const data = fs.readFileSync(usersFilePath, 'utf8');
                localUsers = data ? JSON.parse(data) : [];
            }
    
           
            const allUsers = [...externalUsers, ...localUsers];
    
            
            const maxId = allUsers.reduce((max, user) => Math.max(max, user.id), 0);
            const newUser = { id: maxId + 1, ...req.body };
    
            
            localUsers.push(newUser);
    
            
            fs.writeFileSync(usersFilePath, JSON.stringify(localUsers, null, 2));
    
            res.redirect('/');
        } catch (error) {
            res.status(500).json({ error: 'Error al guardar el usuario' });
        }
    }

}
      
    


module.exports = indexController;