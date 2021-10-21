import os
import pandas as pd
import json

landmard_output = {"type": "geojson", "data": {"type": "FeatureCollection", "features": []}}

landmard_df = pd.read_csv('data/data_landmarks.csv')

landmard_features = []
for index, row in landmard_df.iterrows():
    feature = {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': []}, 'properties': {}}
    feature['properties']['name'] = row['name']
    feature['properties']['address'] = row['addr']
    feature['properties']['img'] = row['img']
    feature['properties']['rank'] = int(0)
    feature['properties']['price'] = int(0)
    feature['properties']['rating'] = float(0.0)
    feature['geometry']['coordinates'] = [float(coord) for coord in row['coor'].split(", ")][::-1]
    landmard_features.append(feature)
landmard_output['data']['features'] = landmard_features

with open('data/landmark_geojson.geojson', 'w+', encoding='utf-8') as f:
    f.write("var landmark_data = ")
    json.dump(landmard_output['data'], f, ensure_ascii=False, indent=4)