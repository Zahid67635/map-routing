import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoutePoint } from '../app.component';

@Injectable({
  providedIn: 'root',
})

export class MapService {
  private pointsSubject = new BehaviorSubject<RoutePoint[]>([]);
  public points$ = this.pointsSubject.asObservable();

  constructor() {}

  getPoints(): RoutePoint[] {
    return this.pointsSubject.value;
  }

  addPoint(point: RoutePoint): void {
    const currentPoints = this.pointsSubject.value;
    const newPoint = {
      ...point,
      number: currentPoints.length + 1,
      id: this.generateId(),
    };
    this.pointsSubject.next([...currentPoints, newPoint]);
  }

  updatePoint(updatedPoint: RoutePoint): void {
    const currentPoints = this.pointsSubject.value;
    const index = currentPoints.findIndex((p) => p.id === updatedPoint.id);
    if (index !== -1) {
      const newPoints = [...currentPoints];
      newPoints[index] = updatedPoint;
      this.pointsSubject.next(newPoints);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
