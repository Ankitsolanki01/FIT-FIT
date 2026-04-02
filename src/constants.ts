import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'weight-gain',
    title: 'Weight Gain Course',
    description: 'Science-based program to gain healthy weight and muscle mass.',
    price: 199,
    image: 'https://picsum.photos/seed/fitness1/800/600',
    fullDescription: 'Our Weight Gain Course is designed for individuals who struggle to put on weight. This program focuses on a combination of high-calorie nutrition and progressive resistance training to ensure you gain healthy weight, not just fat.',
    benefits: [
      'Customized high-calorie meal plans',
      'Effective muscle-building workout routines',
      'Supplementation guidance',
      'Weekly progress tracking templates'
    ],
    learnings: [
      'Understanding caloric surplus',
      'Macro-nutrient breakdown for growth',
      'Proper lifting techniques',
      'Recovery and sleep optimization'
    ]
  },
  {
    id: 'weight-loss',
    title: 'Weight Loss Course',
    description: 'A comprehensive guide to sustainable weight loss and body toning.',
    price: 199,
    image: 'https://picsum.photos/seed/fitness2/800/600',
    fullDescription: 'The Weight Loss Course provides a sustainable approach to shedding fat while maintaining muscle tone. No fad diets, just science-backed principles that work for the long term.',
    benefits: [
      'Flexible dieting strategies',
      'Fat-burning cardio and HIIT routines',
      'Metabolism-boosting tips',
      'Mindset and habit-forming guide'
    ],
    learnings: [
      'Calculating your caloric deficit',
      'The role of protein in fat loss',
      'Effective home and gym workouts',
      'Managing cravings and social eating'
    ]
  },
  {
    id: 'home-workout',
    title: 'Home Workout Plan',
    description: 'Transform your body from the comfort of your home with zero equipment.',
    price: 199,
    image: 'https://picsum.photos/seed/homeworkout/800/600',
    fullDescription: 'The Home Workout Plan is a comprehensive guide designed for those who want to get fit without a gym membership. This program focuses on bodyweight exercises, high-intensity interval training (HIIT), and functional movements to build strength, improve cardiovascular health, and burn fat—all from your living room.',
    benefits: [
      'No expensive gym equipment needed',
      'Flexible schedule: workout anytime',
      'Space-efficient routines for small apartments',
      'Video-guided exercise demonstrations'
    ],
    learnings: [
      'Mastering bodyweight fundamentals',
      'High-intensity interval training (HIIT)',
      'Core stability and strength',
      'Designing your own home workout space'
    ]
  },
  {
    id: 'diet-plan',
    title: 'Diet Plan Course',
    description: 'Personalized nutrition plans for every fitness goal.',
    price: 299,
    image: 'https://picsum.photos/seed/fitness4/800/600',
    fullDescription: '',
    benefits: [],
    learnings: [],
    isComingSoon: true
  },
  {
    id: 'muscle-building',
    title: 'Muscle Building Course',
    description: 'Advanced hypertrophy training for maximum muscle growth.',
    price: 599,
    image: 'https://picsum.photos/seed/fitness5/800/600',
    fullDescription: '',
    benefits: [],
    learnings: [],
    isComingSoon: true
  },
  {
    id: 'fat-loss-advanced',
    title: 'Fat Loss Advanced',
    description: 'Take your fat loss to the next level with advanced techniques.',
    price: 699,
    image: 'https://picsum.photos/seed/fitness6/800/600',
    fullDescription: '',
    benefits: [],
    learnings: [],
    isComingSoon: true
  }
];
