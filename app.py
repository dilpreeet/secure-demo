import sqlite3








































def get_user_data(username):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    # Intentional SQL injection vulnerability
    query = f"SELECT * FROM users WHERE name = '{username}'"
    cursor.execute(query)
    return cursor.fetchall()
