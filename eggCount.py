#import os
import torch
from transformers import ViTModel, ViTImageProcessor, TrainingArguments, Trainer
from PIL import Image
from torch.utils.data import Dataset
from torch.nn import CrossEntropyLoss


image_labels = {
    r"C:\Users\sharon\Downloads\300_300_Schistosoma_img\300_300_cut_img\92W5123\Process_4669_z_-80_0.5.png": 2,
    r"C:\Users\sharon\Downloads\300_300_Schistosoma_img\300_300_cut_img\92W5123\Process_4669_z_-80_0.8.png": 3
}

class EggCountDataset(Dataset):
    def __init__(self, img_labels, processor):
        self.img_labels = img_labels
        self.processor = processor
        self.image_paths = list(img_labels.keys())

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        image_path = self.image_paths[idx]
        image = Image.open(image_path).convert('RGB')
        inputs = self.processor(images=image, return_tensors="pt").pixel_values.squeeze()
        labels = torch.tensor(self.img_labels[image_path] - 2, dtype=torch.long)  # Adjusting labels to start from 0
        return {'pixel_values': inputs, 'labels': labels}


processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224')


dataset = EggCountDataset(image_labels, processor)


class ViTForCustomClassification(torch.nn.Module):
    def __init__(self, num_labels):
        super(ViTForCustomClassification, self).__init__()
        self.vit = ViTModel.from_pretrained('google/vit-base-patch16-224')
        self.classifier = torch.nn.Linear(self.vit.config.hidden_size, num_labels)
        self.loss_fct = CrossEntropyLoss()
        self.num_labels = num_labels  # Store the number of labels

    def forward(self, pixel_values, labels=None):
        outputs = self.vit(pixel_values=pixel_values)
        logits = self.classifier(outputs.last_hidden_state[:, 0, :])
        loss = None
        if labels is not None:
            loss = self.loss_fct(logits, labels)
        return (loss, logits) if loss is not None else logits


num_labels = 2  # running 2 files rn


model = ViTForCustomClassification(num_labels=num_labels)


training_args = TrainingArguments(
    output_dir='./results',
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    num_train_epochs=3,
    logging_dir='./logs',  # Directory for storing logs
    logging_steps=10,
)


trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
    compute_metrics=None  # Optionally define a function to compute metrics
)

# Train the model
trainer.train()

#model.save_pretrained(r'C:\Users\sharon\Downloads')
