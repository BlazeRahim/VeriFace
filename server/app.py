from flask import Flask, request, jsonify
import time
from flask_cors import CORS
from web_video import frames_generate
import os
import random
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn import metrics
from sklearn.model_selection import train_test_split

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
UPLOAD_FOLDER = 'User_Video'
app.config['User_Video'] = UPLOAD_FOLDER
model = keras.models.load_model("../model/model.h5")

# Create the upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
Photos_Folder=''
def generate_random_filename():
    return str(random.randint(10000, 99999))

@app.before_request
def check_abort_request():
    if request.headers.get('X-Abort-Request') == 'true':
        if Photos_Folder:
            os.rmdir(Photos_Folder)
        # Handle the abort request on the server side
        # In this example, we simply print a message
        print("Abort request received on the server")
        

@app.route("/")
def hello_world():
   return jsonify({"message": "heelooo"}), 200
   

@app.route("/detect", methods=['POST'])
def upload_video():
    if request.method == 'POST':
        print("helooo")
        if 'file' not in request.files:
            print("erwfjmkl")
            resp = jsonify({"message":"Send proper Video"})
            resp.status_code=300
            return resp
        else:
            file = request.files['file']
            print(file)
            random_filename = generate_random_filename()
            file_path = os.path.join(app.config['User_Video'], f'{random_filename}.mp4')
            print(file_path)
            file.save(file_path)
            Photos_Folder = f"videos\out\{random_filename}"
            frames_generate(file_path,Photos_Folder,random_filename)
            print(os.listdir(Photos_Folder))
            if not os.listdir(Photos_Folder):
                print("no fown")
                os.rmdir(Photos_Folder)
                result = {'message': 'No Face Detected in Your Video... We Detect DeepFake Based on Face ... please provide some videos Which have Faces', 'code': 2}
                print(result)
                return jsonify(result), 300
            print("WANAKAM")
            
            y_pred = model.predict(test_flow)
            y_pred = [int(np.argmax(element)) for element in y_pred]
            os.rmdir(Photos_Folder)
            if(y_pred>0.5):
                result = {'message': 'The video Is Authentic', 'code': 0}
                print(result)
            else:
                result = {'message': 'The video Is Deepfake', 'code': 1}
                print(result)
            return jsonify(result), 200
    else:
        return 'This route only accepts POST requests', 403
    
if __name__ == '__main':
    app.run()
