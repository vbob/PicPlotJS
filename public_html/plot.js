$(function () {
    var chart = c3.generate({
        data: {
            columns: [],
            type: 'spline'
        },
        tooltip: {
            show: false
        },
        axis: {
            y: {
                max: 5000,
                min: 0,
                label: "Milivolts (mV)"
            },
            x: {
                label: 'Count'
            }
        },
        point: {
            show: false
        },
        grid: {
            y: {
                show: true
            }
        },
        transition: {
            duration: 0
        }
    });

    setInterval(() => {
        $.get("/reads", function (data, status) {
            chart.load({
                columns: data
            });
        })
    }, 200)

});