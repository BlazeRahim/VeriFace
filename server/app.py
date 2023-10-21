from flask import Flask, request, jsonify
import os
import cv2
import numpy as np
import tensorflow as tf
import time
from flask_cors import CORS , cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
# CORS(app)
# CORS(app, origins='http://localhost:3000')
#CORS(app, resources={r"/detect": {"origins": "http://localhost:3000"}, "allow_headers": "Content-Type", "methods": ["GET", "POST"]})


# Load your TensorFlow model
#model = tf.keras.models.load_model('your_model_path')  # Replace with the actual path

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
    
    return 1

def preprocess_frame(frame):
    # Implement your frame preprocessing logic here
    # For example, resize, normalize, and reshape the frame
    # You may need to adapt this based on your model's input requirements
    processed_frame = cv2.resize(frame, (224, 224))  # Example: Resize to 224x224
    processed_frame = processed_frame / 255.0  # Example: Normalize
    return processed_frame


@app.before_request
def check_abort_request():
    if request.headers.get('X-Abort-Request') == 'true':
        # Handle the abort request on the server side
        # In this example, we simply print a message
        print("Abort request received on the server")
        

@app.route("/")
def hello_world():
   return jsonify({"message": "heelooo"}), 200
   

@app.route("/detect", methods=['POST'])
def upload_video():
    if request.method == 'POST':
        time.sleep(20)
        print("helooo")
        if 'file' not in request.files:
            print("erwfjmkl")
            resp = jsonify({"message":"Send proper Video"})
            resp.status_code=300
            return resp
        else:
            file = request.files['file']
            print(file)
            result = {'message': 'Data received', 'code': 1}
            print(result)
            return jsonify(result), 200
    else:
        return 'This route only accepts POST requests', 403
    
if __name__ == '__main':
    app.run()
    
    
    
        # if 'video' not in request.files:
    #     return jsonify({'error': 'No file part'})

    # video = request.files['video']

    # if video.filename == '':
    #     return jsonify({'error': 'No selected file'})

    # if video and allowed_file(video.filename) and file_size_allowed(video):
    #     video_path = os.path.join(app.config['UPLOAD_FOLDER'], video.filename)
    #     video.save(video_path)
        
    #     # Process the video using your TensorFlow model
    #     predictions = process_video(video_path)
