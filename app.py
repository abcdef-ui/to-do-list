# app.py
from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

todos = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/todos', methods=['POST'])
def add_todo():
    todo = request.json['todo']
    todos.append({'task': todo, 'completed': False})
    return jsonify(todos)

@app.route('/todos/<int:index>', methods=['PUT'])
def toggle_todo(index):
    todos[index]['completed'] = not todos[index]['completed']
    return jsonify(todos)

@app.route('/todos/<int:index>', methods=['DELETE'])
def delete_todo(index):
    del todos[index]
    return jsonify(todos)

if __name__ == '__main__':
    app.run(debug=True)