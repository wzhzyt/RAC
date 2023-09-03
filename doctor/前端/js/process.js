function get_processes(data) {
    var p1 = $('<div class="alert alert-primary alert-dismissible fade show" role="alert" id="p1"></div>').text(data.p1);
    var btn = $('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>');

    window.setTimeout(function () {
        $("#alerts").append(p1);
    }, 1000);
    window.setTimeout(function () {
        $("#p1").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 3000);
    var p2 = $('<div class="alert alert-primary alert-dismissible fade show" role="alert" id="p2"></div>').text(data.p2);
    // $("#p2").append(btn);
    window.setTimeout(function () {
        $("#alerts").append(p2);
        // $("#p2").append(btn);
    }, 1000);
    // $("#p2").append(btn);
    window.setTimeout(function () {
        $("#p2").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 3000);
    var p3 = $('<div class="alert alert-primary alert-dismissible fade show" role="alert" id="p3"></div>').text(data.p3);
    window.setTimeout(function () {
        $("#alerts").append(p3);
        // $("#p3").append(btn);
    }, 1000);
    // $("#p3").append(btn);
    window.setTimeout(function () {
        $("#p3").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 3000);

    var p4 = $('<div class="alert alert-primary alert-dismissible fade show" role="alert" id="p4"></div>').text(data.p4);
    window.setTimeout(function () {
        $("#alerts").append(p4);
        // $("#p3").append(btn);
    }, 1000);
    // $("#p3").append(btn);
    window.setTimeout(function () {
        $("#p4").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 3000);

    var p5 = $('<div class="alert alert-primary alert-dismissible fade show" role="alert" id="p5"></div>').text(data.p5);
    window.setTimeout(function () {
        $("#alerts").append(p5);
        // $("#p3").append(btn);
    }, 1000);
    // $("#p3").append(btn);
    window.setTimeout(function () {
        $("#p5").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 3000);
}

function get_process(data){
    var p1 = $('<div class="alert alert-primary alert-dismissible fade show" role="alert" id="p1"></div>').text(data);
    var btn = $('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>');

    window.setTimeout(function () {
        $("#alerts").append(p1);
    }, 0);
    window.setTimeout(function () {
        $("#p1").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 2000);
}