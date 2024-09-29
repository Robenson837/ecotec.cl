let chart;

async function fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data.feeds.map(feed => ({
        created_at: new Date(feed.created_at),
        temperature: parseFloat(feed.field1),
        humidity: parseFloat(feed.field2)
    }));
}

function updateChart(data) {
    const ctx = document.getElementById('chart').getContext('2d');
    
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.created_at.toLocaleTimeString()),
            datasets: [{
                label: 'Temperatura (°C)',
                data: data.map(d => d.temperature),
                borderColor: 'red',
                fill: false
            }, {
                label: 'Humedad (%)',
                data: data.map(d => d.humidity),
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateCurrentData(data) {
    const lastData = data[data.length - 1];
    document.getElementById('tempActual').textContent = lastData.temperature.toFixed(1);
    document.getElementById('humedadActual').textContent = lastData.humidity.toFixed(1);
}

async function updateData() {
    const data = await fetchData();
    updateChart(data);
    updateCurrentData(data);
}

document.getElementById('riegoOn').addEventListener('click', () => {
    // Aquí iría la lógica para encender el riego
    console.log('Riego encendido');
});

document.getElementById('riegoOff').addEventListener('click', () => {
    // Aquí iría la lógica para apagar el riego
    console.log('Riego apagado');
});

updateData();
setInterval(updateData, 60000); // Actualiza cada minuto