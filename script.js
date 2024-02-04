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
            listComment.innerHTML = `<h4>${comment.userName}</h4>
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
        autoplaySpeed: 2000, 
        dots: true, 
    });
});

document.getElementById("bgm").addEventListener("click", () => {
    const audio = document.getElementById("background_music");
    audio.play();
});

function toggleNav() {
    const navContainer = document.getElementById('navigation_container');
    const cloverLogo = document.getElementById('clover_logo');

    if (navContainer.classList.contains('open')) {
        closeNav();
    } else {
        openNav();
    }
}

function openNav() {
    const navContainer = document.getElementById('navigation_container');
    const cloverLogo = document.getElementById('clover_logo');

    navContainer.classList.add('open');
    navContainer.style.left = '0';
    document.addEventListener('mousedown', closeNavOnClickOutside);
    cloverLogo.addEventListener('mousedown', closeNavOnClickLogo);
    cloverLogo.style.left = '230px';
}

function closeNav() {
    const navContainer = document.getElementById('navigation_container');
    const cloverLogo = document.getElementById('clover_logo');

    navContainer.classList.remove('open');
    navContainer.style.left = '-300px';
    document.removeEventListener('mousedown', closeNavOnClickOutside);
    cloverLogo.style.left = '40px';
}

function closeNavOnClickOutside(event) {
    const navContainer = document.getElementById('navigation_container');
    const target = event.target;

    if (!navContainer.contains(target)) {
        closeNav();
    }
}

function closeNavOnClickLogo(event) {
    const navContainer = document.getElementById('navigation_container');
    const cloverLogo = document.getElementById('clover_logo');

    if (event.target === cloverLogo) {
        closeNav();
    }
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
        slidesToShow: 1, 
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        centerMode: true,  
        variableWidth: true, 
        centerPadding: '10%',
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

function playMusic() {
    document.getElementById('background_music').play();
    document.getElementById('hover-trigger').classList.add('animated');
}

function animateText() {
    const bgmInstruction = document.getElementById('bgm-instruction');
    bgmInstruction.classList.remove('animated');
    void bgmInstruction.offsetWidth;
    bgmInstruction.classList.add('animated');
}
