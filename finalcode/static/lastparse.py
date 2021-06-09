#!/usr/bin/python3

import json
import pprint
import requests
import uuid
import os
import gspread, json
from oauth2client.service_account import ServiceAccountCredentials

# GETS DATA FROM GOOGLE SPREADSHEET

# use creds to create a client to interact with the Google Drive API
scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
client = gspread.authorize(creds)

# Find a workbook by name and open the first sheet
# Make sure you use the right name here.
sheet = client.open("Copy of SBData Lead Data").sheet1

# Extract and print all of the values
list_of_hashes = sheet.get_all_records()

out_file = open("JSONOUTPUT.json", "w")
json.dump(list_of_hashes, out_file, indent = 6)
out_file.close()


# OPEN FILES

results_in = open('JSONOUTPUT.json')
results = json.load(results_in)
results_in.close()

file_in = open('lastparse.json')
data = json.load(file_in)
file_in.close()


# CHECK IF ENTRY IS ALREADY IN DATA

for index, value in enumerate(results):
    foundName = False
    for value in data:
        if results[index]["Name"] == data[value]["Name"] and results[index]["Street_Address"] == data[value]["Street_Address"]:
            foundName = True
            break
    

# IF DATA IS NEW, FIND ITS COORDINATES

    if not foundName:
        if results[index]["Name"] == '':
            pass
        else:
            randKey = str(uuid.uuid4())[:8]
            data[randKey] = results[index]
            data[randKey]["Color"] = "red"
            for key in data:
                if data[key]["Latitude"] == '' and key != 'a234532':
                    try:
                        address = data[key]["Street_Address"] + " " + data[key]["City"]
                        api_key = "API_KEY"
                        endpoint = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}"
                        
                        # makes api request
                        r = requests.get(endpoint)
                        value = r.json()['results'][0]

                        data[key]["Latitude"] = value['geometry']['location']['lat']
                        data[key]["Longitude"] = value['geometry']['location']['lng']
                    except:
                        data[key]["Latitude"] = 0
                        data[key]["Longitude"] = 0

# ITERATES OVER ALL SPREADSHEET DATA AND CHECKS TO MAKE SURE ITS PART OF THE STORED DATA.
for index, value in enumerate(results):
    if results[index]["ID2"] != '':
        data[results[index]["ID2"]]["Driver1_Name"] = results[index]["Driver1_Name"]
        data[results[index]["ID2"]]["Drop_Date"] = results[index]["Drop_Date"]
        data[results[index]["ID2"]]["Drop_Time"] = results[index]["Drop_Time"]
        data[results[index]["ID2"]]["ID2"] = results[index]["ID2"]
        data[results[index]["ID2"]]["Request"] = "Kit is being used"
        data[results[index]["ID2"]]["Color"] = "yellow"

    if results[index]["ID1"] != '':
        data[results[index]["ID1"]]["Request_Date"] = results[index]["Request_Date"]
        data[results[index]["ID1"]]["Request_Time"] = results[index]["Request_Time"]
        data[results[index]["ID1"]]["ID1"] = results[index]["ID1"]
        data[results[index]["ID1"]]["Request"] = "Kit is ready for pickup"
        data[results[index]["ID1"]]["Color"] = "blue"

    if results[index]["ID3"] != '':
        data[results[index]["ID3"]]["Driver2_Name"] = results[index]["Driver2_Name"]
        data[results[index]["ID3"]]["Pick_Date"] = results[index]["Pick_Date"]
        data[results[index]["ID3"]]["Pick_Time"] = results[index]["Pick_Time"]
        data[results[index]["ID3"]]["ID3"] = results[index]["ID3"]
        data[results[index]["ID3"]]["Request"] = "Kit is picked up"
        data[results[index]["ID3"]]["Color"] = "green"


# OPENS AND WRITES TO FILE
with open("lastparse.json", "w") as write_file:
    json.dump(data, write_file, indent = 4)

os.system("/usr/local/bin/browserify index.js -o bundle.js")
