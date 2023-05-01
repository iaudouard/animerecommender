from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
import pandas as pd
import pre_process

# Load the anime descriptions dataset
df = pd.read_csv('../../../data/csv/descriptions.csv')
print(df.columns.tolist())
# Preprocess the anime descriptions
preprocessed_descriptions = [pre_process.preprocess_text(desc) for desc in df['description']]

# Load a pre-trained BERT model and tokenizer
model_name = 'bert-base-uncased'
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForSequenceClassification.from_pretrained(model_name, num_labels=1)

# Tokenize the preprocessed descriptions
tokenized_descriptions = [tokenizer.encode_plus(desc, truncation=True, padding=True, max_length = 512) for desc in preprocessed_descriptions]

# Define the training arguments
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=64,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10
)


# Fine-tune the BERT model on the anime descriptions dataset
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_descriptions,
)

trainer.train()
