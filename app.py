from pyrca.analyzers.bayesian import BayesianNetwork
import pandas as pd
import json
from difflib import SequenceMatcher
from flask import Flask, request, jsonify
from flask_cors import *

app = Flask(__name__)
CORS(app, supports_credentials=True)

# 加载数据并构建贝叶斯网络模型
with open('data/data.json', encoding="utf-8") as f:
    data = json.load(f)

data = {k: v for k, v in list(data.items())[:20]}

symptoms = set()
for disease in data.values():
    symptoms.update(disease['keys']['common_keys'])
nodes = list(symptoms | data.keys())

df = pd.DataFrame(0, index=list(data.keys()), columns=list(symptoms))
graph_df = pd.DataFrame(0, index=nodes, columns=nodes)

for disease, info in data.items():
    for symptom in info['keys']['common_keys']:
        df.at[disease, symptom] = 1
        graph_df.at[disease, symptom] = 1

model = BayesianNetwork(config=BayesianNetwork.config_class(graph=graph_df))

test_data = [[0 for _ in range(128)] for _ in range(128)]
data_df = pd.DataFrame(test_data, columns=nodes)

for i, (disease, info) in enumerate(data.items()):
    for symptom in info['keys']['common_keys']:
        data_df.at[i, symptom] = 1
        data_df.at[i, disease] = 1

model.train([data_df])


# 文本相似性计算函数
def sim_ratio(a, b):
    return SequenceMatcher(None, a, b).ratio()
predict_disease = []

def format_root_causes(results):
    disease_dict = {}
    output = ["可能疾病："]
    for node, prob in results['root_cause_nodes']:
        disease = node.split('_')[1]
        predict_disease.append(disease)
        disease_dict[disease] = prob
        line = f"{disease}: {prob:.4f}"
        output.append(line)
    return "\n".join(output), disease_dict


def find_matched_nodes(symp_list):
    matched_nodes = []
    nodes = list(symptoms)
    for symp in symp_list:
        max_ratio = 0
        matched_node = None
        for node in nodes:
            ratio = sim_ratio(symp, node)
            if ratio > max_ratio:
                max_ratio = ratio
                matched_node = node
        matched_nodes.append(matched_node)
    return matched_nodes


def print_invest1(disease_names):
    print("推荐进行检查：")
    for disease_name in disease_names:
        matched_disease = disease_name
        if matched_disease:
            print(f"{matched_disease}:")
            invest1 = data[matched_disease]['invest1']
            keys = []
            for key in invest1:
                keys.append(key)
            print(",".join(keys))
        else:
            print(f"No match found for {disease_name}")


def get_invest1(disease_name):
    invest1 = data[disease_name]['invest1']
    keys = []
    for key in invest1:
        keys.append(key)
    return ", ".join(keys), keys


def print_invest1(disease_names):
    invest1_texts = []
    invest_dic = {}
    for disease_name in disease_names:
        matched_disease = disease_name
        if matched_disease:
            invest1_text, invest_list = get_invest1(matched_disease)
            invest_dic[disease_name] = invest_list
            invest1_texts.append(f"{matched_disease}:\n{invest1_text}")
        else:
            invest1_texts.append(f"No match found for {disease_name}")
            invest_dic[disease_name] = []
    return "\n".join(invest1_texts), invest_dic


def get_nodes(list):
    nodes = []
    for ele in list:
        nodes.append({
            "name": ele,
            "itemStyle": {
                "color": "#D2E9F8",
                "border color": "#104465"
            }
        })
    return nodes


def set_symp_disease(symp_list, disease_dic):
    links = []
    for symp in symp_list:
        for disease in disease_dic.keys():
            links.append({
                "source": symp,
                "target": disease,
                "value": disease_dic[disease]
            })
    return links


def set_disease_invest(disease_dic, invest_dic):
    links = []
    value = 1
    for disease in disease_dic.keys():
        for invest in invest_dic[disease]:
            links.append({
                "source": disease,
                "target": invest,
                "value": value
            })
    return links


def set_graph(symp_list, invest_dic, disease_dic):
    data = {"nodes": [], "links": []}
    invest_list = []
    for invests in invest_dic.values():
        invest_list.extend(invests)
    data["nodes"].extend(get_nodes(symp_list))
    data["nodes"].extend(get_nodes(list(set(invest_list))))
    data["nodes"].extend(get_nodes(disease_dic.keys()))
    data["links"].extend(set_symp_disease(symp_list, disease_dic))
    data["links"].extend(set_disease_invest(disease_dic, invest_dic))
    return data


def diagnose(symp_list, model):
    matched_nodes = find_matched_nodes(symp_list)
    root_cause_results = model.find_root_causes(matched_nodes).to_dict()
    root_cause_text, disease_dict = format_root_causes(root_cause_results)
    invest1_text, invest_dic = print_invest1(predict_disease)
    graph_data = set_graph(symp_list, invest_dic, disease_dict)
    return root_cause_text, invest1_text, graph_data

sym_list = []
# 在 '/patient/rca' 路由上响应 POST 请求
@app.route('/patient/rca', methods=['POST'])
def rac():
    content = request.get_data()
    content = json.loads(content)
    client_id = content['sender']
    key_words = content['key_words']
    sym_list.append(key_words)
    root_cause_text, invest1_text, graph_data = diagnose(sym_list, model)
    invest1_text = "治疗方案:     " + invest1_text + "     "
    print(invest1_text)
    print(predict_disease)
    return jsonify({
        "recipient_id": client_id,
        "root_cause_text": root_cause_text,
        "invest1_text": invest1_text,
        "graph_data": graph_data
    })


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=88)