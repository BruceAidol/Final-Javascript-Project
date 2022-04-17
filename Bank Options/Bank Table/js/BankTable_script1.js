let confirm1;
let total_amount, final_amount;
let compound_frequency1;
let sel1,sel1_0;
let max_id;

class Capital_object{
    constructor(capital_id,capital_amount){
        this.capital_id = capital_id;
        this.capital_amount = capital_amount; 
    }
}

class Bank{
    constructor(bank,capital,monthly_contribution,time,interest_rate,interest_rate_variance_range,type_of_interest,compound_frequency,id){
        this.bank = bank;
        this.capital = capital;
        this.monthly_contribution = monthly_contribution;
        this.time = time;
        this.interest_rate = interest_rate;
        this.interest_rate_variance_range = interest_rate_variance_range;
        this.type_of_interest = type_of_interest;
        this.compound_frequency = compound_frequency;
        this.id = id;
        this.amount = capital;
    }
    monthlyContributionAddition(){
        this.amount = this.amount + this.monthly_contribution;
    }
    simpleInterest(){
        let total_interest,interest,i,j,total_amount;

        for(j=0;j<=Math.floor(this.time);j++){
            this.amount = this.capital;
            for(i=0;i<=j*12;i++){
                if(i!=j*12) {
                    this.monthlyContributionAddition();
                }
            }
            interest = this.capital*j*(this.interest_rate/100);
            this.amount = suma(this.amount,interest);
            displaySimpleCapital(parseFloat(this.amount.toFixed(2)),j);
        }

        if(Math.floor(this.time)!=this.time) {
            this.amount = this.capital;
            for(i=0;i<=this.time*12;i++){
                if(i!=this.time*12) {
                    this.monthlyContributionAddition();
                }
            }
            total_interest = this.capital*this.time*(this.interest_rate/100);
            this.amount = suma(this.amount,total_interest);
            displaySimpleCapital(parseFloat(this.amount.toFixed(2)),Math.ceil(this.time)); 
        }

        total_amount = this.amount;
        displayTotalAmount(total_amount);
    }
    compoundInterest(){
        let rn,n,remainder,i,CNO,total_amount;
        this.amount = this.capital;
        this.determineCompoundFrequency();

        rn = (this.interest_rate*compound_frequency1)/(12*100); 
        n = Math.floor((this.time*12)/compound_frequency1);

        for(i=0;i<=this.time*12;i++) {
            if((i%compound_frequency1==0)&&(i!=n*compound_frequency1)) {
                CNO = i/compound_frequency1;
                displayCompoundCapital(parseFloat(this.amount.toFixed(2)),CNO);
                this.amount = suma(this.amount,this.amount*rn*1);
            }

            else if((i%compound_frequency1==0)&&(i==n*compound_frequency1)&&((this.time*12)!=(n*compound_frequency1))) {
                CNO = i/compound_frequency1;
                displayCompoundCapital(parseFloat(this.amount.toFixed(2)),CNO);
                remainder = resta(this.time*12,compound_frequency1*n);
                this.amount = this.amount * Math.pow((1 + rn),remainder/compound_frequency1);
            }

            if(i!=this.time*12) {
                this.monthlyContributionAddition();
            }
        }

        CNO = CNO + 1; 
        max_id = CNO;
        displayCompoundCapital(parseFloat(this.amount.toFixed(2)),CNO);
        total_amount = this.amount;
        displayTotalAmount(total_amount);
    }
    continuousInterest(){
        let total_amount,j;
        this.amount = this.capital;
        
        /* Para el interés continuo no existe contribución mensual */

        for(j=0;j<=Math.floor(this.time);j++){
            this.amount = this.capital*Math.exp((this.interest_rate/100)*j);
            displayContinuousCapital(parseFloat(this.amount.toFixed(2)),j);
        }

        if(Math.floor(this.time)!=this.time) {
            this.amount = this.capital*Math.exp((this.interest_rate/100)*this.time);
            displayContinuousCapital(parseFloat(this.amount.toFixed(2)),Math.ceil(this.time)); 
        }

        total_amount = this.amount;
        displayTotalAmount(total_amount);
    }
    determineCompoundFrequency(){
        if(this.compound_frequency == "Mensualmente"){
            compound_frequency1 = 1;
        }
        else if(this.compound_frequency == "Bimestralmente"){
            compound_frequency1 = 2;
        }
        else if(this.compound_frequency == "Trimestralmente"){
            compound_frequency1 = 3;
        }
        else if(this.compound_frequency == "Semestralmente"){
            compound_frequency1 = 6;
        }
        else if(this.compound_frequency == "Anualmente"){
            compound_frequency1 = 12;
        }
        else{
            compound_frequency1 = null;
        }
    }
    determineTypeOfInterest(){
        if(this.type_of_interest=="Simple"){
            this.simpleInterest();
        }
        else if(this.type_of_interest=="Compuesto"){
            this.compoundInterest();
        }
        else if(this.type_of_interest=="Continuo"){
            this.continuousInterest();
        }
    }
}


