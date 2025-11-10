# app.py -- intentionally vulnerable snippet for demo only
import sqlite3
from flask import Flask, request

#app name
app = Flask(__name__)

@app.route("/user")
def get_user():
    user_id = request.args.get("id", "1")
    conn = sqlite3.connect("demo.db")
    cur = conn.cursor()
    # intentionally insecure string concatenation (CodeQL typical pattern)
    query = "SELECT * FROM users WHERE id = " + user_id
    cur.execute(query)
    return str(cur.fetchall())
