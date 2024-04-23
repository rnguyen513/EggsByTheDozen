from roboflow import Roboflow
import supervision as sv
import cv2

def return_num(contents):

    rf = Roboflow(api_key="bFXj3Gxls3mCRVqByeuO")
    project = rf.workspace().project("ovos-de-parasitas-azoug")
    model = project.version(6).model

    result = model.predict("uploads/"+str(contents), confidence=40, overlap=30).json()

    labels = [item["class"] for item in result["predictions"]]
    sum_egg = sum([item["confidence"] for item in result["predictions"]])
    final_count = (len(labels) + sum_egg)/2
    score = final_count * 50
    return score


# detections = sv.Detections.from_inference(result)
#
# label_annotator = sv.LabelAnnotator()
# bounding_box_annotator = sv.BoxAnnotator()

# image = cv2.imread("Trichuris-Trichiura--2-_jpg.rf.f9f4da80111a69bd5798aeb4d149a21c.jpg.jpg")
#
# annotated_image = box_annotator.annotate(
#     scene=image, detections=detections)
# annotated_image = label_annotator.annotate(
#     scene=annotated_image, detections=detections, labels=labels)
#
# sv.plot_image(image=annotated_image, size=(16, 16))