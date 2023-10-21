from flask import Flask, request, jsonify
import time
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
# CORS(app)
# CORS(app, origins='http://localhost:3000')
#CORS(app, resources={r"/detect": {"origins": "http://localhost:3000"}, "allow_headers": "Content-Type", "methods": ["GET", "POST"]})


# Load your TensorFlow model
#model = tf.keras.models.load_model('your_model_path')  # Replace with the actual path



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
