import json
# from 后端.search import query_related_nodes
# from 后端.get_entities import get_all_entities
from flask import Flask, request, jsonify
from flask_cors import *
# from system import *

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/doctor_chat', methods=['POST'])
####doctor chat：医生端对话，返回结构化信息，答复，知识图谱
def get_doctor_response():
    content = request.get_data()
    content = json.loads(content)
    client_id = content['sender']
    
    says=[]
    reply=[]

    input=content['message']
    if(input=="你好,请问你有什么问题吗"):
        says=["我经常头晕目眩"]
        reply =[
                    { "question": "最近睡眠质量如何", "answer": "over" },
                    { "question": "会经常胡思乱想吗", "answer": "over" }
                ]
        with open('data1.json', 'r',encoding="utf-8") as file:
            data = json.load(file)

    if(input=='会失眠吗' or input=='会幻想吗'or input=="最近睡眠质量如何" or input=="会经常胡思乱想吗"):
        says=["最近睡眠质量不太行,常常会失眠"]
        reply =[
                    { "question": "建议你先去做一个B超检查", "answer": "over" },
                    { "question": "建议你先去做一个血常规检查", "answer": "over" }
                ]
        with open('data2.json', 'r',encoding="utf-8") as file:
            data = json.load(file)
            
    if(input=='建议你先去做一个B超检查'):
        says=["医生你好,我已经做过检查了,结果显示没有什么问题"]
        reply =[
                    { "question": "那初步诊断你可能患有抑郁症", "answer": "over" }
                ]
        with open('data3.json', 'r',encoding="utf-8") as file:
            data = json.load(file)

    if(input=='你可能患有焦虑症' or input=='你可能患有抑郁症' or input=='那初步诊断你可能患有抑郁症'):
        says=["那好吧,谢谢医生"]
        reply =[
                    { "question": "没事,再见", "answer": "ice" }
                ]
        data = None
        
    return jsonify({
        "recipient_id": client_id,  # 不需要改
        "text": says,  # 对应的答复
        "graph": data,  # 通过关键词查询得到的图谱数据，不用改
        "reply": reply  # 结构化信息
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=88)
