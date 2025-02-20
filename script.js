
// script.js

document.getElementById('upload-button').addEventListener('click', function () {
    const photoInput = document.getElementById('photo-input');
    const commentInput = document.getElementById('comment-input');

    //valida si es una imagen lo que está seleccionado para subir (no se si va en esta parte)
    if (!file.type.startsWith('image/')) {
        Swal.fire({
            icon: "error",
            title: "Archivo no válido",
            text: "Por favor, selecciona una imagen.",
        });
        return;
    }    
    ////////////////////////////////////////////////////////////////////////////////////////
    if (photoInput.files.length > 0 && commentInput.value.trim() !== "") {
        const file = photoInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function (e) {
            const photoUrl = e.target.result;
            const comment = commentInput.value;
            addPost(photoUrl, comment);
            

            // Clear inputs after uploading
            photoInput.value = '';
            commentInput.value = '';

            Swal.fire({
                icon: "success",
                title: "Post creado con éxito",
                text: "Tu imagen y comentario han sido añadidos al feed.",
            });
        };

        reader.readAsDataURL(file);
    } else {
        Swal.fire({
            icon: "error",
            title: "Faltan datos",
            text: "Por favor, selecciona una imagen y escribe un comentario antes de subir.",
        });
    }
});

function createElement(tag, className = '', attributes = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    return element;
}

function addPost(photoUrl, comment) {
    const feed = document.getElementById('feed');

    const post = createElement('div', 'post card mb-3');

    // Post image
    const img = createElement('img', 'card-img-top', { src: photoUrl });

    // Card body
    const cardBody = createElement('div', 'card-body');

    // Initial comment
    const initialComment = createElement('p', 'card-text');
    initialComment.innerText = comment;

    // Like button
    const likeButton = createElement('button', 'btn btn-info like-button mb-2', { 'data-likes': 0 });
    likeButton.innerText = 'Me gusta';
    likeButton.addEventListener('click', function () {
        const likes = parseInt(likeButton.getAttribute('data-likes')) + 1;
        likeButton.innerText = `Me gusta (${likes})`;
        likeButton.setAttribute('data-likes', likes);
        likeButton.classList.add('liked');
    });

    // User comment input
    const commentInput = createElement('input', 'form-control comment-input', { type: 'text', placeholder: 'Escribe aquí tu comentario' });
    const commentButton = createElement('button', 'btn btn-primary mt-2 comment-button');
    commentButton.innerText = 'Comentar';

    commentButton.addEventListener('click', function () {
        if (commentInput.value.trim() !== "") {
            const newComment = createElement('p', 'comment-user');
            newComment.innerText = commentInput.value;
            cardBody.appendChild(newComment);
            commentInput.value = '';
        } else {
            Swal.fire({
                icon: "warning",
                text: "Por favor, escribe algo antes de comentar.",
            });
        }
    });

    // Build post structure
    cardBody.appendChild(initialComment);
    cardBody.appendChild(likeButton);
    cardBody.appendChild(commentInput);
    cardBody.appendChild(commentButton);

    post.appendChild(img);
    post.appendChild(cardBody);

    feed.prepend(post);
}


// guardar las imagenes el local storage
function savePostsToLocalStorage(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPostsFromLocalStorage() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => addPost(post.photoUrl, post.comment));
}

document.getElementById('upload-button').addEventListener('click', function () {
    const photoInput = document.getElementById('photo-input');
    const commentInput = document.getElementById('comment-input');
    if (photoInput.files.length > 0 && commentInput.value.trim() !== "") {
        const file = photoInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const photoUrl = e.target.result;
            const comment = commentInput.value;
            addPost(photoUrl, comment);

            const currentPosts = JSON.parse(localStorage.getItem('posts')) || [];
            currentPosts.push({ photoUrl, comment });
            savePostsToLocalStorage(currentPosts);

            photoInput.value = '';
            commentInput.value = '';
        };
        reader.readAsDataURL(file);
    }
});

// Llama a esta función al cargar la página
loadPostsFromLocalStorage();
