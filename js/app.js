function main_function() {
    var getShapeId, getShapeIdOnClick, error_info = $(".error-info"),
        divClone = $(".container").clone();
    $("g").hover(function() {
        $(this).css("cursor", "pointer")
    });
    $(".draggable").draggable({
        handle: "g",
        zIndex: 100,
        helper: function() {
            $copy = $(this).clone();
            return $copy.css({
                opacity: "0.9",
            });
        },
        appendTo: ".main-container",
        containment: [90, 65, 780, 495],
        revert: "invalid",
        start: function() {
            $(this).css({
                opacity: "0.2",
                cursor: "no-drop"
            })
            if (getShapeId) {
                $('.' + getShapeId).addClass("hide");
            }
            if (getShapeIdOnClick) {
                $('.' + getShapeIdOnClick).addClass("hide");
            }
            if (error_info) {
                $(".error-info").addClass("hide");
            }
            getShapeId = ($(this).attr("id"));
        },
        stop: function() {
            if (($(this).closest("div").attr('id')) == "droppable") {
                $(this).css("cursor", "no-drop");
            }
            if ((($(this).closest("div").attr('id')) == "box-container") || (($(this).closest("div").attr('id')) == "circle-container")) {
                $(this).css({
                    opacity: 1,
                    cursor: "default"
                });
                $(".error-info").removeClass("hide");
                $('.' + getShapeIdOnClick).addClass("hide");
                $('.' + getShapeId).addClass("hide");
            }
        }
    });
    $(".draggable1").draggable({
        containment: [300, 65, 985, 495]
    });
    $("#droppable").droppable({
        accept: ".draggable",
        tolerence: "fit",
        activeClass: "drop-active-class",
        hoverClass: "drop-hover",
        drop: function() {
            $('.reset-btn').removeClass('hide').addClass('show');
            $('.' + getShapeId).removeClass("hide");
            $(this)
                .find("p")
                .html(" ").draggable('disable');
        },
        create: function() {
            $(".error-info").removeClass("hide");
            /*console.log("create " + $(this).closest("div").attr('id'));*/
        }
    });
    $("#droppable").on("click", "g", function() {
        if (getShapeIdOnClick) {
            $('.' + getShapeIdOnClick).addClass("hide");
        }
        getShapeIdOnClick = $(this).closest("svg").attr("id");
        $('.' + getShapeId).addClass("hide");
        $('.' + getShapeIdOnClick).removeClass("hide");
        $(".error-info").addClass("hide");
    });
    $(document).keydown(function(e) {
        if (e.ctrlKey == true && (e.which == '61' || e.which == '107' || e.which == '173' || e.which == '109' || e.which == '187' || e.which == '189')) {
            alert('Zooming is disabled');
            e.preventDefault();
        }
    });
    $(window).bind('mousewheel DOMMouseScroll', function(e) {
        if (e.ctrlKey == true) {
            alert('Zooming is disabled');
            e.preventDefault();
        }
    });
    $(".reset-btn").on("click", function() {
        alert("Do you want to Reset..?");
        $(".container").replaceWith(divClone);
        $(".container").removeClass("hide").addClass("show");
        main_function();
    });
}
