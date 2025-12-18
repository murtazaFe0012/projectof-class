function send(){
    let input = document.getElementById("img");


    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);
    fetch('/upload', {
    method: 'POST',
    body: formData
  })
}

function show(){
    document.body.innerHTML += `<img src="http://localhost:3000/image/1">`
}