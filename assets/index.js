const uploadGrid = document.querySelector(".upload_grid");
const fileInput = document.getElementById("fileInput");
const previewImage = document.querySelector(".upload_uploaded");
const loading = document.querySelector(".upload_uploading");

// po kliknięciu otwiera selektor plików
uploadGrid.addEventListener("click", () => {
    fileInput.click();
});

// po wybraniu pliku
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    loading.style.display = "block";     // pokaż "ładowanie"
    previewImage.style.display = "none"; // ukryj zdjęcie

    const reader = new FileReader();

    reader.onload = () => {
        previewImage.src = reader.result;     // ustaw zdjęcie
        loading.style.display = "none";       // ukryj animację
        previewImage.style.display = "block"; // pokaż zdjęcie
    };

    reader.readAsDataURL(file); // wczytaj plik jako base64
});{

    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    })

});

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown")
});

imageInput.addEventListener('change', (event) => {

    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");

    upload.removeAttribute("selected")

    var file = imageInput.files[0];
    var data = new FormData();
    data.append("image", file);

    fetch('	https://api.imgur.com/3/image' ,{
        method: 'POST',
        headers: {
            'Authorization': 'Client-ID c8c28d402435402'
        },
        body: data
    })
    .then(result => result.json())
    .then(response => {
        
        var url = response.data.link;
        upload.classList.remove("error_shown")
        upload.setAttribute("selected", url);
        upload.classList.add("upload_loaded");
        upload.classList.remove("upload_loading");
        upload.querySelector(".upload_uploaded").src = url;

    })

})

document.querySelector(".go").addEventListener('click', () => {

    var empty = [];

    var params = new URLSearchParams();

    params.set("sex", sex)
    if (!upload.hasAttribute("selected")){
        empty.push(upload);
        upload.classList.add("error_shown")
    }else{
        params.set("image", upload.getAttribute("selected"))
    }

    var birthday = "";
    var dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday = birthday + "." + element.value
        if (isEmpty(element.value)){
            dateEmpty = true;
        }
    })

    birthday = birthday.substring(1);

    if (dateEmpty){
        var dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    }else{
        params.set("birthday", birthday)
    }

    document.querySelectorAll(".input_holder").forEach((element) => {

        var input = element.querySelector(".input");

        if (isEmpty(input.value)){
            empty.push(element);
            element.classList.add("error_shown");
        }else{
            params.set(input.id, input.value)
        }

    })

    if (empty.length != 0){
        empty[0].scrollIntoView();
    }else{

        forwardToId(params);
    }

});

function isEmpty(value){

    let pattern = /^\s*$/
    return pattern.test(value);

}

function forwardToId(params){

    location.href = "/id?" + params

}

var guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {

    if (guide.classList.contains("unfolded")){
        guide.classList.remove("unfolded");
    }else{
        guide.classList.add("unfolded");
    }

})
