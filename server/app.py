from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
  return "Hello World!"

@app.route('/send', methods=['POST'])
def submit_message():
  # Get data from request
  data = request.get_json()
  if not data:
    return jsonify({'error': 'Missing data'}), 400

  value = data.get('value')
  pobiValue = data.get('pobiValue')
  sourceUrl = data.get('sourceUrl')

  # Validate data (optional, add checks as needed)
  if not value or not isinstance(pobiValue, int) or not sourceUrl:
    return jsonify({'error': 'Invalid data'}), 400

  # Process data (replace with your actual logic)
  # This example simply returns the received data
  result_text = 'processed value: ' + value
  result_pobiValue = pobiValue

  return jsonify({'value': result_text, 'pobiValue': result_pobiValue})

if __name__ == '__main__':
  app.run(host='localhost', port=5000, debug=True)
