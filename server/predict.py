import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn import metrics
from sklearn.model_selection import train_test_split
import cv2

class DataHandler:
    def __init__(self, path_base):
        self.path_base = path_base
    def load_test_data(self):
        image_gen = ImageDataGenerator(
            rescale=1.0 / 255,
            horizontal_flip=True,
            brightness_range=(0.7, 1),
        )
        test_flow = image_gen.flow_from_directory(
            self.path_base + 'test/',
            target_size=(256, 256),
            batch_size=1,
            shuffle=False,
            class_mode='binary'
        )

        return test_flow


def predict(model_path,test_data):
    path_base = 'dataset_train_test/'
    
    data_handler = DataHandler(path_base)
    test_data = data_handler.load_test_data()
    model = keras.models.load_model(model_path)
    y_pred = model.predict(test_data)
    y_test = test_data.classes
    y_pred = [int(np.argmax(element)) for element in y_pred]
    return y_pred