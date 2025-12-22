from fastapi import FastAPI
from pydantic import BaseModel

import base64
import numpy as np
from sklearn import cluster
import cv2

# for the hands test
# import mediapipe as mp

app = FastAPI()

class DiceImage(BaseModel):
    image: str  # This matches the key we'll send from Express
    # if the data coming in isn't a string, we block the request
    

@app.post("/process-dice")
async def process_dice(data: DiceImage):
    # Print the first 50 characters to the terminal so we can see the 'header'
    print(f"Received data: {data.image[:50]}...") 

    # split at the , and get the actual base64 string
    encoded_data = data.image.split(',')[1]
    # Convert the string to raw bytes
    decoded_bytes = base64.b64decode(encoded_data)
    # Create a numpy array from those bytes
    nparr = np.frombuffer(decoded_bytes, np.uint8)
    # "Decode" the array into an OpenCV image (matrix)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    # img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
    
    if img is None:
        return {"status": "error", "message": "Failed to decode image"}
    # Display the image in a window named "Image Window"
    cv2.imshow("Image Window", img)
    
    cv2.waitKey(1)

    # Destroy all the created windows
    cv2.destroyAllWindows()
    
    return {
        "status": "success",
        "received_length": len(data.image),
        "preview": data.image[:20]
    }



params = cv2.SimpleBlobDetector_Params()

params.filterByInertia
params.minInertiaRatio = 0.6

detector = cv2.SimpleBlobDetector_create(params)












# class HandImage(BaseModel):
#     image: str  # This matches the key we'll send from Express
    
# @app.post("/process-hand")
# async def process_hand(data: HandImage):
#     # Print the first 50 characters to the terminal so we can see the 'header'
#     print(f"Received data: {data.image[:50]}...") 

#     # split at the , and get the actual base64 string
#     encoded_data = data.image.split(',')[1]
#     # Convert the string to raw bytes
#     decoded_bytes = base64.b64decode(encoded_data)
#     # Create a numpy array from those bytes
#     nparr = np.frombuffer(decoded_bytes, np.uint8)
#     # "Decode" the array into an OpenCV image (matrix)
#     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    
#     if img is None:
#         return {"status": "error", "message": "Failed to decode image"}
#     # img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
#     process_image_and_count_fingers(img)
    
#     # Display the image in a window named "Image Window"
#     cv2.imshow("Image Window", img)
    
#     cv2.waitKey(1)

#     # Destroy all the created windows
#     cv2.destroyAllWindows()
    
#     return {
#         "status": "success",
#         "received_length": len(data.image),
#         "preview": data.image[:20]
#     }


# # Function to count fingers based on landmarks
# def count_fingers(hand_landmarks, hand_label):
#     fingers_up = 0
#     # Define tips of fingers (index, middle, ring, pinky)
#     finger_tips = [8, 12, 16, 20]
#     # Define a landmark for the base of the thumb (MCP joint)
#     thumb_base = 2
#     # Define a landmark for the tip of the thumb
#     thumb_tip = 4

#     landmarks = hand_landmarks.landmark

#     # Count fingers (excluding thumb)
#     for tip in finger_tips:
#         # Check if the fingertip's y-coordinate is above the base landmark's y-coordinate
#         # Note: In OpenCV, the top of the image has lower y-values
#         if landmarks[tip].y < landmarks[tip - 2].y:
#             fingers_up += 1

#     # Count thumb
#     # Thumb logic depends on left or right hand orientation
#     if hand_label == "Right":
#         # Right thumb is open if tip_x < base_x
#         if landmarks[thumb_tip].x < landmarks[thumb_base].x:
#             fingers_up += 1
#     elif hand_label == "Left":
#         # Left thumb is open if tip_x > base_x
#         if landmarks[thumb_tip].x > landmarks[thumb_base].x:
#             fingers_up += 1

#     return fingers_up

# def process_image_and_count_fingers(image_path):
#     # Initialize MediaPipe Hands
#     mp_hands = mp.solutions.hands
#     # Set static_image_mode to True for processing a single image
#     hands = mp_hands.Hands(static_image_mode=True, max_num_hands=2, min_detection_confidence=0.5)
#     mp_draw = mp.solutions.drawing_utils

#     # Load the image
#     image = cv2.imread(image_path)
#     if image is None:
#         print(f"Error: Could not load image from {image_path}")
#         return

#     # Convert the image from BGR to RGB, as MediaPipe requires RGB input
#     image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

#     # Process the image to detect hands
#     results = hands.process(image_rgb)

#     # Check if hands were detected
#     if results.multi_hand_landmarks:
#         for hand_landmarks, hand_handedness in zip(results.multi_hand_landmarks, results.multi_handedness):
#             # Determine if the hand is left or right
#             label = hand_handedness.classification[0].label
            
#             # Count the fingers
#             count = count_fingers(hand_landmarks, label)

#             # Draw landmarks on the image
#             mp_draw.draw_landmarks(image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            
#             # Display the count
#             cv2.putText(image, f'{label}: {count} fingers', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

#     # Display the result
#     cv2.imshow("Finger Counter", image)
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()
