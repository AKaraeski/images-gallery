$(document).ready( function () {
    let imgCount = $('#images').children().length;
    let pagUnit = 125 / imgCount;
    // arrange images
    let array = Array.from($('#images').children());
    for (let i = 1; i < imgCount+1; i++) {
        let num = ('0' + i).slice(-2);
        let name = array[i-1].getAttribute('data-name');
        // numbering images
        array[i-1].setAttribute('data-pag', num);
        // set values
        $('#pagContainer').append(`<span>${num}</span>`);
        $('#namesContainer').append(`<h1>${name}</h1>`);
    }
    // set total number of pagination
    $('#totalNum').append(('0' + imgCount).slice(-2))

    $('.image:last').addClass('turned').css({display: 'none'});
    // previous button
    $('#prev').click(()=> {
        $('.image:last').prependTo('#images').fadeIn(300).removeClass('turned')
        $('.image:last').addClass('turned').css({display: 'none'});
        update();
        prevSlide($('#namesContainer'), 105);
        prevSlide($('#pagContainer'), 24);
    });
    // next button
    $('#next').click(()=> {
        $('.image:first').addClass('turned').delay(200).fadeOut(400, ()=> {
            $('.image:first').appendTo('#images');
            update();
        });
        $('.image:last').removeClass('turned').delay(100).fadeIn(400);
        nextSlide($('#namesContainer'), 105);
        nextSlide($('#pagContainer'), 24);
    });
    // previous item in carousel
    function prevSlide(target, value) {
        let translateY = new WebKitCSSMatrix(window.getComputedStyle(target[0]).transform).f;
        translateY = translateY + value;
        if (translateY > 0) {
            translateY = -(value*imgCount) + value;
            target.css({
                transform: `translateY(${translateY}px)`
            })
        } else {
            target.css({
                transform: `translateY(${translateY}px)`
            })
        }
    }
    // next item in carousel
    function nextSlide(target, value) {
        let translateY = new WebKitCSSMatrix(window.getComputedStyle(target[0]).transform).f;
        translateY = translateY - value;
        if (translateY < -(value*imgCount) + value) {
            translateY = 0;
            target.css({
                transform: `translateY(${translateY}px)`
            })
        } else {
            target.css({
                transform: `translateY(${translateY}px)`
            })
        }
    }
    // update bg, zindex and pagination stroke
    function update() {
        function pagination() {
            let pag = parseInt($('.image:first')[0].getAttribute('data-pag'));
            $('#stroke')[0].style.height = `${pag*pagUnit}px`;
        }
        pagination();
        function setZIndex() {
            let imgArr = $('#images').children();
            let zindex = imgCount;
            let angle = -12;
            for (let imgIndex = 0; imgIndex < imgCount; imgIndex++) {
                imgArr.eq(imgIndex).css({
                    zIndex: zindex,
                    transform: `rotateZ(${angle}deg)`
                })
                zindex--;
                angle = angle +6;
            }    
        }
        setZIndex();
    }
    update();
});
