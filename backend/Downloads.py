#!/usr/bin/env python3
import os
from datetime import datetime as todaydate
import json
import configparser
import sys

config = configparser.ConfigParser()

try:
    path = os.path.join(os.getcwd(),"config.ini")
    data = config.read(path)
    if(len(data) == 0):
        raise FileNotFoundError
except FileNotFoundError:
    print("Failed to read config.ini")
    exit(1)


class Download():
    def __init__(self):
        try:
            self.indexFile = config.get("DEFAULT", "indexFile")
        except (KeyError, configparser.NoOptionError):
            print("Failed to read indexFile in config.ini")
            exit(1)

        # List of file in download folder
        self.recentContent = []

        try:
            self.downloadFolderPath = config.get(
                "DEFAULT", "downloadFolderPath")
        except (KeyError, configparser.NoOptionError):
            print("Failed to read downloadFolderPath in config.ini")
            exit(1)

        self.indexFilePath = os.path.join(
            self.downloadFolderPath, self.indexFile)

        os.chdir(self.downloadFolderPath)
        # Used for setting folder name
        try:
            self.date = todaydate.now().strftime(config.get("DEFAULT", "folderName"))
        except (KeyError, configparser.NoOptionError):
            print("Failed to read folderName in config.ini")
            exit(1)
        # List of files and folders in the directory
        self.files = os.listdir(path=self.downloadFolderPath)
        
        self.indexContent = self.readFile()
        self.segregateFiles()
        self.writeFile()

    def segregateFiles(self):
        """ 
            Seperate index file & folders.
        """

        if(self.files.__len__ == 0):
            exit(1)

        for file in self.files:

            filePath = os.path.join(self.downloadFolderPath, file)

            if os.path.isfile(filePath) and file != self.indexFile:

                destPath = os.path.join(
                    self.downloadFolderPath, self.date, file
                )
                try:
                    os.rename(src=filePath, dst=destPath)
                    self.recentContent.append(file)
                except FileNotFoundError:
                    os.mkdir(path=os.path.join(
                        self.downloadFolderPath, self.date
                    ))
                    os.rename(src=filePath, dst=destPath)
                    self.recentContent.append(file)

    def readFile(self):
        with open(self.indexFilePath, "r") as indexFile:
            self.indexContent = json.load(indexFile)
        return self.indexContent

    def writeFile(self):
        if(not bool(self.recentContent)):
            exit(0)
        if(bool(self.indexContent)):
            try:
                if(self.indexContent[self.date].__len__() != 0):
                    self.recentContent = list(set()
                                              .union(self.recentContent, self.indexContent[self.date]))
            except KeyError:
                pass
        self.indexContent.update({self.date: self.recentContent})
        with open(self.indexFilePath, "w") as indexFile:
            json.dump(self.indexContent, indexFile)
        pass


def arguments(systemArguments):
    arguments = {}
    for i in range(1,len(systemArguments),2):
        if(systemArguments[i].__contains__("--")):
            prefix = "--"    
        else:
            prefix = "-"
        arguments[systemArguments[i].removeprefix(prefix)] = systemArguments[i+1];
    return arguments; 

if __name__ == "__main__":
    if len(sys.argv)==1:
        object = Download()
    else:
        # Arguments have a dictionary for system arguments
        arguments = arguments(sys.argv)
        if arguments["mode"].lower()=="UI".lower():
            os.system("flask run")        