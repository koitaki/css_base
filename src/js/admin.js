
$(document).ready(() => {
    $('a').click((e) => {
        alert('you are in the admin section');
        e.prevetDefault();
        });
    });
