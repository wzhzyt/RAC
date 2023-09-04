from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

@app.route('/respon', methods=['GET'])
def get_response():
    # 这里可以修改返回的消息内容
    return jsonify(text="Hello from the backend!")

if __name__ == '__main__':
    app.run(debug=True)