const getTableData = async (capital,monthly_contribution) => {
    const BankURL = 'js/fetch/Table_data/data.json';
    const result = await fetch(BankURL);
    const banks_data = await result.json();

    banks_data.forEach( (element) => {
        if(element.type_of_interest == 'Continuo'){
            banks.push(new Bank(element.bank,capital,0,element.time,element.interest_rate,element.interest_rate_variance_range,element.type_of_interest,element.compound_frequency,element.id));
        }
        else {
            banks.push(new Bank(element.bank,capital,monthly_contribution,element.time,element.interest_rate,element.interest_rate_variance_range,element.type_of_interest,element.compound_frequency,element.id));
        }
    });

    localStorage.setItem('bank_elements',JSON.stringify(banks_data));

}

const storeData = (array,table_body,bank_name_sr_array) => {
    let i,element;
    for(i=0;i<array.length;i++){
        element = `<td>${array[i].bank}</td>
                   <td>$${array[i].capital}</td>
                   <td>$${array[i].monthly_contribution}</td>
                   <td>${array[i].time} years</td>
                   <td>${array[i].interest_rate}%</td>
                   <td>${array[i].interest_rate_variance_range}%</td>
                   <td>${array[i].type_of_interest}</td>
                   <td>${array[i].compound_frequency}</td>`;

        const tr1 = document.createElement("tr");
        tr1.innerHTML = element;

        /* Definimos las clases */
        let bank_name_sr = array[i].bank.split(' ').join('');
        tr1.className = bank_name_sr;

        /* Los integramos en un array */
        bank_name_sr_array.push(tr1.className);

        /* Definimos los ids */
        tr1.setAttribute('id',`${i}`);

        table_body.appendChild(tr1);
    }
}

const removeIdAttribute = (collection) => {
    let trs = collection.getElementsByTagName("tr");
    for(const tr of trs) {
        tr.removeAttribute('id');
    }
}

const addBankButtons = (array,tbody) => {

        let buttons_creation = `<td>
                                <button class="add"> ADD </button>
                                <button class="delete"> DELETE </button>
                                </td>`

        let tbody_id = tbody.getAttribute("id");     
        let table_data_classes = document.querySelectorAll(`#${tbody_id} tr`);

    for(i=0;i<array.length;i++){
        table_data_classes[i].insertAdjacentHTML("beforeend", buttons_creation);
    }
}
const addBankSelectedButtons = (array,tbody) => {

        let buttons_creation = `<td>
                                <button class="delete"> DELETE </button>
                                </td>`

        let tbody_id = tbody.getAttribute("id");
        let table_data_classes = document.querySelectorAll(`#${tbody_id} tr`);

    for(i=0;i<array.length;i++){
        table_data_classes[i].insertAdjacentHTML("beforeend", buttons_creation);
    }
}

const removeItems = (array,tbody) => {
    let i;
    for(i=0;i<array.length;i++){
        tbody.removeChild(tbody.childNodes[0]);
    }
}

const displaySimpleCapital = (capital,NO) => {
    simple_objects_array.push(new Capital_object(NO,capital));
}

const displayCompoundCapital = (capital,NO) => {
    compound_objects_array.push(new Capital_object(NO,capital));
}

const displayContinuousCapital = (capital,NO) => {
    continuous_objects_array.push(new Capital_object(NO,capital));
}   

const displayTotalAmount = (captf) => {
    console.log(`Monto final: ${captf}`);
}

const suma = (a,b) => a+b;
const resta = (a,b) => a-b;

let simple_objects_array = [];
let compound_objects_array = [];
let continuous_objects_array = [];
let banks = [];
let banks_selection = [];
let bank_name_sr_array1 = [];
let bank_name_sr_array2 = [];
const tbody1 = document.getElementById("banks");
const tbody2 = document.getElementById("banks_selected");

const main = async () => {

    let capital = parseFloat(localStorage.getItem('capital'));
    let monthly_contribution = parseFloat(localStorage.getItem('monthly_contribution'));

    banks = [];
    banks_selection = [];
    bank_name_sr_array1 = [];

    await getTableData(capital,monthly_contribution);
    storeData(banks,tbody1,bank_name_sr_array1);
    addBankButtons(banks,tbody1);

}

mainProject = async () => {

    await main();
    console.log("Iniciando con la simulación");

}

/* Programa */

mainProject();



