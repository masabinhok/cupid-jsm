import cv2
import sys

def detect_face(input_path, output_path):
    # Load Haar Cascade
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    # Read input image
    image = cv2.imread(input_path)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Detect faces
    faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    
    if len(faces) == 0:
        print("No faces detected")
        return False

    # Save the output image
    cv2.imwrite(output_path, image)
    return True

if __name__ == "__main__":
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    success = detect_face(input_path, output_path)
    if success:
        print("Face detection successful")
    else:
        print("No faces detected")
