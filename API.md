## API格式约定
### 医生端
##### 发送包
验证信息：  
```json
{
  "sender": "doctor",
  "text": []
}
```
发送信息
```json
{
  "sender": "doctor",
  "text": ["每种疾病的概率", "推荐的检查方案"]
}
```
##### 接收包
```json
{
  "patient_text": ["症状1", "症状2"],
  "root_cause_text": "每种疾病的概率",
  "invest1_text": "推荐的检查方案",
  "graph_data": graph_data
}
```
### 病人端
##### 发送包
验证信息：  
```json
{
  "sender": "patient",
  "text": []
}
```
发送信息
```json
{
  "sender": "patient",
  "text": ["症状1", "症状2"]
}
```
##### 接收包
```json
{
  "text": ["每种疾病的概率", "推荐的检查方案"]
}
```