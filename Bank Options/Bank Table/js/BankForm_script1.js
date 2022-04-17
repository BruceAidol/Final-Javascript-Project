const capital_input = document.getElementById('capital');
const monthly_contribution_input = document.getElementById('monthly_contribution');
const form = document.getElementById('form');

let submit = document.getElementsByClassName("btn")[0];

const reset = () => {
    document.getElementById("pa").value = '';
    document.getElementById("mc").value = '';
}

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

const submitData = () => {
    const PA = document.getElementById("pa").value;
    const MC = document.getElementById("mc").value;
    let capital = parseFloat(PA);
    let monthly_contribution = parseFloat(MC);

    // Validation

    if(!PA || !MC) {
        const alert1 = "All fields are required.";
        alertFunction(alert1);
        reset();
        return;
    }

    if( capital<=0 || monthly_contribution<0 ) {
        const alert2 = ( monthly_contribution<0 ) ? "The monthly contribution is greater or iqual to 0." : "All integer values typed must be greater than 0.";
        alertFunction(alert2);
        reset();
        return;
    }

    localStorage.setItem("capital", capital);
    localStorage.setItem("monthly_contribution", monthly_contribution);

    document.location.href = "BankTable_main.html"

}

submit.addEventListener('click', submitData);