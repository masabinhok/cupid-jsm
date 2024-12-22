import cv2
import sys
import numpy as np

def detect_face(image_buffer):
    # Load Haar Cascade
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    # Decode the input image buffer
    image_array = np.frombuffer(image_buffer, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    if image is None:
        print("Error: Unable to decode image", file=sys.stderr)
        sys.exit(1)

    # Convert to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces
    faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    
    if len(faces) == 0:
        # If no faces detected, return an error
        print("No faces detected", file=sys.stderr)
        sys.exit(1)

    # Encode the original image back to buffer
    _, buffer = cv2.imencode('.jpg', image)
    return buffer

if __name__ == "__main__":
    # Read the image from stdin
    input_image = sys.stdin.buffer.read()

    # Process the image
    try:
        processed_image = detect_face(input_image)
        # Write the original image to stdout
        sys.stdout.buffer.write(processed_image)
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)
