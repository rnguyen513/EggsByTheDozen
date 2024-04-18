from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from inference_sdk import InferenceHTTPClient
from fastapi.responses import FileResponse
from fastapi import UploadFile

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
async def upload_images(file_upload: UploadFile):
   
   contents = await file_upload.read()
   
   CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="bFXj3Gxls3mCRVqByeuO"
    )

   result = CLIENT.infer(contents, model_id="ovos-de-parasitas-azoug/6")
   return result 

