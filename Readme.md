#World Wide Bank App

#Run locally: 
Need npm and node installed in machine

Steps:
1. npm install
2. npm run dev-start

app will be listening on port 3000

#Run the Tests:
npm run test

#routes:
1. localhost:3000/ GET : listAll customers
2. localhost:3000/createCustomerAccount POST : creates customer and account or just creates account if existing customer
Sample req body : {
	"customerId":"002",
	"accountId":"1010",
	"name":"Joe Swanson",
	"initialBalance":7425
}
3. localhost:3000/withdraw POST : withdraw money
Sample req body : {
   	"customerId":"456",
   	"accountId":"1010",
   	"withdraw":100,
   	"currency":"USD"
}
4. localhost:3000/deposit POST: deposit money
Sample req body : {
	"customerId":"456",
	"accountId":"0456",
	"deposit":23789,
	"currency":"USD"
}
5. localhost:3000/transfer POST: transfer money
Sample req body : {
	"fromCustomerId":"456",
	"fromAccountId":"0456",
	"toCustomerId":"123",
	"toAccountId":"0123",
	"transfer":23.75,
	"currency":"CAD"
}
6. localhost:3000/:id GET: specific customer



