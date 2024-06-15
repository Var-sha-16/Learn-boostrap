

document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            updatePieChart(data.pieChart)
            createChart(data.chartData);
            updateHeader(data.headerData);
          updateTreemap(data.treemap)
            updateDetails(data)
            updateCurrent(data.currentData)
         updateCredentails(data.credatials)
            updateCheck(data.dataCheck)
        });
});
function updateCredentails(data) {
    const name = document.getElementById('user-id');
    const img = document.getElementById('user-image');
  
name.textContent=data.username;
img.src=data.userprofilepic;


}
function createChart(data) {
    const ctx = document.getElementById('marketChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 123, 255, .8)'); 
    gradient.addColorStop(.5, 'rgba(255, 255, 225, .01)');
    const marketChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Nifty',
                data: data.values,
                backgroundColor: gradient,
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 2,
                pointRadius: 3,
                fill: true,
                tension: .6
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.raw;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: false
                    },
                    
                },
                y: {
                    display: true,
                    title: {
                        display: false
                    },
                    beginAtZero: false,
                    ticks: {
                        stepSize: 100,
                        callback: function(value, index, values) {
                            return value;
                        }
                    },
                    suggestedMin: 19300,
                    suggestedMax: 19700
                }
            }
        }
    });
}


function createChart(data) {
    const ctx = document.getElementById('marketChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 123, 255, .8)'); 
    gradient.addColorStop(.5, 'rgba(255, 255, 225, .01)'); 
    const marketChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Nifty',
                
                data: data.values,
                backgroundColor: gradient,
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 2,
                pointRadius: 3,
                fill: true,
                tension: .6
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                   
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.raw;
                        }
                    }
                },
                
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: false
                    },
                    
                },
                y: {
                    display: true,
                    title: {
                        display: false
                    },
                    beginAtZero: false,
                    ticks: {
                        stepSize: 100,
                        callback: function(value, index, values) {
                            return value;
                        }
                    },
                    suggestedMin: 19300,
                    suggestedMax: 19700
                }
            }
        }
    });
}

function updateHeader(data) {
    const headDiv = document.getElementById('equity-rate');
    headDiv.innerHTML = `
        <h1>${data.equityrate}</h1>
        <p>${data.today}</p>
    `;

    const headDivsec = document.getElementById('commodity-rate');
    headDivsec.innerHTML = `
        <h1>${data.commodityrate}</h1>
        <p>${data.today}</p>
    `;
    const headDivInvested = document.querySelectorAll('.invested');
    headDivInvested.forEach(element => {
       element.innerText= data.invested;
    });
   
    const headDivCurrent = document.querySelectorAll('.current');
    headDivCurrent.forEach(element => {
        element.innerText= data.current;
     });
    
    
}
function updateDetails(data) {
    const details = document.getElementById('details');
    details.innerHTML = '';  
    const detailsData = data.detailsData;
    const keys = Object.keys(detailsData);
    let containerDiv = null;

    keys.forEach((key, index) => {
        if (index % 3 === 0) {
            if (containerDiv) {
                details.appendChild(containerDiv);
            }
            containerDiv = document.createElement('div');
            containerDiv.className = `container-${Math.floor(index / 3) + 1}`;
        }

        const div = document.createElement('div');
        const h5 = document.createElement('h5');
        h5.innerText = formatText(key.charAt(0).toUpperCase() + key.slice(1));
        const p = document.createElement('p');
        p.innerText = detailsData[key];  
        p.id = key;
        
        const span = document.createElement('span'); 
        span.innerText = key === 'equity' ? ` (${data.headerData.equityrate})` : key === 'commodities' ? ` (${data.headerData.commodityrate})` : key === "totalHoldings" ? ` (${data.headerData.netrate})`:'' 
        p.appendChild(span); 
        
        div.appendChild(h5);
        div.appendChild(p);
        containerDiv.appendChild(div);
    });

    if (containerDiv) {
        details.appendChild(containerDiv);
    }
}

function formatText(text) {
    return text.replace(/([A-Z])/g, ' $1').trim();
}


function updateChart(timeframe) {
    console.log(`Timeframe changed to: ${timeframe}`);
}
var width = document.getElementById('treemap').offsetWidth;
var height = document.getElementById('treemap').offsetHeight;

function updateTreemap(data){
var svg = d3.select("#treemap")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0,0)");

var root = d3.hierarchy(data)
    .sum(function(d) { return d.value; }); 
d3.treemap()
    .size([width, height])
    .padding(0)
    (root);

svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
  
    .attr('y', function(d) { return d.y0; })
    .attr('x', function(d) { return d.x0; })
    .attr('height', function(d) { return d.y1 - d.y0; })
    .attr('width', function(d) { return d.x1 - d.x0; })
    .style("fill", function(d) { return d.data.color; });

svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", function(d) { return d.x0 + (d.x1 - d.x0) / 2; }) 
    .attr("y", function(d) { return d.y0 + (d.y1 - d.y0) / 2; })
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
     .text(function(d) { return d.data.name; })
    .attr("font-size", "13px")
    .attr("fill", "white");
}
function updateCurrent(data) {
    const dataContainer = document.getElementById('current-data');
    console.log(data);
    let currentData = data;

    for (let key in currentData) {
        if (currentData.hasOwnProperty(key)) {
            const dataItem = currentData[key];
            const itemDiv = document.createElement('div');
            itemDiv.className = 'data-item';

            const firstFourDiv = document.createElement('div');
            firstFourDiv.className = 'first-four';
            const lastThreeDiv = document.createElement('div');
            lastThreeDiv.className = 'last-three';

            let count = 0;

            for (let prop in dataItem) {
                if (dataItem.hasOwnProperty(prop)) {
                    const propValue = dataItem[prop];
                    const propElement = document.createElement(getElementTag(prop));

                    if (prop === 'sectorRate' && (propValue.startsWith('+') || propValue.startsWith('-'))) {
                        const rateSpan = document.createElement('div');
                        rateSpan.textContent = `(${propValue})`;
                        rateSpan.className = propValue.startsWith('+') ? 'green-rate' : 'red-rate';
                        propElement.appendChild(rateSpan);

                        if (count < 4) {
                            firstFourDiv.appendChild(propElement);
                        } else {
                            lastThreeDiv.appendChild(propElement);
                        }

                         const companyRateElement = document.createElement('div');
                        companyRateElement.textContent = dataItem['companyRate'];
                        companyRateElement.className = propValue.startsWith('+') ? 'green-rate' : 'red-rate';
                        if (count < 4) {
                            firstFourDiv.appendChild(companyRateElement);
                        } else {
                            lastThreeDiv.appendChild(companyRateElement);
                        }
                    } else if (prop !== 'companyRate') {
                        propElement.textContent = `${propValue}`;
                        propElement.className = getClassNames(prop);
                        if (count < 4) {
                            if (prop === 'sectorName') {
                                const h5Element = document.createElement('h5');
                                h5Element.appendChild(propElement);
                                firstFourDiv.appendChild(h5Element);
                            } else {
                                firstFourDiv.appendChild(propElement);
                            }
                        } else {
                            if (prop === 'companyName') {
                                const h1Element = document.createElement('h1');
                                h1Element.appendChild(propElement);
                                lastThreeDiv.appendChild(h1Element);
                            } else {
                                lastThreeDiv.appendChild(propElement);
                            }
                        }
                    }
                    count++;
                }
            }

            itemDiv.appendChild(firstFourDiv);
            itemDiv.appendChild(lastThreeDiv);
            dataContainer.appendChild(itemDiv);
        }
    }
}


function getElementTag(property) {
    switch(property) {
        case 'qty':
            return 'span';
        case 'nameSector':
            return 'span';
        case 'sectorRate':
        case 'nameCompany':
            return 'h3';
        case 'companyRate':
        case 'Avg':
        case 'ltp':
            return 'p';
        default:
            return 'div';
    }
}


function getClassNames(property) {
    switch(property) {
        case 'qty':
            return 'quantity';
        case 'nameSector':
            return 'sector-name';
        case 'sectorRate':
            return 'sector-rate';
        case 'nameCompany':
            return 'company-name';
        case 'companyRate':
            return 'company-rate';
        case 'Avg':
            return 'average';
        case 'ltp':
            return 'ltp';
        default:
            return '';
    }
}

function  updatePieChart(data){
    let ctxc = document.getElementById('myChart').getContext('2d');
    let chartInstance;


    Chart.register({
      id: 'centerTextPlugin',
      beforeDraw: function(chart) {
       

        ctxc.restore();
        let fontSize = 10;  
    
        ctxc.font = fontSize + "px sans-serif";
        ctxc.textBaseline = "middle";

        let text = "Stock Holdings",
            textX = Math.round((width - ctxc.measureText(text).width) / 2-50),
            textY = height / 2+20 ;

        let subText = "(45)",
            subTextX = Math.round((width - ctxc.measureText(subText).width) / 2-50),
            subTextY = height / 2+40 ;

        ctxc.fillText(text, textX, textY);
        ctxc.fillText(subText, subTextX, subTextY);
        ctxc.save();
      }
    });


    var myChart = new Chart(ctxc, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [{
          label: '# of Holdings',
          data: data.data,
          backgroundColor: [
            'lightskyblue',
            'rgb(219, 219, 95)',
            'rgb(34, 114, 232)',
            'orange',
            'rgb(136, 2, 198)',
            'rgb(6, 188, 79)',
            'red',
            'rgb(182, 20, 231)',
            'lightblue',
            'blue',
            'rgb(36, 148, 228)'
          ],
          borderWidth: 1,
          hoverOffset: 40,
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: {
position:'bottom',
labels: {
      boxWidth: 0,
      color:'white' 
    },
},
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' Holdings';
              }
            }
          }
        },
     
      },
    });

  
  }
  
function updateCheck(data){
    const chartContainer = document.querySelector('.chart-container-brick');
let datamap=data;
    datamap.forEach(cell => {
        const div = document.createElement('div');
        div.className = `chart-cell ${cell}`;
        chartContainer.appendChild(div);
      });
}