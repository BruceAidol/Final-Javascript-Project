// We will use 0 for S.I. and 1 for C.I.
const interestType = {
    si: 0,
    ci: 1
}

// We define a constructor for the compound capitals
class Capital_object{
    constructor(capital_id,capital_amount){
        this.capital_id = capital_id;
        this.capital_amount = capital_amount; 
    }
}

// Default will be S.I.
let selectedInterest = interestType.si;
localStorage.setItem('InterestType', selectedInterest);

let data_array = [];
const SIButton = document.getElementsByClassName("si")[0];
const CIButton = document.getElementsByClassName("ci")[0];
const CIFrequency = document.getElementsByClassName("ci-freq")[0];
const resultWrapper = document.getElementsByClassName("result")[0];
const linearGraphic = document.getElementsByClassName("graphic")[0];

let calculate = document.getElementsByClassName("btn")[0];

// Initially hidden

CIFrequency.style.display = 'none';
linearGraphic.style.display = 'none';
resultWrapper.style.display = 'none';

// Set interest type

const selectInterestType = (type) => {
    // reset when menu changes
    selectedInterest = type;

    if(selectedInterest != localStorage.getItem('InterestType')) {
        updateInterestFeature();
        updateGraphicResults();
    }

    localStorage.setItem('InterestType', type);
}

// reset inputs and result

const reset = () => {
    const PA = document.getElementById("pa").value = '';
    const MC = document.getElementById("mc").value = '';
    const IR = document.getElementById("ir").value = '';
    const DY = document.getElementById("dy").value = '';

    updateGraphicResults();
}

// Update UI

const updateGraphicResults = () => {
    document.getElementById('main').style.height = "100vh";
    resultWrapper.style.display = 'none';
    linearGraphic.style.display = 'none';
}

const updateInterestFeature = () => {
    if(selectedInterest === interestType.si) {
        CIButton.classList.remove('active');
        SIButton.classList.add('active');
        CIFrequency.style.display = 'none';
    }
    else {
        SIButton.classList.remove('active');
        CIButton.classList.add('active');
        CIFrequency.style.display = 'block';
    }
}

// Option values

const option_value = () => {
    let x = document.getElementById("cf").selectedIndex;
    let y = document.getElementsByTagName("option")[x].value;
    return y;
}

// Alert styles

const alertFunction = (alert_msg) => {

    // message
    const span_msg = document.querySelector('.msg');
    span_msg.innerText = alert_msg;

    const alert = document.querySelector('.alert');
    const close_btn = document.querySelector('.close-btn');

    alert.style.display = 'block';
    alert.classList.add("show");
    alert.classList.remove("hide");
    alert.classList.add("showAlert");

    setTimeout( () => {
        alert.classList.remove("show");
        alert.classList.add("hide");
        setTimeout( () => {
            alert.style.display = 'none';
        },1000);
    },2000);

    const closeAlertFunction = () => {
        alert.classList.remove("show");
        alert.classList.add("hide");
        setTimeout( () => {
            alert.style.display = 'none';
        },1000);
    };

    close_btn.addEventListener("click", closeAlertFunction );
    
}

// Calculate final amount
const calculateAmount = () => {
    const PA_value = document.getElementById("pa").value;
    const MC_value = document.getElementById("mc").value;
    const IR_value = document.getElementById("ir").value;
    const DY_value = document.getElementById("dy").value;

    const PA = parseFloat(PA_value);
    const MC = parseFloat(MC_value);
    const IR = parseFloat(IR_value);
    const DY = parseFloat(DY_value);
    const CF = parseFloat(option_value());

    data_array = [];

    // Validation

    let PAValidation = (PA_value == '') ? true : false;
    let MCValidation = (MC_value == '') ? true : false;
    let IRValidation = (IR_value == '') ? true : false;
    let DYValidation = (DY_value == '') ? true : false;

    if(PAValidation || MCValidation || IRValidation || DYValidation || ((window.getComputedStyle(CIFrequency).display !== "none") && !CF)) {
        const alert1 = "All fields are required.";
        alertFunction(alert1);
        reset();
        return;
    }

    else if(isNaN(PA_value) || isNaN(MC_value) || isNaN(IR_value) || isNaN(DY_value) || ((window.getComputedStyle(CIFrequency).display !== "none") && isNaN(CF))) {
        const alert2 = "All values typed must be numeric only.";
        alertFunction(alert2);
        reset();
        return;
    }

    else if( PA<=0 || MC<0 || IR<=0 || DY<=0 || ((window.getComputedStyle(CIFrequency).display !== "none") && CF<=0)) {
        const alert3 = ( MC<0 ) ? "The monthly contribution is greater or iqual than 0." : "All integer values typed must be greater than 0 except the monthly contribution.";
        alertFunction(alert3);
        reset();
        return;
    }


    // inner functions

    const monthly_contributionAddition = () => {
        Investment = Investment + MC;
    }

    const displayCapital = (finalCapital,NO) => {
        /* console.log(`Capital ${NO}: `); */
        /* console.log(finalCapital); */
        data_array.push(new Capital_object(NO,finalCapital));
    }

    let result = 0;
    let Investment = PA; 

    if (selectedInterest === interestType.si) {
        // Storing the elements
        displayCapital(Investment,0);

        let interest = Investment * (IR/100) * DY;
        for(i=0;i<=DY*12;i++){
            if(i!=DY*12){
                monthly_contributionAddition();
            }
        }
        result = interest + Investment;

        displayCapital(result,1);
    }
    else if (selectedInterest === interestType.ci) {

        let RN = (IR*CF)/(12*100); 
        let n = Math.floor((DY*12)/CF);

        for(let i=0;i<=(DY*12);i++) {

            if((i%CF==0)&&(i!=n*CF)) {
                let CNO = i/CF;
                displayCapital(Investment,CNO);
                Investment = Investment + Investment*RN*1
            }
            else if((i%CF==0)&&(i==n*CF)&&((DY*12)!=(n*CF))) {
                let CNO = i/CF;
                displayCapital(Investment,CNO);
                let remainder = DY*12 - CF*n;
                /* Investment = Investment + Investment*RN*(remainder/CF); */
                Investment = Investment * Math.pow(1 + RN,remainder/CF);
            }   

            if(i!=DY*12){
                monthly_contributionAddition();
            }

        }
        result = Investment;

        // Store the final amount

        if((DY*12)!=(n*CF)){
            displayCapital(result,n+1);
        }
        else if((DY*12)==(n*CF)){
            displayCapital(result,n);
        }

    }

    // show result

    const finalAmount = document.getElementsByClassName("total-amount")[0];

    // changing the style

    document.getElementById('main').style.height = "100%";
    document.getElementById('main').style.maxHeight = "1050px";
    resultWrapper.style.display = 'block';
    linearGraphic.style.display = 'block';
    finalAmount.innerHTML = result;

    // storaging data_array in JSON 

    localStorage.setItem("capitalObjects", JSON.stringify(data_array));

    console.log(JSON.stringify(data_array));
}

// Set Events

SIButton.addEventListener('click', () => {
    selectInterestType(interestType.si);
})

CIButton.addEventListener('click', () => {
    selectInterestType(interestType.ci)
})

calculate.addEventListener('click', calculateAmount);



