import _ from 'lodash';

class Bank {
    /**
     * class constructor
     * @param {object} data
     */
    constructor() {
        this.customers = [];
    }

    createCustomer(data) {
        const customer = {
            customerId: data.customerId, //or generate uuid
            name: data.name,
            accounts: [],
            notifications: []
        };
        this.customers.push(customer);
        return "Success";
    }

    createCustomerAccount(data) {
        let customer = null;
        if (data.customerId || data.name) {
            customer = data.customerId ? this.getCustomerById(data.customerId) : this.getCustomerByName(data.name);
        }
        if (customer != null) {
            const account = {
                accountId: data.accountId,
                balance: data.initialBalance,
                currency: "CAD"
            };
            customer.accounts.push(account);
        } else {
            this.createCustomer(data);
            this.createCustomerAccount(data);
        }
        return "Success";
    }

    getCustomerByAccountId(accountId) {
        const customer = this.customers.find(customer =>
            customer.accounts.find(account => account.accountId === accountId)
        );
        return customer;
    }

    getCustomerAccount(data) {
        let customer = null;
        if (data.customerId || data.name) {
            customer = data.customerId ? this.getCustomerById(data.customerId) : this.getCustomerByName(data.name);
        }
        if (customer != null) {
            return customer.accounts.find(account => account.accountId === data.accountId);
        }
    }

    getCustomerById(customerId) {
        return this.customers.find(customer => customer.customerId === customerId);
    }

    getCustomerByName(name) {
        return this.customers.find(customer => customer.name === name);
    }

    getAllCustomers() {
        return this.customers;
    }

    depositAmount(data) {
       let customer = data.customerId ? this.getCustomerById(data.customerId) : null;
        if (customer != null) {
            let account = customer.accounts.find(account => account.accountId === data.accountId);
            if (account != null) {
                if (data.currency === 'USD') {
                    account.balance = _.add(account.balance , _.multiply(data.deposit, 2));
                } else if (data.currency === 'MXN') {
                    account.balance = _.add(account.balance , _.divide(data.deposit, 10));
                } else {
                    account.balance = _.add(account.balance , data.deposit);
                }
            } else {
                return "Customer with id " + data.customerId + " not hold account with id :" + data.accountId;
            }

        } else {
            return "Customer with id " + data.customerId + " not found";
        }
        return "Success";
    }

    withdrawAmount(data, transaction) {
        let customer = data.customerId ? this.getCustomerById(data.customerId) : null;
        if (customer != null) {
            let account = customer.accounts.find(account => account.accountId === data.accountId);
            if (account != null) {
                if (data.currency === 'USD' && account.balance > _.multiply(data.withdraw, 2)) {
                    account.balance = _.subtract(account.balance , _.multiply(data.withdraw, 2));
                } else if (data.currency === 'MXN' && account.balance > _.divide(data.withdraw, 10)) {
                    account.balance = _.subtract(account.balance , _.divide(data.withdraw, 10));
                } else if (account.balance > data.withdraw) {
                    account.balance = _.subtract(account.balance , data.withdraw);
                } else {
                    return "Account balance is low";
                }
            } else {
                const actualCustomer = this.getCustomerByAccountId(data.accountId);
                let transactionType = transaction?transaction:"withdraw";
                let error = "An unauthorised user attempted to "+transactionType+" the money";
                if(actualCustomer.notifications){
                    actualCustomer.notifications.push(error);
                }else{
                    const notifications =[];
                    notifications.push(error);
                    actualCustomer.notifications.push(notifications);
                }
                return "Customer with id " + data.customerId + " not hold account with id :" + data.accountId;
            }
        } else {
            return "Customer with id " + data.customerId + " not found";
        }
        return "Success";
    }

    transferAmount(data) {
        let status = this.withdrawAmount({
            customerId: data.fromCustomerId,
            accountId: data.fromAccountId,
            withdraw: data.transfer,
            currency: data.currency
        }, "transfer");
        if(status === 'Success'){
            status = this.depositAmount({
                customerId: data.toCustomerId,
                accountId: data.toAccountId,
                deposit: data.transfer,
                currency: data.currency
            });
            if(status !== 'Success'){ //if deposit failed then transfer back the withdraw amount
                this.depositAmount({
                    customerId: data.fromCustomerId,
                    accountId: data.fromAccountId,
                    deposit: data.transfer,
                    currency: data.currency
                });
            }
        }
        return status;
    }


    createCustomerAccounts(data) {
        data.forEach(customer =>{
            this.createCustomerAccount(customer);
        });
        return "Success";
    }

    clearCustomerAccounts(){
        this.customers = [];
    }

    getBalance(account){
        return "Account Number: "+account.accountId+" Balance: $"+Number.parseFloat(account.balance).toFixed(2)+" "+account.currency;
    }
}

export default new Bank();