$(function () {
    var chart = c3.generate({
        data: {
            columns: [

            ],
            type: 'spline'
        },
        axis: {
            tick: {
                culling: {
                    max: 4 // the number of tick texts will be adjusted to less than this value
                }
                // for normal axis, default on
                // for category axis, default off
            },
            y: {
                max: 5000,
                min: 0,
                // Range includes padding, set 0 if no padding needed
                // padding: {top:0, bottom:0}
            }
        },
        point: {
            show: false
        },
        grid: {
            x: {
                show: false
            },
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