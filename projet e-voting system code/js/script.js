


function showFileName() {
    var input = document.getElementById('fileUpload');
    var fileName = input.files[0].name;
    document.getElementById('fileName').textContent = 'Fichier sélectionné : ' + fileName;
    
}


const video = document.getElementById('video');
        const snap = document.getElementById('snap');
        const canvas = document.getElementById('canvas');
        const photoPreview = document.getElementById('photoPreview');
        const context = canvas.getContext('2d');
        const fileInput = document.getElementById('file-input');

        // Fonction de prévisualisation pour l'input file
        function previewPhoto(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    photoPreview.src = e.target.result;
                    photoPreview.style.display = 'block';
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        // Demander l'accès à la caméra
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(err => {
                    console.error("Erreur lors de l'accès à la caméra : ", err);
                    // Si l'accès à la caméra échoue, afficher le bouton pour télécharger une photo
                    //fileInput.style.display = 'block';
                });
        } else {
            // Si getUserMedia n'est pas supporté, afficher le bouton pour télécharger une photo
            fileInput.style.display = 'block';
        }

        // Capture de la photo à partir de la webcam
        snap.addEventListener('click', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Afficher l'aperçu de la photo
            const dataURL = canvas.toDataURL('image/png');
            photoPreview.src = dataURL;
            photoPreview.style.display = 'block';
        });

        function showFileNameAndPreview() {
            var input = document.getElementById('fileUpload');
            var fileName = input.files[0].name;
            document.getElementById('fileName').textContent = 'Fichier sélectionné : ' + fileName;
        
            // Prévisualiser l'image si le fichier est une image
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var filePreview = document.getElementById('filePreview');
                    filePreview.src = e.target.result;
                    filePreview.style.display = 'block';
                }
                reader.readAsDataURL(input.files[0]);
            }
        }


        
       
   
