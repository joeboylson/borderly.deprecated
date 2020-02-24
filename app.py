# BORDERLY

import os
import math
import json
import datetime
import uuid
from io import BytesIO
from flask import Flask, request, redirect, url_for, render_template, send_file, send_from_directory
from PIL import Image, ImageOps


app = Flask(__name__, static_url_path="", static_folder="static")

# --------------------------------------------------------------------------------
# CONSTANTS
# --------------------------------------------------------------------------------

DOWNLOAD_DIRECTORY = "static/images"


# --------------------------------------------------------------------------------
# FUNCTIONS
# --------------------------------------------------------------------------------

def add_border(input_image, output_image, border, color=0):
  '''
  input_img: Image or filepath
  output_image: filepath
  border: number
  color: number or string(accepts hex codes) 
  //
  returns: None -- saves image to "static/images"
  '''

  img = Image.open(input_image)
  w, _ = img.size

  # image border should be border% of image
  rel_border = math.ceil(w * (border/100))

  bimg = ImageOps.expand(img, border=rel_border, fill=color)
  bimg.save('static/images/{}'.format(output_image))

def append_suffix(filename):
  '''
  filename: string
  //
  returns: filename + "-BORDERLY" + extension
  '''
  return "{0}{2}.{1}".format(*filename.rsplit('.', 1) + ['-BORDERLY'])



# --------------------------------------------------------------------------------
# ROUTES
# --------------------------------------------------------------------------------


@app.route('/')
def index ():
  ''' GET - returns "index.html" '''
  return render_template('index.html')


@app.route('/downloadfile/<path:filename>')
def downloadFile (filename):
  ''' GET - returns "static/<pathname>" '''
  return send_from_directory(DOWNLOAD_DIRECTORY, filename, as_attachment=True)

@app.route('/border', methods=['POST'])
def upload_file():
  ''' POST - recieves image in formdata - calls "addborder()" - returns filename '''  

  try:

    image_dict = request.files.to_dict()
    image = image_dict[ list(image_dict.keys())[0] ]
    filename = append_suffix(image.name)

    add_border(input_image=image, output_image=filename, border=5, color='#FFF')

    return json.dumps({'success': True, 'message': 'SUCCESS', 'data': {'filename': filename}})

  except Exception as e:
    return json.dumps({'success': False, 'message': str(e), 'data': None})


# --------------------------------------------------------------------------------
# START THE APP
# --------------------------------------------------------------------------------

if __name__ == '__main__':

  IS_PRODUCTION = os.environ.get('PYTHON_ENV') == 'PRODUCTION'
  DEBUG = True if not IS_PRODUCTION else False
  PORT = 5000 if not IS_PRODUCTION else os.environ.get('PORT')

  print('::: {}'.format(PORT))

  app.run(debug=DEBUG, port=PORT)