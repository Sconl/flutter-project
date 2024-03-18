// splash_screen.dart
import 'package:flutter/material.dart';
import '../widgets/splash_widget.dart'; // Import SplashWidget
import '../bloc/splash_bloc/splash_bloc.dart'; // Import SplashBloc

class SplashScreen extends StatelessWidget {
  final splashBloc = SplashBloc(); // Create SplashBloc instance

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context); // Get current theme
    return SplashWidget(splashBloc: splashBloc,); // Pass theme
  }
}
