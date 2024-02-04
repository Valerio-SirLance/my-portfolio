document.addEventListener("DOMContentLoaded", () => {
    const userNameInput = document.getElementById('user_name');
    const userCommentInput = document.getElementById('user_comment');
    const commentButton = document.getElementById('comment_button');
    const commentList = document.getElementById('comment_list');
    const displayCheckbox = document.getElementById('display_latest_checkbox');
    let commentsArray = [];

    function updateCommentList() {
        const displayLatest = displayCheckbox.checked;

        commentsArray.sort((a, b) =>
            displayLatest ? b.timestamp - a.timestamp :
                a.timestamp - b.timestamp
        );

        commentList.innerHTML = '';

        for (const comment of commentsArray) {
            const listComment = document.createElement('li');
            listComment.classList.add('comment-container');
            listComment.innerHTML = `${comment.userName}
                <p>${comment.userComment}</p>`;
            commentList.appendChild(listComment);
        }
    }

    commentButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        const userComment = userCommentInput.value.trim();
        const timestamp = new Date();

        if (userName && userComment) {
            const comment = { userName, userComment, timestamp };
            commentsArray.push(comment);
            updateCommentList();
            userNameInput.value = '';
            userCommentInput.value = '';
        }
    });

    displayCheckbox.addEventListener('change', () => {
        updateCommentList();
    });

    updateCommentList();

    $("#carousel").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // Set the speed of the carousel
        dots: true, // Display navigation dots
    });
});

document.getElementById("bgm").addEventListener("click", () => {
    const audio = document.getElementById("background_music");
    audio.play();
});

function toggleNav() {
    const navContainer = document.getElementById('navigation_container');
    const cloverLogo = document.getElementById('clover_logo');

    navContainer.classList.toggle('open');

    cloverLogo.style.left = navContainer.classList.contains('open') ?
        '190px' : '20px';

    if (!navContainer.classList.contains('open')) {
        navContainer.style.left = '-250px';
        return;
    }

    navContainer.style.left = '0';
}

$(document).ready(function(){
    $("#carousel-likes").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    $("#carousel-works").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    $("#carousel-pics").slick({
        infinite: true,
        slidesToShow: 2, 
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        centerMode: true,  
        centerPadding: '0%', 
    });

    $("#carousel-future").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    $("#carousel-goals").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });
});
