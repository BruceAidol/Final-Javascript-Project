let series_array = [];
let simple_capitals_array = [];
let compound_capitals_array = [];
let continuous_capitals_array = [];
let xArray = [];
let max_time = 0;
let id_indexes;

class Series_object{
    constructor(name,data){
        this.name = name;
        this.data = data; 
    }
}

const analizeButtonFunction = async () => {

    if(banks_selection.length == 0) {
        alert("¡Debe haber al menos una fila de los datos de la tabla superior!");
    }
    else {
        series_array = [];
        max_time = 0;

        for (const bank_element of banks_selection) {

            simple_objects_array = [];
            compound_objects_array = [];
            continuous_objects_array = [];

            console.log(`${bank_element.bank}`);              /* Optional */
            bank_element.determineCompoundFrequency();
            bank_element.determineTypeOfInterest();

            if(bank_element.type_of_interest == "Simple") {
                simple_capitals_array = [];
                simple_objects_array.forEach( (e) => {
                    simple_capitals_array.push(e.capital_amount);
                })
                series_array.push(new Series_object(bank_element.bank, simple_capitals_array));
            }
            else if(bank_element.type_of_interest == "Compuesto") {
                compound_capitals_array = [];
                compound_objects_array.forEach( (e) => {
                    if((e.capital_id%(12/compound_frequency1))==0){
                        compound_capitals_array.push(e.capital_amount);
                    }              
                    else if(e.capital_id == max_id && (e.capital_id%(12/compound_frequency1)!=0)) {
                        compound_capitals_array.push(e.capital_amount);
                    }
                })
                series_array.push(new Series_object(bank_element.bank, compound_capitals_array));
            }
            else if(bank_element.type_of_interest == "Continuo") {
                continuous_capitals_array = [];
                continuous_objects_array.forEach( (e) => {
                    continuous_capitals_array.push(e.capital_amount);
                })
                series_array.push(new Series_object(bank_element.bank, continuous_capitals_array));
            }

            if(bank_element.time >= max_time) {
                max_time = bank_element.time;
            }
        }
        id_indexes = Math.ceil(max_time);

        for(let i=0;i<=id_indexes;i++) {
            xArray.push(`Year ${i}`);
        }
        console.log(series_array);
        displayLinearGraphic();
    }
}

const displayLinearGraphic = () => {

    highcharts_figure.style.display = 'block';

    Highcharts.chart('linear_graphic_container', {

        title: {
            text: 'Total Savings'
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: { 
                text: 'US Dollars ($)'
            }
        },

        xAxis: {
            categories: xArray
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
            }
        },

        series: series_array,
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}

const submitData = () => {

    PA_value = document.getElementsByClassName("capital")[0].value;
    MC_value = document.getElementsByClassName("monthly_contribution")[0].value;

    const PA = parseFloat(PA_value);
    const MC = parseFloat(MC_value);

    let PAValidation = (PA_value == '') ? true : false;
    let MCValidation = (MC_value == '') ? true : false;

    if(PAValidation || MCValidation) {
        const alert1 = "You need to complete both spaces.";
        alertFunction(alert1);
        return;
    }
    else if( PA<=0 || MC<0 ) {
        let alert2;
        if(MC<0) {
            alert2 = "The monthly contribution is greater or iqual than 0."
        } 
        else if(PA<=0) {
            alert2 = "The capital is greater than 0."
        } 
        alertFunction(alert2);
        return;
    }

    capital = PA;
    monthly_contribution = MC;

    localStorage.setItem("capital", capital);
    localStorage.setItem("monthly_contribution", monthly_contribution);

    removeItems(banks,tbody1);
    removeItems(banks_selection,tbody2);

    highcharts_figure.style.display = 'none';

    main();

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

/* defining variables for the DOM */

const analize_button = document.getElementsByClassName("analize")[0];
const submit_button = document.getElementsByClassName("submit")[0];
const highcharts_figure = document.getElementsByClassName("highcharts-figure")[0];

analize_button.addEventListener('click', analizeButtonFunction );
submit_button.addEventListener('click', submitData );