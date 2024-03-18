import 'package:equatable/equatable.dart';

abstract class SplashState extends Equatable {
  const SplashState();

  @override
  List<Object> get props => [];
}

class SplashScreenState extends SplashState {
  final double progress; // Add a progress property (0.0 to 1.0)

  const SplashScreenState(this.progress); // Update constructor
}

// You can add other states here if needed (optional)
