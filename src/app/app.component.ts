import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import { MapService } from './services/map-services';
import { CommonModule } from '@angular/common';

export interface RoutePoint {
  number: number;
  latitude: number;
  longitude: number;
  height: number;
  id?: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private routeLine!: L.Polyline;
  private subscription!: Subscription;

  points: RoutePoint[] = [];
  selectedPoint: RoutePoint | null = null;
  isModalVisible = false;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.subscription = this.mapService.points$.subscribe((points) => {
      this.points = points;
      this.updateMapDisplay();
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initMap() {
    // Initialize map
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Add click handler to add new points
    this.map.on('click', (e) => {
      this.addPoint(e.latlng.lat, e.latlng.lng);
    });
  }

  private addPoint(lat: number, lng: number) {
    const newPoint: RoutePoint = {
      number: 0, // Will be set by service
      latitude: lat,
      longitude: lng,
      height: 0,
    };

    this.mapService.addPoint(newPoint);
  }

  private updateMapDisplay() {
    // If map is not initialized, do nothing
    if (!this.map) {
      return;
    }

    // Clear existing markers
    this.clearMap();

    if (this.points.length === 0) return;

    // Add markers
    this.points.forEach((point, index) => {
      const marker = this.createMarker(point);
      this.markers.push(marker);
      marker.addTo(this.map);
    });

  }

  createMarker(point: RoutePoint): L.Marker {
    // Custom icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="marker-container">
          <div class="marker-number">${point.number}</div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    const marker = L.marker([point.latitude, point.longitude], {
      icon: customIcon,
      draggable: true,
    });

    return marker;
  }

  private clearMap() {
    // Remove existing markers
    this.markers.forEach((marker) => {
      this.map.removeLayer(marker);
    });
    this.markers = [];

    // Remove route line
    if (this.routeLine) {
      this.map.removeLayer(this.routeLine);
    }

    // Remove arrow markers
    this.map.eachLayer((layer) => {
      if (
        layer instanceof L.Marker &&
        layer.options.icon &&
        (layer.options.icon as L.DivIcon).options.className ===
          'direction-arrow'
      ) {
        this.map.removeLayer(layer);
      }
    });
  }
}