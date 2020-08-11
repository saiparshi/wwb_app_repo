import Bank from "../src/model/Bank";

describe('Bank Test cases', function () {

    beforeEach(() => {
        Bank.createCustomerAccounts([{
            "customerId": "777",
            "accountId": "1234",
            "name": "Stewie Griffin",
            "initialBalance": 100
        }, {
            "customerId": "504",
            "accountId": "2001",
            "name": "Glenn Quagmire",
            "initialBalance": 35000
        }, {
            "customerId": "002",
            "accountId": "1010",
            "name": "Joe Swanson",
            "initialBalance": 7425
        }, {
            "customerId": "002",
            "accountId": "5500",
            "name": "Joe Swanson",
            "initialBalance": 15000
        }, {
            "customerId": "123",
            "accountId": "0123",
            "name": "Peter Griffin",
            "initialBalance": 150
        }, {
            "customerId": "456",
            "accountId": "0456",
            "name": "Lois Griffin",
            "initialBalance": 65000
        }]);
        Bank.createCustomer({
            "customerId": "219",
            "name": "John Shark"
        });
    });

    afterEach(() => {
        Bank.clearCustomerAccounts();
    });

    test('Case 1: Stewie Griffin deposits $300.00 USD to account number 1234. ' +
        'Stewie Griffin deposits $300.00 USD to account number 1234.', function () {
        Bank.depositAmount({
            "customerId": "777",
            "accountId": "1234",
            "deposit": 300,
            "currency": "USD"
        });
        let account = Bank.getCustomerAccount({
            "customerId": "777",
            "accountId": "1234"
        });
        expect(Bank.getBalance(account)).toEqual("Account Number: 1234 Balance: $700.00 CAD");
    });

    test('Case 2: Customer: Glenn Quagmire Customer ID: 504 Account Number: 2001 Initial balance for\n' +
        'account number 2001: $35,000.00 CAD.' +
        'Glenn Quagmire withdraws $5,000.00 MXN from account number 2001. Glenn Quagmire withdraws\n' +
        '$12,500.00 USD from account number 2001. Glenn Quagmire deposits $300.00 CAD to account number\n' +
        '2001.', function () {
        Bank.withdrawAmount({
            "customerId": "504",
            "accountId": "2001",
            "withdraw": 5000,
            "currency": "MXN"
        });
        Bank.withdrawAmount({
            "customerId": "504",
            "accountId": "2001",
            "withdraw": 12500,
            "currency": "USD"
        });
        Bank.depositAmount({
            "customerId": "504",
            "accountId": "2001",
            "deposit": 300,
            "currency": "CAD"
        });
        let account = Bank.getCustomerAccount({
            "customerId": "504",
            "accountId": "2001"
        });
        expect(Bank.getBalance(account)).toEqual("Account Number: 2001 Balance: $9800.00 CAD");
    });

    test('Case 3: Customer: Joe Swanson Customer ID: 002. Account Number: 1010 Initial balance for account number 1010: $7,425.00 CAD\n' +
        'Customer: Joe Swanson Customer ID: 002 Account Number: 5500 Initial balance for account number\n' +
        '5500: $15,000.00 CAD. Joe Swanson withdraws $5,000.00 CAD from account number 5500. Joe Swanson transfers $7,300.00\n' +
        'CAD from account number 1010 to account number 5500. Joe Swanson deposits $13,726.00 MXN to\n' +
        'account number 1010.', function () {
        Bank.withdrawAmount({
            "customerId": "002",
            "accountId": "5500",
            "withdraw": 5000,
            "currency": "CAD"
        });
        Bank.transferAmount({
            "fromCustomerId": "002",
            "fromAccountId": "1010",
            "toCustomerId": "002",
            "toAccountId": "5500",
            "transfer": 7300,
            "currency": "CAD"
        });
        Bank.depositAmount({
            "customerId": "002",
            "accountId": "1010",
            "deposit": 13726,
            "currency": "MXN"
        });
        let account1 = Bank.getCustomerAccount({
            "customerId": "002",
            "accountId": "1010"
        });
        expect(Bank.getBalance(account1)).toEqual("Account Number: 1010 Balance: $1497.60 CAD");
        let account2 = Bank.getCustomerAccount({
            "customerId": "002",
            "accountId": "5500"
        });
        expect(Bank.getBalance(account2)).toEqual("Account Number: 5500 Balance: $17300.00 CAD");
    });

    test('Case 4: Customer: Peter Griffin Customer ID: 123 Account Number: 0123 Initial balance for account\n' +
        'number 0123: $150.00 CAD.' +
        'Customer: Lois Griffin Customer ID: 456 Account Number: 0456 Initial balance for account number 0456:\n' +
        '$65,000.00 CAD\n' +
        'Peter Griffin withdraws $70.00 USD from account number 0123. Lois Griffin deposits $23,789.00 USD to\n' +
        'account number 0456. Lois Griffin transfers $23.75 CAD from account number 0456 to Peter Griffin\n' +
        '(account number 0123).', function () {
        Bank.withdrawAmount({
            "customerId": "123",
            "accountId": "0123",
            "withdraw": 70,
            "currency": "USD"
        });
        Bank.depositAmount({
            "customerId": "456",
            "accountId": "0456",
            "deposit": 23789,
            "currency": "USD"
        });
        Bank.transferAmount({
            "fromCustomerId": "456",
            "fromAccountId": "0456",
            "toCustomerId": "123",
            "toAccountId": "0123",
            "transfer": 23.75,
            "currency": "CAD"
        });
        let account1 = Bank.getCustomerAccount({
            "customerId": "123",
            "accountId": "0123"
        });
        expect(Bank.getBalance(account1)).toEqual("Account Number: 0123 Balance: $33.75 CAD");
        let account2 = Bank.getCustomerAccount({
            "customerId": "456",
            "accountId": "0456"
        });
        expect(Bank.getBalance(account2)).toEqual("Account Number: 0456 Balance: $112554.25 CAD");
    });

    test('Case 5: Customer: Joe Swanson Customer ID: 002 Account Number: 1010 Initial balance for account ' +
        'number 1010: $7,425.00 CAD. Famous social engineer and thief John Shark (Customer ID 219) attempts to withdraw $100 USD from\n' +
        'account 1010. The bank determines that the account is not John’s and refuses to give him the money.\n' +
        'Optional: The bank notifies Joe Swanson that an unauthorized user attempted to withdraw money.', function () {
        Bank.withdrawAmount({
            "customerId": "219",
            "accountId": "1010",
            "withdraw": 100,
            "currency": "USD"
        });
        let account1 = Bank.getCustomerAccount({
            "customerId": "002",
            "accountId": "1010"
        });
        expect(Bank.getBalance(account1)).toEqual("Account Number: 1010 Balance: $7425.00 CAD");
        let customer = Bank.getCustomerByAccountId("1010");
        expect(customer.notifications.pop()).toEqual("An unauthorised user attempted to withdraw the money");
    });
});