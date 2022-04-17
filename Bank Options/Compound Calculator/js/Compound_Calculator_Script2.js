const tableFunction = () => {

    capitalsArray = [];
    idArray = [];

    const capitalObjectCall = localStorage.getItem("capitalObjects"); 
    const storedObjects = JSON.parse(capitalObjectCall);

    for (const object of storedObjects){

        const { 
            capital_id: id, 
            capital_amount: capital, 
        } = object;
        
        capitalsArray.push(capital);  
        idArray.push(`Capital ${id}`);  
    }

    displayLinearGraphic();
}

const displayLinearGraphic = () => {

    Highcharts.chart('linear_graphic_container', {

        title: {
            text: 'Total Savings'
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: { 
                text: 'US Dollars'
            }
        },

        xAxis: {
            categories: idArray
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

        series: [{
            name: 'Capital',
            /*
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            */
            data: capitalsArray
        }],

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

// Defining elements

let capitalsArray = [];
let idArray = [];

calculate.addEventListener('click', tableFunction);
