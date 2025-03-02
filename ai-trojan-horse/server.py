import os
import google.generativeai as genai
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import json
import time
import re

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_GEMINI_API_KEY"))

app = Flask(__name__)
CORS(app)  

THREATS_FILE = "threats.json"

def load_threats():
    if os.path.exists(THREATS_FILE):
        try:
            with open(THREATS_FILE, "r") as file:
                return json.load(file)  
        except json.JSONDecodeError:
            print("Warning: JSON file is corrupted. Starting fresh.")
            return {}  
    return {}  

def save_threats():
    with open(THREATS_FILE, "w") as file:
        json.dump(active_threats, file, indent=2)

active_threats = load_threats()

def generate_active_threats():
    global active_threats
    model = genai.GenerativeModel("gemini-1.5-flash")

    try:
        response = model.generate_content(
            "Generate a JSON array of exactly three realistic cybersecurity malware threats."
            " Each threat must be in valid JSON format like this:"
            "\n["
            "\n  {"
            "\n    \"file_name\": \"malware_stealer.exe\","
            "\n    \"size\": \"2.5 MB\","
            "\n    \"threat_level\": \"High\","
            "\n    \"detected_malware\": \"Trojan.Downloader.AgentTesla\","
            "\n    \"execution\": \"Runs when file is opened.\","
            "\n    \"capabilities\": ["
            "\n      \"Keylogging\","
            "\n      \"Data exfiltration\","
            "\n      \"Remote access\""
            "\n    ],"
            "\n    \"system_impact\": ["
            "\n      \"Data loss\","
            "\n      \"Financial loss\","
            "\n      \"Privacy violation\""
            "\n    ]"
            "\n  }"
            "\n]"
            "\nRespond ONLY with valid JSON output. Do NOT include explanations, titles, or extra text."
        )

        print("\n🔍 Raw AI Response:\n", response.text)

    
        cleaned_response = re.sub(r"```json|```", "", response.text).strip()

     
        threats_list = json.loads(cleaned_response)

        if isinstance(threats_list, list):
            active_threats = {threat["file_name"]: threat for threat in threats_list}
            save_threats()  
            print("\n XD Successfully stored threats:", active_threats)
        else:
            print("\n :0 Error: AI did not return a valid list.")
            active_threats = {}

    except json.JSONDecodeError as e:
        print(f"\n :0 JSON Parsing Error: {e}")
        print("\n AI Response (Before Parsing):", response.text)
        active_threats = {}

    except Exception as e:
        print(f"\n :0 API Request Failed: {e}")
        active_threats = {}  #reset

        
@app.route('/api/live-threat-feed', methods=['GET'])
def get_live_threat_feed():
    global active_threats

    #FIX LATER
    if not active_threats:
        print("\n Generating threats for the first and only time...\n")
        generate_active_threats()

   
    print("\n Active Threats:", json.dumps(active_threats, indent=2))

    return jsonify({"active_threats": list(active_threats.values())})


@app.route('/api/threat-details/<file_name>', methods=['GET'])
def get_threat_details(file_name):
    if file_name in active_threats:
        return jsonify(active_threats[file_name])
    return jsonify({"error": "Threat not found"}), 404
    

if __name__ == '__main__':
    app.run(debug=True)




