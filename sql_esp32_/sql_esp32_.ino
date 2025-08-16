#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "POS_SERVER_OLD"; // change you wifi name
const char* password = "asdffdsa";

const char* serverUrl = "http://192.168.0.108:3009/api/dispense"; // Your Node.js server IP + port

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    // Example dispense data
    String jsonData = R"({
      "dispenser_id": "1",
      "nozzle_id": "02",
      "liters": 0.014,
      "price": 485,
      "total": 4850,
      "amount": 3.465
    })";

    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode > 0) {
      Serial.printf("Response code: %d\n", httpResponseCode);
      String response = http.getString();
      Serial.println("Server reply: " + response);
    } else {
      Serial.printf("Error sending POST: %s\n", http.errorToString(httpResponseCode).c_str());
    }

    http.end();
  }

  delay(10000); // Send every 10 sec for testing
}
