import cohere

co = cohere.ClientV2("ydp6XMli7Xj4L7RgNaQ20892J0soE96fMDEZzqEn")
response = co.chat(
    model="command-a-03-2025", 
    messages=[{"role": "user", "content": "generate 5 MCQ type questions on the topic java"}]
)

print(response)
