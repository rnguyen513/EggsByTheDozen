from fastapi import FastAPI, File
from fastapi.middleware.cors import CORSMiddleware
#from inference_sdk import InferenceHTTPClient
from fastapi.responses import FileResponse
from fastapi import UploadFile
from testing_model import return_num
from fastapi.responses import JSONResponse
import os
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get("/")
def home():
    return {"Data": "Test"}

@app.post("/upload-images")
async def upload_images(file_upload: UploadFile, file_upload2: UploadFile):
   file_path = os.path.join("uploads", file_upload.filename)
   second_file_path = os.path.join("uploads", file_upload2.filename)
   os.makedirs(os.path.dirname(file_path), exist_ok=True)
   os.makedirs(os.path.dirname(second_file_path), exist_ok=True)
   with open(file_path, "wb") as buffer:
    shutil.copyfileobj(file_upload.file, buffer)

    with open(second_file_path, "wb") as buffer:
       shutil.copyfileobj(file_upload2.file, buffer)

   numOfEggs = return_num(file_upload.filename)
   numOfEggs2 = return_num(file_upload2.filename)

   average = (numOfEggs + numOfEggs2) /2
   print(average)
   return {"Average": int(average)}

   """
   contents = await file_upload.read()
   
   CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="bFXj3Gxls3mCRVqByeuO"
    )

   result = CLIENT.infer(300_300, model_id="ovos-de-parasitas-azoug/6")
   return result
   """



