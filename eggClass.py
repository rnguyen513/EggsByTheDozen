import os
from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image

# Replace with the path to your local image file
stringStart = r"C:\Users\sharon\Downloads\300_300_Schistosoma_img\300_300_cut_img\92W5123"
image_paths = []
for imgName in os.listdir(stringStart):
    image_paths.append(os.path.join(stringStart,imgName))

for image_path in image_paths:
    image = Image.open(image_path)
    image = image.convert('RGB')

    #read in 2 input, average the res


    processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224')
    model = ViTForImageClassification.from_pretrained('google/vit-base-patch16-224')

    inputs = processor(images=image, return_tensors="pt")
    outputs = model(**inputs)
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()
    print("Predicted class:", model.config.id2label[predicted_class_idx])
