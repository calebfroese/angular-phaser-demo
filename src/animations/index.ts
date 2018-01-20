import {
  trigger,
  state,
  animate,
  style,
  transition,
} from '@angular/animations';

export function animations() {
  return [routerTransition(), enter(), leave()];
}

function routerTransition() {
  return trigger('routerTransition', [
    state('void', style({ position: 'fixed', width: '100%', height: '100%' })),
    state('*', style({ position: 'fixed', width: '100%', height: '100%' })),
  ]);
}

function enter() {
  return trigger('enter', [
    transition(':enter', [
      style({ transform: 'translateY(100%)' }),
      animate('2s ease-in-out', style({ transform: 'translateY(0%)' })),
    ]),
  ]);
}

function leave() {
  return trigger('leave', [
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      animate('2s ease-in-out', style({ transform: 'translateY(-100%)' })),
    ]),
  ]);
}
