import os
import io
import time
from flask import Flask, render_template, request, send_file, jsonify
from PIL import Image
import torch
from diffusers import StableDiffusionImg2ImgPipeline

app = Flask(__name__)

# Load model on startup
model_id = "nitrosocke/Ghibli-Diffusion"
dtype = torch.float16 if torch.cuda.is_available() else torch.float32
pipe = StableDiffusionImg2ImgPipeline.from_pretrained(model_id, torch_dtype=dtype)
pipe.to("cuda" if torch.cuda.is_available() else "cpu")
pipe.enable_attention_slicing()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded.'}), 400
    file = request.files['image']
    strength = float(request.form.get('strength', 0.6))
    img = Image.open(file.stream).convert("RGB").resize((512, 512))
    prompt = "Ghibli-style anime painting, soft pastel colors, highly detailed, masterpiece"
    start_time = time.time()
    output = pipe(prompt=prompt, image=img, strength=strength).images[0]
    elapsed = time.time() - start_time

    buf = io.BytesIO()
    output.save(buf, format='PNG')
    buf.seek(0)
    filename = f"ghibli_result_{int(time.time())}.png"
    return send_file(buf, mimetype='image/png', as_attachment=False, download_name=filename)

if __name__ == '__main__':
    app.run(debug=True)