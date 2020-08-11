import express from 'express';
import Bank from "./src/model/Bank";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).send(Bank.getAllCustomers());
});

app.get('/id', (req, res) => {
    let customer = Bank.getCustomerById(req.params.id);
    if(customer){
        res.status(404).send("Customer with id: "+req.params.id+" not found");
    }else{
        res.status(200).send(customer);
    }
});

app.post('/createCustomerAccount', (req, res) => { //if adding a customer and account or adding account to an existing customer
    let status = Bank.createCustomerAccount(req.body);
    if(status !== "Success"){
        res.status(500).send(status);
    }else{
        res.status(200).send(status);
    }
});

app.post('/createCustomer', (req, res) => {
    let status = Bank.createCustomer(req.body);
    if(status !== "Success"){
        res.status(500).send(status);
    }else{
        res.status(200).send(status);
    }
});

app.post('/withdraw', (req, res) => {
    let status = Bank.withdrawAmount(req.body);
    if(status !== "Success"){
        res.status(500).send(status);
    }else{
        res.status(200).send(status);
    }
});

app.post('/transfer', (req, res) => {
    let status = Bank.transferAmount(req.body);
    if(status !== "Success"){
        res.status(500).send(status);
    }else{
        res.status(200).send(status);
    }
});

app.post('/deposit', (req, res) => {
    let status = Bank.depositAmount(req.body);
    if(status !== "Success"){
        res.status(500).send(status);
    }else{
        res.status(200).send(status);
    }
});

app.listen(3000);
console.log('app running on port ', 3000);