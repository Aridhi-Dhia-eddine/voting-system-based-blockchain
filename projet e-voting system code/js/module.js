//const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from '../node_modules/uuid';
const token = uuid.v4();
console.log(token)
async function sendTransaction() {
    const token = uuid.v4();
    const transaction = {
        token: token 
    };
    console.log(transaction)

    try {
        const response = await fetch('http://localhost:3000/transact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: { transaction } })
        });
        const result = await response.json();
        document.getElementById('result').innerText = JSON.stringify(result, null, 2);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error: ' + error.message;
    }
}