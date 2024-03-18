// splash_widget.dart

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:rive/rive.dart';
import 'package:flutter_svg/flutter_svg.dart'; // Import flutter_svg
import 'package:animated_text_kit/animated_text_kit.dart'; // Import AnimatedTextKit
import '../bloc/splash_bloc/splash_bloc.dart'; // Import SplashBloc
import '../../../shared/theme/theme.dart'; // Import App

class SplashWidget extends StatefulWidget {
  final SplashBloc splashBloc;

  const SplashWidget({Key? key, required this.splashBloc})
      : super(key: key);

  @override
  _SplashWidgetState createState() => _SplashWidgetState();
}

class _SplashWidgetState extends State<SplashWidget> with SingleTickerProviderStateMixin {
  late AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(seconds: 2), // Make the animation slower
      vsync: this,
    );
    Future.delayed(Duration(seconds: 3), () { // Start the animation after 3 seconds
      controller.forward();
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = MediaQuery.platformBrightnessOf(context) == Brightness.dark ? MyTheme.darkTheme : MyTheme.lightTheme;
    return Scaffold(
      backgroundColor: theme.backgroundColor, // Set background based on theme
      body: Stack( // Use Stack to overlay widgets
        alignment: Alignment.center, // Center the children of the Stack
        children: [
          Positioned( // Positioned widget for SVG logo
            top: MediaQuery.of(context).size.height * 0.9, // Position it 90% from the top of the screen
            child: Center( // Wrap with Center
              child: SvgPicture.asset(
                'assets/logos/ace_white.svg',
                color: theme.primaryColor, // Set the fill color to the primary color of the theme
                width: MediaQuery.of(context).size.width * 0.2,
              ),
            ),
          ),
          Positioned( // Positioned widget for progress indicator
            top: MediaQuery.of(context).size.height * 0.85, // Position it 85% from the top of the screen
            child: Center( // Wrap with Center
              child: Container(
                width: MediaQuery.of(context).size.width * 1, // Provide a width to the Container
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width * 0.2), // Add horizontal padding to make the LinearProgressIndicator span 70% of the device screen width
                  child: ClipRRect( // Use ClipRRect to make the ends of the LinearProgressIndicator rounded
                    borderRadius: BorderRadius.circular(10.0),
                    child: AnimatedBuilder(
                      animation: controller,
                      builder: (context, child) => LinearProgressIndicator(
                        backgroundColor: theme.primaryColor.withOpacity(0.05), // Reduce the opacity to 5%
                        valueColor: AlwaysStoppedAnimation<Color>(theme.primaryColor.withOpacity(0.25)), // Reduce the opacity of the value color to 25%
                        value: controller.value, // Use the controller's value to control the LinearProgressIndicator
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
          Positioned( // Positioned widget for TypewriterAnimatedTextKit
            top: MediaQuery.of(context).size.height * 0.8, // Position it 80% from the top of the screen
            child: SizedBox(
              width: MediaQuery.of(context).size.width,
              child: Center(
                child: TypewriterAnimatedTextKit(
                  text: ['Made just for you...'],
                  textStyle: TextStyle(
                    fontSize: 12.0, // Make the text small in size
                    color: theme.primaryColor, // Set the font color to the primary color of the theme
                    fontFamily: 'Popins',
                  ),
                  speed: Duration(milliseconds: 100), // Adjust this value to make the typing effect faster
                  pause: Duration(seconds: 3), // Add a pause before the animation starts
                ),
              ),
            ),
          ),
          Center( // Wrap with Center
            child: SizedBox( // The Rive animation
              width: MediaQuery.of(context).size.width * 0.7, // Set width to 70% of the device screen
              child: RiveAnimation.asset(
                'assets/rive_animations/crevify_logo_intro.riv',
                fit: BoxFit.contain,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
