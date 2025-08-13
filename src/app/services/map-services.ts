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

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

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

  movePoint(pointId: string, newLat: number, newLong: number): void {
    const currentPoints = this.pointsSubject.value;
    const index = currentPoints.findIndex((p) => p.id === pointId);
    if (index !== -1) {
      const newPoints = [...currentPoints];
      newPoints[index] = {
        ...newPoints[index],
        latitude: newLat,
        longitude: newLong,
      };
      this.pointsSubject.next(newPoints);
    }
  }
  deletePoint(pointId: string): void {
    const currentPoints = this.pointsSubject.value;
    const filteredPoints = currentPoints.filter((p) => p.id !== pointId);

    const renumberedPoints = filteredPoints.map((point, index) => ({
      ...point,
      number: index + 1,
    }));

    this.pointsSubject.next(renumberedPoints);
  }
}


