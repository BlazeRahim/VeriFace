from flask import Flask, request, jsonify
import os
import cv2
import numpy as np
import tensorflow as tf

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load your TensorFlow model
model = tf.keras.models.load_model('your_model_path')  # Replace with the actual path

def process_video(video_file):
    frames = []
    cap = cv2.VideoCapture(video_file)
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        # Process the frame here (e.g., resize, normalize, etc.)
        frame = preprocess_frame(frame)  # Replace with your preprocessing logic
        frames.append(frame)
    
    # Prepare frames for inference (e.g., convert to NumPy array)
    frames = np.array(frames)
    
    # Make predictions using your TensorFlow model
    #predictions = model.predict(frames)
    
    return predictions

def preprocess_frame(frame):
    # Implement your frame preprocessing logic here
    # For example, resize, normalize, and reshape the frame
    # You may need to adapt this based on your model's input requirements
    processed_frame = cv2.resize(frame, (224, 224))  # Example: Resize to 224x224
    processed_frame = processed_frame / 255.0  # Example: Normalize
    return processed_frame
@app.route('/upload', methods=['POST'])
def simp():
    return "hello"

@app.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No file part'})

    video = request.files['video']

    if video.filename == '':
        return jsonify({'error': 'No selected file'})

    if video and allowed_file(video.filename) and file_size_allowed(video):
        video_path = os.path.join(app.config['UPLOAD_FOLDER'], video.filename)
        video.save(video_path)
        
        # Process the video using your TensorFlow model
        predictions = process_video(video_path)

        return jsonify({'message': 'File uploaded and processed successfully', 'predictions': predictions.tolist()})

    return jsonify({'error': 'Invalid file'})

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'mp4'

def file_size_allowed(file):
    return file.content_length <= 30 * 1024 * 1024  # 30MB

if __name__ == '__main':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
