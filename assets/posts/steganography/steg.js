var range = document.getElementById('lsb-bits');


noUiSlider.create(range, {
    start: [ 0 ], // 4 handles, starting at...
    //margin: 300, // Handles must be at least 300 apart
    //limit: 8, // ... but no more than 600
    //connect: true, // Display a colored bar between the handles
    //direction: 'ltr', // Put '0' at the bottom of the slider
    orientation: 'horizontal', // Orient the slider vertically
    //behaviour: 'tap-drag', // Move handle on tap, bar is draggable
    step: 1,
//    tooltips: true,
    // format: wNumb({
    //     decimals: 0
    // }),
    range: {
        'min': 0,
        'max': 7,
    },
    // pips: { // Show a scale with the slider
    //     mode: 'steps',
    //     stepped: true,
    //     density: 4
    // }
});

range.noUiSlider.on('slide', updateRange);

function updateRange() {
    imgs = document.getElementsByClassName('len');
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].classList.remove('db');
        imgs[i].classList.add('dn');
    }

    new_val = Math.floor(range.noUiSlider.get());
    new_img = document.getElementById('len'+new_val);
    new_img.classList.remove('dn');
    new_img.classList.add('db');
    new_txt = document.getElementById('len_text'+new_val);
    new_txt.classList.remove('dn');
    new_txt.classList.add('db');

    document.getElementById('p-bits').innerHTML = new_val;
    document.getElementById('c-bits').innerHTML = 8-new_val;    
}

