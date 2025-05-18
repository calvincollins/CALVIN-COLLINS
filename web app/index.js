document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('upload-form');
    const imageInput = document.getElementById('image');
    const strengthInput = document.getElementById('strength');
    const strengthValue = document.getElementById('strength-value');
    const resultSection = document.getElementById('result-section');
    const resultImg = document.getElementById('result-img');
    const downloadLink = document.getElementById('download-link');
    const loader = document.getElementById('loader');

    strengthInput.addEventListener('input', function() {
        strengthValue.textContent = parseFloat(strengthInput.value).toFixed(2);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!imageInput.files.length) {
            alert('Please select an image.');
            return;
        }
        const formData = new FormData();
        formData.append('image', imageInput.files[0]);
        formData.append('strength', strengthInput.value);

        loader.style.display = 'block';
        resultSection.style.display = 'none';

        fetch('/generate', {
            method: 'POST',
            body: formData
        })
        .then(async response => {
            loader.style.display = 'none';
            if (!response.ok) {
                const error = await response.json();
                alert(error.error || 'Generation failed.');
                return;
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            resultImg.src = url;
            downloadLink.href = url;
            downloadLink.download = "ghibli_result.png";
            resultSection.style.display = 'block';
        })
        .catch(() => {
            loader.style.display = 'none';
            alert('An error occurred while generating the image.');
        });
    });
});