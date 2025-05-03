from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = "YOUR_OPENAI_API_KEY"  # ضع مفتاح الـ API هنا

@app.route("/api/generate-code", methods=["POST"])
def generate_code():
    prompt = request.json.get("prompt")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        response = openai.Completion.create(
            engine="gpt-4", 
            prompt=prompt, 
            max_tokens=150, 
            temperature=0.7
        )
        return jsonify({"code": response.choices[0].text.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
