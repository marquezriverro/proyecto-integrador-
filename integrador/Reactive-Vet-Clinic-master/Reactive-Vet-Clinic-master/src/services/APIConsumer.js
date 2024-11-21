export const APIConsumer = {
    userLogin: async (email, password) => {
        try {
            let result = await fetch('http://localhost:5000/clients/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            });
            
            const userData = await result.json();
            console.log(userData.token);
            localStorage.setItem('token', result.userData)
            return userData;
        } catch (error) {
            console.log(error);
        }
    },
    
    logout: async (token) => {
        try {
            let result = await fetch('http://localhost:5000/clients/logout', {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('token') 
                },
                body: JSON.stringify({
                    "token": token
                })
            });            
            const userData = await result.json();
            console.log(userData.token);
            return userData;
        } catch (error) {
            console.log(error);
        }
    },
    
    CreateUser: async (fullName, phoneNumber, email, password) => {
        try {
            let result = await fetch('http://localhost:5000/clients/register', {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "fullName": fullName,
                    "phoneNumber": phoneNumber,
                    "email": email,
                    "password": password
                })
            })
            return await result.json()
        } catch (error) {
            console.log(error)
        }
    },
    
    CreatePet: async (animal, name) => {
        try {
            let result = await fetch('http://localhost:5000/pets/create', {
                method: "POST",
                headers: { 'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')  },
                body: JSON.stringify({
                    "animal": animal,
                    "name": name
                })
            })
            return await result.json()
        } catch (error) {
            console.log(error)
        }
    },
    
    getPets: async (text) => {
        let pets;
        let url = 'http://localhost:5000/pets';
        if (text) {
            url = url + `?name=${text}`;
        }
        const result = await fetch(url, {
            method: "GET",
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
        })
        pets = await result.json();
        return pets;
    },
    adminLogin: async (email, password) => {
        try {
            let result = await fetch(`http://localhost:5000/admin/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            });
            const adminData = await result.json();
            console.log(adminData.token);
            return adminData;
        } catch (error) {
            console.log(error);
        }
    }
}
export default APIConsumer