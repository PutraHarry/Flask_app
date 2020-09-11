import os
import time

from flask import Flask, flash, render_template, request, jsonify, redirect
from werkzeug.utils import secure_filename

app = Flask(__name__)
ALLOWED_EXTENSIONS = set(['PNG', 'jpg', 'jpeg', 'gif'])
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/hello/<harry>/')
def hello(harry=None):
    return render_template('test.html', name=harry)

@app.route("/homepage/")
def homepage():
    return render_template('homepage.html')

@app.route("/upload", methods= ['POST','GET'])
def upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file')
            return redirect(request.url)
        file = request.files['image']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            print ('image saved')
            flash('image saved')
            time.sleep(10)
        return "hello world"
    elif request.method == 'GET':
        return render_template('upfile.html')


if __name__ == '__main__':
    app.secret_key = '9m23080m3cu9u12309cu12c3'
    app.config['SESSION_TYPE'] = 'filesystem'
    # app.run(host='127.0.0.1',port='5000',debug=True)
    app.run(host='127.0.0.1', port='5000', debug=True)
