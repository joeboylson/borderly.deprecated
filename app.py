# BORDERLY

import os
import math
import json
import uuid
import requests
import threading

from io import BytesIO
from datetime import datetime
from flask import Flask, request, redirect, url_for, render_template, send_file, send_from_directory, Blueprint
from PIL import Image, ImageOps

app = Flask(__name__, template_folder='./dist')

static_folder = Blueprint('static', __name__, static_url_path='/api/static', static_folder='./static')
dist_folder = Blueprint('dist', __name__, static_url_path='', static_folder='./dist')

app.register_blueprint(static_folder)
app.register_blueprint(dist_folder)


# --------------------------------------------------------------------------------
# CONSTANTS
# --------------------------------------------------------------------------------

DOWNLOAD_DIRECTORY = "static/images"
DIST_DIRECTORY = "dist"

IS_PRODUCTION = os.environ.get('PYTHON_ENV') == 'PRODUCTION'
DEBUG = True if not IS_PRODUCTION else False
PORT = 5000 if not IS_PRODUCTION else os.environ.get('PORT')

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

def notify_discord(filenames):
    discord_url = "https://discord.com/api/webhooks/831681436062056508/gePXCk-sjscRfB3A9zzv-LmkVIc2n45B8gTUXH7M75KB8dzed9I-R6QFsZ_F4rD0gNUj"
    files = {}
    
    def _notify_discord():
        embeds = [{
          "description": datetime.now().strftime("%m/%d/%Y %H:%M:%S"),
          "image": {
            "url": "https://borderly.herokuapp.com/api/static/images/{}".format(filename)
          }
        } for filename in filenames]

        json = {
          "username": "BORDERLY BOT",
          "embeds": embeds,
        }

        result = requests.post(discord_url, json=json)

    notification_thread = threading.Thread(target=_notify_discord)
    notification_thread.start()



# --------------------------------------------------------------------------------
# ROUTES
# --------------------------------------------------------------------------------


@app.route('/')
def index ():
  ''' GET - returns "index.html" '''

  if (IS_PRODUCTION):
    return render_template('index.html')
  else:
    return "DEVELOPMENT"


@app.route('/api/border', methods=['POST'])
def upload_file():
  ''' POST - recieves image in formdata - calls "addborder()" - returns filename '''  

  try:
    image_dict = request.files.to_dict()
    filenames = []

    for key, value in image_dict.items():
      image = image_dict[key]
      filename = append_suffix(image.name)

      add_border(input_image=image, output_image=filename, border=5, color='#FFF')
      filenames.append(filename)

    if (IS_PRODUCTION):
      notify_discord(filenames)
    return json.dumps({'success': True, 'message': 'SUCCESS', 'data': {'filenames': filenames}})

  except Exception as e:
    return json.dumps({'success': False, 'message': str(e), 'data': None})


# --------------------------------------------------------------------------------
# START THE APP
# --------------------------------------------------------------------------------

if __name__ == '__main__':
  print('::: {}'.format(PORT))
  app.run(debug=DEBUG, host='0.0.0.0', port=PORT)
