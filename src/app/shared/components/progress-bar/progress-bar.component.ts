import { Component, Input, OnInit } from '@angular/core';
import { Subject, interval, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  private destruction$: Subject<any> = new Subject();
  @Input() value = 0;
  initialTimerValue = 10;
  constructor() {}

  ngOnInit(): void {
    this.startTimer(this.initialTimerValue);
  }

  get progressStyle(): string {
    return `${this.value}%`;
  }

  private startTimer(duration: number): void {
    const interval$ = interval(1000).pipe(
      takeUntil(this.destruction$),
      take(duration)
    );

    const observer = {
      next: () => {
        this.value += 100 / duration;
      },
      error: () => {},
      complete: () => {},
    };
    interval$.subscribe(observer);
  }

  ngOnDestroy(): void {
    this.destruction$.next(null);
    this.destruction$.complete();
  }
}
