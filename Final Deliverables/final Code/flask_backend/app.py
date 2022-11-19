import pymysql
from flask import Flask
from flask import jsonify
from flask import request
import mysql.connector
from flask_cors import CORS, cross_origin


	app = Flask(__name__)
	CORS(app)

	# MySQL configurations
	app.config['MYSQL_DATABASE_USER'] = 'root'
	app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
	app.config['MYSQL_DATABASE_DB'] = 'clgpractical'
	app.config['MYSQL_DATABASE_HOST'] = 'localhost'


	'''
	Expenses
	'''
	@app.route('/addexpense', methods=['POST'])
	def add_expense():
		conn = None
		cursor = None
		try:
			_json = request.json
			_user_id = _json['user_id']
			_expense_id = _json['expense_id']
			_expense_amount = _json['expense_amount']
			_expense_description = _json['expense_description']
			# validate the received values
			if _user_id and _expense_id and _expense_description and _expense_amount and request.method == 'POST':
				
				# save edits
				sql = "INSERT INTO expenses(user_id, expense_id, expense_amount, expense_description) VALUES(%s, %s, %s, %s)"
				data = (_user_id, _expense_id, _expense_amount, _expense_description)
				conn = mysql.connector.connect(user = "root",
												password = "root",
												database = "clgpractical")
				cursor = conn.cursor()
				cursor.execute(sql, data)
				conn.commit()
				resp = jsonify('Expense added successfully!')
				resp.status_code = 200
				return resp
			else:
				return not_found()
		except Exception as e:
			print(e)
		finally:
			cursor.close() 
			conn.close()

			
	@app.route('/expenses')
	def expenses():
		
		try:
			conn = mysql.connector.connect(user = "root",
			password = "root",
			database = "clgpractical")
			cursor = conn.cursor(pymysql.cursors.DictCursor)
			cursor.execute("SELECT * FROM expenses")
			rows = cursor.fetchall()
			resp = jsonify(rows)
			resp.status_code = 200
			return resp
		except Exception as e:
			print("1",e)
			
		
			
	@app.route('/expense/<int:id>')
	def expense(id):
		conn = None
		cursor = None
		try:
			conn = mysql.connector.connect(user = "root",
			password = "root",
			database = "clgpractical")
			cursor = conn.cursor(pymysql.cursors.DictCursor)
			cursor.execute("SELECT * FROM expenses WHERE expense_id = %s", (id,))
			row = cursor.fetchone()
			resp = jsonify(row)
			resp.status_code = 200
			return resp
		except Exception as e:
			print("111111111",e)
		finally:
			cursor.close() 
			conn.close()
		

	@app.route('/updateexpense', methods=['PUT'])
	def update_expense():
		conn = None
		cursor = None
		try:
			_json = request.json
			_id = _json['id']
			_expense_id = _json['expense_id']
			_expense_amt = _json['expense_amount']
			_expense_desc = _json['expense_description']		
			# validate the received values
			if _expense_id and _expense_amt and _expense_desc and _id and request.method == 'PUT':
				
				# save edits
				sql = "UPDATE expenses SET user_id=%s, expense_description=%s , expense_amount=%s WHERE expense_id=%s"
				data = (_id, _expense_desc, _expense_amt,  _expense_id,)
				conn = mysql.connector.connect(user = "root",
			password = "root",
			database = "clgpractical")
				cursor = conn.cursor()
				cursor.execute(sql, data)
				conn.commit()
				resp = jsonify('User updated successfully!')
				resp.status_code = 200
				return resp
			else:
				return not_found()
		except Exception as e:
			print("1",e)
		finally:
			cursor.close() 
			conn.close()
		
			
	@app.route('/deleteexpense/<int:id>', methods=['DELETE'])
	def delete_expense(id):
		conn = None
		cursor = None
		try:
			conn = mysql.connector.connect(user = "root",
			password = "root",
			database = "clgpractical")
			cursor = conn.cursor()
			cursor.execute("DELETE FROM expenses WHERE expense_id=%s", (id,))
			conn.commit()
			resp = jsonify('Expense deleted successfully!')
			resp.status_code = 200
			return resp
		except Exception as e:
			print(e)
		finally:
			cursor.close() 
			conn.close()


	@app.errorhandler(404)
	def not_found(error=None):
		message = {
			'status': 404,
			'message': 'Not Found: ' + request.url,
		}
		resp = jsonify(message)
		resp.status_code = 404

		return resp
		
if __name__ == "__main__":
	app.run()