#include "application.h"
#include "LiquidCrystal/LiquidCrystal.h"

LiquidCrystal lcd(D0, D1, D2, D3, D4, D5);

int RED = 0;
int YELLOW = 0;
int GREEN = 0;
int RED_LED = A5;
int GREEN_LED = A0;
int YELLOW_LED = A3;

int increaseColor(String color) {
    if(color == "R"){
        digitalWrite(RED_LED, HIGH);
        lcd.setCursor(2, 1);
        RED = RED + 1;
        lcd.print(RED);
        delay(2000);
        digitalWrite(RED_LED, LOW);
        return 1;

    }
    if(color == "G"){
        digitalWrite(GREEN_LED, HIGH);
        lcd.setCursor(7, 1);
        GREEN = GREEN + 1;
        lcd.print(GREEN);
        delay(2000);
        digitalWrite(GREEN_LED, LOW);
        return 1;
    }
    if(color == "Y"){
        digitalWrite(YELLOW_LED, HIGH);
        lcd.setCursor(12, 1);
        YELLOW = YELLOW + 1;
        lcd.print(YELLOW);
        delay(2000);
        digitalWrite(YELLOW_LED, LOW);
        return 1;
    }
    return -1;
}

void setup() {
    Particle.function("increase", increaseColor);
    
    pinMode(RED_LED, OUTPUT);
    pinMode(GREEN_LED, OUTPUT);
    pinMode(YELLOW_LED, OUTPUT);
    // set up the LCD's number of columns and rows: 
    lcd.begin(16,2);
    // Print a message to the LCD.
    lcd.print("EVENTS");
    lcd.setCursor(0, 1);
    lcd.print("COUNTER!");
    delay(3000);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Events:");
    lcd.setCursor(0, 1);
    lcd.print("R:");
    lcd.setCursor(5, 1);
    lcd.print("G:");
    lcd.setCursor(10, 1);
    lcd.print("Y:");
    
}

void loop() {

}
