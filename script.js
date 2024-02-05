import { initializeApp } from
    'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getDatabase, ref, push, set, get, update, remove, onValue } from
    'https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyBt8uIfnhPjUMt2cO4zni_oN2nVfCqWMAs",
    authDomain: "clover-comments.firebaseapp.com",
    databaseURL: "https://clover-comments-default-rtdb.firebaseio.com",
    projectId: "clover-comments",
    storageBucket: "clover-comments.appspot.com",
    messagingSenderId: "643260749301",
    appId: "1:643260749301:web:e89d09cd99dbbfbfe07cbc"
    };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {

    const userNameInput = document.getElementById('user_name');
    const userCommentInput = document.getElementById('user_comment');
    const commentButton = document.getElementById('comment_button');
    const commentList = document.getElementById('comment_list');
    const displayCheckbox = document.getElementById('display_latest_checkbox');

    function updateCommentList() {
        const displayLatest = displayCheckbox.checked;

        onValue(ref(database, 'comments'), (snapshot) => {
            const commentsData = snapshot.val();
            const commentsArray = Object.values(commentsData || []);

            commentsArray.sort((a, b) =>
                displayLatest ? b.timestamp - a.timestamp : a.timestamp - b.timestamp
            );

            commentList.innerHTML = '';

            // Inside the loop where comments are created
            for (const comment of commentsArray) {
                const listComment = document.createElement('li');
                listComment.classList.add('comment-container');
                
                const commentContent = document.createElement('div');
                commentContent.classList.add('comment-content');
                commentContent.innerHTML = `<h4>${comment.userName}</h4>
                    <p>${comment.userComment}</p>`;
                
                const commentActions = document.createElement('div');
                commentActions.classList.add('comment-actions');
                commentActions.innerHTML = `<span class="edit-comment" onclick="import('./script.js').
                then(module => module.editComment('${comment.timestamp}'))">&#9998;</span>
                    <span class="delete-comment" onclick="import('./script.js').
                    then(module => module.deleteComment('${comment.timestamp}'))">&#128465;</span>`;
                
                listComment.appendChild(commentContent);
                listComment.appendChild(commentActions);
                commentList.appendChild(listComment);
            }

        });
    }

    // Push comment to Firebase
    commentButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        const userComment = userCommentInput.value.trim();

        if (userName && userComment) {
            const commentsRef = ref(database, 'comments');
            push(commentsRef, {
                userName,
                userComment,
                timestamp: new Date().getTime(),
            });

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

export function editComment(timestamp) {
    const updatedComment = prompt('Edit your comment:');
    if (updatedComment !== null) {
        const commentRef = ref(database, `comments/${timestamp}`);
        update(commentRef, {
            userComment: updatedComment
        });
    }
}

export function deleteComment(timestamp) {
    const confirmDelete = confirm('Are you sure you want to delete this comment?');
    if (confirmDelete) {
        const commentRef = ref(database, `comments/${timestamp}`);
        remove(commentRef);
    }
}

export function openNav() {
    const navContainer = document.getElementById('navigation_container');
    const cloverLogo = document.getElementById('clover_logo');

    navContainer.classList.add('open');
    navContainer.style.left = '0';
    document.addEventListener('mousedown', closeNavOnClickOutside);
    cloverLogo.addEventListener('mousedown', closeNavOnClickLogo);
    cloverLogo.style.left = '230px';
}

export function closeNav() {
    const navContainer = document.getElementById('navigation_container');
    const cloverLogo = document.getElementById('clover_logo');

    navContainer.classList.remove('open');
    navContainer.style.left = '-300px';
    document.removeEventListener('mousedown', closeNavOnClickOutside);
    cloverLogo.style.left = '40px';
}

export function closeNavOnClickOutside(event) {
    const navContainer = document.getElementById('navigation_container');
    const target = event.target;

    if (!navContainer.contains(target)) {
        closeNav();
    }
}

export function closeNavOnClickLogo(event) {
    const navContainer = document.getElementById('navigation_container');
    const cloverLogo = document.getElementById('clover_logo');

    if (event.target === cloverLogo) {
        closeNav();
    }
}

export function toggleNav() {
    const navContainer = document.getElementById('navigation_container');
    const cloverLogo = document.getElementById('clover_logo');

    if (navContainer.classList.contains('open')) {
        closeNav();
    } else {
        openNav();
    }
}
    
export function playMusic() {
    document.getElementById('background_music').play();
    document.getElementById('hover-trigger').classList.add('animated');
}

export function animateText() {
    const bgmInstruction = document.getElementById('bgm-instruction');
    bgmInstruction.classList.remove('animated');
    void bgmInstruction.offsetWidth;
    bgmInstruction.classList.add('animated');
}