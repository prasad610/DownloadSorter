from os import read
from flask import Flask
from flask.wrappers import Response
from Downloads import Download
import json
import collections
import os
import configparser
from flask_cors import CORS, cross_origin


config = configparser.ConfigParser()

try:
    data = config.read('config.ini')
    if(len(data) == 0):
        raise FileNotFoundError
except FileNotFoundError:
    print("Failed to read config.ini")
    exit(1)

app = Flask(__name__,static_url_path="/", static_folder="../frontend/build")

cors = CORS(app)

@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route('/getAllFiles')
def readFile():
    indexContent = ""
    indexFilePath = os.path.join(
        config.get(
            "DEFAULT", "downloadFolderPath"), config.get("DEFAULT", "indexFile"))
    with open(indexFilePath, "r") as indexFile:
        indexContent = json.load(indexFile)
    return indexContent


@app.route('/findFile/<filename>')
def findFile(filename):
    content = readFile()
    keys = [key for key in content if len(
        [string for string in content[key] if filename in string]) != 0]
    resonse_data = {}
    for key in keys:
        resonse_data[key] = content[key]
    return json.dumps(resonse_data)


@app.route('/viewFolderContent/<folderName>')
def viewFolderContent(folderName):
    content = readFile()
    return json.dumps(content[folderName])


@app.route('/deleteFile/<folderName>/<filename>',methods=['DELETE'])
def deleteFile(folderName, filename):
    path = os.path.join(
        config.get(
            "DEFAULT", "downloadFolderPath"), folderName+"/"+filename
    )
    try:
        os.remove(path)
    except FileNotFoundError:
        return Response("File not found", status=404)
    writeFile(folderName, filename)
    return "Deleted " + path


def writeFile(folderName, file):
    file_content = readFile()
    indexFilePath = os.path.join(
        config.get(
            "DEFAULT", "downloadFolderPath"), config.get("DEFAULT", "indexFile"))
    content = file_content[folderName]
    content.pop(content.index(file))

    if(content == []):
        file_content.pop(folderName)
        # Removes empty folders
        os.system("rmdir "+os.path.join(
            config.get(
                "DEFAULT", "downloadFolderPath"), folderName+"/*"
        ))
    else:
        file_content[folderName] = content
        file_content.update({folderName: content})

    with open(indexFilePath, "w") as indexFile:
        json.dump(file_content, indexFile)

# print(findFile())
