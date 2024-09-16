// Arduino code

const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600); // Start serial communication at 9600 baud
  pinMode(trigPin, OUTPUT); // Set the trigPin as Output
  pinMode(echoPin, INPUT);  // Set the echoPin as Input
}

void loop() {
  // Clear the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Set the trigPin HIGH for 10 microseconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read the echoPin, returns the sound wave travel time in microseconds
  long duration = pulseIn(echoPin, HIGH);

  // Calculate the distance in cm
  float distance_cm = (duration * 0.034) / 2;

  // If the distance is less than 20 cm, send a message
  if (distance_cm < 20) {
    Serial.println("Object close");
  }

  delay(200); // Wait 200ms before the next measurement
}
