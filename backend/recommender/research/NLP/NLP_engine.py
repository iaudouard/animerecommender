from transformers import pipeline
from transformers import BertTokenizer, BertForSequenceClassification
import pandas as pd
import pre_process

# Load the fine-tuned BERT model
model = BertForSequenceClassification.from_pretrained('./results')
df = pd.read_csv('../../../data/csv/descriptions.csv')
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# Create a pipeline for generating anime recommendations
anime_recommender = pipeline(
    'text-classification',
    model=model,
    tokenizer=tokenizer,
    return_all_scores=True
)

# Generate anime recommendations for a user prompt
user_prompt = "I want to watch a romantic anime with lots of drama."
preprocessed_prompt = pre_process.preprocess_text(user_prompt)
tokenized_prompt = tokenizer(preprocessed_prompt, truncation=True, padding=True, return_tensors='pt')
recommendations = anime_recommender(preprocessed_prompt)

# Print the top 5 recommended anime titles and their confidence scores
top_k = 5
for i in range(top_k):
    anime_title = df['title'][recommendations[i]['label']]
    confidence_score = recommendations[i]['score']
    print(f"Recommendation {i+1}: {anime_title} (score: {confidence_score:.4f})")
