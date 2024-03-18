import 'package:flutter/material.dart';

class MyTheme {
  static ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    primaryColor: Color(0xFFF15A29),
    backgroundColor: Color(0xFFFFF6F6), // Set the light theme's background color to #FFF6F6
    colorScheme: ColorScheme.light(
      primary: Color(0xFFF15A29),
      secondary: Color(0xFF293462),
      background: Color(0xFFFFF6F6), // Set the light theme's background color to #FFF6F6
    ),
    textTheme: TextTheme(
      headlineLarge: TextStyle(
        fontSize: 32.0,
        fontWeight: FontWeight.bold,
        fontFamily: 'Popins',
      ),
      bodyText1: TextStyle(
        fontSize: 16.0,
        fontFamily: 'Popins',
      ),
      button: TextStyle(
        fontSize: 16.0,
        fontWeight: FontWeight.bold,
        color: Colors.white,
        fontFamily: 'Popins',
      ),
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: Color(0xFFF15A29),
    ),
    buttonTheme: ButtonThemeData(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
    ),
  );

  static ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    primaryColor: Color(0xFFF15A29), // Use the same primary color as the light theme
    backgroundColor: Color(0xFF331500), // Set the dark theme's background color to #331500
    colorScheme: ColorScheme.dark(
      primary: Color(0xFFF15A29), // Use the same primary color as the light theme
      secondary: Color(0xFF293462),
    ),
    textTheme: TextTheme(
      headlineLarge: TextStyle(
        fontSize: 32.0,
        fontWeight: FontWeight.bold,
        fontFamily: 'Popins',
      ),
      bodyText1: TextStyle(
        fontSize: 16.0,
        color: Colors.white,
        fontFamily: 'Popins',
      ),
      button: TextStyle(
        fontSize: 16.0,
        fontWeight: FontWeight.bold,
        color: Colors.white,
        fontFamily: 'Popins',
      ),
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: Color(0xFFF15A29), // Use the same primary color as the light theme
    ),
  );
}
