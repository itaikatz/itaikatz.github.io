import boto3
from botocore.exceptions import ClientError
import base64
from pprint import pprint
import cv2

aws_access_key_id='AKIAS2AKYEQ3YLBXI3JT'
aws_secret_access_key='lhNJxu/zqHS+hEVzsvD8NSOQOp725+yaz1kWsNlm'

def detect_faces(image_path):

    # Create the SageMaker runtime client with your credentials
    session = boto3.Session(
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        region_name = 'us-east-1'
    )
    client = session.client('rekognition')
    
    try:
        with open(image_path, 'rb') as image_file:
            image_bytes = image_file.read()
        
        response = client.detect_faces(
            Image={'Bytes': image_bytes},
            Attributes=['ALL']
        )
        
        # print("Raw API response:")
        # pprint(response, indent=2)
        
 
        
        # Display image using OpenCV
        image = cv2.imread(image_path)
        for idx, face_detail in enumerate(response['FaceDetails']):
            box = face_detail['BoundingBox']
            img_height, img_width, _ = image.shape
            left = int(img_width * box['Left'])
            top = int(img_height * box['Top'])
            width = int(img_width * box['Width'])
            height = int(img_height * box['Height'])
            cv2.rectangle(image, (left, top), (left + width, top + height), (0, 0, 255), 2)

    
            label = f'Person{idx + 1}'
            cv2.putText(image, label, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255,0,0), 2)


        print('========================')        
        for idx, face_detail in enumerate(response['FaceDetails']):
            print("PERSON ", idx + 1)
            print('-------')
            print(f"Gender: {face_detail['Gender']['Value']} (Confidence: {face_detail['Gender']['Confidence']:.2f}%)")
            print(f"Age range: {face_detail['AgeRange']['Low']} - {face_detail['AgeRange']['High']} years")
            print(f"Eyeglasses: {face_detail['Eyeglasses']['Value']} (Confidence: {face_detail['Eyeglasses']['Confidence']:.2f}%)")
            print(f"Sunglasses: {face_detail['Sunglasses']['Value']} (Confidence: {face_detail['Sunglasses']['Confidence']:.2f}%)")
            print(f"Emotions: {face_detail['Emotions']}")            
            print()

        cv2.imshow('Image', image)
        cv2.waitKey(0)        


    except ClientError as e:
        print(f"An error occurred: {e}")

# Usage
detect_faces('mlqbq.jpg')