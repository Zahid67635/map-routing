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
    const currentPoints = this.getPoints();
    const newPoint = {
      ...point,
      number: currentPoints.length + 1,
      id: this.generateId(),
    };
    this.pointsSubject.next([...currentPoints, newPoint]);
  }

  updatePoint(updatedPoint: RoutePoint): void {
    const currentPoints = this.getPoints();
    const index = currentPoints.findIndex((p) => p.id === updatedPoint.id);
    if (index !== -1) {
      // Check if point number changed and handle renumbering
      const oldPoint = currentPoints[index];
      if (oldPoint.number !== updatedPoint.number) {
        this.renumberPoints(updatedPoint);
      } else {
        const newPoints = [...currentPoints];
        newPoints[index] = updatedPoint;
        this.pointsSubject.next(newPoints);
      }
    }
  }

  private renumberPoints(updatedPoint: RoutePoint): void {
    const currentPoints = this.getPoints();
    const oldIndex = currentPoints.findIndex((p) => p.id === updatedPoint.id);
    const newNumber = updatedPoint.number;

    if (oldIndex === -1) return;

    // Ensure the new number is within valid range
    const maxNumber = currentPoints.length;
    const clampedNumber = Math.max(1, Math.min(newNumber, maxNumber));
    updatedPoint.number = clampedNumber;

    const pointsWithoutUpdated = currentPoints.filter(
      (p) => p.id !== updatedPoint.id
    );

    // Insert the updated point at the new position (array index = number - 1)
    const newPoints = [...pointsWithoutUpdated];
    newPoints.splice(clampedNumber - 1, 0, updatedPoint);

    const renumberedPoints = newPoints.map((point, index) => ({
      ...point,
      number: index + 1,
    }));

    this.pointsSubject.next(renumberedPoints);
  }

  movePoint(pointId: string, newLat: number, newLong: number): void {
    const currentPoints = this.getPoints();
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
    const currentPoints = this.getPoints();
    const filteredPoints = currentPoints.filter((p) => p.id !== pointId);

    const renumberedPoints = filteredPoints.map((point, index) => ({
      ...point,
      number: index + 1,
    }));

    this.pointsSubject.next(renumberedPoints);
  }

  sendPointsToServer(): void {
    const points = this.getPoints();
    alert('Send to server successfully!\n\n'+JSON.stringify(points));
  }
}


