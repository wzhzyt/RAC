import asyncio
import websockets

clients_by_type = {}

async def handle_client(websocket, path):
    try:
        async for message in websocket:
            # 解析
            parts = message.split('|')
            if len(parts) == 2:
                connection_id = id(websocket)
                connection_type = parts[0]
                message_content = parts[1]

                if connection_type not in clients_by_type:
                    clients_by_type[connection_type] = set()
                clients_by_type[connection_type].add(websocket)
                
                # 检查是否都已lianjie
                if len(clients_by_type.get("doctor", set())) > 0 and len(clients_by_type.get("patient", set())) > 0:
                    target_type = "doctor" if connection_type == "patient" else "patient"
                    for client_socket in clients_by_type[target_type]:
                        await client_socket.send(message_content)
                        print(f"Sent message to {target_type}: {message_content}")
                
        # 移除
        for connection_type in clients_by_type:
            if websocket in clients_by_type[connection_type]:
                clients_by_type[connection_type].remove(websocket)
    except Exception as e:
        print("Exception:", e)

start_server = websockets.serve(handle_client, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
