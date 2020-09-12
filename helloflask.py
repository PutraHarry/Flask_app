import os
import time

from flask import Flask, render_template, flash, request, redirect, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = 'D:\\gemastik 12\\urpaw\\Flask_app'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
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
def upload_file():
    if request.method == 'POST':

        if 'file' not in request.files:
            flash('No file')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            time.sleep(10)
        return "hello world"
    elif request.method == 'GET':
        return render_template('upfile.html')

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

if __name__ == '__main__':
    app.secret_key = '9m23080m3cu9u12309cu12c3'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.run(host='127.0.0.1', port='5000', debug=True)
