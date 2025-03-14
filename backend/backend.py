from flask import Flask, jsonify, request, send_from_directory
import pandas as pd
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATA_DIR = os.path.dirname(__file__)
DOMESTIC_CSV = os.path.join(DATA_DIR, "combined_domestic.csv")
FOREIGN_CSV = os.path.join(DATA_DIR, "combined_foreign.csv")

try:
    df_domestic = pd.read_csv(DOMESTIC_CSV)
    df_foreign = pd.read_csv(FOREIGN_CSV)
    df_total = df_domestic.copy()
    df_total["Visitors"] = df_domestic["Visitors"] + df_foreign["Visitors"]
except Exception as e:
    print(f"Error loading CSV files: {e}")
    df_domestic, df_foreign, df_total = pd.DataFrame(), pd.DataFrame(), pd.DataFrame()

seasons_map = {
    "Winter (Dec-Feb)": ["December", "January", "February"],
    "Summer (Mar-May)": ["March", "April", "May"],
    "Monsoon (Jun-Sep)": ["June", "July", "August", "September"],
    "Post-Monsoon (Oct-Nov)": ["October", "November"]
}

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Telangana Tourism API!"})

@app.route('/favicon.ico')
def favicon():
    return "", 204 

@app.route("/districts", methods=["GET"])
def get_districts():
    if df_domestic.empty:
        return jsonify({"districts": []})
    districts = df_domestic["District"].dropna().unique().tolist()
    return jsonify({"districts": districts})

@app.route("/tourism-data", methods=["GET"])
def get_tourism_data():
    if df_domestic.empty or df_foreign.empty:
        return jsonify({"error": "Data not loaded"}), 500

    district = request.args.get("district", "All Districts")
    data_type = request.args.get("dataType", "Total Visitors")
    selected_month = request.args.get("selectedMonth", "")
    selected_year = request.args.get("selectedYear", "")
    selected_season = request.args.get("selectedSeason", "")

    df = df_domestic if data_type == "Domestic Visitors" else df_foreign if data_type == "Foreign Visitors" else df_total

    if district != "All Districts":
        df = df[df["District"] == district]

    if selected_year:
        try:
            df = df[df["Year"].astype(str) == str(selected_year)]
        except ValueError:
            return jsonify({"error": "Invalid year format"}), 400

    if selected_month:
        df = df[df["Month"] == selected_month]

    if selected_season:
        season_months = seasons_map.get(selected_season, [])
        df = df[df["Month"].isin(season_months)]

    if df.empty:
        return jsonify([])  # Return an empty list instead of an error

    df_grouped = df.groupby(["Year", "Month"], as_index=False)["Visitors"].sum()
    return jsonify(df_grouped.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True)
