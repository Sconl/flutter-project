import 'package:equatable/equatable.dart';

abstract class SplashEvent extends Equatable {
  const SplashEvent();

  @override
  List<Object> get props => [];
}

class AppStarted extends SplashEvent {
  const AppStarted();

  @override
  List<Object> get props => [];
}

// You can add other events here if needed for splash screen logic
