"use strict";

let app = {};


app.data = {    
    data: function() {
        return {
            val1: 0,
            val2: 0,
            val3: 0,
            val7: 0,
            val8: 0,
            val11: 0,
            married: false,
            rates: [[10, 0, 0],
             [12, 11000, 22000],
             [22, 44725, 89450],
             [24, 95375, 190750],
             [32, 182100, 364200],
             [35, 231250, 462500],
             [37, 578125, 693750]]
        };
    },
    methods: {
        updateValue: function(event, propertyName) {
            this[propertyName] = parseFloat(event.target.value) || 0;
            console.log("press");
            this.recalcTax();
        },
        updateMarriedStatus: function(event) {
            this.married = event.target.checked;
            this.recalcTax();
        },
        recalcTax: function() {
            console.log("into")
            let grossIncome = this.val1 + this.val2 + this.val3;
            console.log("grossIncome: " + grossIncome);
            let marriedStatus = this.married;
            let spousalMoney = 13850;
            if (marriedStatus) {
                spousalMoney = 27700;
            }
            let taxableIncome = grossIncome - spousalMoney;
            if (taxableIncome < 0) {
                taxableIncome = 0;
            }
            let totalPayments = this.val7 + this.val8;
            let tax = this.taxFunction(taxableIncome, marriedStatus, this.rates);
            let totalTax = tax + this.val11;
            let refund = 0;
            let owe = 0;
            if (totalPayments >= totalTax) {
                refund = totalPayments - totalTax;
            }
            else if (totalTax > totalPayments) {
                owe = totalTax - totalPayments;
            }
            this.updateFields(grossIncome, taxableIncome, spousalMoney, totalPayments, tax, totalTax, refund, owe);
        },
        taxFunction: function(taxableIncome, marriedStatus, rates) {
            for (let i = 6; i >= 0; i--) {
                if((taxableIncome >= rates[i][1] && marriedStatus == false) || (taxableIncome >= rates[i][2] && marriedStatus == true)) {
                    console.log("i is " + i);
                    console.log("tax is: " + (taxableIncome * (rates[i][0] / 100)));
                    console.log("rate is: " + (rates[i][0]));
                    return taxableIncome * (rates[i][0]/100);
                }
            }
            return 0;
        },
        updateFields: function(grossIncome, taxableIncome, spousalMoney, totalPayments, tax, totalTax, refund, owe) {
            document.getElementById('gross-income').value = grossIncome;
            document.getElementById('taxable-income').value = taxableIncome;
            document.getElementById('spousal-money').value = spousalMoney;
            document.getElementById('total-payments').value = totalPayments;
            document.getElementById('tax').value = tax;
            document.getElementById('total-tax').value = totalTax;
            document.getElementById('refund').value = refund;
            document.getElementById('owe').value = owe;
        }
    }
};

app.vue = Vue.createApp(app.data).mount("#app");
//app.vue.recompute();