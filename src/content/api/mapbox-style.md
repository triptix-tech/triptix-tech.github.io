---
title: MapBox Style
spec: ../openapi/gmaps.json
target: "/maps/api/place/queryautocomplete/json"
curlRequest: |
  curl --request GET 'https://triptix.tech/v1/g/json?input=Paris&types=geocode&key=YOUR_API_KEY'
jsRequest: |
  const url = 'https://triptix.tech/v1/g/json?input=Paris&types=geocode&key=YOUR_API_KEY'
  const response = await fetch(url)
response: |
    {
      "predictions": [
        {
          "description": "Paris, France",
          "matched_substrings": [
            { "length": 5, "offset": 0 }
          ],
          "place_id": "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
          "reference": "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
          "structured_formatting": {
            "main_text": "Paris",
            "main_text_matched_substrings": [
              { "length": 5, "offset": 0 }
            ],
            "secondary_text": "France"
          },
          "terms": [
            { "offset": 0, "value": "Paris" },
            { "offset": 7, "value": "France" }
          ],
          "types": [ "locality", "political", "geocode" ]
        },
        {
          "description": "Paris, TX, USA",
          "matched_substrings": [
            { "length": 5, "offset": 0 }
          ],
          "place_id": "ChIJmysnFgZYSoYRSfPTL2YJuck",
          "reference": "ChIJmysnFgZYSoYRSfPTL2YJuck",
          "structured_formatting": {
            "main_text": "Paris",
            "main_text_matched_substrings": [
              { "length": 5, "offset": 0 }
            ],
            "secondary_text": "TX, USA"
          },
          "terms": [
            { "offset": 0, "value": "Paris" },
            { "offset": 7, "value": "TX" },
            { "offset": 11, "value": "USA" }
          ],
          "types": [ "locality", "political", "geocode" ]
        },
        {
          "description": "Paris, TN, USA",
          "matched_substrings": [
            { "length": 5, "offset": 0 }
          ],
          "place_id": "ChIJ4zHP-Sije4gRBDEsVxunOWg",
          "reference": "ChIJ4zHP-Sije4gRBDEsVxunOWg",
          "structured_formatting": {
            "main_text": "Paris",
            "main_text_matched_substrings": [
              { "length": 5, "offset": 0 }
            ],
            "secondary_text": "TN, USA"
          },
          "terms": [
            { "offset": 0, "value": "Paris" },
            { "offset": 7, "value": "TN" },
            { "offset": 11, "value": "USA" }
          ],
          "types": [ "locality", "political", "geocode" ]
        },
        {
          "description": "Paris, Brant, ON, Canada",
          "matched_substrings": [
            { "length": 5, "offset": 0 }
          ],
          "place_id": "ChIJsamfQbVtLIgR-X18G75Hyi0",
          "reference": "ChIJsamfQbVtLIgR-X18G75Hyi0",
          "structured_formatting": {
            "main_text": "Paris",
            "main_text_matched_substrings": [
              { "length": 5, "offset": 0 }
            ],
            "secondary_text": "Brant, ON, Canada"
          },
          "terms": [
            { "offset": 0, "value": "Paris" },
            { "offset": 7, "value": "Brant" },
            { "offset": 14, "value": "ON" },
            { "offset": 18, "value": "Canada" }
          ],
          "types": [
            "neighborhood", "political", "geocode"
          ]
        },
        {
          "description": "Paris, KY, USA",
          "matched_substrings": [
            { "length": 5, "offset": 0 }
          ],
          "place_id": "ChIJsU7_xMfKQ4gReI89RJn0-RQ",
          "reference": "ChIJsU7_xMfKQ4gReI89RJn0-RQ",
          "structured_formatting": {
            "main_text": "Paris",
            "main_text_matched_substrings": [
              { "length": 5, "offset": 0 }
            ],
            "secondary_text": "KY, USA"
          },
          "terms": [
            { "offset": 0, "value": "Paris" },
            { "offset": 7, "value": "KY" },
            { "offset": 11, "value": "USA" }
          ],
          "types": [ "locality", "political", "geocode" ]
        }
      ],
      "status": "OK"
    }
---

# MapBox Style API

This API closely resembles the MapBox API endpoint for autocomplete.
This API endpoint is supposed to be a drop-in replacement for the current MapBox autocomplete API.